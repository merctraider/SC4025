import { describe, expect, it } from 'vitest';
import { trackPickup } from './promise';

// Reference trip: booked 6:36 pm, promised 6:42 pm (6 min).
describe('trackPickup', () => {
  it('at booking: no progress, on track', () => {
    expect(trackPickup(0, 6, 6)).toEqual({
      progress: 0,
      minutesAway: 6,
      minutesLate: 0,
      status: 'on-track',
    });
  });

  it('halfway to the promise', () => {
    const t = trackPickup(3, 6, 13);
    expect(t.progress).toBe(0.5);
    expect(t.status).toBe('on-track');
    expect(t.minutesAway).toBe(10);
  });

  it('exactly at the promised time is still on track', () => {
    const t = trackPickup(6, 6, 13);
    expect(t.progress).toBe(1);
    expect(t.minutesLate).toBe(0);
    expect(t.status).toBe('on-track');
  });

  it('reference late branch: past the promise → late, bar stays full', () => {
    const t = trackPickup(8, 6, 13);
    expect(t.progress).toBe(1);
    expect(t.minutesLate).toBe(2);
    expect(t.minutesAway).toBe(5);
    expect(t.status).toBe('late');
  });

  it('reference late branch: arrives 7 min late (6:49 pm)', () => {
    expect(trackPickup(13, 6, 13)).toEqual({
      progress: 1,
      minutesAway: 0,
      minutesLate: 7,
      status: 'arrived',
    });
  });

  it('on-time driver arrives at the promised time', () => {
    expect(trackPickup(6, 6, 6).status).toBe('arrived');
  });

  it('clamps elapsed time to [0, arrival]', () => {
    expect(trackPickup(-2, 6, 6).progress).toBe(0);
    expect(trackPickup(30, 6, 13)).toEqual(trackPickup(13, 6, 13));
  });
});
