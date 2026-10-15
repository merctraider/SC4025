import { CURRENCY, MONEY_DECIMALS } from '../config/businessRules';

/**
 * Round to MONEY_DECIMALS places, half up (away from zero for .5).
 * Float-safe, e.g. 22.4 * 1.4 = 31.359999… → 31.36 and 1.005 → 1.01.
 */
export function roundMoney(value: number, decimals: number = MONEY_DECIMALS): number {
  const sign = value < 0 ? -1 : 1;
  const factor = 10 ** decimals;
  // The tiny epsilon catches values like 1.005 that are stored as 1.00499999…
  const rounded = Math.round(Math.abs(value) * factor + 1e-7);
  return (sign * rounded) / factor || 0;
}

/** "S$31.36". Pass { whole: true } for credits like "S$3". */
export function formatMoney(value: number, opts: { whole?: boolean } = {}): string {
  const v = roundMoney(value);
  const text = opts.whole && Number.isInteger(v) ? v.toFixed(0) : v.toFixed(MONEY_DECIMALS);
  return `${CURRENCY}${text}`;
}

/** "S$27–30" for forecast ranges. */
export function formatMoneyRange(low: number, high: number): string {
  return `${CURRENCY}${Math.round(low)}–${Math.round(high)}`;
}

/** "1.4×" */
export function formatMultiplier(multiplier: number): string {
  return `${Number(multiplier.toFixed(2))}×`;
}
