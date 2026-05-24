import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblem, getAttempts, updateAttempt } from '../api/client';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusBadge from '../components/StatusBadge';
import AttemptModal from '../components/AttemptModal';
import { HiOutlineExternalLink, HiOutlineArrowLeft, HiOutlineStar, HiStar } from 'react-icons/hi';

export default function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [notesTimeout, setNotesTimeout] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [probRes, attRes] = await Promise.all([
        getProblem(id),
        getAttempts(id),
      ]);
      setProblem(probRes.data);
      setAttempts(attRes.data);
      // Load notes from latest attempt
      if (attRes.data.length > 0 && attRes.data[0].notes) {
        setNotes(attRes.data[0].notes);
      }
    } catch (err) {
      console.error('Failed to load problem:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNotesChange = (value) => {
    setNotes(value);
    // Autosave on blur (debounced)
    if (notesTimeout) clearTimeout(notesTimeout);
    const timeout = setTimeout(async () => {
      if (attempts.length > 0) {
        try {
          await updateAttempt(attempts[0].id, { notes: value });
        } catch (err) {
          console.error('Failed to save notes:', err);
        }
      }
    }, 1000);
    setNotesTimeout(timeout);
  };

  const toggleStar = async (attempt) => {
    try {
      await updateAttempt(attempt.id, { starred: !attempt.starred });
      fetchData();
    } catch (err) {
      console.error('Failed to toggle star:', err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner"><div className="spinner" /></div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">❓</div>
          <h3>Problem not found</h3>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-container">
      {/* Back link */}
      <Link to="/problems" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.875rem' }}>
        <HiOutlineArrowLeft /> Back to Problems
      </Link>

      {/* Problem Header */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{problem.id}</span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {problem.title}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <DifficultyBadge difficulty={problem.difficulty} />
              <span className="badge badge-topic">{problem.topic}</span>
              <StatusBadge status={problem.current_status} />
              <span className={`platform-icon ${problem.platform}`}>
                {problem.platform === 'leetcode' ? '🟡 LC' : '🟢 GFG'}
                {problem.leetcode_number && ` #${problem.leetcode_number}`}
              </span>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {problem.companies?.map((c) => (
                <span key={c} className="badge badge-company">{c}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={problem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <HiOutlineExternalLink /> Solve
            </a>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
              Log Attempt
            </button>
          </div>
        </div>

        {/* Problem details */}
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Phase</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>Phase {problem.phase}</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Day Target</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>Day {problem.day_target || 'Bonus'}</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pattern</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>{problem.key_pattern}</div>
          </div>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Attempts</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>{problem.attempt_count}</div>
          </div>
        </div>
      </div>

      <div className="section-grid">
        {/* Notes */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>📝 Notes</h3>
          <textarea
            className="form-textarea"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Write your notes here... (autosaves)"
            style={{ minHeight: '150px' }}
          />
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>Auto-saves when you stop typing</p>
        </div>

        {/* Attempt History */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Attempt History</h3>
          {attempts.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 0' }}>
              <div className="empty-icon">🎯</div>
              <h3>No attempts yet</h3>
              <p>Log your first attempt to start tracking!</p>
            </div>
          ) : (
            <div className="attempt-timeline">
              {attempts.map((att) => (
                <div key={att.id} className="attempt-entry">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="attempt-date">{formatDate(att.attempted_at)}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {att.is_revision && <span className="badge badge-topic" style={{ fontSize: '0.6rem' }}>REVISION</span>}
                      <StatusBadge status={att.status} />
                      <button className="star-toggle" onClick={() => toggleStar(att)}>
                        {att.starred ? <HiStar style={{ color: '#fbbf24' }} /> : <HiOutlineStar />}
                      </button>
                    </div>
                  </div>
                  {att.notes && <p className="attempt-notes">{att.notes}</p>}
                  {att.revision_due_date && (
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent-warning)', marginTop: '6px' }}>
                      📅 Revision due: {new Date(att.revision_due_date).toLocaleDateString('en-IN')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attempt Modal */}
      {showModal && (
        <AttemptModal
          problem={problem}
          onClose={() => setShowModal(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
