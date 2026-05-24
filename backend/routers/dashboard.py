"""Dashboard, stats, revision, and progress endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from schemas import (
    DashboardResponse,
    TodayResponse,
    RevisionProblem,
    ProgressResponse,
    DailyTargetUpdate,
    ProblemResponse,
)
from services.stats import (
    get_dashboard_stats,
    get_today_targets,
    get_or_create_progress,
    get_day_number,
    get_current_phase,
    get_solved_problem_ids,
)
from services.revision import get_due_revisions
from typing import List

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    """Get full dashboard stats."""
    stats = get_dashboard_stats(db)
    return DashboardResponse(**stats)


@router.get("/dashboard/today", response_model=TodayResponse)
def get_today(db: Session = Depends(get_db)):
    """Get today's target problems and revision items."""
    data = get_today_targets(db)

    # Enrich target problems with attempt info
    from routers.problems import _enrich_problem
    enriched_targets = [_enrich_problem(p, db) for p in data["target_problems"]]

    return TodayResponse(
        day_number=data["day_number"],
        current_phase=data["current_phase"],
        daily_target=data["daily_target"],
        target_problems=[ProblemResponse(**p) for p in enriched_targets],
        revision_problems=[RevisionProblem(**r) for r in data["revision_problems"]],
        solved_today=data["solved_today"],
    )


@router.get("/dashboard/revision", response_model=List[RevisionProblem])
def get_revisions(db: Session = Depends(get_db)):
    """Get all problems due for revision."""
    revisions = get_due_revisions(db)
    return [RevisionProblem(**r) for r in revisions]


@router.get("/progress", response_model=ProgressResponse)
def get_progress(db: Session = Depends(get_db)):
    """Get user progress summary."""
    progress = get_or_create_progress(db)
    day_number = get_day_number(progress.start_date)
    solved_ids = get_solved_problem_ids(db)

    return ProgressResponse(
        current_phase=get_current_phase(day_number),
        start_date=progress.start_date,
        current_streak=progress.current_streak,
        last_active_date=progress.last_active_date,
        daily_target=progress.daily_target,
        day_number=day_number,
        total_solved=len(solved_ids),
    )


@router.put("/progress/daily-target", response_model=ProgressResponse)
def update_daily_target(update: DailyTargetUpdate, db: Session = Depends(get_db)):
    """Update the daily problem target."""
    progress = get_or_create_progress(db)
    progress.daily_target = update.daily_target
    db.commit()
    db.refresh(progress)

    day_number = get_day_number(progress.start_date)
    solved_ids = get_solved_problem_ids(db)

    return ProgressResponse(
        current_phase=get_current_phase(day_number),
        start_date=progress.start_date,
        current_streak=progress.current_streak,
        last_active_date=progress.last_active_date,
        daily_target=progress.daily_target,
        day_number=day_number,
        total_solved=len(solved_ids),
    )
