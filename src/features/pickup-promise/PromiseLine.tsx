/**
 * F3 · Peak Pickup Promise — one-line promise on R2 (before booking), with a
 * "How it works" sheet. Shown only when surge is active, since that is how Uber
 * Peak defines peak (PRD F3, US5).
 * OWNER: chun1108
 */
import { useCallback, useState } from 'react';
import { Button, FeatureArea, Row } from '../../components';
import { WEEKLY_CREDIT_CAP } from '../../config/businessRules';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';
import { ClockIcon } from './ClockIcon';
import { PromiseSheet } from './PromiseSheet';
import { creditTiersAscending } from './promiseRules';

export function PromiseLine() {
  const b = useBooking();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  if (!b.peak) return null;
  return (
    <>
      <FeatureArea
        feature="F3"
        title="Pickup promise"
        className="flex items-center gap-3 py-2 text-[15px]"
      >
        <ClockIcon className="h-5 w-5 text-peak" />
        <span className="flex-1">
          Pickup promised in <strong>{b.trip.promisedPickupMinutes} min</strong> or you get credit
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 shrink-0 text-sm font-semibold text-peak underline underline-offset-2"
        >
          How it works
        </button>
      </FeatureArea>
      {open && (
        <PromiseSheet
          title="Peak pickup promise"
          onClose={close}
          actions={<Button onClick={close}>Got it</Button>}
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
