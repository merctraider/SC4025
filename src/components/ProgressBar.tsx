/** Horizontal bar, 0–1. `onHero` is the white bar used on gradient cards. Owner: yeechen630. */
export function ProgressBar({
  value,
  label,
  tone = 'peak',
}: {
  value: number;
  label: string;
  tone?: 'peak' | 'late' | 'ok' | 'onHero';
}) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  const track = tone === 'onHero' ? 'bg-white/25' : 'bg-line';
  const fill = {
    peak: 'bg-peak',
    late: 'bg-late',
    ok: 'bg-ok',
    onHero: 'bg-white',
  }[tone];
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={`relative h-2.5 rounded-full ${track}`}
    >
      <div
        className={`absolute inset-y-0 left-0 rounded-full ${fill}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
