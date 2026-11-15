/** R1 · Trip entry (/rider). Composes F5 pieces. Page owner: Jon Teo. */
import { Button, Placeholder, Screen } from '../../components';
import { RideOptions, TripEntryForm } from '../../features/booking';

export function TripEntryPage() {
  return (
    <Screen
      code="R1 / F5 · Trip entry"
      title="Where to?"
      footer={<Button to="/rider/fare">See fare</Button>}
    >
      <Placeholder map label="Map preview · no live location or GPS" />
      <TripEntryForm />
      <h2 className="m-0 mt-1 text-[19px] font-semibold">Choose a ride</h2>
      <RideOptions />
    </Screen>
  );
}
