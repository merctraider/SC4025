/** D1 · Trip earnings (/driver/trip). F4. Page owner: Jon Teo. */
import { Button, Icon, Pill, Screen } from '../../components';
import { SurgeShareCard, TripEarningsCard } from '../../features/driver-share';
import { formatClock } from '../../lib';
import { useBooking } from '../../state';

export function TripEarningsPage() {
  const b = useBooking();
  return (
    <Screen
      code="D1 / F4 · Driver / Completed trip"
      title="Trip earnings"
      footer={<Button to="/driver/weekly">View weekly earnings</Button>}
    >
      <div className="flex flex-col gap-2">
        <Pill tone="peak" dot>
          Completed trip
        </Pill>
        <h2 className="m-0 flex items-start gap-2 text-[22px] leading-tight font-bold tracking-tight">
          <Icon name="route" className="mt-1 h-6 w-6" />
          <span>
            {b.trip.pickup} → {b.trip.destination}
          </span>
        </h2>
        <span className="text-base text-muted">
          {formatClock(b.bookedAt)} booking · {b.rideOption.type}
        </span>
      </div>
      {b.peak && <SurgeShareCard />}
      <TripEarningsCard />
    </Screen>
  );
}
