/** F3 · credit tiers and rule copy derived from config, shared by R2/R4/R6. OWNER: chun1108 */
import { LATE_CREDIT_TIERS } from '../../config/businessRules';

/** Tiers from smallest threshold up, e.g. [{5, 3}, {10, 5}]. */
export const creditTiersAscending = [...LATE_CREDIT_TIERS].sort(
  (a, z) => a.minMinutesLate - z.minMinutesLate,
);

/** The tier a given lateness falls into, or undefined if not late enough. */
export function tierFor(minutesLate: number) {
  return LATE_CREDIT_TIERS.find((t) => minutesLate > t.minMinutesLate);
}
