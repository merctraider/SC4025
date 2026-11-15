/**
 * F4 · Driver Surge Share — D1 trip earnings, main block.
 * OWNER: jon_paul18
 * Values come from the same booking calculation as the rider's fare breakdown.
 */
import { CardTitle, Divider, FeatureArea, Icon, ProgressBar, Row } from '../../components';
import { DRIVER_SURGE_SHARE, UBER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function SurgeShareCard() {
  const b = useBooking();
  const you = Math.round(DRIVER_SURGE_SHARE * 100);
  const uber = Math.round(UBER_SURGE_SHARE * 100);
  return (
    <FeatureArea feature="F4" title="Your surge share" card={false} className="flex flex-col gap-4">
      {/* Same numbers the rider saw (PRD 4.5 D1) */}
      <div className="flex flex-col gap-3.5 rounded-2xl bg-white px-4 py-4 shadow-card">
        <CardTitle>Fare transparency</CardTitle>
        <Row label="Total rider fare" value={formatMoney(b.fare.total)} />
        <Row label="Non-surge fare" value={formatMoney(b.fare.preSurge)} />
        <Row
          label={`Total surge amount · ${formatMultiplier(b.multiplier)}`}
          value={formatMoney(b.fare.surgeAmount)}
        />
        <Divider />
        <Row label={`Your surge share · ${you}%`} value={formatMoney(b.driverSurgeShare)} />
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-hero px-4 py-4 text-white shadow-button">
        <h2 className="m-0 flex items-center gap-2 text-[17px] font-semibold">
          <Icon name="bolt" className="h-5 w-5" />
          Your surge earnings
        </h2>
        <output
          aria-label="Your surge share"
          className="block text-[36px] leading-tight font-bold tabular-nums"
        >
          {formatMoney(b.driverSurgeShare)}
        </output>
        <span className="text-[15px] text-white/85">You keep {you}% of every surge amount.</span>
        <ProgressBar
          value={DRIVER_SURGE_SHARE}
          tone="onHero"
          label={`Surge split: you ${you}%, Uber ${uber}%`}
        />
        <div className="flex justify-between text-[13px] text-white/80">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white" />
            You · {you}%
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white/30" />
            Uber · {uber}%
          </span>
        </div>
      </div>

      <p className="m-0 flex items-start gap-2 text-[15px] text-[#3a4156]">
        <Icon name="check" className="mt-0.5 h-[18px] w-[18px] text-ink" />
        Standard commission applies only to the base fare.
      </p>
    </FeatureArea>
  );
}
