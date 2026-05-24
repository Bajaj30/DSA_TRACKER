"""Problem listing and detail endpoints."""

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import Optional, List
from database import get_db
from models import Problem, ProblemAttempt
from schemas import ProblemResponse

router = APIRouter(prefix="/problems", tags=["problems"])


def _enrich_problem(problem: Problem, db: Session) -> dict:
    """Add attempt info to a problem object."""
    latest_attempt = (
        db.query(ProblemAttempt)
        .filter(ProblemAttempt.problem_id == problem.id)
        .order_by(desc(ProblemAttempt.attempted_at))
        .first()
    )
    attempt_count = (
        db.query(func.count(ProblemAttempt.id))
        .filter(ProblemAttempt.problem_id == problem.id)
        .scalar()
    )

    return {
        "id": problem.id,
        "title": problem.title,
        "leetcode_number": problem.leetcode_number,
        "platform": problem.platform,
        "url": problem.url,
        "difficulty": problem.difficulty,
        "topic": problem.topic,
        "phase": problem.phase,
        "day_target": problem.day_target,
        "key_pattern": problem.key_pattern,
        "companies": problem.companies or [],
        "current_status": latest_attempt.status if latest_attempt else "UNSOLVED",
        "attempt_count": attempt_count or 0,
        "starred": latest_attempt.starred if latest_attempt else False,
        "last_attempted_at": latest_attempt.attempted_at if latest_attempt else None,
    }


@router.get("", response_model=List[ProblemResponse])
def list_problems(
    topic: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    phase: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    company: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """List all problems with optional filters."""
    query = db.query(Problem)

    if topic:
        query = query.filter(Problem.topic == topic)
    if difficulty:
        query = query.filter(Problem.difficulty == difficulty)
    if phase:
        query = query.filter(Problem.phase == phase)
    if search:
        query = query.filter(Problem.title.ilike(f"%{search}%"))
    if company:
        # JSON array contains — works for both PostgreSQL and SQLite
        query = query.filter(Problem.companies.cast(str).ilike(f"%{company}%"))

    problems = query.order_by(Problem.id).all()

    # Enrich with attempt data
    results = [_enrich_problem(p, db) for p in problems]

    # Filter by status (post-query since it's derived)
    if status:
        results = [r for r in results if r["current_status"] == status]

    return results


@router.get("/{problem_id}", response_model=ProblemResponse)
def get_problem(problem_id: int, db: Session = Depends(get_db)):
    """Get a single problem with attempt info."""
    problem = db.query(Problem).filter(Problem.id == problem_id).first()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return _enrich_problem(problem, db)
