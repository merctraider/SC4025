/** R3 · Forecast (/rider/forecast). F2. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { FareDropAlert, FareDropAlertButton, FareForecast } from '../../features/forecast';

export function ForecastPage() {
  return (
    <Screen
      code="R3 / F2 · Wait or book"
      title="Fare forecast"
      back={{ to: '/rider/fare', label: 'Back to fare' }}
      footer={
        <>
          <FareDropAlertButton />
          <Button variant="text" to="/rider/fare">
            Return to current fare
          </Button>
        </>
      }
    >
      <FareForecast />
      <FareDropAlert />
    </Screen>
  );
}
