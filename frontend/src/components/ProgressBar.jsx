export default function ProgressBar({ value, max, label, showPercentage = true, variant = 'primary' }) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="progress-bar-wrapper">
      {label && (
        <div className="progress-bar-label">
          <span className="label-text">{label}</span>
          <span className="label-value">
            {value}/{max} {showPercentage && `(${percentage}%)`}
          </span>
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill ${variant}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
