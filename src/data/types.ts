/**
 * Shared types for mock data. Feature code should import types from here
 * (or from src/data/index.ts), never redefine them.
 */
import type { Confidence, ForecastHorizon, SurgeReason } from '../config/businessRules';

export type { Confidence, ForecastHorizon, SurgeReason };

/** 24-hour clock time, "HH:mm", e.g. "18:36". Format for display with lib/time. */
export type ClockTime = string;

export type RideType = 'UberX' | 'UberXL';

export interface RideOption {
  type: RideType;
  seats: number;
  /** Multiplies base fare and distance/time for this ride type (UberX = 1). */
  fareFactor: number;
}

export interface Rider {
  id: string;
  name: string;
  /** Late-pickup credits already received this week (cap is in config). */
  creditsUsedThisWeek: number;
}

export interface Driver {
  id: string;
  name: string;
  car: string;
  plate: string;
  rating: number;
}

export interface Trip {
  id: string;
  pickup: string;
  destination: string;
  /** Short label for the trip picker in Demo controls. */
  label: string;
  /** UberX fare components in S$. Other ride types scale by RideOption.fareFactor. */
  baseFare: number;
  distanceAndTime: number;
  /** When the rider books. */
  bookedAt: ClockTime;
  /** Pickup is promised this many minutes after booking. */
  promisedPickupMinutes: number;
  /** Ride length after pickup, used for trip times on D1. */
  rideDurationMinutes: number;
  driverId: string;
  /** Default demand scenario (multiplier, reason, forecast) for this trip. */
  demandScenarioId: string;
}

export interface ForecastPoint {
  horizonMinutes: ForecastHorizon;
  low: number;
  high: number;
  confidence: Confidence;
}

export interface DemandScenario {
  id: string;
  label: string;
  multiplier: number;
  reason: SurgeReason;
  forecast: ForecastPoint[];
}

export interface DailyEarnings {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  /** S$ earned during peak (surge > 1.0) and off-peak periods. */
  peak: number;
  offPeak: number;
  /** Driver's 90% share of surge earned that day (part of `peak`). */
  surgeShare: number;
  peakTrips: number;
}

export interface BusySurgeWindow {
  day: string;
  window: string;
  area: string;
  multiplier: number;
}

export interface DriverWeeklyEarnings {
  driverId: string;
  weekLabel: string;
  days: DailyEarnings[];
  busiestSurgeTimes: BusySurgeWindow[];
}
