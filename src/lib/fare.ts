import {
  COMMISSION_RATE_PLACEHOLDER,
  DRIVER_SURGE_SHARE,
  PEAK_MULTIPLIER_THRESHOLD,
} from '../config/businessRules';
import { roundMoney } from './money';

/** The parts of a trip the fare depends on. Any Trip from src/data fits. */
export interface FareInputs {
  baseFare: number;
  distanceAndTime: number;
}

export interface FareResult {
  preSurge: number;
  surgeAmount: number;
  total: number;
}

export interface DriverEarnings {
  preSurge: number;
  commission: number;
  preSurgeAfterCommission: number;
  surgeAmount: number;
  surgeShare: number;
  total: number;
}

export function isPeak(surgeMultiplier: number): boolean {
  return surgeMultiplier > PEAK_MULTIPLIER_THRESHOLD;
}

function assertMultiplier(m: number) {
  if (!Number.isFinite(m) || m < 1) {
    throw new RangeError(`Surge multiplier must be a number ≥ 1.0 (got ${m})`);
  }
}

/**
 * Pre-surge = base + distance and time. Total = pre-surge × multiplier.
 * Surge amount = total − pre-surge. All rounded to cents, half up.
 */
export function calculateFare(trip: FareInputs, surgeMultiplier: number): FareResult {
  assertMultiplier(surgeMultiplier);
  const preSurge = roundMoney(trip.baseFare + trip.distanceAndTime);
  const total = roundMoney(preSurge * surgeMultiplier);
  const surgeAmount = roundMoney(total - preSurge);
  return { preSurge, surgeAmount, total };
}

/** The driver's share (90%) of the surge amount. */
export function calculateDriverSurgeShare(surgeAmount: number): number {
  if (surgeAmount < 0) throw new RangeError('Surge amount cannot be negative');
  return roundMoney(surgeAmount * DRIVER_SURGE_SHARE);
}

/**
 * Driver's earnings for one trip. Commission (placeholder rate) applies to the
 * pre-surge fare only; the driver also keeps 90% of the surge amount.
 */
export function calculateDriverEarnings(
  trip: FareInputs,
  surgeMultiplier: number,
  commissionRate: number = COMMISSION_RATE_PLACEHOLDER,
): DriverEarnings {
  const { preSurge, surgeAmount } = calculateFare(trip, surgeMultiplier);
  const commission = roundMoney(preSurge * commissionRate);
  const preSurgeAfterCommission = roundMoney(preSurge - commission);
  const surgeShare = calculateDriverSurgeShare(surgeAmount);
  const total = roundMoney(preSurgeAfterCommission + surgeShare);
  return { preSurge, commission, preSurgeAfterCommission, surgeAmount, surgeShare, total };
}

/** Scale a trip's fare inputs for a ride type (UberXL etc.). */
export function scaleFareInputs<T extends FareInputs>(trip: T, fareFactor: number): T {
  if (fareFactor === 1) return trip;
  return {
    ...trip,
    baseFare: roundMoney(trip.baseFare * fareFactor),
    distanceAndTime: roundMoney(trip.distanceAndTime * fareFactor),
  };
}
