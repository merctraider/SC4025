import type { ReactNode } from 'react';

/** Solid dark chip, e.g. the "1.4×" multiplier. Owner: yeechen630. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-ink px-2 py-0.5 font-mono text-xs text-white">{children}</span>
  );
}

/** Outlined pill, e.g. "SURGE 1.4×" on ride options. Owner: yeechen630. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border-[1.5px] border-peak px-2.5 py-0.5 font-mono text-[11px] text-peak">
      {children}
    </span>
  );
}
