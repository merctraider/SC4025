import { describe, expect, it } from 'vitest';
import { addMinutes, formatClock, minutesBetween } from './time';
import { formatMoney, formatMoneyRange, formatMultiplier, roundMoney } from './money';

describe('time helpers (reference: booked 6:36 pm, promised 6:42 pm, arrived 6:49 pm)', () => {
  it('adds minutes', () => {
    expect(addMinutes('18:36', 6)).toBe('18:42');
    expect(addMinutes('18:42', 7)).toBe('18:49');
    expect(addMinutes('23:58', 5)).toBe('00:03');
  });
  it('formats 12-hour clock', () => {
    expect(formatClock('18:42')).toBe('6:42 pm');
    expect(formatClock('00:05')).toBe('12:05 am');
    expect(formatClock('12:00')).toBe('12:00 pm');
  });
  it('minutes between', () => {
    expect(minutesBetween('18:36', '18:42')).toBe(6);
    expect(minutesBetween('23:58', '00:03')).toBe(5);
  });
});

describe('money helpers', () => {
  it('rounds and formats', () => {
    expect(roundMoney(1.005)).toBe(1.01);
    expect(roundMoney(-1.005)).toBe(-1.01);
    expect(formatMoney(31.36)).toBe('S$31.36');
    expect(formatMoney(3, { whole: true })).toBe('S$3');
    expect(formatMoney(3)).toBe('S$3.00');
    expect(formatMoneyRange(27, 30)).toBe('S$27–30');
    expect(formatMultiplier(1.4)).toBe('1.4×');
  });
});
