"""
Pydantic schemas — request / response shapes for every API surface.
"""

from datetime import datetime
from decimal import Decimal
from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, model_validator


# ════════════════════════════════════════════════════════════════════════════════
# Auth
# ════════════════════════════════════════════════════════════════════════════════

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: Optional[str] = None


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class LogoutRequest(BaseModel):
    access_token: str
    refresh_token: Optional[str] = None


# ════════════════════════════════════════════════════════════════════════════════
# Users
# ════════════════════════════════════════════════════════════════════════════════

class UserPublic(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str]
    avatar_url: Optional[str]
    is_verified: bool
    is_admin: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None


# ════════════════════════════════════════════════════════════════════════════════
# Bots
# ════════════════════════════════════════════════════════════════════════════════

class BotVersionPublic(BaseModel):
    id: str
    version_number: str
    changelog: Optional[str]
    file_size_bytes: Optional[int]
    is_latest: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class BotPublic(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str]
    long_description: Optional[str]
    thumbnail_url: Optional[str]
    tags: Optional[str]
    category: Optional[str]
    monthly_price: Decimal
    annual_price: Optional[Decimal]
    is_featured: bool
    versions: List[BotVersionPublic] = []
    created_at: datetime

    model_config = {"from_attributes": True}


class BotListItem(BaseModel):
    """Lightweight card for listing pages — no versions, no long_description."""
    id: str
    name: str
    slug: str
    description: Optional[str]
    thumbnail_url: Optional[str]
    tags: Optional[str]
    category: Optional[str]
    monthly_price: Decimal
    annual_price: Optional[Decimal]
    is_featured: bool

    model_config = {"from_attributes": True}


class BotCreateRequest(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    long_description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    tags: Optional[str] = None
    category: Optional[str] = None
    monthly_price: Decimal = Decimal("0")
    annual_price: Optional[Decimal] = None


class BotUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    long_description: Optional[str] = None
    thumbnail_url: Optional[str] = None
    tags: Optional[str] = None
    category: Optional[str] = None
    monthly_price: Optional[Decimal] = None
    annual_price: Optional[Decimal] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None


# ════════════════════════════════════════════════════════════════════════════════
# Subscriptions
# ════════════════════════════════════════════════════════════════════════════════

class SubscriptionCreate(BaseModel):
    bot_id: str
    plan: Literal["monthly", "annual"] = "monthly"


class SubscriptionPublic(BaseModel):
    id: str
    bot_id: str
    plan: str
    status: str
    started_at: datetime
    current_period_end: datetime
    cancelled_at: Optional[datetime]

    model_config = {"from_attributes": True}


# ════════════════════════════════════════════════════════════════════════════════
# Downloads
# ════════════════════════════════════════════════════════════════════════════════

class DownloadResponse(BaseModel):
    """Signed URL returned to the client for a secure, time-limited download."""
    download_url: str
    expires_in_seconds: int
    version: BotVersionPublic


# ════════════════════════════════════════════════════════════════════════════════
# Payments
# ════════════════════════════════════════════════════════════════════════════════

class PaymentPublic(BaseModel):
    id: str
    amount: Decimal
    currency: str
    status: str
    provider: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


# ════════════════════════════════════════════════════════════════════════════════
# Generic responses
# ════════════════════════════════════════════════════════════════════════════════

class MessageResponse(BaseModel):
    message: str


class PaginatedResponse(BaseModel):
    total: int
    page: int
    page_size: int
    items: list
