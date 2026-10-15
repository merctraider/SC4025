import type { RideOption } from './types';

export const rideOptions: RideOption[] = [
  { type: 'UberX', seats: 4, fareFactor: 1 },
  // fareFactor for UberXL is a mock guess, not a real Uber rate.
  { type: 'UberXL', seats: 6, fareFactor: 1.3 },
];
