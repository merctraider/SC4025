/** R4 · Booking confirmed (/rider/confirmed). F3 promise. Page owner: Jon Teo. */
import { Button, Placeholder, Pill, Screen } from '../../components';
import { DriverCard } from '../../features/booking';
import { CancelRideNote, PickupPromiseCard } from '../../features/pickup-promise';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function ConfirmedPage() {
  const b = useBooking();
  return (
    <Screen
      code="R4 / F3 + F5 · Matched state"
      title="Booking confirmed"
      back={{ to: '/rider/fare', label: 'Back to fare' }}
      footer={
        <>
          <Button to="/rider/waiting">Track pickup</Button>
          <CancelRideNote />
        </>
      }
    >
      <Pill tone="ok" icon="checkCircle">
        Driver matched
      </Pill>
      <PickupPromiseCard />
      <Placeholder map label={`Map preview · route to ${b.trip.pickup}`} />
      <DriverCard />
      <div className="flex flex-col gap-1 text-[14px] text-muted">
        <span className="font-medium text-ink">
          {b.rideOption.type} · Booked fare {formatMoney(b.fare.total)}
          {b.peak && ` (incl. ${formatMultiplier(b.multiplier)} surge)`}
        </span>
        <span>Matching is simulated in this prototype.</span>
        {b.peak && (
          <span>Driver cancels? We rematch and keep the original promised pickup time.</span>
        )}
      </div>
    </Screen>
  );
}
