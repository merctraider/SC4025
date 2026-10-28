/**
 * F3 pickup promise tracker logic, on a mock clock measured in minutes since booking.
 * The promise is always measured from the original booking (even after a driver rematch).
 */

export type PickupStatus = 'on-track' | 'late' | 'arrived';

export interface PickupTracker {
  /** Share of the promised wait used so far, 0–1 (stays at 1 once past the promise). */
  progress: number;
  /** Minutes until the driver arrives (0 once arrived). */
  minutesAway: number;
  /** Minutes past the promised time so far (0 while on track). */
  minutesLate: number;
  status: PickupStatus;
}

/**
 * Tracker state `elapsedMinutes` after booking, for a pickup promised
 * `promisedMinutes` after booking where the driver arrives `arrivalMinutes` after booking.
 */
export function trackPickup(
  elapsedMinutes: number,
  promisedMinutes: number,
  arrivalMinutes: number,
): PickupTracker {
  const elapsed = Math.max(0, Math.min(elapsedMinutes, arrivalMinutes));
  const progress = promisedMinutes > 0 ? Math.min(1, elapsed / promisedMinutes) : 1;
  const minutesLate = Math.max(0, elapsed - promisedMinutes);
  const status: PickupStatus =
    elapsed >= arrivalMinutes ? 'arrived' : minutesLate > 0 ? 'late' : 'on-track';
  return { progress, minutesAway: arrivalMinutes - elapsed, minutesLate, status };
}
