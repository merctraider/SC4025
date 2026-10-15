/**
 * F4 · Driver Surge Share — D2 weekly summary block.
 * OWNER: jon_paul18
 *
 * TODO(jon_paul18):
 *  - Replace the chart placeholder with a stacked bar chart (Mon–Sun, peak vs off-peak).
 *  - Decide whether the stats should be "this week" or "last week" (wireframe mixes both).
 *  - Totals are summed from src/data/driverWeeklyEarnings.ts.
 */
import { FeatureArea, Placeholder, StubNote } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { getWeeklyEarnings } from '../../data';
import { formatMoney, roundMoney } from '../../lib';
import { useBooking } from '../../state';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[13px] text-muted">{label}</span>
      <strong className="text-[22px] tabular-nums">{value}</strong>
    </div>
  );
}

export function WeeklySummary() {
  const b = useBooking();
  const week = getWeeklyEarnings(b.driver.id);
  const sum = (pick: (d: (typeof week.days)[number]) => number) =>
    roundMoney(week.days.reduce((acc, d) => acc + pick(d), 0));
  const peak = sum((d) => d.peak);
  const total = roundMoney(peak + sum((d) => d.offPeak));
  const surge = sum((d) => d.surgeShare);
  const trips = week.days.reduce((acc, d) => acc + d.peakTrips, 0);
  return (
    <FeatureArea feature="F4" title="Weekly summary" className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Total earnings" value={formatMoney(total)} />
        <Stat
          label={`From surge (your ${Math.round(DRIVER_SURGE_SHARE * 100)}%)`}
          value={formatMoney(surge)}
        />
        <Stat label="Peak-hour earnings" value={formatMoney(peak)} />
        <Stat label="Peak trips" value={String(trips)} />
      </div>
      <div className="h-px bg-line" />
      <span className="text-sm">Earnings by day, peak vs off-peak</span>
      <Placeholder label="Stacked bar chart: Mon–Sun" className="h-[180px]" />
      <span className="text-xs text-muted">Week of {week.weekLabel}</span>
      <StubNote owner="jon_paul18">stacked bar chart from driverWeeklyEarnings</StubNote>
    </FeatureArea>
  );
}
