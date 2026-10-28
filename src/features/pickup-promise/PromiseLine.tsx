/**
 * F3 · Peak Pickup Promise — one-line promise on R2 (before booking).
 * OWNER: chun1108
 *
 * TODO(chun1108):
 *  - Final styling (icon? link to a "How the promise works" sheet?).
 *  - Shown only when surge is active, since that is how Uber Peak defines peak (PRD F3).
 */
import { FeatureArea } from '../../components';
import { useBooking } from '../../state';

export function PromiseLine() {
  const b = useBooking();
  if (!b.peak) return null;
  return (
    <FeatureArea feature="F3" title="Pickup promise" className="py-3.5 text-[15px]">
      Pickup promised in <strong>{b.trip.promisedPickupMinutes} min</strong> or you get credit
    </FeatureArea>
  );
}
