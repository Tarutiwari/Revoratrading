"""
Bots routes — browse marketplace, get detail, admin CRUD.
Bot list responses are cached in Redis for 5 minutes.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import redis.asyncio as aioredis

from app.core.database import get_async_db
from app.core.redis import redis_dependency, get_cache, set_cache, invalidate_cache
from app.core.deps import get_current_user, get_current_admin
from app.model.models import Bot, BotVersion, User
from app.schemas.schemas import (
    BotPublic,
    BotListItem,
    BotCreateRequest,
    BotUpdateRequest,
    MessageResponse,
)

router = APIRouter(prefix="/bots", tags=["Bots"])

BOTS_CACHE_KEY = "bots:list"
BOT_DETAIL_CACHE_PREFIX = "bots:detail:"


# ─── List bots (public) ────────────────────────────────────────────────────────
@router.get("/", response_model=List[BotListItem])
async def list_bots(
    category: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
):
    cache_key = f"{BOTS_CACHE_KEY}:cat={category}:feat={featured}:p={page}:ps={page_size}"
    cached = await get_cache(redis, cache_key)
    if cached:
        return cached

    query = select(Bot).where(Bot.is_published == True)
    if category:
        query = query.where(Bot.category == category)
    if featured is not None:
        query = query.where(Bot.is_featured == featured)

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    bots = result.scalars().all()

    data = [BotListItem.model_validate(b).model_dump(mode="json") for b in bots]
    await set_cache(redis, cache_key, data, ttl_seconds=300)
    return data


# ─── Get bot detail (public) ───────────────────────────────────────────────────
@router.get("/{slug}", response_model=BotPublic)
async def get_bot(
    slug: str,
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
):
    cache_key = f"{BOT_DETAIL_CACHE_PREFIX}{slug}"
    cached = await get_cache(redis, cache_key)
    if cached:
        return cached

    result = await db.execute(
        select(Bot).where(Bot.slug == slug, Bot.is_published == True)
    )
    bot = result.scalar_one_or_none()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found.")

    data = BotPublic.model_validate(bot).model_dump(mode="json")
    await set_cache(redis, cache_key, data, ttl_seconds=300)
    return data


# ─── Admin: create bot ─────────────────────────────────────────────────────────
@router.post("/", response_model=BotPublic, status_code=status.HTTP_201_CREATED)
async def create_bot(
    body: BotCreateRequest,
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
    _admin: User = Depends(get_current_admin),
):
    bot = Bot(**body.model_dump())
    db.add(bot)
    await db.commit()
    await db.refresh(bot)

    # Bust list cache
    async for key in redis.scan_iter(f"{BOTS_CACHE_KEY}:*"):
        await invalidate_cache(redis, key)

    return bot


# ─── Admin: update bot ─────────────────────────────────────────────────────────
@router.patch("/{bot_id}", response_model=BotPublic)
async def update_bot(
    bot_id: str,
    body: BotUpdateRequest,
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(Bot).where(Bot.id == bot_id))
    bot = result.scalar_one_or_none()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found.")

    for field, value in body.model_dump(exclude_none=True).items():
        setattr(bot, field, value)

    await db.commit()
    await db.refresh(bot)

    # Bust caches
    await invalidate_cache(redis, f"{BOT_DETAIL_CACHE_PREFIX}{bot.slug}")
    async for key in redis.scan_iter(f"{BOTS_CACHE_KEY}:*"):
        await invalidate_cache(redis, key)

    return bot


# ─── Admin: delete bot ─────────────────────────────────────────────────────────
@router.delete("/{bot_id}", response_model=MessageResponse)
async def delete_bot(
    bot_id: str,
    db: AsyncSession = Depends(get_async_db),
    redis: aioredis.Redis = Depends(redis_dependency),
    _admin: User = Depends(get_current_admin),
):
    result = await db.execute(select(Bot).where(Bot.id == bot_id))
    bot = result.scalar_one_or_none()
    if not bot:
        raise HTTPException(status_code=404, detail="Bot not found.")

    await invalidate_cache(redis, f"{BOT_DETAIL_CACHE_PREFIX}{bot.slug}")
    await db.delete(bot)
    await db.commit()
    return MessageResponse(message="Bot deleted.")
