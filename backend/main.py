"""FastAPI application entry point."""

import json
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal, Base
from models import Problem, UserProgress
from config import settings


def seed_problems(db):
    """Seed the problems table from problems_seed.json if empty."""
    count = db.query(Problem).count()
    if count > 0:
        print(f"✅ Problems table already has {count} rows, skipping seed.")
        return

    seed_path = os.path.join(os.path.dirname(__file__), "seed", "problems_seed.json")
    if not os.path.exists(seed_path):
        print("⚠️  seed/problems_seed.json not found, skipping seed.")
        return

    with open(seed_path, "r") as f:
        problems_data = json.load(f)

    for p in problems_data:
        problem = Problem(
            id=p["id"],
            title=p["title"],
            leetcode_number=p.get("leetcode_number"),
            platform=p["platform"],
            url=p["url"],
            difficulty=p["difficulty"],
            topic=p["topic"],
            phase=p["phase"],
            day_target=p["day_target"],
            key_pattern=p["key_pattern"],
            companies=p.get("companies", []),
        )
        db.add(problem)

    db.commit()
    print(f"✅ Seeded {len(problems_data)} problems into database.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: create tables and seed data."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created.")

    # Seed problems
    db = SessionLocal()
    try:
        seed_problems(db)
    finally:
        db.close()

    yield  # App runs here

    # Shutdown (nothing to clean up)
    print("👋 Shutting down.")


# Create FastAPI app
app = FastAPI(
    title="DSA Tracker API",
    description="Personal DSA progress tracker for placement prep — 200 problems across 3 phases.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from routers.problems import router as problems_router
from routers.attempts import router as attempts_router
from routers.dashboard import router as dashboard_router

app.include_router(problems_router, prefix="/api/v1")
app.include_router(attempts_router, prefix="/api/v1")
app.include_router(dashboard_router, prefix="/api/v1")


@app.get("/health")
def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "ok", "version": "1.0.0"}


@app.get("/")
def root():
    """Root redirect to docs."""
    return {
        "message": "DSA Tracker API",
        "docs": "/docs",
        "health": "/health",
    }
