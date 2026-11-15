/**
 * F5 · Core Booking Flow — R1 ride options (UberX, UberXL) with surge badge.
 * OWNER: Jon Teo
 *
 * Each option shows its total fare (incl. surge) from useBooking().optionFares.
 * The SURGE badge is part of F1's story but lives here because it sits on R1.
 */
import { Badge, Icon } from '../../components';
import { rideOptions } from '../../data';
import { formatMoney, formatMultiplier } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function RideOptions() {
  const { rideType, update } = useAppState();
  const b = useBooking();
  return (
    <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
      <legend className="sr-only">Ride type</legend>
      {rideOptions.map((opt) => {
        const selected = opt.type === rideType;
        const total = b.optionFares.find((f) => f.type === opt.type)?.total;
        return (
          <label
            key={opt.type}
            className={`flex min-h-[76px] cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-peak ${selected ? 'border-2 border-peak bg-peak-soft' : 'border-2 border-transparent bg-white shadow-card hover:border-edge'}`}
          >
            <input
              type="radio"
              name="ride-type"
              value={opt.type}
              checked={selected}
              onChange={() => update({ rideType: opt.type })}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-peak' : 'border-edge'}`}
            >
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-peak" />}
            </span>
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-ink shadow-card"
            >
              <Icon name="car" className="h-6 w-6" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <strong className="text-base">{opt.type}</strong>
              <span className="text-[13px] text-muted">{opt.seats} seats</span>
            </span>
            <span className="flex flex-col items-end gap-1">
              {total !== undefined && (
                <strong className="text-base tabular-nums">{formatMoney(total)}</strong>
              )}
              {b.peak && <Badge>{formatMultiplier(b.multiplier)} surge</Badge>}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
