/**
 * F3 · Peak Pickup Promise — bottom sheet used by the R2 "How it works" link and the
 * R5 cancel confirmation. Positions itself against the phone frame, so render it
 * outside FeatureArea (which is `relative`).
 * OWNER: chun1108
 */
import { useEffect, useId, useRef, type ReactNode } from 'react';

export function PromiseSheet({
  title,
  onClose,
  children,
  actions,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Buttons at the bottom of the sheet. */
  actions: ReactNode;
}) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex flex-col gap-3 rounded-t-3xl bg-white px-5 pt-6 pb-6"
      >
        <h2 id={titleId} className="m-0 text-xl font-semibold">
          {title}
        </h2>
        <div className="flex flex-col gap-2.5 text-[15px]">{children}</div>
        <div className="mt-2 flex flex-col gap-3">{actions}</div>
      </div>
    </div>
  );
}
