import { DEFAULT_TRIP_ID, getDemandScenario, getTrip } from '../data';
import type { AppState } from './types';

export function stateForTrip(tripId: string): Pick<AppState, 'tripId' | 'multiplier' | 'reason'> {
  const scenario = getDemandScenario(getTrip(tripId).demandScenarioId);
  return { tripId, multiplier: scenario.multiplier, reason: scenario.reason };
}

export function defaultState(): AppState {
  return {
    ...stateForTrip(DEFAULT_TRIP_ID),
    rideType: 'UberX',
    rating: null,
    surgeOn: true,
    pickupOutcome: 'onTime',
    creditsUsedThisWeek: 0,
    showFeatureLabels: false,
    demoPanelOpen: true,
    fareAlertSetAt: null,
  };
}
