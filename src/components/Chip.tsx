import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

/** Solid dark chip, e.g. the "1.4×" multiplier. Owner: yeechen630. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-ink px-2 py-0.5 font-mono text-xs text-white">{children}</span>
  );
}

/** Small indigo pill, e.g. "1.4× surge" on ride options. Owner: yeechen630. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-peak-soft px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap text-peak">
      {children}
    </span>
  );
}

export type PillTone = 'peak' | 'ok' | 'warn' | 'info' | 'neutral' | 'onHero';

const pillTones: Record<PillTone, string> = {
  peak: 'bg-peak-soft text-peak',
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  info: 'bg-info-soft text-info',
  neutral: 'bg-fill text-muted',
  onHero: 'bg-white/90 text-peak',
};

/**
 * Status pill from the designs ("Driver matched", "High confidence").
 * Pass an icon, or `dot` for the small leading dot. Owner: yeechen630.
 */
export function Pill({
  children,
  tone = 'peak',
  icon,
  dot = false,
}: {
  children: ReactNode;
  tone?: PillTone;
  icon?: IconName;
  dot?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${pillTones[tone]}`}
    >
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {dot && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
