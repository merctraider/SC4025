/**
 * F1 · Surge Fare Breakdown — R7 Trip complete, "same breakdown as booked".
 * OWNER: sushruth2911
 *
 * Uses the same BreakdownRows as R2, so the final fare always matches
 * what the rider saw at booking (PRD 4.5).
 */
import { FeatureArea } from '../../components';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { BreakdownRows } from './BreakdownRows';

export function FareBreakdownSummary() {
  const b = useBooking();
  return (
    <FeatureArea
      feature="F1"
      title="Same breakdown as booked"
      card={false}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-[40px] leading-none font-bold tracking-tight tabular-nums">
          {formatMoney(b.fare.total)}
        </div>
        <span className="text-base text-muted">Your booked fare · {b.rideOption.type}</span>
      </div>
      <BreakdownRows variant="summary" />
    </FeatureArea>
  );
}
