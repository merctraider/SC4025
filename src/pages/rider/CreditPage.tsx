/** R6 · Credit (/rider/credit). Only reachable when the driver is late. Page owner: Jon Teo. */
import { Navigate } from 'react-router-dom';
import { Button, Placeholder, Screen } from '../../components';
import { LateCreditCard } from '../../features/pickup-promise';
import { useBooking } from '../../state';

export function CreditPage() {
  const b = useBooking();
  if (!b.isLate || !b.peak) return <Navigate to="/rider/complete" replace />;
  return (
    <Screen
      code="R6 · Credit notification"
      footer={<Button to="/rider/complete">Start ride</Button>}
    >
      <Placeholder label="Map: driver at pickup" className="h-[220px] shrink-0" />
      <LateCreditCard />
    </Screen>
  );
}
