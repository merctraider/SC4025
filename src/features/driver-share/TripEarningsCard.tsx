/**
 * F4 · Driver Surge Share — D1 second card: pre-surge, commission, total earned.
 * OWNER: jon_paul18
 *
 * The configurable demo commission applies only to the pre-surge fare.
 * Keep the surge share separate so the net earnings visibly reconcile.
 */
import { Card, Divider, Row } from '../../components';
import { COMMISSION_IS_PLACEHOLDER, COMMISSION_RATE_PLACEHOLDER } from '../../config/businessRules';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function TripEarningsCard() {
  const b = useBooking();
  const e = b.driverEarnings;
  const pct = Math.round(COMMISSION_RATE_PLACEHOLDER * 100);
  return (
    <Card className="gap-3">
      <Row label="Base fare + distance and time" value={formatMoney(e.preSurge)} />
      <Row
        label={`Less commission (${pct}%)`}
        value={<span className="whitespace-nowrap">−{formatMoney(e.commission)}</span>}
      />
      {b.peak && <Row label="Your surge share" value={formatMoney(e.surgeShare)} />}
      <Divider />
      <Row label="You earned" value={formatMoney(e.total)} large />
      <p className="m-0 text-xs leading-relaxed text-muted">
        {COMMISSION_IS_PLACEHOLDER && `${pct}% commission is a demo assumption. `}
        Commission applies only to the fare before surge.
      </p>
    </Card>
  );
}
