/**
 * F2 · Fare Forecast — "Notify me when the fare drops" on R3.
 * Handles scheduling, expiry, cancellation, and simulated in-app fare-drop notification (PRD 4.4 flow 2).
 *
 * FareDropAlert = the alert card in the screen body.
 * FareDropAlertButton = the pinned footer button that sets the alert.
 */
import { Link } from 'react-router-dom';
import { Button, CardTitle, CheckList } from '../../components';
import { FARE_DROP_ALERT_EXPIRY_MIN } from '../../config/businessRules';
import { addMinutes, formatClock, formatMoney } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function FareDropAlert() {
  const { fareAlertSetAt, update } = useAppState();
  const b = useBooking();

  // The alert is set at the booking clock (see FareDropAlertButton).
  const expiryClock = formatClock(
    addMinutes(fareAlertSetAt ?? b.bookedAt, FARE_DROP_ALERT_EXPIRY_MIN),
  );

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
          className="flex flex-col gap-2 rounded-2xl bg-hero p-4 text-white shadow-button"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
              In-app notification
            </span>
            <span className="text-[12px] text-white/75">Just now</span>
          </div>

          <div className="flex flex-col">
            <strong className="text-[17px] font-semibold">
              Fare dropped to {formatMoney(droppedFare)}!
            </strong>
            <p className="m-0 text-[13px] text-white/80">
              Demand eased · {formatMoney(savings)} lower than when you checked.
            </p>
          </div>

          <Link
            to="/rider/fare"
            className="mt-1 flex min-h-11 items-center justify-center rounded-full bg-white px-3 text-center text-sm font-semibold text-peak no-underline transition-colors hover:bg-peak-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book at {formatMoney(droppedFare)} →
          </Link>
        </div>

        {/* Expiry status and Cancel control */}
        <div className="flex items-center justify-between px-1 text-[13px] text-muted">
          <span>Alert expires at {expiryClock}</span>
          <button
            type="button"
            onClick={() => update({ fareAlertSetAt: null })}
            className="min-h-11 cursor-pointer font-semibold text-peak underline underline-offset-2 hover:text-late"
          >
            Cancel alert
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-card">
      <CardTitle icon="bell">Fare-drop alert</CardTitle>
      <CheckList
        items={[
          `Alert when the fare falls below ${formatMoney(b.fare.total)}`,
          `Expires in ${FARE_DROP_ALERT_EXPIRY_MIN} minutes, at ${expiryClock}`,
          'A new fare must be reviewed before booking',
        ]}
      />
    </div>
  );
}

/** Footer action on R3. Hidden once an alert is set. */
export function FareDropAlertButton() {
  const { fareAlertSetAt, update } = useAppState();
  const b = useBooking();
  if (fareAlertSetAt) return null;
  return (
    <Button to="/rider/fare" arrow={false} onClick={() => update({ fareAlertSetAt: b.bookedAt })}>
      Notify me when the fare drops
    </Button>
  );
}
