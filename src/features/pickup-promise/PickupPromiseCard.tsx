/**
 * F3 · Peak Pickup Promise — R4 Booking confirmed.
 * Promise shown upfront and free (PRD 4.5 R4). The credit tiers are listed on
 * R2 before booking and repeated in the R6 rules card.
 * OWNER: chun1108
 */
import { FeatureArea, Icon } from '../../components';
import { formatClock } from '../../lib';
import { useBooking } from '../../state';

export function PickupPromiseCard() {
  const b = useBooking();
  if (!b.peak) return null;
  return (
    <FeatureArea
      feature="F3"
      title="Peak pickup promise"
      tone="hero"
      className="flex flex-col gap-1.5"
    >
      <span className="flex items-center gap-2 text-[15px] font-semibold">
        <Icon name="shield" className="h-5 w-5" />
        Peak Pickup Promise
      </span>
      <strong className="text-[28px] leading-tight font-bold tracking-tight whitespace-nowrap tabular-nums">
        Pickup by {formatClock(b.promisedAt)}
      </strong>
      <span className="text-[15px] text-white/80">
        Included free · Original booking {formatClock(b.bookedAt)}
      </span>
    </FeatureArea>
  );
}
