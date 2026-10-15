/**
 * Uber Peak business rules: the ONE place to change a number or a rule.
 *
 * Every screen and every function in src/lib reads from here. If the team
 * changes a rule (e.g. the late threshold), change it here and re-run
 * `npm test` to see which expectations move.
 */

export const CURRENCY = 'S$';

/** Peak = any time the surge multiplier is above this value. */
export const PEAK_MULTIPLIER_THRESHOLD = 1.0;

/** Share of the surge amount the driver keeps. Uber keeps the rest (10%). */
export const DRIVER_SURGE_SHARE = 0.9;
export const UBER_SURGE_SHARE = 1 - DRIVER_SURGE_SHARE;

/**
 * Uber's commission on the PRE-SURGE fare only (never on surge).
 * ⚠️ PLACEHOLDER — NOT FINAL. 25% is a stand-in until the team confirms a figure.
 */
export const COMMISSION_RATE_PLACEHOLDER = 0.25;
export const COMMISSION_IS_PLACEHOLDER = true;

/** All money is rounded to this many decimal places, half up. */
export const MONEY_DECIMALS = 2;

/**
 * Late-pickup credit tiers, checked from the top. A tier applies when the
 * driver is MORE THAN `minMinutesLate` late (strictly greater than).
 * Credit is only applied if the ride is completed (none if the rider cancels).
 */
export const LATE_CREDIT_TIERS = [
  { minMinutesLate: 10, credit: 5 },
  { minMinutesLate: 5, credit: 3 },
] as const;

/** Maximum late-pickup credits per rider per week. */
export const WEEKLY_CREDIT_CAP = 2;

/** The only surge reasons the app may show (exactly these five). */
export const SURGE_REASONS = [
  'High demand near you',
  'Few drivers nearby',
  'Rain in your area',
  'Event ending nearby',
  'Peak commute hours',
] as const;
export type SurgeReason = (typeof SURGE_REASONS)[number];

/** Forecast horizons in minutes, each shown as a fare range + confidence label. */
export const FORECAST_HORIZONS_MIN = [15, 30] as const;
export type ForecastHorizon = (typeof FORECAST_HORIZONS_MIN)[number];
export const CONFIDENCE_LEVELS = ['High', 'Medium', 'Low'] as const;
export type Confidence = (typeof CONFIDENCE_LEVELS)[number];

/** A fare-drop alert expires this many minutes after it is set. */
export const FARE_DROP_ALERT_EXPIRY_MIN = 30;

/** Copy that must appear wherever a forecast is shown (PRD 4.1.4 F2). */
export const FORECAST_DISCLAIMER =
  'Forecasts are estimates, not prices. You pay the fare shown when you book.';

/** Multipliers offered in the demo controls. */
export const DEMO_MULTIPLIER_OPTIONS = [1.2, 1.4, 1.6, 1.8, 2.0, 2.5] as const;
