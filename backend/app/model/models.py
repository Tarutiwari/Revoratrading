"""
SQLAlchemy ORM models — maps directly to Supabase (PostgreSQL) tables.

Tables
──────
  users            — registered accounts
  bots             — trading bot products listed in the marketplace
  bot_versions     — versioned releases for each bot
  subscriptions    — monthly/annual subscriptions linking users → bots
  downloads        — audit log of every download a user makes
  payments         — payment records (Stripe or manual)
"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


# ─── Helpers ───────────────────────────────────────────────────────────────────
def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def new_uuid() -> str:
    return str(uuid.uuid4())


# ─── 1. Users ──────────────────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    avatar_url = Column(Text, nullable=True)

    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    # ── relationships ──
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    downloads = relationship("Download", back_populates="user", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="user", cascade="all, delete-orphan")


# ─── 2. Bots ───────────────────────────────────────────────────────────────────
class Bot(Base):
    __tablename__ = "bots"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)   # URL-friendly
    description = Column(Text, nullable=True)
    long_description = Column(Text, nullable=True)
    thumbnail_url = Column(Text, nullable=True)
    tags = Column(String(500), nullable=True)           # comma-separated: "forex,scalping"
    category = Column(String(100), nullable=True)       # e.g. "Scalping", "Swing"

    # Pricing
    monthly_price = Column(Numeric(10, 2), nullable=False, default=0)
    annual_price = Column(Numeric(10, 2), nullable=True)                  # optional discount

    # Visibility
    is_published = Column(Boolean, default=False, nullable=False)
    is_featured = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    # ── relationships ──
    versions = relationship("BotVersion", back_populates="bot", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="bot")


# ─── 3. Bot Versions ───────────────────────────────────────────────────────────
class BotVersion(Base):
    """Each published release of a bot — stores the Supabase Storage path."""
    __tablename__ = "bot_versions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    bot_id = Column(UUID(as_uuid=False), ForeignKey("bots.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(String(50), nullable=False)   # e.g. "1.0.0"
    changelog = Column(Text, nullable=True)
    file_path = Column(Text, nullable=False)              # Supabase Storage object path
    file_size_bytes = Column(Integer, nullable=True)
    is_latest = Column(Boolean, default=False, nullable=False)

    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    # ── relationships ──
    bot = relationship("Bot", back_populates="versions")
    downloads = relationship("Download", back_populates="version")


# ─── 4. Subscriptions ──────────────────────────────────────────────────────────
class SubscriptionStatus(str):
    ACTIVE = "active"
    CANCELLED = "cancelled"
    EXPIRED = "expired"
    PAST_DUE = "past_due"


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    bot_id = Column(UUID(as_uuid=False), ForeignKey("bots.id", ondelete="CASCADE"), nullable=False)

    plan = Column(
        Enum("monthly", "annual", name="subscription_plan"),
        nullable=False,
        default="monthly",
    )
    status = Column(
        Enum("active", "cancelled", "expired", "past_due", name="subscription_status"),
        nullable=False,
        default="active",
    )

    # Billing period
    started_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    current_period_end = Column(DateTime(timezone=True), nullable=False)
    cancelled_at = Column(DateTime(timezone=True), nullable=True)

    # External payment reference (Stripe subscription id, etc.)
    payment_provider_id = Column(String(255), nullable=True)

    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    __table_args__ = (
        UniqueConstraint("user_id", "bot_id", name="uq_user_bot_subscription"),
    )

    # ── relationships ──
    user = relationship("User", back_populates="subscriptions")
    bot = relationship("Bot", back_populates="subscriptions")
    downloads = relationship("Download", back_populates="subscription")


# ─── 5. Downloads ──────────────────────────────────────────────────────────────
class Download(Base):
    """Immutable audit record every time a user downloads a bot file."""
    __tablename__ = "downloads"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subscription_id = Column(UUID(as_uuid=False), ForeignKey("subscriptions.id", ondelete="SET NULL"), nullable=True)
    version_id = Column(UUID(as_uuid=False), ForeignKey("bot_versions.id", ondelete="SET NULL"), nullable=True)

    ip_address = Column(String(45), nullable=True)   # IPv4 or IPv6
    user_agent = Column(Text, nullable=True)
    downloaded_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    # ── relationships ──
    user = relationship("User", back_populates="downloads")
    subscription = relationship("Subscription", back_populates="downloads")
    version = relationship("BotVersion", back_populates="downloads")


# ─── 6. Payments ───────────────────────────────────────────────────────────────
class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=False), primary_key=True, default=new_uuid)
    user_id = Column(UUID(as_uuid=False), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subscription_id = Column(UUID(as_uuid=False), ForeignKey("subscriptions.id", ondelete="SET NULL"), nullable=True)

    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), nullable=False, default="USD")
    status = Column(
        Enum("pending", "completed", "failed", "refunded", name="payment_status"),
        nullable=False,
        default="pending",
    )

    provider = Column(String(50), nullable=True)          # "stripe", "paypal", etc.
    provider_payment_id = Column(String(255), nullable=True, index=True)

    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    # ── relationships ──
    user = relationship("User", back_populates="payments")
