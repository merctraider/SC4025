import type { DailyEarnings } from '../data/types';
import { roundMoney } from './money';

const WEEK_DAYS: DailyEarnings['day'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** F4: one source for the summary and chart. Missing days have zero earnings. */
export function summarizeWeeklyEarnings(source: readonly DailyEarnings[]) {
  const sumMoney = (rows: readonly DailyEarnings[], field: 'peak' | 'offPeak' | 'surgeShare') =>
    roundMoney(
      rows.reduce((cents, row) => cents + Math.round(roundMoney(row[field]) * 100), 0) / 100,
    );

  const days = WEEK_DAYS.map((day): DailyEarnings => {
    const rows = source.filter((row) => row.day === day);
    return {
      day,
      peak: sumMoney(rows, 'peak'),
      offPeak: sumMoney(rows, 'offPeak'),
      surgeShare: sumMoney(rows, 'surgeShare'),
      peakTrips: rows.reduce((count, row) => count + row.peakTrips, 0),
    };
  });
  const peak = sumMoney(days, 'peak');
  const offPeak = sumMoney(days, 'offPeak');

  return {
    days,
    peak,
    offPeak,
    total: roundMoney(peak + offPeak),
    // surgeShare is already included in peak; do not add it to total again.
    surgeShare: sumMoney(days, 'surgeShare'),
    peakTrips: days.reduce((count, day) => count + day.peakTrips, 0),
  };
}
