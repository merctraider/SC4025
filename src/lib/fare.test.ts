import { describe, expect, it } from 'vitest';
import { getTrip } from '../data';
import {
  calculateDriverEarnings,
  calculateDriverSurgeShare,
  calculateFare,
  isPeak,
  scaleFareInputs,
} from './fare';

const reference = getTrip('t1'); // Raffles Place MRT Exit H → Jurong East Mall

describe('reference scenario (Raffles Place → Jurong East, UberX, 1.4×)', () => {
  it('pre-surge fare is S$22.40', () => {
    expect(calculateFare(reference, 1.4).preSurge).toBe(22.4);
  });

  it('total fare is S$31.36 and surge amount S$8.96', () => {
    expect(calculateFare(reference, 1.4)).toEqual({
      preSurge: 22.4,
      surgeAmount: 8.96,
      total: 31.36,
    });
  });

  it("driver's surge share is S$8.06", () => {
    const { surgeAmount } = calculateFare(reference, 1.4);
    expect(calculateDriverSurgeShare(surgeAmount)).toBe(8.06);
  });

  it('driver earnings: commission on pre-surge only, plus 90% of surge', () => {
    // 25% placeholder commission: 22.40 − 5.60 = 16.80; + 8.06 = 24.86
    expect(calculateDriverEarnings(reference, 1.4)).toEqual({
      preSurge: 22.4,
      commission: 5.6,
      preSurgeAfterCommission: 16.8,
      surgeAmount: 8.96,
      surgeShare: 8.06,
      total: 24.86,
    });
  });
});

describe('edge cases', () => {
  it('multiplier of 1.0: no surge, total equals pre-surge, not peak', () => {
    expect(calculateFare(reference, 1.0)).toEqual({ preSurge: 22.4, surgeAmount: 0, total: 22.4 });
    expect(calculateDriverSurgeShare(0)).toBe(0);
    expect(calculateDriverEarnings(reference, 1.0).total).toBe(16.8);
    expect(isPeak(1.0)).toBe(false);
    expect(isPeak(1.01)).toBe(true);
  });

  it('rejects a multiplier below 1.0', () => {
    expect(() => calculateFare(reference, 0.9)).toThrow(RangeError);
  });

  it('rounds half up to cents', () => {
    // 10.05 × 1.5 = 15.075 → 15.08
    expect(calculateFare({ baseFare: 3, distanceAndTime: 7.05 }, 1.5).total).toBe(15.08);
    // 90% of 0.05 = 0.045 → 0.05
    expect(calculateDriverSurgeShare(0.05)).toBe(0.05);
  });

  it('commission rate can be overridden', () => {
    expect(calculateDriverEarnings(reference, 1.4, 0.2).commission).toBe(4.48);
  });

  it('scales fare inputs for other ride types', () => {
    const xl = scaleFareInputs(reference, 1.3);
    expect(xl.baseFare).toBe(3.9);
    expect(xl.distanceAndTime).toBe(25.22);
    expect(scaleFareInputs(reference, 1)).toBe(reference);
  });
});
