import { describe, expect, it } from 'vitest';
import { driverWeeklyEarnings, type DailyEarnings } from '../data';
import { summarizeWeeklyEarnings } from './driverWeeklyEarnings';
import { roundMoney } from './money';

describe('F4 weekly earnings', () => {
  it('reconciles the seven daily bars with every reference summary statistic', () => {
    const summary = summarizeWeeklyEarnings(driverWeeklyEarnings[0].days);
    expect(summary.days.map((day) => day.day)).toEqual([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
    expect(summary).toMatchObject({
      peak: 770.7,
      offPeak: 690.5,
      total: 1461.2,
      surgeShare: 189.5,
      peakTrips: 39,
    });
    expect(roundMoney(summary.days.reduce((sum, day) => sum + day.peak + day.offPeak, 0))).toBe(
      summary.total,
    );
    expect(summary.total).toBe(roundMoney(summary.peak + summary.offPeak));
  });

  it('fills missing days with zeros and sorts unordered input without mutating it', () => {
    const source: DailyEarnings[] = [
      { day: 'Fri', peak: 12, offPeak: 3, surgeShare: 2, peakTrips: 1 },
      { day: 'Mon', peak: 4, offPeak: 5, surgeShare: 1, peakTrips: 1 },
    ];
    const before = structuredClone(source);
    const summary = summarizeWeeklyEarnings(source);
    expect(source).toEqual(before);
    expect(summary.days[0]).toEqual(source[1]);
    expect(summary.days[1]).toEqual({
      day: 'Tue',
      peak: 0,
      offPeak: 0,
      surgeShare: 0,
      peakTrips: 0,
    });
    expect(summary.total).toBe(24);
    expect(summary.peakTrips).toBe(2);
  });

  it('supports an empty week with seven zero-earnings days', () => {
    const summary = summarizeWeeklyEarnings([]);
    expect(summary.days).toHaveLength(7);
    expect(summary).toMatchObject({ total: 0, peak: 0, offPeak: 0, surgeShare: 0, peakTrips: 0 });
  });

  it('sums cents and merges duplicate days without adding surge share twice', () => {
    const summary = summarizeWeeklyEarnings([
      { day: 'Mon', peak: 0.1, offPeak: 0.2, surgeShare: 0.05, peakTrips: 1 },
      { day: 'Mon', peak: 0.2, offPeak: 0.1, surgeShare: 0.05, peakTrips: 1 },
    ]);
    expect(summary.days[0]).toEqual({
      day: 'Mon',
      peak: 0.3,
      offPeak: 0.3,
      surgeShare: 0.1,
      peakTrips: 2,
    });
    expect(summary.total).toBe(0.6);
  });
});
