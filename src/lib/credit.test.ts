import { describe, expect, it } from 'vitest';
import { calculateLateCredit, noCreditReason } from './credit';

describe('calculateLateCredit', () => {
  it('reference: 7 min late, ride completed, 0 credits used → S$3', () => {
    expect(calculateLateCredit(7, 0, true)).toBe(3);
  });

  it('on time or early → 0', () => {
    expect(calculateLateCredit(0, 0, true)).toBe(0);
    expect(calculateLateCredit(-2, 0, true)).toBe(0);
  });

  it('exactly 5 min late → 0 (must be MORE than 5)', () => {
    expect(calculateLateCredit(5, 0, true)).toBe(0);
  });

  it('just over 5 min late → S$3', () => {
    expect(calculateLateCredit(5.5, 0, true)).toBe(3);
  });

  it('exactly 10 min late → S$3 (must be MORE than 10 for S$5)', () => {
    expect(calculateLateCredit(10, 0, true)).toBe(3);
  });

  it('12 min late → S$5', () => {
    expect(calculateLateCredit(12, 0, true)).toBe(5);
  });

  it('cancelled ride → 0, however late', () => {
    expect(calculateLateCredit(7, 0, false)).toBe(0);
    expect(calculateLateCredit(15, 0, false)).toBe(0);
  });

  it('1 credit used → still eligible', () => {
    expect(calculateLateCredit(7, 1, true)).toBe(3);
  });

  it('weekly cap reached (2 used) → 0', () => {
    expect(calculateLateCredit(7, 2, true)).toBe(0);
    expect(calculateLateCredit(12, 2, true)).toBe(0);
  });
});

describe('noCreditReason', () => {
  it('explains why no credit was given', () => {
    expect(noCreditReason(7, 0, true)).toBeNull();
    expect(noCreditReason(0, 0, true)).toBeNull();
    expect(noCreditReason(7, 0, false)).toBe('cancelled');
    expect(noCreditReason(7, 2, true)).toBe('weekly-cap');
    expect(noCreditReason(5, 0, true)).toBe('not-late-enough');
  });
});
