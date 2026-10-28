/**
 * F3 · Peak Pickup Promise — R5 Waiting tracker.
 * Runs a mock clock from the booking time (1 second = 1 minute): the bar fills up to
 * the promised time, "Driver N min away" counts down, and the status turns Late once
 * the promised time passes. When the driver arrives follows the Demo-controls pickup
 * preset. Includes the PRD 4.4 "driver cancels" edge case: Uber rematches and the
 * promise is still measured from the original booking.
 * OWNER: chun1108
 */
import { useEffect, useState } from 'react';
import { FeatureArea, ProgressBar } from '../../components';
import { addMinutes, calculateLateCredit, formatClock, formatMoney, trackPickup } from '../../lib';
import { useBooking } from '../../state';

/** Real milliseconds per mock minute. */
const MOCK_MINUTE_MS = 1000;

export function PromiseTracker() {
  const b = useBooking();
  if (!b.peak) return null;
  const promisedMinutes = b.trip.promisedPickupMinutes;
  const arrivalMinutes = promisedMinutes + b.minutesLate;
  // Restart the mock clock whenever the trip or the pickup preset changes.
  return (
    <TrackerBody
      key={`${b.trip.id}-${arrivalMinutes}`}
      promisedMinutes={promisedMinutes}
      arrivalMinutes={arrivalMinutes}
    />
  );
}

function TrackerBody({
  promisedMinutes,
  arrivalMinutes,
}: {
  promisedMinutes: number;
  arrivalMinutes: number;
}) {
  const b = useBooking();
  const [elapsed, setElapsed] = useState(0);
  const [rematched, setRematched] = useState(false);
  const t = trackPickup(elapsed, promisedMinutes, arrivalMinutes);
  const arrived = t.status === 'arrived';

  useEffect(() => {
    if (arrived) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), MOCK_MINUTE_MS);
    return () => window.clearInterval(id);
  }, [arrived]);

  const late = t.minutesLate > 0;
  const creditSoFar = calculateLateCredit(t.minutesLate, b.creditsUsedBefore, true);
  const statusText = arrived
    ? late
      ? `Arrived ${t.minutesLate} min late`
      : 'Arrived on time'
    : late
      ? `Late · ${t.minutesLate} min`
      : 'On track';

  return (
    <FeatureArea feature="F3" title="Promise tracker" className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-2">
        <strong className="text-[22px] tabular-nums">
          {arrived ? 'Your driver is here' : `Driver ${t.minutesAway} min away`}
        </strong>
        <span className="text-sm text-muted">Promised {formatClock(b.promisedAt)}</span>
      </div>
      <ProgressBar
        value={t.progress}
        tone={late ? 'late' : 'peak'}
        label="Time from booking to promised pickup"
      />
      <div className="flex justify-between gap-2 text-[13px] text-muted">
        <span>Booked {formatClock(b.bookedAt)}</span>
        <span className="tabular-nums">Now {formatClock(addMinutes(b.bookedAt, elapsed))}</span>
        <span aria-live="polite" className={late ? 'font-semibold text-late' : 'text-ok'}>
          {statusText}
        </span>
      </div>
      {creditSoFar > 0 && (
        <p className="m-0 text-[13px] text-late">
          {formatMoney(creditSoFar, { whole: true })} credit will be added after your ride. Nothing
          to claim.
        </p>
      )}
      {rematched ? (
        <p role="status" className="m-0 rounded-lg bg-fill px-3 py-2 text-[13px]">
          Your driver cancelled, so we found you a new one. Your pickup is still promised by{' '}
          <strong>{formatClock(b.promisedAt)}</strong>, measured from when you booked.
        </p>
      ) : (
        !arrived && (
          <button
            type="button"
            onClick={() => setRematched(true)}
            className="min-h-11 self-start text-[13px] text-muted underline decoration-dotted underline-offset-2"
          >
            Demo: driver cancels
          </button>
        )
      )}
    </FeatureArea>
  );
}
