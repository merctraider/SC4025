/** R3 · Forecast (/rider/forecast). F2. Page owner: Jon Teo. */
import { BackButton, Button, Screen } from '../../components';
import { FareDropAlert, FareForecast } from '../../features/forecast';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function ForecastPage() {
  const b = useBooking();
  return (
    <Screen
      code="R3 · Forecast"
      footer={
        <>
          <FareDropAlert />
          <Button to="/rider/confirmed">Book now · {formatMoney(b.fare.total)}</Button>
        </>
      }
    >
      <BackButton to="/rider/fare" label="Back to fare" />
      <h1 className="m-0 text-[26px] font-semibold">Will the fare drop?</h1>
      <FareForecast />
    </Screen>
  );
}
