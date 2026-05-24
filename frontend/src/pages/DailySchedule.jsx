import { useState, useEffect } from 'react';
import { getToday } from '../api/client';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusBadge from '../components/StatusBadge';
import AttemptModal from '../components/AttemptModal';
import ProgressBar from '../components/ProgressBar';
import { HiOutlineExternalLink, HiOutlineCheck } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DailySchedule() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getToday();
      setData(res.data);
    } catch (err) {
      console.error('Failed to load schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner"><div className="spinner" /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>Failed to load schedule</h3>
          <p>Make sure the backend is running.</p>
        </div>
      </div>
    );
  }

  const targetSolvedCount = data.target_problems?.filter(p => p.current_status !== 'UNSOLVED').length || 0;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Today's Schedule</h1>
        <p>Day {data.day_number} • Phase {data.current_phase} • Target: {data.daily_target} problems/day</p>
      </div>

      {/* Today's progress */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Today's Progress</h3>
          <span style={{ fontSize: '2rem', fontWeight: 800, background: data.solved_today >= data.daily_target ? 'var(--gradient-success)' : 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {data.solved_today}/{data.daily_target}
          </span>
        </div>
        <ProgressBar
          value={data.solved_today}
          max={data.daily_target}
          variant={data.solved_today >= data.daily_target ? 'success' : 'primary'}
        />
      </div>

      <div className="section-grid">
        {/* Target Problems */}
        <div className="schedule-section">
          <h2>🎯 Today's Targets ({data.target_problems?.length || 0})</h2>
          {data.target_problems?.length > 0 ? (
            <div className="checklist">
              {data.target_problems.map((problem) => {
                const isSolved = problem.current_status !== 'UNSOLVED';
                return (
                  <div key={problem.id} className={`checklist-item ${isSolved ? 'completed' : ''}`}>
                    <div
                      className="check-icon"
                      onClick={() => !isSolved && setSelectedProblem(problem)}
                    >
                      {isSolved && <HiOutlineCheck size={14} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        to={`/problems/${problem.id}`}
                        style={{
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          color: isSolved ? 'var(--text-muted)' : 'var(--text-primary)',
                          textDecoration: isSolved ? 'line-through' : 'none',
                        }}
                      >
                        #{problem.id} {problem.title}
                      </Link>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <DifficultyBadge difficulty={problem.difficulty} />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{problem.key_pattern}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <StatusBadge status={problem.current_status} />
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--text-muted)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <HiOutlineExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No scheduled problems for today. Pick from bonus problems or revisions!</p>
            </div>
          )}
        </div>

        {/* Revision Problems */}
        <div className="schedule-section">
          <h2 style={{ color: 'var(--accent-warning)' }}>🔄 Due for Revision ({data.revision_problems?.length || 0})</h2>
          {data.revision_problems?.length > 0 ? (
            <div className="revision-section" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              {data.revision_problems.map((rev) => (
                <div key={rev.attempt_id} className="revision-item">
                  <div className="revision-info">
                    <Link to={`/problems/${rev.problem_id}`} className="revision-title" style={{ color: 'var(--text-primary)' }}>
                      #{rev.problem_id} {rev.title}
                    </Link>
                    <span className="revision-due">
                      {rev.days_overdue > 0 ? `${rev.days_overdue} days overdue` : 'Due today'} • {rev.topic}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <DifficultyBadge difficulty={rev.difficulty} />
                    <a href={rev.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                      <HiOutlineExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
              <p style={{ color: 'var(--text-muted)' }}>🎉 No revisions due today!</p>
            </div>
          )}
        </div>
      </div>

      {/* Attempt Modal */}
      {selectedProblem && (
        <AttemptModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
