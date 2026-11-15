import type { ReactNode } from 'react';
import { useAppState } from '../state';
import { BackButton } from './BackButton';

/**
 * Page wrapper for every screen: header (round back button + title),
 * scrolling content, and a pinned footer for the main actions with the
 * "sample data" caption. `code` (e.g. "R2 / F1 + F3 + F5 · Before booking") is
 * shown only while "Show feature labels" is on. Owner: yeechen630.
 */
export function Screen({
  code,
  title,
  back,
  children,
  footer,
}: {
  code: string;
  title: string;
  back?: { to: string; label: string };
  children: ReactNode;
  /** Pinned to the bottom (primary buttons). */
  footer?: ReactNode;
}) {
  const { showFeatureLabels } = useAppState();
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 pt-16 pb-6 sm:pt-3">
        <header className="flex min-h-11 items-center gap-3">
          {back && <BackButton to={back.to} label={back.label} />}
          <h1 className="m-0 text-[22px] font-semibold tracking-tight">{title}</h1>
        </header>
        {showFeatureLabels && (
          <div className="-mt-2 font-mono text-[11px] tracking-wider text-label uppercase">
            {code}
          </div>
        )}
        {children}
      </div>
      <div className="relative z-10 flex flex-col gap-3 rounded-t-3xl bg-white px-5 pt-5 pb-[68px] shadow-[0_-8px_24px_rgba(20,26,46,0.06)] sm:pb-6">
        {footer}
        <p className="m-0 text-center text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
          Sample trip data · PRD policy rules apply
        </p>
      </div>
    </main>
  );
}
