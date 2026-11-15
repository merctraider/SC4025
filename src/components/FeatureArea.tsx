import type { ReactNode } from 'react';
import { useAppState } from '../state';
import { cardTones, type CardTone } from './cardTones';

export type FeatureId = 'F1' | 'F2' | 'F3' | 'F4';

/**
 * Wraps one Uber Peak feature block. When "Show feature labels" is on in
 * Demo controls, it adds a blue dashed outline and a tag (e.g.
 * "F1 · SURGE BREAKDOWN") so the video can point at each feature. The outline
 * does not change the layout. Owner: yeechen630.
 */
export function FeatureArea({
  feature,
  title,
  children,
  className = '',
  card = true,
  tone,
}: {
  feature: FeatureId;
  title: string;
  children: ReactNode;
  className?: string;
  /** false = no card surface (the block sits straight on the screen). */
  card?: boolean;
  /** Card surface; defaults to white. Ignored when card is false. */
  tone?: CardTone;
}) {
  const { showFeatureLabels } = useAppState();
  const surface = card ? cardTones[tone ?? 'white'] : '';
  const outline = showFeatureLabels
    ? `outline-2 outline-dashed outline-label ${card ? 'outline-offset-2' : 'rounded-2xl outline-offset-4'}`
    : '';
  return (
    <section
      data-feature={feature}
      aria-label={`${feature} ${title}`}
      className={`relative ${surface} ${outline} ${className}`}
    >
      {showFeatureLabels && (
        <span
          className={`absolute ${card ? '-top-[16px]' : '-top-[24px]'} left-3 z-10 rounded-full bg-label px-2 py-0.5 font-mono text-[11px] text-white uppercase`}
        >
          {feature} · {title}
        </span>
      )}
      {children}
    </section>
  );
}
