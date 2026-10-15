/**
 * F5 · Core Booking Flow — R1 ride options (UberX, UberXL) with surge badge.
 * OWNER: Jon Teo
 *
 * TODO(Jon Teo): show each option's fare; final selected-state styling.
 * The SURGE badge is part of F1's story but lives here because it sits on R1.
 */
import { Badge } from '../../components';
import { rideOptions } from '../../data';
import { formatMultiplier } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function RideOptions() {
  const { rideType, update } = useAppState();
  const b = useBooking();
  return (
    <fieldset className="m-0 flex flex-col rounded-xl border-[1.5px] border-edge p-0">
      <legend className="sr-only">Ride type</legend>
      {rideOptions.map((opt, i) => {
        const selected = opt.type === rideType;
        return (
          <label
            key={opt.type}
            className={`flex min-h-16 cursor-pointer items-center justify-between gap-3 px-4 py-3 ${i > 0 ? 'border-t border-line' : ''} ${selected ? 'bg-fill' : ''} ${i === 0 ? 'rounded-t-[10px]' : ''} ${i === rideOptions.length - 1 ? 'rounded-b-[10px]' : ''}`}
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
            {b.peak && <Badge>SURGE {formatMultiplier(b.multiplier)}</Badge>}
          </label>
        );
      })}
    </fieldset>
  );
}
