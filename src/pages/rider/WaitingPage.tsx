/**
 * R5 · Waiting (/rider/waiting). F3 tracker. Page owner: Jon Teo.
 *
 * Routing (wireframe): "Driver arrived on time" → R7; "Demo: driver arrives N min
 * late" → R6. N follows the Demo-controls late preset (7 by default, or 12).
 */
import { useNavigate } from 'react-router-dom';
import { Button, Placeholder, Screen } from '../../components';
import { DriverCard } from '../../features/booking';
import { CancelRideNote, PromiseTracker } from '../../features/pickup-promise';
import { PICKUP_OUTCOMES, useAppState, useBooking } from '../../state';

export function WaitingPage() {
  const { pickupOutcome, update } = useAppState();
  const b = useBooking();
  const navigate = useNavigate();
  const latePreset = pickupOutcome === 'onTime' ? 'late7' : pickupOutcome;
  const lateMinutes = PICKUP_OUTCOMES.find((o) => o.id === latePreset)!.minutesLate;

  return (
    <Screen
      code="R5 · Waiting"
      footer={
        <>
          <Button
            onClick={() => {
              update({ pickupOutcome: 'onTime' });
              navigate('/rider/complete');
            }}
          >
            Driver arrived on time
          </Button>
          {b.peak && (
            <Button
              variant="secondary"
              onClick={() => {
                update({ pickupOutcome: latePreset });
                navigate('/rider/credit');
              }}
            >
              Demo: driver arrives {lateMinutes} min late
            </Button>
          )}
          <CancelRideNote />
        </>
      }
    >
      <Placeholder label="Map: driver approaching pickup" grow />
      <PromiseTracker />
      <DriverCard compact />
    </Screen>
  );
}
