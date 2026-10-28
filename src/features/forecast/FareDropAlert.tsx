/**
 * F2 · Fare Forecast — "Notify me when the fare drops" on R3.
 * Handles scheduling, expiry, cancellation, and simulated in-app fare-drop notification (PRD 4.4 flow 2).
 */
import { Link } from 'react-router-dom';
import { Button } from '../../components';
import { FARE_DROP_ALERT_EXPIRY_MIN } from '../../config/businessRules';
import { addMinutes, formatClock, formatMoney } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function FareDropAlert() {
  const { fareAlertSetAt, update } = useAppState();
  const b = useBooking();

  const expiryClock = fareAlertSetAt
    ? formatClock(addMinutes(fareAlertSetAt, FARE_DROP_ALERT_EXPIRY_MIN))
    : null;

  // Use the 15-minute low forecast as the simulated dropped fare, formatted to cents
  const in15 = b.forecast.find((f) => f.horizonMinutes === 15);
  const droppedFare = in15 ? in15.low : Math.max(1, Math.round(b.fare.total - 4));
  const savings = Math.max(0, b.fare.total - droppedFare);

  if (fareAlertSetAt) {
    return (
      <div className="flex flex-col gap-2.5">
        {/* Mock In-App Drop Notification Banner (PRD 4.4 flow 2) */}
        <div
          role="alert"
          aria-live="polite"
          className="flex flex-col gap-2 rounded-xl border border-peak/40 bg-peak/5 p-3 text-ink shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-peak uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-peak animate-pulse" />
              In-app notification
            </span>
            <span className="font-mono text-[11px] text-muted">Just now</span>
          </div>

          <div className="flex flex-col">
            <strong className="text-[15px] font-semibold text-ink">
              Fare dropped to {formatMoney(droppedFare)}!
            </strong>
            <p className="m-0 text-xs text-muted">
              Demand eased · {formatMoney(savings)} lower than when you checked.
            </p>
          </div>

          <Link
            to="/rider/fare"
            className="mt-1 flex items-center justify-center rounded-lg bg-peak px-3 py-2 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-peak-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak"
          >
            Book at {formatMoney(droppedFare)} →
          </Link>
        </div>

        {/* Expiry status and Cancel control */}
        <div className="flex items-center justify-between px-1 text-xs text-muted">
          <span>Alert expires at {expiryClock}</span>
          <button
            type="button"
            onClick={() => update({ fareAlertSetAt: null })}
            className="cursor-pointer font-medium text-ink underline hover:text-late"
          >
            Cancel alert
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        variant="secondary"
        to="/rider/fare"
        onClick={() => update({ fareAlertSetAt: b.bookedAt })}
      >
        Notify me when the fare drops
      </Button>
      <span className="text-center text-[13px] text-muted">
        Alert expires after {FARE_DROP_ALERT_EXPIRY_MIN} min
      </span>
    </div>
  );
}
