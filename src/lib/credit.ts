import { LATE_CREDIT_TIERS, WEEKLY_CREDIT_CAP } from '../config/businessRules';

/**
 * Late-pickup credit in S$: 0, 3 or 5 with the current config.
 * - More than 5 min late → S$3; more than 10 min late → S$5 (exactly 5 or 10 do not step up).
 * - Only if the ride was completed (a rider cancellation gets nothing).
 * - Nothing once the rider has used the weekly cap.
 */
export function calculateLateCredit(
  minutesLate: number,
  creditsUsedThisWeek: number,
  rideCompleted: boolean,
): number {
  if (!rideCompleted) return 0;
  if (creditsUsedThisWeek >= WEEKLY_CREDIT_CAP) return 0;
  for (const tier of LATE_CREDIT_TIERS) {
    if (minutesLate > tier.minMinutesLate) return tier.credit;
  }
  return 0;
}

/** Why a late pickup got no credit, for UI copy. null if a credit applies or the driver was on time. */
export function noCreditReason(
  minutesLate: number,
  creditsUsedThisWeek: number,
  rideCompleted: boolean,
): 'cancelled' | 'weekly-cap' | 'not-late-enough' | null {
  if (calculateLateCredit(minutesLate, creditsUsedThisWeek, rideCompleted) > 0) return null;
  if (minutesLate <= 0) return null;
  if (!rideCompleted) return 'cancelled';
  if (creditsUsedThisWeek >= WEEKLY_CREDIT_CAP) return 'weekly-cap';
  return 'not-late-enough';
}
