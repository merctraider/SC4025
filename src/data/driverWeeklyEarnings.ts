import type { DriverWeeklyEarnings } from './types';

/** Weekly earnings for the default driver (d1). Mock values, S$. */
export const driverWeeklyEarnings: DriverWeeklyEarnings[] = [
  {
    driverId: 'd1',
    weekLabel: '5–11 Oct 2026',
    days: [
      { day: 'Mon', peak: 96.4, offPeak: 112.3, surgeShare: 21.6, peakTrips: 5 },
      { day: 'Tue', peak: 104.8, offPeak: 98.5, surgeShare: 24.1, peakTrips: 6 },
      { day: 'Wed', peak: 88.2, offPeak: 120.6, surgeShare: 17.9, peakTrips: 4 },
      { day: 'Thu', peak: 118.5, offPeak: 101.2, surgeShare: 29.4, peakTrips: 6 },
      { day: 'Fri', peak: 162.9, offPeak: 93.7, surgeShare: 46.8, peakTrips: 8 },
      { day: 'Sat', peak: 141.3, offPeak: 84.4, surgeShare: 38.2, peakTrips: 7 },
      { day: 'Sun', peak: 58.6, offPeak: 79.8, surgeShare: 11.5, peakTrips: 3 },
    ],
    busiestSurgeTimes: [
      { day: 'Fri', window: '6–8 pm', area: 'Raffles Place / CBD', multiplier: 1.6 },
      { day: 'Sat', window: '10–11 pm', area: 'Stadium / Kallang', multiplier: 2.0 },
      { day: 'Thu', window: '5:30–7 pm', area: 'Orchard Road', multiplier: 1.5 },
    ],
  },
];
