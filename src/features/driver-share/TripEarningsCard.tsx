/**
 * F4 · Driver Surge Share — D1 second card: pre-surge, commission, total earned.
 * OWNER: jon_paul18
 *
 * TODO(jon_paul18): replace the placeholder commission once the team confirms
 * a rate (COMMISSION_RATE_PLACEHOLDER in config).
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
    <Card>
      <Row label="Base fare + distance and time" value={formatMoney(e.preSurge)} />
      <Row
        label={`Less commission (${pct}%${COMMISSION_IS_PLACEHOLDER ? ', placeholder' : ''})`}
        value={`−${formatMoney(e.commission)}`}
      />
      {b.peak && <Row label="Your surge share" value={formatMoney(e.surgeShare)} />}
      <Divider />
      <Row label="You earned" value={formatMoney(e.total)} large />
    </Card>
  );
}
