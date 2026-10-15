/** Horizontal bar, 0–1. Owner: yeechen630. */
export function ProgressBar({
  value,
  label,
  tone = 'peak',
}: {
  value: number;
  label: string;
  tone?: 'peak' | 'late';
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="relative h-2.5 rounded-full bg-line"
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${tone === 'late' ? 'bg-late' : 'bg-peak'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
