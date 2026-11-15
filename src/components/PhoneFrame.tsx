import type { ReactNode } from 'react';

/**
 * 390×844 phone frame on desktop; full screen on a real phone.
 * On desktop it also draws the status bar and home indicator from the designs
 * (decorative; a real phone already has its own). Owner: yeechen630.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-canvas sm:h-[844px] sm:w-[390px] sm:rounded-[44px] sm:shadow-[0_0_0_10px_#141a2e,0_24px_60px_rgba(0,0,0,0.25)]">
      <div
        aria-hidden="true"
        className="hidden h-11 shrink-0 items-end justify-between px-8 pb-1 text-[14px] font-semibold sm:flex"
      >
        <span>9:41</span>
        <span className="flex items-center gap-1.5 text-[12px]">
          <span className="flex items-end gap-[2px]">
            {[4, 6, 8, 10].map((h) => (
              <span key={h} className="w-[3px] rounded-sm bg-ink" style={{ height: h }} />
            ))}
          </span>
          LTE
          <span className="relative h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-ink p-[1.5px]">
            <span className="block h-full w-full rounded-[1px] bg-ink" />
          </span>
        </span>
      </div>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-1/2 hidden h-[5px] w-32 -translate-x-1/2 rounded-full bg-ink sm:block"
      />
    </div>
  );
}
