"""Stats, streak, and progress calculation services."""

from datetime import date, datetime, timedelta, timezone
from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, distinct, and_, case
from models import Problem, ProblemAttempt, UserProgress


def get_or_create_progress(db: Session) -> UserProgress:
    """Get the single UserProgress row, or create it if it doesn't exist."""
    progress = db.query(UserProgress).first()
    if not progress:
        progress = UserProgress(
            current_phase=1,
            start_date=date.today(),
            current_streak=0,
            last_active_date=None,
            daily_target=2,
        )
        db.add(progress)
        db.commit()
        db.refresh(progress)
    return progress


def get_day_number(start_date: date) -> int:
    """Calculate the current day number from the start date."""
    delta = (date.today() - start_date).days + 1  # Day 1 is the start date
    return max(1, delta)


def get_current_phase(day_number: int) -> int:
    """Derive the current phase from the day number."""
    if day_number <= 20:
        return 1
    elif day_number <= 50:
        return 2
    else:
        return 3


def get_daily_target_for_phase(phase: int) -> int:
    """Get the default daily target for a phase."""
    if phase == 1:
        return 2
    return 3  # Phase 2 and 3


def update_streak(db: Session, progress: UserProgress) -> None:
    """Update the streak based on today's activity.

    - If last_active was yesterday → increment streak
    - If last_active was today → no change
    - Otherwise → reset to 1
    """
    today = date.today()

    if progress.last_active_date == today:
        return  # Already active today, no change

    if progress.last_active_date == today - timedelta(days=1):
        progress.current_streak += 1
    else:
        progress.current_streak = 1

    progress.last_active_date = today
    db.commit()


def update_phase(db: Session, progress: UserProgress) -> None:
    """Auto-advance phase based on day number."""
    day_number = get_day_number(progress.start_date)
    new_phase = get_current_phase(day_number)

    if new_phase != progress.current_phase:
        progress.current_phase = new_phase
        progress.daily_target = get_daily_target_for_phase(new_phase)
        db.commit()


def get_solved_problem_ids(db: Session) -> set:
    """Get set of problem IDs that have at least one non-UNSOLVED attempt."""
    results = (
        db.query(distinct(ProblemAttempt.problem_id))
        .filter(ProblemAttempt.status != "UNSOLVED")
        .all()
    )
    return {r[0] for r in results}


def get_today_solve_count(db: Session) -> int:
    """Count problems solved today (unique problem_ids)."""
    today_start = datetime.combine(date.today(), datetime.min.time()).replace(tzinfo=timezone.utc)
    today_end = datetime.combine(date.today(), datetime.max.time()).replace(tzinfo=timezone.utc)

    count = (
        db.query(func.count(distinct(ProblemAttempt.problem_id)))
        .filter(
            ProblemAttempt.attempted_at >= today_start,
            ProblemAttempt.attempted_at <= today_end,
            ProblemAttempt.status != "UNSOLVED",
        )
        .scalar()
    )
    return count or 0


def get_week_solve_count(db: Session) -> int:
    """Count problems solved this week (unique problem_ids)."""
    today = date.today()
    week_start = today - timedelta(days=today.weekday())  # Monday
    week_start_dt = datetime.combine(week_start, datetime.min.time()).replace(tzinfo=timezone.utc)

    count = (
        db.query(func.count(distinct(ProblemAttempt.problem_id)))
        .filter(
            ProblemAttempt.attempted_at >= week_start_dt,
            ProblemAttempt.status != "UNSOLVED",
        )
        .scalar()
    )
    return count or 0


def get_difficulty_breakdown(db: Session, solved_ids: set) -> Dict[str, int]:
    """Count solved problems by difficulty."""
    if not solved_ids:
        return {"easy": 0, "medium": 0, "hard": 0}

    results = (
        db.query(Problem.difficulty, func.count(Problem.id))
        .filter(Problem.id.in_(solved_ids))
        .group_by(Problem.difficulty)
        .all()
    )
    breakdown = {"easy": 0, "medium": 0, "hard": 0}
    for difficulty, count in results:
        breakdown[difficulty.lower()] = count
    return breakdown


