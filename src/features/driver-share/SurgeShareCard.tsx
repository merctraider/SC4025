/**
 * F4 · Driver Surge Share — D1 trip earnings, main block.
 * OWNER: jon_paul18
 * Values come from the same booking calculation as the rider's fare breakdown.
 */
import { Divider, FeatureArea, ProgressBar, Row } from '../../components';
import { DRIVER_SURGE_SHARE, UBER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function SurgeShareCard() {
  const b = useBooking();
  const { showFeatureLabels } = useAppState();
  const you = Math.round(DRIVER_SURGE_SHARE * 100);
  const uber = Math.round(UBER_SURGE_SHARE * 100);
  return (
    <FeatureArea feature="F4" title="Your surge share" className="flex flex-col gap-3">
      {!showFeatureLabels && (
        <h2 className="m-0 font-mono text-[11px] font-medium tracking-wider text-peak uppercase">
          Your surge share
        </h2>
      )}
      <Row label="Rider paid" value={formatMoney(b.fare.total)} />
      <Row
        label={`Surge amount (${formatMultiplier(b.multiplier)})`}
        value={formatMoney(b.fare.surgeAmount)}
      />
      <Divider />
      <span className="text-sm text-muted">You keep {you}% of every surge</span>
      <output
        aria-label="Your surge share"
        className="block text-[40px] leading-tight font-semibold tabular-nums"
      >
        {formatMoney(b.driverSurgeShare)}
      </output>
      <ProgressBar value={DRIVER_SURGE_SHARE} label={`Surge split: you ${you}%, Uber ${uber}%`} />
      <div className="flex justify-between text-[13px] text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-peak" />
          You · {you}%
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line" />
          Uber · {uber}%
        </span>
      </div>
    </FeatureArea>
  );
}
