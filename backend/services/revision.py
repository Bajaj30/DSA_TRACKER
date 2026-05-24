"""Revision scheduling logic."""

from datetime import date, timedelta
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import ProblemAttempt, Problem


def get_revision_date(status: str, starred: bool) -> Optional[date]:
    """Calculate the next revision date based on attempt status and star flag.

    - Starred problems → revise after 7 days
    - LOGIC_STUCK or BLIND → revise after 3 days
    - SOLVED_CLEAN and SYNTAX_STUCK → no auto-revision
    """
    if starred:
        return date.today() + timedelta(days=7)
    if status in ["LOGIC_STUCK", "BLIND"]:
        return date.today() + timedelta(days=3)
    return None


def get_due_revisions(db: Session) -> List[dict]:
    """Get all problems due for revision (today or overdue).

    Returns attempts where revision_due_date <= today and
    no newer revision attempt exists for that problem.
    """
    today = date.today()

    # Get attempts with revision due
    attempts = (
        db.query(ProblemAttempt, Problem)
        .join(Problem, ProblemAttempt.problem_id == Problem.id)
        .filter(
            ProblemAttempt.revision_due_date.isnot(None),
            ProblemAttempt.revision_due_date <= today,
        )
        .order_by(ProblemAttempt.revision_due_date.asc())
        .all()
    )

    # Filter out problems that already have a revision attempt after the due date
    revision_items = []
    seen_problems = set()

    for attempt, problem in attempts:
        if attempt.problem_id in seen_problems:
            continue

        # Check if there's a revision attempt for this problem after the original attempt
        has_revision = (
            db.query(ProblemAttempt)
            .filter(
                ProblemAttempt.problem_id == attempt.problem_id,
                ProblemAttempt.is_revision == True,
                ProblemAttempt.attempted_at > attempt.attempted_at,
            )
            .first()
        )

        if not has_revision:
            days_overdue = (today - attempt.revision_due_date).days
            revision_items.append({
                "problem_id": problem.id,
                "title": problem.title,
                "difficulty": problem.difficulty,
                "topic": problem.topic,
                "url": problem.url,
                "status": attempt.status,
                "revision_due_date": attempt.revision_due_date,
                "days_overdue": days_overdue,
                "attempt_id": attempt.id,
            })
            seen_problems.add(attempt.problem_id)

    return revision_items
