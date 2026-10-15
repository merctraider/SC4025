import type { ReactNode } from 'react';

/**
 * Label/value row used in every fare and earnings breakdown.
 * Owner: yeechen630.
 */
export function Row({
  label,
  value,
  bold = false,
  muted = false,
  indent = false,
  large = false,
}: {
  label: ReactNode;
  value?: ReactNode;
  bold?: boolean;
  muted?: boolean;
  indent?: boolean;
  large?: boolean;
}) {
  const cls = [
    'flex items-baseline justify-between gap-3',
    large ? 'text-lg' : muted ? 'text-sm' : 'text-[15px]',
    bold || large ? 'font-semibold' : '',
    muted ? 'text-muted' : '',
    indent ? 'pl-3.5' : '',
  ].join(' ');
  return (
    <div className={cls}>
      <span>{label}</span>
      {value !== undefined && <span className="tabular-nums">{value}</span>}
    </div>
  );
}

export function Divider() {
  return <div className="h-px bg-line" />;
}
