"""SQLAlchemy ORM models for the DSA Tracker."""

from sqlalchemy import (
    Column, Integer, String, Text, Boolean, Date, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base


class Problem(Base):
    """Static problem data — seeded from problems_seed.json."""
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    leetcode_number = Column(Integer, nullable=True)  # None for GFG problems
    platform = Column(String(20), nullable=False)      # "leetcode" | "gfg"
    url = Column(String(500), nullable=False)
    difficulty = Column(String(10), nullable=False)     # "Easy" | "Medium" | "Hard"
    topic = Column(String(50), nullable=False)
    phase = Column(Integer, nullable=False)             # 1, 2, or 3
    day_target = Column(Integer, nullable=False)        # which day this problem is scheduled
    key_pattern = Column(String(100), nullable=False)
    companies = Column(JSON, nullable=False, default=list)

    # Relationship
    attempts = relationship("ProblemAttempt", back_populates="problem", cascade="all, delete-orphan")


class ProblemAttempt(Base):
    """One row per attempt — a problem can have multiple attempts."""
    __tablename__ = "attempts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False, index=True)
    status = Column(String(20), nullable=False)         # SOLVED_CLEAN | LOGIC_STUCK | SYNTAX_STUCK | BLIND
    attempted_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    notes = Column(Text, nullable=True)
    is_revision = Column(Boolean, nullable=False, default=False)
    revision_due_date = Column(Date, nullable=True)
    starred = Column(Boolean, nullable=False, default=False)

    # Relationship
    problem = relationship("Problem", back_populates="attempts")


class UserProgress(Base):
    """Single row tracking overall user progress."""
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    current_phase = Column(Integer, nullable=False, default=1)
    start_date = Column(Date, nullable=False)
    current_streak = Column(Integer, nullable=False, default=0)
    last_active_date = Column(Date, nullable=True)
    daily_target = Column(Integer, nullable=False, default=2)
