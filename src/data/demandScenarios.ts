import type { DemandScenario } from './types';

/**
 * Demand scenarios: surge multiplier, reason and forecast ranges.
 * Forecast ranges are hand-written mock values (F2 may replace them with a
 * simple rule-based forecast, per PRD 4.3).
 */
export const demandScenarios: DemandScenario[] = [
  // ⭐ REFERENCE SCENARIO
  {
    id: 'evening-peak-cbd',
    label: 'Evening peak, CBD',
    multiplier: 1.4,
    reason: 'High demand near you',
    forecast: [
      { horizonMinutes: 15, low: 27, high: 30, confidence: 'Medium' },
      { horizonMinutes: 30, low: 23, high: 26, confidence: 'Low' },
    ],
  },
  {
    id: 'late-night-airport',
    label: 'Late-night flights landing',
    multiplier: 1.6,
    reason: 'Few drivers nearby',
    forecast: [
      { horizonMinutes: 15, low: 25, high: 27, confidence: 'High' },
      { horizonMinutes: 30, low: 21, high: 25, confidence: 'Medium' },
    ],
  },
  {
    id: 'afternoon-rain-orchard',
    label: 'Heavy rain, Orchard',
    multiplier: 1.8,
    reason: 'Rain in your area',
    forecast: [
      { horizonMinutes: 15, low: 24, high: 27, confidence: 'Medium' },
      { horizonMinutes: 30, low: 18, high: 23, confidence: 'Low' },
    ],
  },
  {
    id: 'event-ending-sports-hub',
    label: 'Concert ending, Sports Hub',
    multiplier: 2.0,
    reason: 'Event ending nearby',
    forecast: [
      { horizonMinutes: 15, low: 44, high: 49, confidence: 'High' },
      { horizonMinutes: 30, low: 33, high: 40, confidence: 'Medium' },
    ],
  },
];
