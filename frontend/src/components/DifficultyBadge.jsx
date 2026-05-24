export default function DifficultyBadge({ difficulty }) {
  const d = difficulty?.toLowerCase() || 'medium';
  return (
    <span className={`badge badge-${d}`}>
      {difficulty}
    </span>
  );
}
