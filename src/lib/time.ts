import type { ClockTime } from '../data/types';

function toMinutes(t: ClockTime): number {
  const [h, m] = t.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) throw new Error(`Bad clock time "${t}"`);
  return h * 60 + m;
}

function fromMinutes(total: number): ClockTime {
  const wrapped = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function addMinutes(t: ClockTime, minutes: number): ClockTime {
  return fromMinutes(toMinutes(t) + minutes);
}

/** Minutes from a to b (b may be after midnight). */
export function minutesBetween(a: ClockTime, b: ClockTime): number {
  return (((toMinutes(b) - toMinutes(a)) % 1440) + 1440) % 1440;
}

/** "18:42" → "6:42 pm" */
export function formatClock(t: ClockTime): string {
  const total = toMinutes(t);
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}
