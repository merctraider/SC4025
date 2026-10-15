import type { ReactNode } from 'react';

/** Plain bordered card (non-feature content). Owner: yeechen630. */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col gap-2.5 rounded-xl border-[1.5px] border-edge px-4 py-3.5 ${className}`}
    >
      {children}
    </div>
  );
}
