/**
 * F1 · Surge Fare Breakdown — R2 Fare screen block.
 * OWNER: sushruth2911
 *
 * Shown on the same screen as the fare, never behind a tap (PRD 4.1.6, US1).
 * Every number comes from useBooking(); nothing is recalculated here.
 *
 * Hierarchy: total → why it's high (chip + reason + one-line explainer) → line items.
 * No-surge state: shows the standard fare and line items, hides all surge rows.
 */
import { Chip, Divider, FeatureArea } from '../../components';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';
import { BreakdownRows } from './BreakdownRows';
import { SURGE_REASON_EXPLAINER } from './surgeReasons';

export function FareBreakdown() {
  const b = useBooking();
  const explainer = b.peak ? SURGE_REASON_EXPLAINER[String(b.reason)] : undefined;

  return (
    <FeatureArea feature="F1" title="Surge breakdown" className="flex flex-col gap-3">
      {/* 1. The price */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-muted">{b.peak ? 'Peak fare' : 'Fare'}</span>
        <div className="text-[40px] leading-none font-semibold tabular-nums">
          {formatMoney(b.fare.total)}
        </div>
      </div>

      {/* 2. Why it's this price */}
      {b.peak ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[15px] font-medium">
            <Chip>{formatMultiplier(b.multiplier)}</Chip>
            <span>{b.reason}</span>
          </div>
          {explainer && <p className="text-[13px] text-muted">{explainer}</p>}
        </div>
      ) : (
        <p className="text-[15px] text-muted">No surge right now. You're paying the standard fare.</p>
      )}

      <Divider />

      {/* 3. Line items */}
      <BreakdownRows variant="fare" />
    </FeatureArea>
  );
}