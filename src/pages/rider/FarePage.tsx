/** R2 · Fare (/rider/fare). F1 + F3 promise + F2 teaser. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { FareBreakdown } from '../../features/fare-breakdown';
import { ForecastTeaser } from '../../features/forecast';
import { PromiseLine } from '../../features/pickup-promise';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function FarePage() {
  const b = useBooking();
  return (
    <Screen
      code="R2 / F1 + F3 + F5 · Before booking"
      title="Your fare"
      back={{ to: '/rider', label: 'Back to trip entry' }}
      footer={
        <Button to="/rider/confirmed">
          Book {b.rideOption.type} · {formatMoney(b.fare.total)}
        </Button>
      }
    >
      <FareBreakdown />
      <PromiseLine />
      <ForecastTeaser />
    </Screen>
  );
}
