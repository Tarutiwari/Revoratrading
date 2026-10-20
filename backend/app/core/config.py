from pydantic_settings import BaseSettings
from pydantic import AnyUrl
from typing import Optional


class Settings(BaseSettings):
    # ─── App ────────────────────────────────────────────────────────────────────
    APP_NAME: str = "Revora Trading API"
    APP_ENV: str = "development"          # development | staging | production
    DEBUG: bool = True

    # ─── Database (Supabase / PostgreSQL) ───────────────────────────────────────
    DATABASE_URL: str                     # sync  e.g. postgresql+psycopg2://...
    ASYNC_DATABASE_URL: str               # async e.g. postgresql+asyncpg://...

    # ─── Supabase (Storage & Admin) ─────────────────────────────────────────────
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None    # service role key (never expose to FE)
    SUPABASE_BOT_BUCKET: str = "trading-bots"   # bucket that stores bot zip files

    # ─── Redis / Upstash ────────────────────────────────────────────────────────
    REDIS_URL: str                        # redis://default:TOKEN@host:6379

    # ─── JWT ────────────────────────────────────────────────────────────────────
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ─── CORS ───────────────────────────────────────────────────────────────────
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    # ─── OpenAI ─────────────────────────────────────────────────────────────────
    OPENAI_API_KEY: Optional[str] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()