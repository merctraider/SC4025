/** D1 · Trip earnings (/driver/trip). F4. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { TripSummaryLine } from '../../features/booking';
import { SurgeShareCard, TripEarningsCard } from '../../features/driver-share';
import { formatClock } from '../../lib';
import { useBooking } from '../../state';

export function TripEarningsPage() {
  const b = useBooking();
  return (
    <Screen
      code="D1 · Driver · Trip earnings"
      footer={<Button to="/driver/weekly">See weekly summary</Button>}
    >
      <h1 className="m-0 text-[26px] font-semibold">Trip completed</h1>
      <div className="flex flex-col gap-0.5">
        <TripSummaryLine showRideType={false} />
        <span className="text-sm text-muted">
          {formatClock(b.arrivedAt)}–{formatClock(b.dropOffAt)}
        </span>
      </div>
      {b.peak && <SurgeShareCard />}
      <TripEarningsCard />
    </Screen>
  );
}
