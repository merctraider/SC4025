/**
 * F1 · Surge Fare Breakdown — R7 Trip complete, "same breakdown as booked".
 * OWNER: sushruth2911
 *
 * Uses the same BreakdownRows as R2, so the final fare always matches
 * what the rider saw at booking (PRD 4.5).
 */
import { Divider, FeatureArea, Row } from '../../components';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { BreakdownRows } from './BreakdownRows';

export function FareBreakdownSummary() {
  const b = useBooking();
  return (
    <FeatureArea feature="F1" title="Same breakdown as booked" className="flex flex-col gap-2.5">
      <BreakdownRows variant="summary" />
      <Divider />
      <Row label="Total" value={formatMoney(b.fare.total)} large />
    </FeatureArea>
  );
}