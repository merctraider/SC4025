/** Surface styles shared by Card and FeatureArea. Owner: yeechen630. */
export type CardTone = 'white' | 'hero' | 'ok' | 'info' | 'plain';

export const cardTones: Record<CardTone, string> = {
  white: 'rounded-2xl bg-white px-4 py-4 shadow-card',
  hero: 'rounded-2xl bg-hero px-4 py-4 text-white shadow-button',
  ok: 'rounded-2xl bg-ok-soft px-4 py-4',
  info: 'rounded-2xl border-[1.5px] border-info-edge bg-info-soft px-4 py-3.5 text-info',
  plain: '',
};
