/** R7 · Trip complete (/rider/complete). F1 repeat + F3 status. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { RatingStars } from '../../features/booking';
import { FareBreakdownSummary } from '../../features/fare-breakdown';
import { CreditLine } from '../../features/pickup-promise';
import { useAppState, useBooking } from '../../state';

export function CompletePage() {
  const { finishTrip } = useAppState();
  const b = useBooking();
  return (
    <Screen
      code="R7 / F1 + F5 · Summary & rating"
      title="Trip complete"
      back={{ to: '/rider/waiting', label: 'Back to pickup tracking' }}
      footer={
        <>
          {b.peak && b.isLate && (
            <Button variant="secondary" to="/rider/credit">
              View credit notice
            </Button>
          )}
          <Button to="/rider" onClick={finishTrip}>
            Done · Book another trip
          </Button>
        </>
      }
    >
      <FareBreakdownSummary />
      <RatingStars />
      <CreditLine />
    </Screen>
  );
}
