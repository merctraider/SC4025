/**
 * F5 · Driver card (R4 full, R5 compact).
 * OWNER: Jon Teo
 * Avatar shows the driver's initials (no photos in mock data); call/message
 * buttons are out of scope.
 */
import { Icon } from '../../components';
import { useBooking } from '../../state';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function DriverCard({ compact = false }: { compact?: boolean }) {
  const { driver, trip } = useBooking();
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-card">
      <div className="flex items-center gap-3">
        <div
          role="img"
          aria-label={`Driver ${driver.name}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-peak-soft text-[15px] font-semibold text-peak"
        >
          <span aria-hidden="true">{initials(driver.name)}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <strong className="text-base">{driver.name}</strong>
          <span className="text-sm text-muted" aria-label={`Rating ${driver.rating} out of 5`}>
            ★ {driver.rating} rating
          </span>
        </div>
        <span className="shrink-0 rounded-lg border-2 border-ink px-2.5 py-1 text-[15px] font-bold tracking-wide">
          {driver.plate}
        </span>
      </div>
      <div className="h-px bg-line" />
      {!compact && (
        <span className="flex items-center gap-2.5 text-[15px]">
          <Icon name="car" className="h-5 w-5 text-muted" />
          {driver.car}
        </span>
      )}
      <span className="flex items-center gap-2.5 text-[15px]">
        <Icon name="pin" className="h-5 w-5 text-muted" />
        Meet at {trip.pickup}
      </span>
    </div>
  );
}
