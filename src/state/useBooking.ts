import { useMemo } from 'react';
import { WEEKLY_CREDIT_CAP } from '../config/businessRules';
import { getDemandScenario, getDriver, getTrip, rideOptions } from '../data';
import {
  addMinutes,
  calculateDriverEarnings,
  calculateDriverSurgeShare,
  calculateFare,
  calculateLateCredit,
  isPeak,
  scaleFareInputs,
} from '../lib';
import { PICKUP_OUTCOMES } from './types';
import { useAppState } from './useAppState';

/**
 * Everything a screen needs about the current booking, derived from state +
 * mock data + shared logic. Feature components should read numbers from here
 * rather than recalculating, so every screen shows the same figures.
 */
export function useBooking() {
  const s = useAppState();

  return useMemo(() => {
    const trip = getTrip(s.tripId);
    const driver = getDriver(trip.driverId);
    const scenario = getDemandScenario(trip.demandScenarioId);
    const rideOption = rideOptions.find((r) => r.type === s.rideType) ?? rideOptions[0];
    const fareInputs = scaleFareInputs(trip, rideOption.fareFactor);

    const multiplier = s.surgeOn ? s.multiplier : 1.0;
    const peak = isPeak(multiplier);
    const fare = calculateFare(fareInputs, multiplier);
    // Total fare for every ride type, for the R1 ride options list.
    const optionFares = rideOptions.map((opt) => ({
      type: opt.type,
      total: calculateFare(scaleFareInputs(trip, opt.fareFactor), multiplier).total,
    }));
    const driverSurgeShare = calculateDriverSurgeShare(fare.surgeAmount);
    const driverEarnings = calculateDriverEarnings(fareInputs, multiplier);

    // F3 pickup promise
    const promisedAt = addMinutes(trip.bookedAt, trip.promisedPickupMinutes);
    const minutesLate = PICKUP_OUTCOMES.find((o) => o.id === s.pickupOutcome)?.minutesLate ?? 0;
    const isLate = minutesLate > 0;
    const arrivedAt = addMinutes(promisedAt, minutesLate);
    // Only completed rides reach R6/R7: cancelling on R5 returns to R1 (F3
    // CancelRideNote), so rideCompleted = true here.
    const credit = peak ? calculateLateCredit(minutesLate, s.creditsUsedThisWeek, true) : 0;
    const creditsUsedAfterTrip = Math.min(
      s.creditsUsedThisWeek + (credit > 0 ? 1 : 0),
      WEEKLY_CREDIT_CAP,
    );
    const dropOffAt = addMinutes(arrivedAt, trip.rideDurationMinutes);

    return {
      trip,
      driver,
      scenario,
      rideOption,
      fareInputs,
      multiplier,
      reason: s.reason,
      peak,
      fare,
      optionFares,
      driverSurgeShare,
      driverEarnings,
      bookedAt: trip.bookedAt,
      promisedAt,
      arrivedAt,
      dropOffAt,
      minutesLate,
      isLate,
      credit,
      creditsUsedBefore: s.creditsUsedThisWeek,
      creditsUsedAfterTrip,
      forecast: scenario.forecast,
    };
  }, [
    s.tripId,
    s.rideType,
    s.surgeOn,
    s.multiplier,
    s.reason,
    s.pickupOutcome,
    s.creditsUsedThisWeek,
  ]);
}

export type Booking = ReturnType<typeof useBooking>;
