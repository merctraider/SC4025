/** F5 · "Raffles Place MRT → Jurong East Mall · UberX". OWNER: Jon Teo */
import { useBooking } from '../../state';

export function TripSummaryLine({ showRideType = true }: { showRideType?: boolean }) {
  const b = useBooking();
  return (
    <div className="text-sm text-muted">
      {b.trip.pickup} → {b.trip.destination}
      {showRideType && ` · ${b.rideOption.type}`}
    </div>
  );
}
