import { useState, useEffect } from 'react';
import { getDashboard, getRevisions } from '../api/client';
import StatsCard from '../components/StatsCard';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';
import { HiOutlineLightningBolt, HiOutlineCalendar, HiOutlineTrendingUp, HiOutlineCheck, HiOutlineFire } from 'react-icons/hi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashRes, revRes] = await Promise.all([
        getDashboard(),
        getRevisions(),
      ]);
      setStats(dashRes.data);
      setRevisions(revRes.data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>Failed to load dashboard</h3>
          <p>Make sure the backend is running and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Your DSA preparation at a glance — Day {stats.current_phase === 1 ? '1–20' : stats.current_phase === 2 ? '21–50' : '51–70'} • Phase {stats.current_phase}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          icon={<HiOutlineLightningBolt />}
          value={stats.total_solved}
          label="Problems Solved"
        />
        <StatsCard
          icon={<HiOutlineFire />}
          value={stats.current_streak}
          label="Day Streak"
          variant="streak-card"
        />
        <StatsCard
          icon={<HiOutlineCalendar />}
          value={stats.today_count}
          label="Solved Today"
        />
        <StatsCard
          icon={<HiOutlineTrendingUp />}
          value={stats.week_count}
          label="This Week"
        />
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Overall Progress</h3>
        <ProgressBar value={stats.total_solved} max={stats.total_problems} label="Total Completion" />

        {/* Phase progress */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {stats.phase_progress?.map((p) => (
            <ProgressBar
              key={p.phase}
              value={p.solved}
              max={p.total}
              label={`Phase ${p.phase}`}
              variant={p.phase <= stats.current_phase ? 'success' : 'primary'}
            />
          ))}
        </div>

        {/* Phase indicator dots */}
        <div className="phase-indicator" style={{ marginTop: '20px', justifyContent: 'center' }}>
          {[1, 2, 3].map((phase, idx) => (
            <div key={phase} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className={`phase-dot ${stats.current_phase === phase ? 'active' : stats.current_phase > phase ? 'completed' : ''}`}>
                {stats.current_phase > phase ? <HiOutlineCheck size={16} /> : phase}
              </div>
              {idx < 2 && <div className={`phase-connector ${stats.current_phase > phase ? 'completed' : ''}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="section-grid">
        {/* Difficulty Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>By Difficulty</h3>
          <div className="difficulty-chart">
            <div style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `conic-gradient(
                var(--diff-easy) 0deg ${(stats.difficulty_breakdown.easy / Math.max(stats.total_solved, 1)) * 360}deg,
                var(--diff-medium) ${(stats.difficulty_breakdown.easy / Math.max(stats.total_solved, 1)) * 360}deg ${((stats.difficulty_breakdown.easy + stats.difficulty_breakdown.medium) / Math.max(stats.total_solved, 1)) * 360}deg,
                var(--diff-hard) ${((stats.difficulty_breakdown.easy + stats.difficulty_breakdown.medium) / Math.max(stats.total_solved, 1)) * 360}deg 360deg
              )`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 800,
              }}>
                {stats.total_solved}
              </div>
            </div>
            <div className="difficulty-legend">
              <div className="legend-item">
                <div className="legend-dot easy" />
                <span className="legend-text">Easy<span className="legend-count">{stats.difficulty_breakdown.easy}</span></span>
              </div>
              <div className="legend-item">
                <div className="legend-dot medium" />
                <span className="legend-text">Medium<span className="legend-count">{stats.difficulty_breakdown.medium}</span></span>
              </div>
              <div className="legend-item">
                <div className="legend-dot hard" />
                <span className="legend-text">Hard<span className="legend-count">{stats.difficulty_breakdown.hard}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>By Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { key: 'solved_clean', label: 'SOLVED_CLEAN', count: stats.status_breakdown.solved_clean },
              { key: 'logic_stuck', label: 'LOGIC_STUCK', count: stats.status_breakdown.logic_stuck },
              { key: 'syntax_stuck', label: 'SYNTAX_STUCK', count: stats.status_breakdown.syntax_stuck },
              { key: 'blind', label: 'BLIND', count: stats.status_breakdown.blind },
              { key: 'unsolved', label: 'UNSOLVED', count: stats.status_breakdown.unsolved },
            ].map((s) => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBadge status={s.label} />
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revision Due */}
      {revisions.length > 0 && (
        <div className="revision-section" style={{ marginTop: '24px' }}>
          <h3>🔄 Due for Revision ({revisions.length})</h3>
          {revisions.map((rev) => (
            <div key={rev.attempt_id} className="revision-item">
              <div className="revision-info">
                <span className="revision-title">{rev.title}</span>
                <span className="revision-due">
                  {rev.days_overdue > 0 ? `${rev.days_overdue} days overdue` : 'Due today'} • {rev.topic}
                </span>
              </div>
              <StatusBadge status={rev.status} />
            </div>
          ))}
        </div>
      )}

      {/* Topic Progress */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>Topic-wise Progress</h3>
        <div className="topic-chart">
          {stats.topic_progress?.map((t) => (
            <div key={t.topic} className="topic-row">
              <span className="topic-name">{t.topic}</span>
              <div className="topic-bar-track">
                <div
                  className="topic-bar-fill"
                  style={{ width: `${t.percentage}%` }}
                />
              </div>
              <span className="topic-count">{t.solved}/{t.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
