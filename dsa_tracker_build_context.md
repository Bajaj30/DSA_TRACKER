# DSA Tracker — Build Context Document
**For**: Antigravity Agent  
**Stack**: FastAPI (backend) + React (frontend)  
**User**: Fresher ML student, Python, targeting Indian SDE placements

---

## Project Overview

Build a personal DSA progress tracker for a student preparing for college placements. The tracker helps maintain consistency, log progress per problem, and surface revision reminders — like a focused Leetcode dashboard but personal and opinionated.

---

## Core Features

### 1. Problem List Display
- Display all 200 problems grouped by Phase (1, 2, 3) and Topic (Arrays, Strings, Stacks, etc.)
- Each problem shows: Problem name, Leetcode/GFG link, Difficulty badge, Topic tag, Company tags
- Filter by: Topic, Difficulty, Status, Phase, Company
- Search by problem name

### 2. Progress Tracking
- Mark each problem with one of 5 statuses:
  - `SOLVED_CLEAN` — Solved without hints
  - `LOGIC_STUCK` — Needed logic hint
  - `SYNTAX_STUCK` — Had logic, struggled with code
  - `BLIND` — Needed full solution
  - `UNSOLVED` — Not attempted yet
- Store timestamp of when problem was solved
- Allow re-attempts (problems can be solved multiple times, keep history)

### 3. Dashboard / Stats
- Overall progress bar (X / 200)
- Problems solved today / this week
- Current streak (consecutive days with at least 1 solve)
- Breakdown by difficulty: Easy / Medium / Hard counts
- Breakdown by status: how many Clean vs Stuck vs Blind
- Topic-wise completion % (Arrays: 18/40, Trees: 0/30 etc.)
- Daily target indicator: 2/day Phase 1, 3/day Phase 2, 3-4/day Phase 3

### 4. Revision System
- Problems marked `LOGIC_STUCK` or `BLIND` → auto-schedule revision after 3 days
- Problems starred (⭐) → revision after 7 days
- "Due for Revision" section on dashboard showing overdue + today's revision problems
- Mark revision as done (separate from original solve)

### 5. Daily Schedule View
- Show today's target problems based on current phase and day number
- Show revision problems due today
- Simple checklist UI — check off as you go

### 6. Notes per Problem (optional, lightweight)
- One text field per problem for personal notes
- Autosave on blur

---

## Data Models

### Problem
```python
class Problem(BaseModel):
    id: int                        # 1–200
    title: str
    leetcode_number: Optional[int] # None for GFG problems
    platform: str                  # "leetcode" | "gfg"
    url: str
    difficulty: str                # "Easy" | "Medium" | "Hard"
    topic: str                     # "Arrays", "Strings", "Trees" etc.
    phase: int                     # 1, 2, or 3
    day_target: int                # which day this problem is scheduled
    key_pattern: str               # e.g. "Two Pointer", "Kadane's"
    companies: List[str]           # ["Amazon", "Google"] etc.
```

### ProblemAttempt
```python
class ProblemAttempt(BaseModel):
    id: int
    problem_id: int
    user_id: int                   # single user for now, keep for future
    status: str                    # SOLVED_CLEAN | LOGIC_STUCK | SYNTAX_STUCK | BLIND
    attempted_at: datetime
    notes: Optional[str]
    is_revision: bool              # False = first attempt, True = revision attempt
    revision_due_date: Optional[date]  # set based on status
    starred: bool                  # True = 7 day revision, False = 3 day
```

### UserProgress
```python
class UserProgress(BaseModel):
    user_id: int
    current_phase: int             # 1, 2, or 3
    start_date: date               # when they started
    current_streak: int
    last_active_date: date
    daily_target: int              # 2 or 3 (adjustable per phase)
```

---

## API Endpoints

### Problems
```
GET  /problems                     # list all, supports filters: topic, difficulty, phase, status, company
GET  /problems/{id}                # single problem detail
```

### Attempts
```
POST /attempts                     # log a new attempt
GET  /attempts/{problem_id}        # all attempts for a problem
PUT  /attempts/{attempt_id}        # update notes or starred status
```

### Dashboard
```
GET  /dashboard                    # full stats object
GET  /dashboard/today              # today's target problems + revision due
GET  /dashboard/revision           # all problems due for revision
```

### Progress
```
GET  /progress                     # user progress summary
PUT  /progress/daily-target        # update daily target (for Phase 3 adjustment)
```

---

## Database

Use **SQLite** for simplicity (single user, local use). Use SQLAlchemy ORM.

Tables:
- `problems` — seeded from the 200 problem list (static, pre-populated)
- `attempts` — one row per attempt, can have multiple per problem
- `user_progress` — single row, updated on each solve

Seed the `problems` table on first run from a JSON file (`problems_seed.json`) containing all 200 problems with their metadata.

---

## Backend Structure

```
dsa_tracker/
├── main.py                  # FastAPI app, router includes
├── database.py              # SQLAlchemy setup, session
├── models.py                # SQLAlchemy ORM models
├── schemas.py               # Pydantic schemas
├── routers/
│   ├── problems.py          # problem endpoints
│   ├── attempts.py          # attempt endpoints
│   └── dashboard.py        # stats + dashboard endpoints
├── services/
│   ├── revision.py          # revision scheduling logic
│   └── stats.py             # streak, progress calculations
└── seed/
    └── problems_seed.json   # all 200 problems data
```

---

## Revision Scheduling Logic

```python
def get_revision_date(status: str, starred: bool) -> Optional[date]:
    if starred:
        return date.today() + timedelta(days=7)
    if status in ["LOGIC_STUCK", "BLIND"]:
        return date.today() + timedelta(days=3)
    return None  # SOLVED_CLEAN and SYNTAX_STUCK don't need auto-revision
```

---

## Streak Logic

- Streak increments if user solved at least 1 problem today
- Streak resets to 0 if no solve yesterday
- Store `last_active_date` in `user_progress`, compare with today on each solve

---

## Phase Progression

- Phase 1: Day 1–20, 2 problems/day (Problems 1–40)
- Phase 2: Day 21–50, 3 problems/day (Problems 41–130)
- Phase 3: Day 51–70, 3–4 problems/day (Problems 131–200)
- Phase auto-advances based on `start_date` and `current day number`
- Daily target is adjustable via `PUT /progress/daily-target` (for Phase 3)

---

## Frontend Notes (if building full stack)

- Dark theme (student will use at night)
- Problem cards with color-coded difficulty badges
- Status dropdown on each card (the 5 statuses)
- Dashboard shows streak counter prominently
- Revision section highlighted in a distinct color (orange/amber)
- Mobile-friendly (student solves on laptop but checks progress on phone)

---

## Seed Data Format (problems_seed.json)

```json
[
  {
    "id": 1,
    "title": "Two Sum",
    "leetcode_number": 1,
    "platform": "leetcode",
    "url": "https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy",
    "topic": "Arrays",
    "phase": 1,
    "day_target": 1,
    "key_pattern": "HashMap",
    "companies": ["Google", "Amazon", "Microsoft"]
  }
]
```

Generate this JSON for all 200 problems from the problem list document.

---

## Out of Scope (for now)
- Auth / multi-user
- Timer per problem
- Code editor / submission
- Social features

---

## Dev Notes
- CORS enabled for localhost:3000 (React frontend)
- All datetimes in UTC
- Seed runs once on startup if `problems` table is empty
- Use `uvicorn main:app --reload` for dev

---

*Context document for Antigravity agent — DSA Tracker v1*
