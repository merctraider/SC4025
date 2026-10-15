/**
 * F5 · Driver card (R4 full, R5 compact).
 * OWNER: Jon Teo
 * Avatar shows the driver's initials (no photos in mock data); call/message
 * buttons are out of scope.
 */
import { useBooking } from '../../state';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function DriverCard({ compact = false }: { compact?: boolean }) {
  const { driver } = useBooking();
  return (
    <div className="flex items-center gap-3.5 rounded-xl border-[1.5px] border-edge px-4 py-3.5">
      <div
        role="img"
        aria-label={`Driver ${driver.name}`}
        className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white ${compact ? 'h-11 w-11 text-[15px]' : 'h-14 w-14 text-lg'}`}
      >
        <span aria-hidden="true">{initials(driver.name)}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <strong className={compact ? 'text-[15px]' : 'text-base'}>{driver.name}</strong>
        <span className={`text-muted ${compact ? 'text-[13px]' : 'text-sm'}`}>
          {driver.car} · {driver.plate}
        </span>
      </div>
      {!compact && (
        <span className="text-sm" aria-label={`Rating ${driver.rating} out of 5`}>
          ★ {driver.rating}
        </span>
      )}
    </div>
  );
}
