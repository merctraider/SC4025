/**
 * F4 · Driver Surge Share — D2 weekly summary block.
 * OWNER: jon_paul18
 * Totals and chart share the same daily mock data. The explicit week label
 * identifies the demo period independently of the device's current date.
 */
import { Divider, FeatureArea } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { getWeeklyEarnings } from '../../data';
import { formatMoney } from '../../lib';
import { summarizeWeeklyEarnings } from '../../lib/driverWeeklyEarnings';
import { useAppState, useBooking } from '../../state';
import { WeeklyEarningsChart } from './WeeklyEarningsChart';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid min-w-0 grid-rows-[1fr_auto] gap-1">
      <dt className="text-[13px] leading-snug text-muted">{label}</dt>
      <dd className="m-0 text-[22px] leading-tight font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

export function WeeklySummary() {
  const b = useBooking();
  const { showFeatureLabels } = useAppState();
  const week = getWeeklyEarnings(b.driver.id);
  const summary = summarizeWeeklyEarnings(week.days);
  return (
    <FeatureArea feature="F4" title="Weekly summary" className="flex flex-col gap-3">
      {!showFeatureLabels && (
        <h2 className="m-0 font-mono text-[11px] font-medium tracking-wider text-peak uppercase">
          Weekly summary
        </h2>
      )}
      <p className="m-0 text-xs text-muted">Demo week · {week.weekLabel}</p>
      <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-4">
        <Stat label="Total earnings" value={formatMoney(summary.total)} />
        <Stat
          label={`From surge (your ${Math.round(DRIVER_SURGE_SHARE * 100)}%)`}
          value={formatMoney(summary.surgeShare)}
        />
        <Stat label="Peak-hour earnings" value={formatMoney(summary.peak)} />
        <Stat label="Peak trips" value={String(summary.peakTrips)} />
      </dl>
      <Divider />
      <WeeklyEarningsChart days={summary.days} />
    </FeatureArea>
  );
}
