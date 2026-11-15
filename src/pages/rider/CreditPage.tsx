/** R6 · Credit (/rider/credit). Only reachable when the driver is late. Page owner: Jon Teo. */
import { Navigate } from 'react-router-dom';
import { Button, Screen } from '../../components';
import { LateCreditCard } from '../../features/pickup-promise';
import { useBooking } from '../../state';

export function CreditPage() {
  const b = useBooking();
  if (!b.isLate || !b.peak) return <Navigate to="/rider/complete" replace />;
  return (
    <Screen
      code="R6 / F3 · After trip completion"
      title={b.credit > 0 ? 'Credit applied' : 'Late pickup'}
      back={{ to: '/rider/complete', label: 'Back to trip summary' }}
      footer={<Button to="/rider/complete">Back to trip summary</Button>}
    >
      <LateCreditCard />
    </Screen>
  );
}
