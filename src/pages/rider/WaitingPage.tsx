/**
 * R5 · Waiting (/rider/waiting). F3 tracker. Page owner: Jon Teo.
 *
 * Routing (wireframe): "on-time pickup" → R7; "pickup at … (+N min)" → R6.
 * N follows the Demo-controls late preset (7 by default, or 12).
 */
import { useNavigate } from 'react-router-dom';
import { Button, CheckList, Placeholder, Screen } from '../../components';
import { DriverCard } from '../../features/booking';
import { CancelRideNote, PromiseTracker } from '../../features/pickup-promise';
import { addMinutes, formatClock } from '../../lib';
import { PICKUP_OUTCOMES, useAppState, useBooking } from '../../state';

export function WaitingPage() {
  const { pickupOutcome, update } = useAppState();
  const b = useBooking();
  const navigate = useNavigate();
  const latePreset = pickupOutcome === 'onTime' ? 'late7' : pickupOutcome;
  const lateMinutes = PICKUP_OUTCOMES.find((o) => o.id === latePreset)!.minutesLate;
  const lateClock = formatClock(addMinutes(b.promisedAt, lateMinutes));

  return (
    <Screen
      code="R5 / F3 + F5 · Tracking"
      title="Waiting for pickup"
      back={{ to: '/rider/confirmed', label: 'Back to booking confirmed' }}
      footer={
        <>
          <Button
            onClick={() => {
              update({ pickupOutcome: 'onTime' });
              navigate('/rider/complete');
            }}
          >
            Demo: on-time pickup · finish ride
          </Button>
          {b.peak && (
            <Button
              variant="secondary"
              onClick={() => {
                update({ pickupOutcome: latePreset });
                navigate('/rider/credit');
              }}
            >
              {`Demo: pickup at ${lateClock} (+${lateMinutes} min)`}
            </Button>
          )}
          <CancelRideNote />
        </>
      }
    >
      <PromiseTracker />
      <Placeholder map label={`Map preview · driver approaching ${b.trip.pickup}`} />
      <DriverCard compact />
      {b.peak && (
        <CheckList
          className="text-[14px] text-muted"
          iconClassName="text-peak"
          items={[
            'Promise remains fixed if we rematch.',
            'Late arrival is checked at pickup.',
            'Any eligible credit is applied after the ride.',
          ]}
        />
      )}
    </Screen>
  );
}
