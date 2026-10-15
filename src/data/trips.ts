import type { Trip } from './types';

export const trips: Trip[] = [
  // ⭐ REFERENCE SCENARIO — default demo trip and unit-test fixture. Do not change
  // without updating src/lib/*.test.ts and the README.
  {
    id: 't1',
    label: 'Raffles Place → Jurong East (reference)',
    pickup: 'Raffles Place MRT, Exit H',
    destination: 'Jurong East Mall',
    baseFare: 3.0,
    distanceAndTime: 19.4,
    bookedAt: '18:36',
    promisedPickupMinutes: 6,
    rideDurationMinutes: 27,
    driverId: 'd1',
    demandScenarioId: 'evening-peak-cbd',
  },
  {
    id: 't2',
    label: 'Changi T3 → Tampines (late flights)',
    pickup: 'Changi Airport Terminal 3, Arrival Hall',
    destination: 'Tampines Mall',
    baseFare: 3.0,
    distanceAndTime: 14.2,
    bookedAt: '23:12',
    promisedPickupMinutes: 7,
    rideDurationMinutes: 16,
    driverId: 'd2',
    demandScenarioId: 'late-night-airport',
  },
  {
    id: 't3',
    label: 'ION Orchard → Bishan (rain)',
    pickup: 'ION Orchard, Taxi Stand',
    destination: 'Bishan MRT, Exit B',
    baseFare: 3.0,
    distanceAndTime: 11.8,
    bookedAt: '17:48',
    promisedPickupMinutes: 8,
    rideDurationMinutes: 19,
    driverId: 'd3',
    demandScenarioId: 'afternoon-rain-orchard',
  },
  {
    id: 't4',
    label: 'Sports Hub → Punggol (concert)',
    pickup: 'Stadium MRT, Exit A',
    destination: 'Waterway Point, Punggol',
    baseFare: 3.0,
    distanceAndTime: 21.6,
    bookedAt: '22:41',
    promisedPickupMinutes: 9,
    rideDurationMinutes: 24,
    driverId: 'd4',
    demandScenarioId: 'event-ending-sports-hub',
  },
];

export const DEFAULT_TRIP_ID = 't1';
