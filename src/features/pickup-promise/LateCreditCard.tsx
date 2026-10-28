/**
 * F3 · Peak Pickup Promise — R6 automatic credit (only when the driver is late).
 * OWNER: chun1108
 *
 * TODO(chun1108):
 *  - Final design of the apology + large credit amount.
 *  - Weekly-cap variant (3rd late pickup in a week): copy is a placeholder below.
 *  - Mock in-app notification when credit is applied (PRD F3: "rider is notified").
 */
import { Divider, FeatureArea, Row } from '../../components';
import { WEEKLY_CREDIT_CAP } from '../../config/businessRules';
import { formatClock, formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function LateCreditCard() {
  const b = useBooking();
  return (
    <FeatureArea feature="F3" title="Automatic credit" className="flex flex-col gap-3">
      <h1 className="m-0 text-2xl font-semibold">
        Sorry, your driver was {b.minutesLate} min late
      </h1>
      {b.credit > 0 ? (
        <>
          <div className="text-[40px] leading-none font-semibold">
            {formatMoney(b.credit, { whole: true })} credit
          </div>
          <p className="m-0 text-[15px]">
            Added to your account when this ride ends. You don't need to do anything.
          </p>
        </>
      ) : (
        <p className="m-0 text-[15px]">
          You've already received {WEEKLY_CREDIT_CAP} pickup credits this week, so no credit is
          added for this ride.
        </p>
      )}
      <Divider />
      <Row
        label={`Promised ${formatClock(b.promisedAt)} · arrived ${formatClock(b.arrivedAt)}`}
        muted
      />
      <Row
        label="Credits used this week"
        value={`${b.creditsUsedAfterTrip} of ${WEEKLY_CREDIT_CAP}`}
        muted
      />
    </FeatureArea>
  );
}
