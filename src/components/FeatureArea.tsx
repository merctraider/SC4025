import type { ReactNode } from 'react';
import { useAppState } from '../state';

export type FeatureId = 'F1' | 'F2' | 'F3' | 'F4';

/**
 * Wraps one Uber Peak feature block. When "Show feature labels" is on in
 * Demo controls, it draws the wireframes' blue dashed outline and a tag
 * (e.g. "F1 · SURGE BREAKDOWN") so the video can point at each feature.
 * When off, it renders as a normal card. Owner: yeechen630.
 */
export function FeatureArea({
  feature,
  title,
  children,
  className = '',
  card = true,
}: {
  feature: FeatureId;
  title: string;
  children: ReactNode;
  className?: string;
  /** false = no card border when labels are off (e.g. a one-line teaser). */
  card?: boolean;
}) {
  const { showFeatureLabels } = useAppState();
  const frame = showFeatureLabels
    ? 'border-2 border-dashed border-peak pt-5'
    : card
      ? 'border-[1.5px] border-edge'
      : 'border-2 border-transparent';
  return (
    <section
      data-feature={feature}
      aria-label={`${feature} ${title}`}
      className={`relative rounded-xl px-4 py-4 ${frame} ${className}`}
    >
      {showFeatureLabels && (
        <span className="absolute -top-[11px] left-3 rounded-full bg-peak px-2 py-0.5 font-mono text-[11px] text-white uppercase">
          {feature} · {title}
        </span>
      )}
      {children}
    </section>
  );
}