def get_status_breakdown(db: Session) -> Dict[str, int]:
    """Count problems by their latest attempt status."""
    # Get latest attempt per problem using subquery
    from sqlalchemy import desc

    # For each problem that has attempts, get the latest status
    latest_attempts = (
        db.query(
            ProblemAttempt.problem_id,
            ProblemAttempt.status,
        )
        .distinct(ProblemAttempt.problem_id)
        .order_by(ProblemAttempt.problem_id, desc(ProblemAttempt.attempted_at))
        .all()
    )

    total_problems = db.query(func.count(Problem.id)).scalar()
    breakdown = {
        "solved_clean": 0,
        "logic_stuck": 0,
        "syntax_stuck": 0,
        "blind": 0,
        "unsolved": 0,
    }

    attempted_ids = set()
    for problem_id, status in latest_attempts:
        attempted_ids.add(problem_id)
        key = status.lower()
        if key in breakdown:
            breakdown[key] += 1

    breakdown["unsolved"] = total_problems - len(attempted_ids)
    return breakdown


def get_topic_progress(db: Session, solved_ids: set) -> List[Dict]:
    """Get solved/total per topic."""
    # Get total per topic
    totals = (
        db.query(Problem.topic, func.count(Problem.id))
        .group_by(Problem.topic)
        .order_by(Problem.topic)
        .all()
    )

    result = []
    for topic, total in totals:
        solved = (
            db.query(func.count(Problem.id))
            .filter(Problem.topic == topic, Problem.id.in_(solved_ids))
            .scalar()
        ) if solved_ids else 0
        percentage = round((solved / total) * 100, 1) if total > 0 else 0
        result.append({
            "topic": topic,
            "solved": solved or 0,
            "total": total,
            "percentage": percentage,
        })

    return result


def get_phase_progress(db: Session, solved_ids: set) -> List[Dict]:
    """Get solved/total per phase."""
    totals = (
        db.query(Problem.phase, func.count(Problem.id))
        .group_by(Problem.phase)
        .order_by(Problem.phase)
        .all()
    )

    result = []
    for phase, total in totals:
        solved = (
            db.query(func.count(Problem.id))
            .filter(Problem.phase == phase, Problem.id.in_(solved_ids))
            .scalar()
        ) if solved_ids else 0
        percentage = round((solved / total) * 100, 1) if total > 0 else 0
        result.append({
            "phase": phase,
            "solved": solved or 0,
            "total": total,
            "percentage": percentage,
        })

    return result


def get_dashboard_stats(db: Session) -> Dict:
    """Aggregate all dashboard stats."""
    progress = get_or_create_progress(db)
    solved_ids = get_solved_problem_ids(db)
    day_number = get_day_number(progress.start_date)

    # Check and fix streak (if user missed a day)
    today = date.today()
    if progress.last_active_date and progress.last_active_date < today - timedelta(days=1):
        progress.current_streak = 0
        db.commit()

    return {
        "total_problems": 200,
        "total_solved": len(solved_ids),
        "today_count": get_today_solve_count(db),
        "week_count": get_week_solve_count(db),
        "current_streak": progress.current_streak,
        "current_phase": get_current_phase(day_number),
        "daily_target": progress.daily_target,
        "difficulty_breakdown": get_difficulty_breakdown(db, solved_ids),
        "status_breakdown": get_status_breakdown(db),
        "topic_progress": get_topic_progress(db, solved_ids),
        "phase_progress": get_phase_progress(db, solved_ids),
    }


def get_today_targets(db: Session) -> Dict:
    """Get today's target problems and revision items."""
    from services.revision import get_due_revisions

    progress = get_or_create_progress(db)
    day_number = get_day_number(progress.start_date)
    current_phase = get_current_phase(day_number)

    # Get problems scheduled for today
    target_problems = (
        db.query(Problem)
        .filter(Problem.day_target == day_number)
        .all()
    )

    # Get revision items
    revision_problems = get_due_revisions(db)

    # Count solved today
    solved_today = get_today_solve_count(db)

    return {
        "day_number": day_number,
        "current_phase": current_phase,
        "daily_target": progress.daily_target,
        "target_problems": target_problems,
        "revision_problems": revision_problems,
        "solved_today": solved_today,
    }
