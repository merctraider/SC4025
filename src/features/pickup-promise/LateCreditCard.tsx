/**
 * F3 · Peak Pickup Promise — R6 automatic credit (only when the driver is late).
 * Starts with a mock in-app notification (PRD F3: "the rider is notified in-app when
 * credit is applied"), then the apology, the credit and why it applies.
 * OWNER: chun1108
 */
import { Divider, FeatureArea, Row } from '../../components';
import { WEEKLY_CREDIT_CAP } from '../../config/businessRules';
import { formatClock, formatMoney, noCreditReason } from '../../lib';
import { useBooking } from '../../state';
import { ClockIcon } from './ClockIcon';
import { creditTiersAscending, tierFor } from './promiseRules';

export function LateCreditCard() {
  const b = useBooking();
  const tier = tierFor(b.minutesLate);
  const reason = noCreditReason(b.minutesLate, b.creditsUsedBefore, true);
  const amount = formatMoney(b.credit, { whole: true });

  return (
    <>
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-lg"
      >
        <ClockIcon className="mt-0.5 h-5 w-5" />
        <div className="flex flex-col text-sm">
          <strong>Uber Peak · now</strong>
          <span>
            {b.credit > 0
              ? `${amount} credit added for your late pickup.`
              : 'Your pickup was late. Weekly credit limit reached.'}
          </span>
        </div>
      </div>
      <FeatureArea feature="F3" title="Automatic credit" className="flex flex-col gap-3">
        <h1 className="m-0 text-2xl font-semibold">
          Sorry, your driver was {b.minutesLate} min late
        </h1>
        {b.credit > 0 ? (
          <>
            <div className="text-[40px] leading-none font-semibold text-peak">{amount} credit</div>
            <p className="m-0 text-[15px]">
              Added to your account when this ride ends. You don't need to do anything.
            </p>
            {tier && (
              <p className="m-0 text-[13px] text-muted">
                Pickups more than {tier.minMinutesLate} min past the promised time get{' '}
                {formatMoney(tier.credit, { whole: true })} credit.
              </p>
            )}
          </>
        ) : reason === 'weekly-cap' ? (
          <p className="m-0 text-[15px]">
            You've already received {WEEKLY_CREDIT_CAP} pickup credits this week, the most we give
            per week, so no credit is added for this ride. Your limit resets next week.
          </p>
        ) : (
          <p className="m-0 text-[15px]">
            Credit starts when your driver is more than {creditTiersAscending[0].minMinutesLate} min
            late, so no credit is added for this ride.
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
    </>
  );
}
