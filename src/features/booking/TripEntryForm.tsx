/**
 * F5 · Core Booking Flow — R1 pickup and destination inputs.
 * OWNER: Jon Teo
 *
 * TODO(Jon Teo):
 *  - Inputs are prefilled from the selected mock trip and editable but not
 *    wired: typing does not change the trip. Add a suggestion list that picks
 *    one of the mock trips (src/data/trips.ts), or keep them read-only.
 */
import { useBooking } from '../../state';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-1 text-[13px] text-muted">
      {label}
      <input
        defaultValue={value}
        className="min-h-12 rounded-xl border-[1.5px] border-edge px-3.5 text-base text-ink outline-none focus:border-ink"
      />
    </label>
  );
}

export function TripEntryForm() {
  const b = useBooking();
  return (
    // key resets the uncontrolled inputs when the demo trip changes
    <div key={b.trip.id} className="flex flex-col gap-2.5">
      <Field label="Pickup" value={b.trip.pickup} />
      <Field label="Destination" value={b.trip.destination} />
    </div>
  );
}
