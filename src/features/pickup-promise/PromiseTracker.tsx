/**
 * F3 · Peak Pickup Promise — R5 Waiting tracker.
 * OWNER: chun1108
 *
 * TODO(chun1108):
 *  - Animate the progress bar from booking time to promised time (mock clock).
 *  - "Driver N min away" countdown; switch status to "Late" once past the promised time.
 *  - Status currently follows the Demo-controls pickup preset.
 */
import { FeatureArea, ProgressBar, StubNote } from '../../components';
import { formatClock } from '../../lib';
import { useBooking } from '../../state';

export function PromiseTracker() {
  const b = useBooking();
  if (!b.peak) return null;
  const progress = b.isLate ? 1 : 0.68;
  return (
    <FeatureArea feature="F3" title="Promise tracker" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <strong className="text-[22px]">Driver 2 min away</strong>
        <span className="text-sm text-muted">Promised {formatClock(b.promisedAt)}</span>
      </div>
      <ProgressBar
        value={progress}
        tone={b.isLate ? 'late' : 'peak'}
        label="Time from booking to promised pickup"
      />
      <div className="flex justify-between text-[13px] text-muted">
        <span>Booked {formatClock(b.bookedAt)}</span>
        <span className={b.isLate ? 'font-semibold text-late' : 'text-ok'}>
          {b.isLate ? 'Late' : 'On track'}
        </span>
      </div>
      <StubNote owner="chun1108">animate progress + live countdown on a mock clock</StubNote>
    </FeatureArea>
  );
}
