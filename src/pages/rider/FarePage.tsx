/** R2 · Fare (/rider/fare). F1 + F2 teaser + F3 line. Page owner: Jon Teo. */
import { BackButton, Button, Screen } from '../../components';
import { TripSummaryLine } from '../../features/booking';
import { FareBreakdown } from '../../features/fare-breakdown';
import { ForecastTeaser } from '../../features/forecast';
import { PromiseLine } from '../../features/pickup-promise';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function FarePage() {
  const b = useBooking();
  return (
    <Screen
      code="R2 · Fare"
      footer={
        <Button to="/rider/confirmed">
          Book {b.rideOption.type} · {formatMoney(b.fare.total)}
        </Button>
      }
    >
      <BackButton to="/rider" label="Back to trip entry" />
      <TripSummaryLine />
      <FareBreakdown />
      <ForecastTeaser />
      <PromiseLine />
    </Screen>
  );
}
