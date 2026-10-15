/**
 * F1 · Surge Fare Breakdown — R2 Fare screen block.
 * OWNER: sushruth2911
 *
 * TODO(sushruth2911):
 *  - Final visual design of the breakdown (hierarchy, spacing, the bold surge row).
 *  - Decide what the block shows when surge is off (currently: fare + "No surge").
 *  - Optional: a short "Why?" explainer per surge reason (one line max, PRD 4.1.6).
 *  - Keep it on the same screen as the fare, never behind a tap (PRD 4.1.6, US1).
 *  - Read every number from useBooking(); do not recalculate here.
 */
import { Chip, Divider, FeatureArea, Row, StubNote } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function FareBreakdown() {
  const b = useBooking();
  const driverPct = Math.round(DRIVER_SURGE_SHARE * 100);
  return (
    <FeatureArea feature="F1" title="Surge breakdown" className="flex flex-col gap-3">
      <div className="text-[40px] leading-none font-semibold tabular-nums">
        {formatMoney(b.fare.total)}
      </div>
      {b.peak ? (
        <div className="flex items-center gap-2 text-[15px]">
          <Chip>{formatMultiplier(b.multiplier)}</Chip>
          <span>{b.reason}</span>
        </div>
      ) : (
        <div className="text-[15px] text-muted">No surge right now</div>
      )}
      <Divider />
      <Row label="Base fare" value={formatMoney(b.fareInputs.baseFare)} />
      <Row label="Distance and time" value={formatMoney(b.fareInputs.distanceAndTime)} />
      {b.peak && (
        <>
          <Row label="Surge" value={formatMoney(b.fare.surgeAmount)} bold />
          <Row
            label={`Goes to your driver (${driverPct}%)`}
            value={formatMoney(b.driverSurgeShare)}
            muted
            indent
          />
        </>
      )}
      <StubNote owner="sushruth2911">F1 layout roughed in; final design + no-surge state</StubNote>
    </FeatureArea>
  );
}
