import { useState } from 'react';
import { createAttempt } from '../api/client';
import { HiX } from 'react-icons/hi';

const STATUS_OPTIONS = [
  { value: 'SOLVED_CLEAN', name: '✅ Solved Clean', desc: 'Got it without hints, coded correctly' },
  { value: 'LOGIC_STUCK', name: '🔁 Logic Stuck', desc: 'Needed logic hint to solve' },
  { value: 'SYNTAX_STUCK', name: '🔧 Syntax Stuck', desc: 'Had logic, struggled with code' },
  { value: 'BLIND', name: '💀 Blind', desc: 'Needed full solution to understand' },
];

export default function AttemptModal({ problem, onClose, onSuccess }) {
  const [status, setStatus] = useState('SOLVED_CLEAN');
  const [notes, setNotes] = useState('');
  const [starred, setStarred] = useState(false);
  const [isRevision, setIsRevision] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createAttempt({
        problem_id: problem.id,
        status,
        notes: notes || null,
        is_revision: isRevision,
        starred,
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Failed to log attempt:', err);
      alert('Failed to log attempt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Log Attempt</h2>
          <button className="modal-close" onClick={onClose}>
            <HiX />
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{problem.title}</span>
          <span className={`badge badge-${problem.difficulty?.toLowerCase()}`} style={{ marginLeft: 8 }}>
            {problem.difficulty}
          </span>
        </div>

        <div className="modal-body">
          {/* Status Selection */}
          <div className="form-group">
            <label className="form-label">How did it go?</label>
            <div className="status-radio-group">
              {STATUS_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`status-radio-option ${status === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={status === opt.value}
                    onChange={() => setStatus(opt.value)}
                  />
                  <div className="status-radio-dot" />
                  <div className="status-radio-label">
                    <span className="status-name">{opt.name}</span>
                    <span className="status-desc">{opt.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Key insights, approach used, mistakes to remember..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Options row */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={starred}
                onChange={(e) => setStarred(e.target.checked)}
                style={{ accentColor: '#fbbf24' }}
              />
              ⭐ Star for 7-day revision
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input
                type="checkbox"
                checked={isRevision}
                onChange={(e) => setIsRevision(e.target.checked)}
                style={{ accentColor: '#818cf8' }}
              />
              🔄 This is a revision attempt
            </label>
          </div>

          {/* Auto-revision info */}
          {(status === 'LOGIC_STUCK' || status === 'BLIND') && !starred && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(251, 146, 60, 0.1)',
              border: '1px solid rgba(251, 146, 60, 0.2)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#fb923c'
            }}>
              ⏰ Auto-scheduled for revision in 3 days
            </div>
          )}
          {starred && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: '#fbbf24'
            }}>
              ⭐ Starred — revision scheduled in 7 days
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Saving...' : 'Log Attempt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
