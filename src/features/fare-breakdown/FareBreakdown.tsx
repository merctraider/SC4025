/**
 * F1 · Surge Fare Breakdown — R2 Fare screen block.
 * OWNER: sushruth2911
 *
 * Shown on the same screen as the fare, never behind a tap (PRD 4.1.6, US1).
 * Every number comes from useBooking(); nothing is recalculated here.
 *
 * Hierarchy: total → why it's high (reason pill + one-line explainer) → line items.
 * No-surge state: shows the standard fare and line items, hides all surge rows.
 */
import { FeatureArea, Icon, Pill } from '../../components';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { BreakdownRows } from './BreakdownRows';
import { SURGE_REASON_EXPLAINER } from './surgeReasons';

export function FareBreakdown() {
  const b = useBooking();
  const explainer = b.peak ? SURGE_REASON_EXPLAINER[String(b.reason)] : undefined;

  return (
    <FeatureArea feature="F1" title="Surge breakdown" card={false} className="flex flex-col gap-4">
      {/* 1. The price */}
      <div className="flex flex-col gap-1.5">
        <div className="text-[40px] leading-none font-bold tracking-tight tabular-nums">
          {formatMoney(b.fare.total)}
        </div>
        <span className="text-base text-muted">
          {b.rideOption.type} · fare locked when you book
        </span>

        {/* 2. Why it's this price */}
        {b.peak ? (
          <>
            <Pill tone="warn" icon="bolt">
              {b.reason} · surge active
            </Pill>
            {explainer && <p className="m-0 text-[13px] text-muted">{explainer}</p>}
          </>
        ) : (
          <Pill tone="neutral">No surge right now · standard fare</Pill>
        )}
      </div>

      {/* 3. Line items */}
      <BreakdownRows variant="fare" />

      <p className="m-0 flex items-start gap-2 text-[13px] text-muted">
        <Icon name="info" className="mt-px h-4 w-4" />
        Standard commission applies only to the base fare.
      </p>
    </FeatureArea>
  );
}
