/**
 * F2 · Fare Forecast — "Notify me when the fare drops" on R3.
 * OWNER: SahnUzall
 *
 * TODO(SahnUzall):
 *  - Mock the notification: when the alert is set, show an in-app banner
 *    ("Fare dropped to S$…") that takes the rider back to R2 (PRD 4.4 flow 2).
 *  - Expire the alert after FARE_DROP_ALERT_EXPIRY_MIN (config); show the expiry time.
 *  - Allow cancelling the alert.
 * Current stub: sets `fareAlertSetAt` in shared state and returns to R2, as in the wireframe.
 */
import { Button } from '../../components';
import { FARE_DROP_ALERT_EXPIRY_MIN } from '../../config/businessRules';
import { addMinutes, formatClock } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function FareDropAlert() {
  const { fareAlertSetAt, update } = useAppState();
  const b = useBooking();
  return (
    <div className="flex flex-col gap-1.5">
      <Button
        variant="secondary"
        to="/rider/fare"
        onClick={() => update({ fareAlertSetAt: b.bookedAt })}
      >
        {fareAlertSetAt ? 'Alert set · update it' : 'Notify me when the fare drops'}
      </Button>
      <span className="text-center text-[13px] text-muted">
        {fareAlertSetAt
          ? `Alert expires at ${formatClock(addMinutes(fareAlertSetAt, FARE_DROP_ALERT_EXPIRY_MIN))}`
          : `Alert expires after ${FARE_DROP_ALERT_EXPIRY_MIN} min`}
      </span>
    </div>
  );
}
