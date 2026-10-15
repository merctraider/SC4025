/** R7 · Trip complete (/rider/complete). F1 repeat + F3 credit line. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { RatingStars, TripSummaryLine } from '../../features/booking';
import { FareBreakdownSummary } from '../../features/fare-breakdown';
import { CreditLine } from '../../features/pickup-promise';
import { useAppState } from '../../state';

export function CompletePage() {
  const { finishTrip } = useAppState();
  return (
    <Screen
      code="R7 · Trip complete"
      footer={
        <Button to="/rider" onClick={finishTrip}>
          Done
        </Button>
      }
    >
      <h1 className="m-0 text-[26px] font-semibold">You've arrived</h1>
      <TripSummaryLine showRideType={false} />
      <FareBreakdownSummary />
      <CreditLine />
      <RatingStars />
    </Screen>
  );
}
