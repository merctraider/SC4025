/**
 * F3 · Peak Pickup Promise — R5 Waiting tracker.
 * Runs a mock clock from the booking time (1 second = 1 minute): the bar fills up to
 * the promised time, the countdown runs to the promised pickup, and the status turns
 * Late once the promised time passes. When the driver arrives follows the Demo-controls
 * pickup preset. Includes the PRD 4.4 "driver cancels" edge case: Uber rematches and
 * the promise is still measured from the original booking.
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

function minutes(n: number) {
  return `${n} minute${n === 1 ? '' : 's'}`;
}

function TrackerBody({
  promisedMinutes,
  arrivalMinutes,
}: {
  promisedMinutes: number;
  arrivalMinutes: number;
}) {
  const b = useBooking();
  // When a late outcome is selected in Demo controls, initialize to arrival time so the late state is immediately visible.
  const [elapsed, setElapsed] = useState(() => (b.minutesLate > 0 ? arrivalMinutes : 0));
  const [rematched, setRematched] = useState(false);
  const t = trackPickup(elapsed, promisedMinutes, arrivalMinutes);
  const arrived = t.status === 'arrived';

  useEffect(() => {
    if (arrived) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), MOCK_MINUTE_MS);
    return () => window.clearInterval(id);
  }, [arrived]);

  const late = t.minutesLate > 0;
  const toPromise = Math.max(0, promisedMinutes - elapsed);
  const creditSoFar = calculateLateCredit(t.minutesLate, b.creditsUsedBefore, true);
  const headline = arrived
    ? late
      ? `Driver arrived ${minutes(t.minutesLate)} late`
      : 'Your driver is here'
    : late
      ? `${minutes(t.minutesLate)} past promised pickup`
      : `${minutes(toPromise)} to promised pickup`;
  const statusText = arrived ? 'Driver arrived' : late ? 'Running late' : 'Driver on the way';

  return (
    <FeatureArea feature="F3" title="Promise tracker" tone="hero" className="flex flex-col gap-2.5">
      <strong className="text-[26px] leading-tight font-bold tracking-tight">
        Pickup by {formatClock(b.promisedAt)}
      </strong>
      <span className="text-[19px] leading-snug font-semibold tabular-nums">{headline}</span>
      <span className="flex flex-wrap items-center gap-2 text-[15px] text-white/80 tabular-nums">
        Now {formatClock(addMinutes(b.bookedAt, elapsed))} ·{' '}
        <span
          aria-live="polite"
          className={
            late
              ? 'rounded-full bg-white px-2 py-0.5 text-[13px] font-semibold text-late'
              : undefined
          }
        >
          {statusText}
        </span>
      </span>
      <ProgressBar value={t.progress} tone="onHero" label="Time from booking to promised pickup" />
      <div className="flex justify-between gap-2 text-[13px] text-white/80">
        <span>{formatClock(b.bookedAt)} booked</span>
        <span>{formatClock(b.promisedAt)} promised</span>
      </div>
      {creditSoFar > 0 && (
        <p className="m-0 rounded-lg bg-white/15 px-3 py-2 text-[13px]">
          {formatMoney(creditSoFar, { whole: true })} credit will be added after your ride. Nothing
          to claim.
        </p>
      )}
      {rematched ? (
        <p role="status" className="m-0 rounded-lg bg-white/15 px-3 py-2 text-[13px]">
          Your driver cancelled, so we found you a new one. Your pickup is still promised by{' '}
          <strong>{formatClock(b.promisedAt)}</strong>, measured from when you booked.
        </p>
      ) : (
        !arrived && (
          <button
            type="button"
            onClick={() => setRematched(true)}
            className="min-h-11 self-start text-[13px] text-white/85 underline decoration-dotted underline-offset-2"
          >
            Demo: driver cancels
          </button>
        )
      )}
    </FeatureArea>
  );
}
