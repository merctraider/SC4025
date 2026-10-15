/**
 * F3 · Peak Pickup Promise — R4 Booking confirmed.
 * OWNER: chun1108
 *
 * TODO(chun1108):
 *  - Final design: large promised clock time, the two credit tiers, "no claim needed".
 *  - Tier rows are generated from LATE_CREDIT_TIERS in config; keep it that way.
 */
import { Divider, FeatureArea, Row } from '../../components';
import { LATE_CREDIT_TIERS } from '../../config/businessRules';
import { formatClock, formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function PickupPromiseCard() {
  const b = useBooking();
  if (!b.peak) return null;
  const tiers = [...LATE_CREDIT_TIERS].sort((a, z) => a.minMinutesLate - z.minMinutesLate);
  return (
    <FeatureArea feature="F3" title="Peak pickup promise" className="flex flex-col gap-2.5">
      <span className="text-sm text-muted">Pickup promised by</span>
      <div className="text-[40px] leading-none font-semibold tabular-nums">
        {formatClock(b.promisedAt)}
      </div>
      <Divider />
      {tiers.map((t) => (
        <Row
          key={t.minMinutesLate}
          label={`More than ${t.minMinutesLate} min late`}
          value={<strong>{formatMoney(t.credit, { whole: true })} credit</strong>}
        />
      ))}
      <p className="m-0 text-[13px] text-muted">
        Added automatically after your ride. No claim needed.
      </p>
    </FeatureArea>
  );
}
