"""
Security utilities — password hashing + JWT token lifecycle.
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
import uuid

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

# ─── Password hashing ──────────────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ─── JWT token creation ────────────────────────────────────────────────────────
def _create_token(
    subject: str,
    token_type: str,     # "access" | "refresh"
    expires_delta: timedelta,
    extra_claims: Optional[dict] = None,
) -> str:
    jti = str(uuid.uuid4())          # unique ID — used for blacklisting
    expire = datetime.now(timezone.utc) + expires_delta
    payload = {
        "sub": subject,              # user id (UUID string)
        "type": token_type,
        "jti": jti,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
    }
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_access_token(user_id: str, is_admin: bool = False) -> str:
    return _create_token(
        subject=user_id,
        token_type="access",
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        extra_claims={"is_admin": is_admin},
    )


def create_refresh_token(user_id: str) -> str:
    return _create_token(
        subject=user_id,
        token_type="refresh",
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )


# ─── JWT token decoding ────────────────────────────────────────────────────────
def decode_token(token: str) -> dict:
    """
    Decode and validate a JWT.
    Raises JWTError on failure.
    """
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])


def get_token_jti(token: str) -> Optional[str]:
    """Extract the jti claim without full validation (used for blacklisting)."""
    try:
        payload = decode_token(token)
        return payload.get("jti")
    except JWTError:
        return None
