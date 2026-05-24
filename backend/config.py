"""Application configuration via environment variables."""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """App settings loaded from environment variables or .env file."""

    # Database
    DATABASE_URL: str = "sqlite:///./dsa_tracker.db"

    # CORS
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000"

    # Environment
    ENVIRONMENT: str = "development"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    @property
    def database_url_sync(self) -> str:
        """Convert async URLs to sync if needed, and handle Render's postgres:// prefix."""
        url = self.DATABASE_URL
        # Render uses 'postgres://' but SQLAlchemy needs 'postgresql://'
        if url.startswith("postgres://"):
            url = url.replace("postgres://", "postgresql+pg8000://", 1)
        elif url.startswith("postgresql://") and "pg8000" not in url and "sqlite" not in url:
            url = url.replace("postgresql://", "postgresql+pg8000://", 1)
        return url

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
