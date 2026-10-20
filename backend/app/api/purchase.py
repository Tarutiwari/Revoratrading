"""
Purchase / Subscription routes.

Flow:
  POST /subscriptions/         → create (or reactivate) a subscription
  GET  /subscriptions/         → list user's active subscriptions
  POST /subscriptions/{id}/cancel → cancel a subscription
  GET  /subscriptions/{id}/download → get a signed download URL (Supabase Storage)
"""

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_async_db
from app.core.deps import get_current_user
from app.model.models import Bot, BotVersion, Subscription, Download, User
from app.schemas.schemas import (
    SubscriptionCreate,
    SubscriptionPublic,
    DownloadResponse,
    BotVersionPublic,
    MessageResponse,
)
from app.core.config import settings

# Supabase client — only needed for signed URLs
try:
    from supabase import create_client, Client as SupabaseClient
    _supabase: SupabaseClient = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
except Exception:
    _supabase = None

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])

DOWNLOAD_SIGNED_URL_TTL = 60  # seconds


def _period_end(plan: str) -> datetime:
    now = datetime.now(timezone.utc)
    return now + (timedelta(days=365) if plan == "annual" else timedelta(days=30))


# ─── Create / reactivate subscription ─────────────────────────────────────────
@router.post("/", response_model=SubscriptionPublic, status_code=status.HTTP_201_CREATED)
async def create_subscription(
    body: SubscriptionCreate,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user),
):
    # Verify bot exists
    result = await db.execute(
        select(Bot).where(Bot.id == body.bot_id, Bot.is_published == True)
    )
    bot = result.scalar_one_or_none()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found.")

    # Check for existing active subscription
    existing = await db.execute(
        select(Subscription).where(
            Subscription.user_id == current_user.id,
            Subscription.bot_id == body.bot_id,
            Subscription.status == "active",
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You already have an active subscription to this bot.",
        )

    sub = Subscription(
        user_id=current_user.id,
        bot_id=body.bot_id,
        plan=body.plan,
        status="active",
        current_period_end=_period_end(body.plan),
    )
    db.add(sub)
    await db.commit()
    await db.refresh(sub)
    return sub


# ─── List my subscriptions ─────────────────────────────────────────────────────
@router.get("/", response_model=list[SubscriptionPublic])
async def list_subscriptions(
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Subscription).where(Subscription.user_id == current_user.id)
    )
    return result.scalars().all()


# ─── Cancel subscription ───────────────────────────────────────────────────────
@router.post("/{sub_id}/cancel", response_model=SubscriptionPublic)
async def cancel_subscription(
    sub_id: str,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Subscription).where(
            Subscription.id == sub_id,
            Subscription.user_id == current_user.id,
        )
    )
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Subscription not found.")
    if sub.status != "active":
        raise HTTPException(status_code=400, detail="Subscription is not active.")

    sub.status = "cancelled"
    sub.cancelled_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(sub)
    return sub


# ─── Download — signed Supabase Storage URL ────────────────────────────────────
@router.get("/{sub_id}/download", response_model=DownloadResponse)
async def download_bot(
    sub_id: str,
    request: Request,
    db: AsyncSession = Depends(get_async_db),
    current_user: User = Depends(get_current_user),
):
    # Verify active subscription owned by this user
    result = await db.execute(
        select(Subscription).where(
            Subscription.id == sub_id,
            Subscription.user_id == current_user.id,
            Subscription.status == "active",
        )
    )
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=403, detail="No active subscription found.")

    if sub.current_period_end < datetime.now(timezone.utc):
        sub.status = "expired"
        await db.commit()
        raise HTTPException(status_code=403, detail="Subscription has expired.")

    # Get latest version
    ver_result = await db.execute(
        select(BotVersion).where(
            BotVersion.bot_id == sub.bot_id,
            BotVersion.is_latest == True,
        )
    )
    version = ver_result.scalar_one_or_none()
    if not version:
        raise HTTPException(status_code=404, detail="No downloadable file found for this bot.")

    # Generate a Supabase Storage signed URL (expires in 60s)
    if _supabase is None:
        raise HTTPException(status_code=503, detail="Storage service unavailable.")

    signed = _supabase.storage.from_(settings.SUPABASE_BOT_BUCKET).create_signed_url(
        version.file_path, DOWNLOAD_SIGNED_URL_TTL
    )
    signed_url = signed.get("signedURL") or signed.get("signedUrl")
    if not signed_url:
        raise HTTPException(status_code=500, detail="Could not generate download link.")

    # Audit log
    dl = Download(
        user_id=current_user.id,
        subscription_id=sub.id,
        version_id=version.id,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    db.add(dl)
    await db.commit()

    return DownloadResponse(
        download_url=signed_url,
        expires_in_seconds=DOWNLOAD_SIGNED_URL_TTL,
        version=BotVersionPublic.model_validate(version),
    )
