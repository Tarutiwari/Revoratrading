"""
Auth routes — register, login, refresh, logout.
All tokens are JWT; logout uses the Redis blacklist.
"""

from datetime import timedelta, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import redis.asyncio as aioredis

from app.core.database import get_async_db
from app.core.redis import redis_dependency, blacklist_token
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.core.config import settings
from app.core.deps import get_current_user
from app.model.models import User
from app.schemas.schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    RefreshTokenRequest,
    LogoutRequest,
    UserPublic,
    MessageResponse,
)
from jose import JWTError

router = APIRouter(prefix="/auth", tags=["Auth"])


# ─── Register ──────────────────────────────────────────────────────────────────
@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
async def register(
    body: UserRegisterRequest,
    db: AsyncSession = Depends(get_async_db),
):
    # Check duplicate email
    result = await db.execute(select(User).where(User.email == body.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


# ─── Login ─────────────────────────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
async def login(
    body: UserLoginRequest,
    db: AsyncSession = Depends(get_async_db),
):
    result = await db.execute(select(User).where(User.email == body.email))
    user: User | None = result.scalar_one_or_none()

    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated.",
        )

    return TokenResponse(
        access_token=create_access_token(user.id, is_admin=user.is_admin),
        refresh_token=create_refresh_token(user.id),
    )


# ─── Refresh ───────────────────────────────────────────────────────────────────
@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    body: RefreshTokenRequest,
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
):
    try:
        payload = decode_token(body.refresh_token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token.")

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not a refresh token.")

    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found.")

    return TokenResponse(
        access_token=create_access_token(user.id, is_admin=user.is_admin),
        refresh_token=create_refresh_token(user.id),
    )


# ─── Logout ────────────────────────────────────────────────────────────────────
@router.post("/logout", response_model=MessageResponse)
async def logout(
    body: LogoutRequest,
    redis: aioredis.Redis = Depends(redis_dependency),
):
    """Blacklist both access and (optionally) refresh tokens in Redis."""
    tokens_to_revoke = [body.access_token]
    if body.refresh_token:
        tokens_to_revoke.append(body.refresh_token)

    for token in tokens_to_revoke:
        try:
            payload = decode_token(token)
            jti = payload.get("jti")
            exp: int = payload.get("exp", 0)
            ttl = max(0, exp - int(datetime.now(timezone.utc).timestamp()))
            if jti and ttl > 0:
                await blacklist_token(redis, jti, ttl)
        except JWTError:
            pass  # already expired — no need to blacklist

    return MessageResponse(message="Logged out successfully.")


# ─── Me ────────────────────────────────────────────────────────────────────────
@router.get("/me", response_model=UserPublic)
async def me(current_user: User = Depends(get_current_user)):
    return current_user
