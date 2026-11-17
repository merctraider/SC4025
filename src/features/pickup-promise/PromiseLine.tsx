/**
 * F3 · Peak Pickup Promise — promise card on R2 (before booking), with a
 * "How it works" sheet. Shown only when surge is active, since that is how Uber
 * Peak defines peak (PRD F3, US5).
 * OWNER: chun1108
 */
import { useCallback, useState } from 'react';
import { Button, CheckList, Divider, FeatureArea, Icon, Pill, Row } from '../../components';
import { WEEKLY_CREDIT_CAP } from '../../config/businessRules';
import { formatClock, formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { PromiseSheet } from './PromiseSheet';
import { creditTiersAscending } from './promiseRules';

export function PromiseLine() {
  const b = useBooking();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  if (!b.peak) return null;
  const rules = [
    ...creditTiersAscending.map(
      (t, i) =>
        `More than ${t.minMinutesLate} min late: ${formatMoney(t.credit, { whole: true })} ${i === 0 ? 'ride credit' : 'instead'}`,
    ),
    `Applied after the ride · max ${WEEKLY_CREDIT_CAP} credits/week`,
    'No credit if you cancel',
  ];
  return (
    <>
      <FeatureArea feature="F3" title="Pickup promise" tone="hero" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <Icon name="shield" className="h-5 w-5" />
            Peak Pickup Promise
          </span>
          <Pill tone="onHero" dot>
            Included free
          </Pill>
        </div>
        <div className="flex flex-col gap-1">
          <strong className="text-[28px] leading-tight font-bold tracking-tight">
            Pickup by {formatClock(b.promisedAt)}
          </strong>
          <span className="text-[15px] text-white/80">Fixed when you book during surge.</span>
          {b.isLate && (
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[13px] font-medium text-white">
              <Icon name="clock" className="h-3.5 w-3.5" />
              Demo preset: driver arrives {b.minutesLate} min late ({formatClock(b.arrivedAt)})
            </span>
          )}
        </div>
        <Divider className="bg-white/20" />
        <CheckList items={rules} className="text-[14px] text-white/95" iconClassName="text-white" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 self-start text-sm font-semibold text-white underline underline-offset-2"
        >
          How it works
        </button>
      </FeatureArea>
      {open && (
        <PromiseSheet
          title="Peak pickup promise"
          onClose={close}
          actions={
            <Button onClick={close} arrow={false}>
              Got it
            </Button>
          }
        >
          <p className="m-0">
            When surge pricing is on, we promise a pickup time when you book. If your driver is
            late, you get ride credit automatically after your ride. It's free and there's nothing
            to claim.
          </p>
          {creditTiersAscending.map((t) => (
            <Row
              key={t.minMinutesLate}
              label={`More than ${t.minMinutesLate} min late`}
              value={<strong>{formatMoney(t.credit, { whole: true })} credit</strong>}
            />
          ))}
          <p className="m-0 text-sm text-muted">
            Up to {WEEKLY_CREDIT_CAP} credits per week. No credit if you cancel the ride. If your
            driver cancels, we find you a new one and keep your original promised time.
          </p>
        </PromiseSheet>
      )}
    </>
  );
}
