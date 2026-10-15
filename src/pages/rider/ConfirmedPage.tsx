/** R4 · Booking confirmed (/rider/confirmed). F3 promise. Page owner: Jon Teo. */
import { Button, Card, Row, Screen } from '../../components';
import { DriverCard } from '../../features/booking';
import { PickupPromiseCard } from '../../features/pickup-promise';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function ConfirmedPage() {
  const b = useBooking();
  return (
    <Screen
      code="R4 · Booking confirmed"
      footer={<Button to="/rider/waiting">Track driver</Button>}
    >
      <h1 className="m-0 text-[26px] font-semibold">Driver found</h1>
      <DriverCard />
      <PickupPromiseCard />
      <Card>
        <Row
          label={b.peak ? `Fare (incl. ${formatMultiplier(b.multiplier)} surge)` : 'Fare'}
          value={<strong>{formatMoney(b.fare.total)}</strong>}
        />
      </Card>
    </Screen>
  );
}
