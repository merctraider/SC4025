import type { DriverHourlyEarnings } from './types';

/**
 * Illustrative hourly earnings for the D2 "Earnings by hour" chart (driver d1),
 * as average S$ per online hour. Mock values for the demo; they are not derived
 * from the daily totals in driverWeeklyEarnings.ts. Hours with no online time
 * are left out, so they show as gaps.
 */
export const driverHourlyEarnings: DriverHourlyEarnings[] = [
  {
    driverId: 'd1',
    days: {
      Mon: [
        { hour: 7, nonSurge: 18, surgeShare: 3 },
        { hour: 8, nonSurge: 20, surgeShare: 5 },
        { hour: 9, nonSurge: 19, surgeShare: 2 },
        { hour: 17, nonSurge: 19, surgeShare: 4 },
        { hour: 18, nonSurge: 21, surgeShare: 8 },
        { hour: 19, nonSurge: 20, surgeShare: 6 },
        { hour: 20, nonSurge: 18, surgeShare: 2 },
      ],
      Tue: [
        { hour: 6, nonSurge: 17, surgeShare: 0 },
        { hour: 7, nonSurge: 19, surgeShare: 4 },
        { hour: 8, nonSurge: 21, surgeShare: 6 },
        { hour: 9, nonSurge: 18, surgeShare: 2 },
        { hour: 17, nonSurge: 20, surgeShare: 5 },
        { hour: 18, nonSurge: 22, surgeShare: 9 },
        { hour: 19, nonSurge: 19, surgeShare: 5 },
      ],
      Wed: [
        { hour: 7, nonSurge: 18, surgeShare: 2 },
        { hour: 8, nonSurge: 20, surgeShare: 4 },
        { hour: 12, nonSurge: 16, surgeShare: 0 },
        { hour: 13, nonSurge: 17, surgeShare: 0 },
        { hour: 18, nonSurge: 20, surgeShare: 6 },
        { hour: 19, nonSurge: 19, surgeShare: 4 },
        { hour: 20, nonSurge: 17, surgeShare: 1 },
      ],
      Thu: [
        { hour: 7, nonSurge: 19, surgeShare: 4 },
        { hour: 8, nonSurge: 21, surgeShare: 7 },
        { hour: 9, nonSurge: 18, surgeShare: 3 },
        { hour: 17, nonSurge: 21, surgeShare: 8 },
        { hour: 18, nonSurge: 23, surgeShare: 12 },
        { hour: 19, nonSurge: 20, surgeShare: 7 },
        { hour: 20, nonSurge: 18, surgeShare: 2 },
      ],
      Fri: [
        { hour: 6, nonSurge: 24, surgeShare: 0 },
        { hour: 7, nonSurge: 20, surgeShare: 6 },
        { hour: 8, nonSurge: 18, surgeShare: 6 },
        { hour: 9, nonSurge: 22, surgeShare: 0 },
        { hour: 16, nonSurge: 18, surgeShare: 0 },
        { hour: 17, nonSurge: 22, surgeShare: 6 },
        { hour: 18, nonSurge: 24, surgeShare: 14 },
        { hour: 19, nonSurge: 20, surgeShare: 14 },
        { hour: 20, nonSurge: 18, surgeShare: 6 },
        { hour: 21, nonSurge: 22, surgeShare: 0 },
      ],
      Sat: [
        { hour: 11, nonSurge: 17, surgeShare: 0 },
        { hour: 12, nonSurge: 18, surgeShare: 2 },
        { hour: 13, nonSurge: 17, surgeShare: 0 },
        { hour: 20, nonSurge: 20, surgeShare: 5 },
        { hour: 21, nonSurge: 22, surgeShare: 9 },
        { hour: 22, nonSurge: 22, surgeShare: 16 },
        { hour: 23, nonSurge: 19, surgeShare: 10 },
      ],
      Sun: [
        { hour: 10, nonSurge: 16, surgeShare: 0 },
        { hour: 11, nonSurge: 17, surgeShare: 0 },
        { hour: 12, nonSurge: 18, surgeShare: 2 },
        { hour: 17, nonSurge: 17, surgeShare: 1 },
        { hour: 18, nonSurge: 18, surgeShare: 3 },
        { hour: 19, nonSurge: 17, surgeShare: 0 },
      ],
    },
  },
];
