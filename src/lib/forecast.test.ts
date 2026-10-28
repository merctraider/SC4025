import { describe, expect, it } from 'vitest';
import { demandScenarios } from '../data/demandScenarios';
import { trips } from '../data/trips';
import { calculateFareForecast, getForecastTeaserCopy } from './forecast';

describe('calculateFareForecast', () => {
  const refTrip = trips[0]; // Raffles Place -> Jurong East (baseFare 3.0, distanceAndTime 19.4 -> 22.40)
  const refScenario = demandScenarios[0]; // evening-peak-cbd (1.4x, 15m: 27-30 Med, 30m: 23-26 Low)

  it('matches the reference scenario exact numbers', () => {
    const points = calculateFareForecast(refTrip, 1.4, refScenario);
    expect(points).toHaveLength(2);

    const [in15, in30] = points;
    expect(in15.horizonMinutes).toBe(15);
    expect(in15.low).toBe(27);
    expect(in15.high).toBe(30);
    expect(in15.confidence).toBe('Medium');

    expect(in30.horizonMinutes).toBe(30);
    expect(in30.low).toBe(23);
    expect(in30.high).toBe(26);
    expect(in30.confidence).toBe('Low');
  });

  it('calculates dynamically when multiplier changes', () => {
    // Multiplier increased to 2.0
    const points = calculateFareForecast(refTrip, 2.0);
    const [in15, in30] = points;

    // Total fare at 2.0 is 22.40 * 2.0 = 44.80
    // 15m: ~55% to 85% of surge -> low: ~35, high: ~41
    expect(in15.low).toBeGreaterThanOrEqual(27);
    expect(in15.high).toBeLessThanOrEqual(45);
    expect(in15.confidence).toBe('High');

    // 30m: lower than 15m
    expect(in30.low).toBeLessThan(in15.low);
    expect(in30.high).toBeLessThan(in15.high);
    expect(in30.confidence).toBe('Medium');
  });

  it('handles off-peak multiplier (1.0)', () => {
    const points = calculateFareForecast(refTrip, 1.0);
    expect(points[0].low).toBe(22);
    expect(points[0].high).toBe(22);
    expect(points[0].confidence).toBe('High');
    expect(points[1].low).toBe(22);
    expect(points[1].high).toBe(22);
    expect(points[1].confidence).toBe('High');
  });

  it('scales correctly for higher base fare (e.g. UberXL)', () => {
    const xlTrip = {
      baseFare: 3.0 * 1.3,
      distanceAndTime: 19.4 * 1.3,
    };
    const points = calculateFareForecast(xlTrip, 1.4);
    // 22.40 * 1.3 = 29.12 pre-surge. Total at 1.4 = 40.77
    expect(points[0].low).toBeGreaterThan(27);
    expect(points[1].low).toBeGreaterThan(23);
  });
});

describe('getForecastTeaserCopy', () => {
  it('returns active alert text when alert is set', () => {
    const copy = getForecastTeaserCopy(31.36, [], '19:06');
    expect(copy.text).toBe('Alert active · expires at 19:06');
    expect(copy.isDropExpected).toBe(true);
  });

  it('suggests 15 min drop when 15m high is below current fare', () => {
    const forecast = [
      { horizonMinutes: 15 as const, low: 24, high: 26, confidence: 'High' as const },
      { horizonMinutes: 30 as const, low: 22, high: 24, confidence: 'Medium' as const },
    ];
    const copy = getForecastTeaserCopy(31.36, forecast);
    expect(copy.text).toBe('Fare dropping soon (~15 min)');
    expect(copy.isDropExpected).toBe(true);
  });

  it('suggests 30 min drop when 30m is lower than current fare', () => {
    const forecast = [
      { horizonMinutes: 15 as const, low: 31, high: 32, confidence: 'Medium' as const },
      { horizonMinutes: 30 as const, low: 23, high: 26, confidence: 'Low' as const },
    ];
    const copy = getForecastTeaserCopy(31.36, forecast);
    expect(copy.text).toBe('Likely to drop in 30 min');
    expect(copy.isDropExpected).toBe(true);
  });

  it('returns steady when no drop is predicted', () => {
    const forecast = [
      { horizonMinutes: 15 as const, low: 32, high: 35, confidence: 'Medium' as const },
      { horizonMinutes: 30 as const, low: 32, high: 36, confidence: 'Low' as const },
    ];
    const copy = getForecastTeaserCopy(31.36, forecast);
    expect(copy.text).toBe('Fare steady · unlikely to drop soon');
    expect(copy.isDropExpected).toBe(false);
  });
});
