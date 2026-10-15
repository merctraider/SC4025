/**
 * F1 · Surge Fare Breakdown — R7 Trip complete, "same breakdown as booked".
 * OWNER: sushruth2911
 *
 * TODO(sushruth2911):
 *  - Must match R2 exactly (same numbers, same order) so the final fare
 *    matches what was shown at booking (PRD 4.5, R7 rationale).
 *  - Consider sharing row markup with FareBreakdown.
 */
import { Divider, FeatureArea, Row } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function FareBreakdownSummary() {
  const b = useBooking();
  const driverPct = Math.round(DRIVER_SURGE_SHARE * 100);
  return (
    <FeatureArea feature="F1" title="Same breakdown as booked" className="flex flex-col gap-2.5">
      <Row label="Base fare" value={formatMoney(b.fareInputs.baseFare)} />
      <Row label="Distance and time" value={formatMoney(b.fareInputs.distanceAndTime)} />
      {b.peak && (
        <Row
          label={`Surge (${formatMultiplier(b.multiplier)}, ${driverPct}% to driver)`}
          value={formatMoney(b.fare.surgeAmount)}
        />
      )}
      <Divider />
      <Row label="Total" value={formatMoney(b.fare.total)} large />
    </FeatureArea>
  );
}
