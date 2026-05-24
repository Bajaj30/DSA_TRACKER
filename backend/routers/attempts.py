"""Attempt logging and management endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from datetime import datetime, timezone
from database import get_db
from models import Problem, ProblemAttempt
from schemas import AttemptCreate, AttemptUpdate, AttemptResponse
from services.revision import get_revision_date
from services.stats import get_or_create_progress, update_streak, update_phase

router = APIRouter(prefix="/attempts", tags=["attempts"])


@router.post("", response_model=AttemptResponse)
def create_attempt(attempt: AttemptCreate, db: Session = Depends(get_db)):
    """Log a new attempt for a problem."""
    # Verify problem exists
    problem = db.query(Problem).filter(Problem.id == attempt.problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Calculate revision due date
    revision_due = get_revision_date(attempt.status, attempt.starred)

    # Create attempt
    db_attempt = ProblemAttempt(
        problem_id=attempt.problem_id,
        status=attempt.status,
        attempted_at=datetime.now(timezone.utc),
        notes=attempt.notes,
        is_revision=attempt.is_revision,
        revision_due_date=revision_due,
        starred=attempt.starred,
    )
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)

    # Update user progress (streak, phase)
    progress = get_or_create_progress(db)
    update_streak(db, progress)
    update_phase(db, progress)

    return db_attempt


@router.get("/{problem_id}", response_model=List[AttemptResponse])
def get_attempts(problem_id: int, db: Session = Depends(get_db)):
    """Get all attempts for a specific problem, newest first."""
    # Verify problem exists
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    attempts = (
        db.query(ProblemAttempt)
        .filter(ProblemAttempt.problem_id == problem_id)
        .order_by(desc(ProblemAttempt.attempted_at))
        .all()
    )
    return attempts


@router.put("/{attempt_id}", response_model=AttemptResponse)
def update_attempt(attempt_id: int, update: AttemptUpdate, db: Session = Depends(get_db)):
    """Update notes or starred status for an existing attempt."""
    db_attempt = db.query(ProblemAttempt).filter(ProblemAttempt.id == attempt_id).first()
    if not db_attempt:
        raise HTTPException(status_code=404, detail="Attempt not found")

    if update.notes is not None:
        db_attempt.notes = update.notes

    if update.starred is not None:
        db_attempt.starred = update.starred
        # Recalculate revision date if starred status changes
        db_attempt.revision_due_date = get_revision_date(db_attempt.status, update.starred)

    db.commit()
    db.refresh(db_attempt)
    return db_attempt
