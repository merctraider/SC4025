import type { ReactNode } from 'react';

/**
 * Label/value row used in every fare and earnings breakdown. Values are
 * semibold, as in the designs. Owner: yeechen630.
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
      <span className={bold || large || muted ? '' : 'text-[#3a4156]'}>{label}</span>
      {value !== undefined && (
        <span className="font-semibold whitespace-nowrap tabular-nums">{value}</span>
      )}
    </div>
  );
}

export function Divider({ className = 'bg-line' }: { className?: string }) {
  return <div className={`h-px ${className}`} />;
}
