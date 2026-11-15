/**
 * F3 · Peak Pickup Promise — R6 automatic credit (only when the driver is late).
 * The credit and why it applies, the rules, then the mock in-app notification the
 * rider received (PRD F3: "the rider is notified in-app when credit is applied").
 * OWNER: chun1108
 */
import { Card, CardTitle, CheckList, Divider, FeatureArea, Icon, Row } from '../../components';
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
  const got = b.credit > 0;

  const notes = got
    ? [
        `Your driver arrived more than ${tier?.minMinutesLate ?? creditTiersAscending[0].minMinutesLate} min late.`,
        `${amount} is available toward a future ride.`,
        "This credit does not reduce this trip's fare.",
      ]
    : reason === 'weekly-cap'
      ? [
          `You've already received ${WEEKLY_CREDIT_CAP} pickup credits this week, the most we give per week.`,
          'Your limit resets next week.',
        ]
      : [
          `Credit starts when your driver is more than ${creditTiersAscending[0].minMinutesLate} min late.`,
        ];

  const rules = [
    ...creditTiersAscending.map((t, i) => {
      const next = creditTiersAscending[i + 1];
      const money = formatMoney(t.credit, { whole: true });
      return next
        ? `More than ${t.minMinutesLate}, up to ${next.minMinutesLate} minutes late: ${money} credit`
        : `More than ${t.minMinutesLate} minutes late: ${money} credit${i > 0 ? ' instead' : ''}`;
    }),
    `Max ${WEEKLY_CREDIT_CAP}/week · No credit for rider cancellation`,
  ];

  return (
    <>
      <FeatureArea
        feature="F3"
        title="Automatic credit"
        tone={got ? 'ok' : 'white'}
        className="flex flex-col gap-2"
      >
        <span
          aria-hidden="true"
          className={`mb-1 flex h-14 w-14 items-center justify-center rounded-full ${got ? 'bg-white text-ok' : 'bg-fill text-muted'}`}
        >
          <Icon name={got ? 'gift' : 'clock'} className="h-7 w-7" />
        </span>
        <strong className="text-[28px] leading-tight font-bold tracking-tight">
          {got ? `${formatMoney(b.credit)} ride credit` : 'No credit this time'}
        </strong>
        <span className="text-base text-muted">
          {got
            ? 'Added automatically · No claim needed'
            : reason === 'weekly-cap'
              ? 'Weekly credit limit reached'
              : 'Pickup was within the credit threshold'}
        </span>
        {got && (
          <span className="mt-1 flex items-center gap-1.5 text-[14px] font-medium text-ok">
            <Icon name="checkCircle" className="h-4 w-4" />
            Credit applied to your account
          </span>
        )}
      </FeatureArea>

      <Card className="gap-3.5">
        <CardTitle icon="clock">Your pickup was {b.minutesLate} minutes late</CardTitle>
        <Row label="Promised pickup" value={formatClock(b.promisedAt)} />
        <Row label="Actual pickup" value={formatClock(b.arrivedAt)} />
        <Divider />
        <Row
          label="This week's credits"
          value={`${b.creditsUsedAfterTrip} of ${WEEKLY_CREDIT_CAP}`}
        />
        <div
          role="img"
          aria-label={`${b.creditsUsedAfterTrip} of ${WEEKLY_CREDIT_CAP} weekly credits used`}
          className="flex gap-1.5"
        >
          {Array.from({ length: WEEKLY_CREDIT_CAP }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 flex-1 rounded-full ${i < b.creditsUsedAfterTrip ? 'bg-ok' : 'border-[1.5px] border-edge bg-white'}`}
            />
          ))}
        </div>
      </Card>

      <CheckList items={notes} iconClassName={got ? 'text-ok' : 'text-muted'} />

      <Card>
        <CardTitle icon="shield">Pickup Promise rules</CardTitle>
        <CheckList items={rules} className="text-[14px]" iconClassName="text-peak" />
      </Card>

      {/* Mock in-app notification as the rider saw it */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
          Notification sent
        </span>
        <div
          role="status"
          className="flex items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-lg"
        >
          <ClockIcon className="mt-0.5 h-5 w-5" />
          <div className="flex flex-col text-sm">
            <strong>Uber Peak · now</strong>
            <span>
              {got
                ? `${amount} credit added for your late pickup.`
                : 'Your pickup was late. Weekly credit limit reached.'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
