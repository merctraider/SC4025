/**
 * F3 · Peak Pickup Promise — R4 Booking confirmed.
 * Promise shown upfront and free (PRD 4.5 R4). Tier rows come from LATE_CREDIT_TIERS.
 * OWNER: chun1108
 */
import { Divider, FeatureArea, Row } from '../../components';
import { WEEKLY_CREDIT_CAP } from '../../config/businessRules';
import { formatClock, formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { ClockIcon } from './ClockIcon';
import { creditTiersAscending } from './promiseRules';

export function PickupPromiseCard() {
  const b = useBooking();
  if (!b.peak) return null;
  return (
    <FeatureArea feature="F3" title="Peak pickup promise" className="flex flex-col gap-2.5">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-peak">
        <ClockIcon className="h-4 w-4" />
        Peak pickup promise
      </span>
      <div className="text-[40px] leading-none font-semibold whitespace-nowrap tabular-nums">
        {formatClock(b.promisedAt)}
      </div>
      <span className="text-sm text-muted">
        In {b.trip.promisedPickupMinutes} min · booked {formatClock(b.bookedAt)}
      </span>
      <Divider />
      <span className="text-sm text-muted">If your driver is late</span>
      {creditTiersAscending.map((t) => (
        <Row
          key={t.minMinutesLate}
          label={`More than ${t.minMinutesLate} min late`}
          value={<strong>{formatMoney(t.credit, { whole: true })} credit</strong>}
        />
      ))}
      <p className="m-0 text-[13px] text-muted">
        Free and automatic: added after your ride, no claim needed. Up to {WEEKLY_CREDIT_CAP}{' '}
        credits per week.
      </p>
    </FeatureArea>
  );
}
