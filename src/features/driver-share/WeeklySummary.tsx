/**
 * F4 · Driver Surge Share — D2 weekly summary block.
 * OWNER: jon_paul18
 * Totals and chart share the same daily mock data. The explicit week label
 * identifies the demo period independently of the device's current date.
 */
import type { ReactNode } from 'react';
import { FeatureArea, Icon, type IconName } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { getWeeklyEarnings } from '../../data';
import { formatMoney } from '../../lib';
import { summarizeWeeklyEarnings } from '../../lib/driverWeeklyEarnings';
import { useBooking } from '../../state';
import { WeeklyEarningsChart } from './WeeklyEarningsChart';

function Stat({
  label,
  value,
  icon,
  hero = false,
}: {
  label: string;
  value: string;
  icon?: IconName;
  hero?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-1.5 rounded-2xl px-4 py-4 ${hero ? 'bg-hero text-white shadow-button' : 'bg-white shadow-card'}`}
    >
      {icon && <Icon name={icon} className="h-6 w-6" />}
      <dt className={`text-[14px] leading-snug ${hero ? 'text-white/85' : 'text-muted'}`}>
        {label}
      </dt>
      <dd className="m-0 text-[22px] leading-tight font-bold tabular-nums">{value}</dd>
    </div>
  );
}

/** `children` render between the stat cards and the daily chart (D2 hourly chart). */
export function WeeklySummary({ children }: { children?: ReactNode }) {
  const b = useBooking();
  const week = getWeeklyEarnings(b.driver.id);
  const summary = summarizeWeeklyEarnings(week.days);
  return (
    <FeatureArea feature="F4" title="Weekly summary" card={false} className="flex flex-col gap-3">
      <h2 className="m-0 text-[17px] font-semibold">Weekly earnings at a glance</h2>
      <dl className="m-0 grid grid-cols-2 gap-3">
        <Stat icon="clock" label="Peak-hour earnings" value={formatMoney(summary.peak)} />
        <Stat
          icon="bolt"
          hero
          label={`Your surge earnings (${Math.round(DRIVER_SURGE_SHARE * 100)}%)`}
          value={formatMoney(summary.surgeShare)}
        />
        <Stat label="Total earnings" value={formatMoney(summary.total)} />
        <Stat label="Peak trips" value={String(summary.peakTrips)} />
      </dl>
      {children}
      <div className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4 shadow-card">
        <WeeklyEarningsChart days={summary.days} />
        <p className="m-0 text-[13px] text-muted">Demo week · {week.weekLabel}</p>
      </div>
    </FeatureArea>
  );
}
