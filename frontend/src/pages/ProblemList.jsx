import { useState, useEffect, useCallback } from 'react';
import { getProblems } from '../api/client';
import DifficultyBadge from '../components/DifficultyBadge';
import StatusBadge from '../components/StatusBadge';
import AttemptModal from '../components/AttemptModal';
import { HiOutlineExternalLink, HiOutlineStar, HiStar } from 'react-icons/hi';

const TOPICS = [
  'Arrays', 'Strings', 'Matrix', 'Math', 'Stacks', 'Queues',
  'Linked Lists', 'Binary Search', 'Trees', 'Graphs',
  'Dynamic Programming', 'Heaps', 'Greedy', 'Backtracking',
];

export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    topic: '',
    difficulty: '',
    phase: '',
    status: '',
  });
  const [selectedProblem, setSelectedProblem] = useState(null);

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.phase) params.phase = filters.phase;
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      const res = await getProblems(params);
      setProblems(res.data);
    } catch (err) {
      console.error('Failed to fetch problems:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const debounce = setTimeout(fetchProblems, 300);
    return () => clearTimeout(debounce);
  }, [fetchProblems]);

  const clearFilters = () => {
    setFilters({ search: '', topic: '', difficulty: '', phase: '', status: '' });
  };

  const hasFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Problem List</h1>
        <p>{problems.length} problems {hasFilters ? '(filtered)' : '• 200 total'}</p>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search problems..."
          value={filters.search}
          onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
        />
        <select
          className="filter-select"
          value={filters.topic}
          onChange={(e) => setFilters(f => ({ ...f, topic: e.target.value }))}
        >
          <option value="">All Topics</option>
          {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          className="filter-select"
          value={filters.difficulty}
          onChange={(e) => setFilters(f => ({ ...f, difficulty: e.target.value }))}
        >
          <option value="">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          className="filter-select"
          value={filters.phase}
          onChange={(e) => setFilters(f => ({ ...f, phase: e.target.value }))}
        >
          <option value="">All Phases</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
        </select>
        <select
          className="filter-select"
          value={filters.status}
          onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">All Status</option>
          <option value="SOLVED_CLEAN">✅ Solved Clean</option>
          <option value="LOGIC_STUCK">🔁 Logic Stuck</option>
          <option value="SYNTAX_STUCK">🔧 Syntax Stuck</option>
          <option value="BLIND">💀 Blind</option>
          <option value="UNSOLVED">⬜ Unsolved</option>
        </select>
        {hasFilters && (
          <button className="filter-clear-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Problem List */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : problems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No problems found</h3>
          <p>Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="problem-list">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="problem-row"
              onClick={() => setSelectedProblem(problem)}
            >
              <span className="problem-number">#{problem.id}</span>
              <div className="problem-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="problem-title">{problem.title}</span>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: 'var(--text-muted)', flexShrink: 0 }}
                  >
                    <HiOutlineExternalLink size={14} />
                  </a>
                </div>
                <div className="problem-meta">
                  <span className={`platform-icon ${problem.platform}`}>
                    {problem.platform === 'leetcode' ? '🟡 LC' : '🟢 GFG'}
                    {problem.leetcode_number && ` ${problem.leetcode_number}`}
                  </span>
                  <span className="problem-pattern">{problem.key_pattern}</span>
                </div>
              </div>
              <DifficultyBadge difficulty={problem.difficulty} />
              <span className="badge badge-topic">{problem.topic}</span>
              <StatusBadge status={problem.current_status} />
              <span style={{ color: problem.starred ? '#fbbf24' : 'var(--text-muted)', fontSize: '1.1rem' }}>
                {problem.starred ? <HiStar /> : <HiOutlineStar />}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Attempt Modal */}
      {selectedProblem && (
        <AttemptModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onSuccess={fetchProblems}
        />
      )}
    </div>
  );
}
