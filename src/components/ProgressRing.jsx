export function ProgressRing({
  value,
  size = 96,
  strokeWidth = 8,
  colorClass = "text-brand",
  trackClass = "text-line dark:text-line-dark",
  label,
  sublabel,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={trackClass}
          stroke="currentColor"
          opacity={0.35}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={colorClass}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-semibold leading-none">{label ?? `${Math.round(value)}%`}</span>
        {sublabel && (
          <span className="mt-1 text-[10px] uppercase tracking-wide text-ink-soft dark:text-ink-soft-dark">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
