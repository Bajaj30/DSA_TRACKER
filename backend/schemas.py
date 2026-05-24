"""Pydantic schemas for request/response validation."""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime
from enum import Enum


# --- Enums ---

class StatusEnum(str, Enum):
    SOLVED_CLEAN = "SOLVED_CLEAN"
    LOGIC_STUCK = "LOGIC_STUCK"
    SYNTAX_STUCK = "SYNTAX_STUCK"
    BLIND = "BLIND"
    UNSOLVED = "UNSOLVED"


# --- Problem Schemas ---

class ProblemResponse(BaseModel):
    id: int
    title: str
    leetcode_number: Optional[int] = None
    platform: str
    url: str
    difficulty: str
    topic: str
    phase: int
    day_target: int
    key_pattern: str
    companies: List[str] = []
    # Derived fields (from joins)
    current_status: str = "UNSOLVED"
    attempt_count: int = 0
    starred: bool = False
    last_attempted_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProblemBrief(BaseModel):
    id: int
    title: str
    difficulty: str
    topic: str
    current_status: str = "UNSOLVED"
    url: str

    class Config:
        from_attributes = True


# --- Attempt Schemas ---

class AttemptCreate(BaseModel):
    problem_id: int
    status: StatusEnum
    notes: Optional[str] = None
    is_revision: bool = False
    starred: bool = False


class AttemptUpdate(BaseModel):
    notes: Optional[str] = None
    starred: Optional[bool] = None


class AttemptResponse(BaseModel):
    id: int
    problem_id: int
    status: str
    attempted_at: datetime
    notes: Optional[str] = None
    is_revision: bool
    revision_due_date: Optional[date] = None
    starred: bool

    class Config:
        from_attributes = True


# --- Dashboard Schemas ---

class DifficultyBreakdown(BaseModel):
    easy: int = 0
    medium: int = 0
    hard: int = 0


class StatusBreakdown(BaseModel):
    solved_clean: int = 0
    logic_stuck: int = 0
    syntax_stuck: int = 0
    blind: int = 0
    unsolved: int = 0


class TopicProgress(BaseModel):
    topic: str
    solved: int
    total: int
    percentage: float


class PhaseProgress(BaseModel):
    phase: int
    solved: int
    total: int
    percentage: float


class DashboardResponse(BaseModel):
    total_problems: int = 200
    total_solved: int = 0
    today_count: int = 0
    week_count: int = 0
    current_streak: int = 0
    current_phase: int = 1
    daily_target: int = 2
    difficulty_breakdown: DifficultyBreakdown = DifficultyBreakdown()
    status_breakdown: StatusBreakdown = StatusBreakdown()
    topic_progress: List[TopicProgress] = []
    phase_progress: List[PhaseProgress] = []


class RevisionProblem(BaseModel):
    problem_id: int
    title: str
    difficulty: str
    topic: str
    url: str
    status: str
    revision_due_date: date
    days_overdue: int
    attempt_id: int

    class Config:
        from_attributes = True


class TodayResponse(BaseModel):
    day_number: int = 1
    current_phase: int = 1
    daily_target: int = 2
    target_problems: List[ProblemResponse] = []
    revision_problems: List[RevisionProblem] = []
    solved_today: int = 0


# --- Progress Schemas ---

class ProgressResponse(BaseModel):
    current_phase: int
    start_date: date
    current_streak: int
    last_active_date: Optional[date] = None
    daily_target: int
    day_number: int
    total_solved: int

    class Config:
        from_attributes = True


class DailyTargetUpdate(BaseModel):
    daily_target: int = Field(..., ge=1, le=10)
