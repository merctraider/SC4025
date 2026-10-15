/**
 * ============================================================
 *  MOCK DATA — replace with the team's final mock data spec.
 * ============================================================
 * Everything the app shows comes from this folder. Keep the shapes in
 * types.ts stable (or update them in one PR) so features don't break.
 * The reference scenario (trip t1 + scenario evening-peak-cbd) is the default.
 */
import { demandScenarios } from './demandScenarios';
import { drivers } from './drivers';
import { driverWeeklyEarnings } from './driverWeeklyEarnings';
import { riders } from './riders';
import { trips } from './trips';

export * from './types';
export { trips, DEFAULT_TRIP_ID } from './trips';
export { drivers, DEFAULT_DRIVER_ID } from './drivers';
export { riders, DEFAULT_RIDER_ID } from './riders';
export { demandScenarios } from './demandScenarios';
export { driverWeeklyEarnings } from './driverWeeklyEarnings';
export { rideOptions } from './rideOptions';

function mustFind<T extends { id: string }>(list: T[], id: string, kind: string): T {
  const found = list.find((x) => x.id === id);
  if (!found) throw new Error(`Mock data: no ${kind} with id "${id}"`);
  return found;
}

export const getTrip = (id: string) => mustFind(trips, id, 'trip');
export const getDriver = (id: string) => mustFind(drivers, id, 'driver');
export const getRider = (id: string) => mustFind(riders, id, 'rider');
export const getDemandScenario = (id: string) => mustFind(demandScenarios, id, 'demand scenario');
export const getWeeklyEarnings = (driverId: string) => {
  const found = driverWeeklyEarnings.find((w) => w.driverId === driverId);
  return found ?? driverWeeklyEarnings[0];
};
