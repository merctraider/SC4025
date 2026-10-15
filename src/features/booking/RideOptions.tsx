/**
 * F5 · Core Booking Flow — R1 ride options (UberX, UberXL) with surge badge.
 * OWNER: Jon Teo
 *
 * Each option shows its total fare (incl. surge) from useBooking().optionFares.
 * The SURGE badge is part of F1's story but lives here because it sits on R1.
 */
import { Badge } from '../../components';
import { rideOptions } from '../../data';
import { formatMoney, formatMultiplier } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function RideOptions() {
  const { rideType, update } = useAppState();
  const b = useBooking();
  return (
    <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
      <legend className="sr-only">Ride type</legend>
      {rideOptions.map((opt) => {
        const selected = opt.type === rideType;
        const total = b.optionFares.find((f) => f.type === opt.type)?.total;
        return (
          <label
            key={opt.type}
            className={`flex min-h-16 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-peak ${selected ? 'border-2 border-ink bg-fill' : 'border-[1.5px] border-edge bg-white hover:bg-fill'}`}
          >
            <input
              type="radio"
              name="ride-type"
              value={opt.type}
              checked={selected}
              onChange={() => update({ rideType: opt.type })}
              className="sr-only"
            />
            <span className="flex flex-col gap-0.5">
              <strong className="text-base">{opt.type}</strong>
              <span className="text-[13px] text-muted">{opt.seats} seats</span>
            </span>
            <span className="flex flex-col items-end gap-1">
              {total !== undefined && (
                <strong className="text-base tabular-nums">{formatMoney(total)}</strong>
              )}
              {b.peak && <Badge>SURGE {formatMultiplier(b.multiplier)}</Badge>}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
