from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings


# ─── Sync engine (for Alembic migrations / admin scripts) ──────────────────────
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,   # health-check connections
    echo=settings.DEBUG,
)

# ─── Async engine (for all FastAPI request handlers) ───────────────────────────
async_engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    echo=settings.DEBUG,
)

# ─── Session factories ──────────────────────────────────────────────────────────
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


# ─── Base model (all ORM models inherit from this) ─────────────────────────────
class Base(DeclarativeBase):
    pass


# ─── Dependency injection helpers ──────────────────────────────────────────────
def get_db():
    """Sync session — use only in scripts / admin tasks."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_async_db():
    """Async session — use in every FastAPI route."""
    async with AsyncSessionLocal() as session:
        yield session
