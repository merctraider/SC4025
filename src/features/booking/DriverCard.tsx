/**
 * F5 · Driver card (R4 full, R5 compact).
 * OWNER: Jon Teo
 * TODO(Jon Teo): photo placeholder → avatar image; call/message buttons are out of scope.
 */
import { useBooking } from '../../state';

export function DriverCard({ compact = false }: { compact?: boolean }) {
  const { driver } = useBooking();
  return (
    <div className="flex items-center gap-3.5 rounded-xl border-[1.5px] border-edge px-4 py-3.5">
      <div
        role="img"
        aria-label="Driver photo placeholder"
        className={`shrink-0 rounded-full bg-fill ${compact ? 'h-11 w-11' : 'h-14 w-14'}`}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <strong className={compact ? 'text-[15px]' : 'text-base'}>{driver.name}</strong>
        <span className={`text-muted ${compact ? 'text-[13px]' : 'text-sm'}`}>
          {driver.car} · {driver.plate}
        </span>
      </div>
      {!compact && <span className="text-sm">★ {driver.rating}</span>}
    </div>
  );
}
