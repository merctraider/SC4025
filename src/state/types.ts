import type { SurgeReason } from '../config/businessRules';
import type { ClockTime, RideType } from '../data/types';

export type PickupOutcome = 'onTime' | 'late7' | 'late12';

export const PICKUP_OUTCOMES: { id: PickupOutcome; label: string; minutesLate: number }[] = [
  { id: 'onTime', label: 'On time', minutesLate: 0 },
  { id: 'late7', label: '7 min late', minutesLate: 7 },
  { id: 'late12', label: '12 min late', minutesLate: 12 },
];

export interface AppState {
  // Booking (F5)
  tripId: string;
  rideType: RideType;
  rating: number | null;
  // Demo controls
  surgeOn: boolean;
  multiplier: number;
  reason: SurgeReason;
  pickupOutcome: PickupOutcome;
  /** Credits used BEFORE this trip (0, 1 or 2). */
  creditsUsedThisWeek: number;
  showFeatureLabels: boolean;
  demoPanelOpen: boolean;
  // Forecast (F2)
  /** Clock time the fare-drop alert was set, or null. Expiry rule is in config. */
  fareAlertSetAt: ClockTime | null;
}

export interface AppActions {
  update: (patch: Partial<AppState>) => void;
  /** Switch trip and load that trip's default multiplier and reason. */
  selectTrip: (tripId: string) => void;
  /** Clear per-trip state (rating, alert) after "Done". Demo settings are kept. */
  finishTrip: () => void;
  /** Back to the reference scenario defaults. */
  resetDemo: () => void;
}
