/**
 * F4 · Driver Surge Share — D1 trip earnings, main block.
 * OWNER: jon_paul18
 *
 * TODO(jon_paul18):
 *  - Final design; follow Uber's existing driver-app layout (PRD 4.1.6).
 *  - Numbers must match what the rider saw on R2 (same useBooking() values).
 */
import { Divider, FeatureArea, ProgressBar, Row } from '../../components';
import { DRIVER_SURGE_SHARE, UBER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function SurgeShareCard() {
  const b = useBooking();
  const you = Math.round(DRIVER_SURGE_SHARE * 100);
  const uber = Math.round(UBER_SURGE_SHARE * 100);
  return (
    <FeatureArea feature="F4" title="Your surge share" className="flex flex-col gap-3">
      <Row label="Rider paid" value={formatMoney(b.fare.total)} />
      <Row
        label={`Surge amount (${formatMultiplier(b.multiplier)})`}
        value={formatMoney(b.fare.surgeAmount)}
      />
      <Divider />
      <span className="text-sm text-muted">You keep {you}% of every surge</span>
      <div className="text-[40px] leading-none font-semibold tabular-nums">
        {formatMoney(b.driverSurgeShare)}
      </div>
      <ProgressBar value={DRIVER_SURGE_SHARE} label={`Surge split: you ${you}%, Uber ${uber}%`} />
      <div className="flex justify-between text-[13px] text-muted">
        <span>You · {you}%</span>
        <span>Uber · {uber}%</span>
      </div>
    </FeatureArea>
  );
}
