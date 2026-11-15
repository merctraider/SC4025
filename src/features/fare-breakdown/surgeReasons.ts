/**
 * F1 · One-line "why" explainer per surge reason (PRD 4.1.6, one line max).
 * Copy only, no business rules. The five reasons live in businessRules.ts.
 */
export const SURGE_REASON_EXPLAINER: Record<string, string> = {
  'High demand near you': 'More people than usual are booking rides around you.',
  'Few drivers nearby': 'Fewer drivers are free in your area right now.',
  'Rain in your area': 'Rain has pushed up ride requests nearby.',
  'Event ending nearby': 'An event nearby just ended, so many people are leaving at once.',
  'Peak commute hours': "It's rush hour, when demand is highest.",
};