import type { ReactNode } from 'react';
import { useAppState } from '../state';

/**
 * Page wrapper for every screen: padding, vertical stack, scroll.
 * `code` (e.g. "R2 · Fare") is shown only while "Show feature labels" is on,
 * like the wireframe annotations. Owner: yeechen630.
 */
export function Screen({
  code,
  children,
  footer,
}: {
  code: string;
  children: ReactNode;
  /** Pinned to the bottom (primary buttons). */
  footer?: ReactNode;
}) {
  const { showFeatureLabels } = useAppState();
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pt-6 pb-4">
        {showFeatureLabels && (
          <div className="font-mono text-[11px] tracking-wider text-muted uppercase">{code}</div>
        )}
        {children}
      </div>
      {footer && <div className="flex flex-col gap-3 px-5 pt-2 pb-6">{footer}</div>}
    </main>
  );
}
