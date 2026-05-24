export default function StatsCard({ icon, value, label, variant = '', className = '' }) {
  return (
    <div className={`stat-card ${variant} ${className}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
