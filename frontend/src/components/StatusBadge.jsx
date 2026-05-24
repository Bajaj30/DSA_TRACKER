export default function StatusBadge({ status }) {
  const labels = {
    SOLVED_CLEAN: '✅ Clean',
    LOGIC_STUCK: '🔁 Logic Stuck',
    SYNTAX_STUCK: '🔧 Syntax Stuck',
    BLIND: '💀 Blind',
    UNSOLVED: '⬜ Unsolved',
  };

  return (
    <span className={`badge badge-${status}`}>
      {labels[status] || status}
    </span>
  );
}
