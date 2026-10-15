import type { ReactNode } from 'react';

/**
 * 390×844 phone frame on desktop; full screen on a real phone.
 * Owner: yeechen630.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-[844px] sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_0_0_10px_#1f1f1f,0_24px_60px_rgba(0,0,0,0.25)]">
      {children}
    </div>
  );
}
