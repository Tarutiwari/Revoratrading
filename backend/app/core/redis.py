"""
Redis client — powered by Upstash Redis over TLS.

Uses redis-py with asyncio support.  A single shared connection pool
is created at startup and reused for every request (no per-request
reconnect overhead).

Usage patterns:
  • JWT blacklist   — SET token:jti "1" EX <ttl>
  • Rate limiting   — INCR / EXPIRE  (via SlowAPI)
  • Generic cache   — set_cache() / get_cache() helpers
"""

import json
import logging
from typing import Any, Optional

import redis.asyncio as aioredis

from app.core.config import settings

logger = logging.getLogger(__name__)

# ─── Global connection pool ────────────────────────────────────────────────────
_redis_pool: Optional[aioredis.Redis] = None


async def get_redis() -> aioredis.Redis:
    """
    Return the shared async Redis client.
    Creates the pool on first call (called during app startup).
    """
    global _redis_pool
    if _redis_pool is None:
        _redis_pool = aioredis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,   # all values come back as str
            max_connections=20,
        )
        logger.info("Redis connection pool created.")
    return _redis_pool


async def close_redis() -> None:
    """Close the pool during app shutdown."""
    global _redis_pool
    if _redis_pool:
        await _redis_pool.aclose()
        _redis_pool = None
        logger.info("Redis connection pool closed.")


# ─── Dependency injection for FastAPI routes ───────────────────────────────────
async def redis_dependency() -> aioredis.Redis:
    """FastAPI Depends() helper — yields the shared Redis client."""
    return await get_redis()


# ─── Generic cache helpers ─────────────────────────────────────────────────────
async def set_cache(
    redis: aioredis.Redis,
    key: str,
    value: Any,
    ttl_seconds: int = 300,
) -> None:
    """Serialize `value` to JSON and store it with a TTL."""
    await redis.set(key, json.dumps(value), ex=ttl_seconds)


async def get_cache(redis: aioredis.Redis, key: str) -> Optional[Any]:
    """Retrieve and deserialize a cached value. Returns None on cache miss."""
    raw = await redis.get(key)
    if raw is None:
        return None
    return json.loads(raw)


async def invalidate_cache(redis: aioredis.Redis, *keys: str) -> None:
    """Delete one or more cache keys."""
    if keys:
        await redis.delete(*keys)


# ─── JWT blacklist helpers ─────────────────────────────────────────────────────
JWT_BLACKLIST_PREFIX = "token:blacklist:"


async def blacklist_token(
    redis: aioredis.Redis,
    jti: str,
    ttl_seconds: int,
) -> None:
    """Mark a JWT (by its jti claim) as revoked until it would have expired."""
    await redis.set(f"{JWT_BLACKLIST_PREFIX}{jti}", "1", ex=ttl_seconds)


async def is_token_blacklisted(redis: aioredis.Redis, jti: str) -> bool:
    """Return True if the JWT has been revoked."""
    return await redis.exists(f"{JWT_BLACKLIST_PREFIX}{jti}") == 1
