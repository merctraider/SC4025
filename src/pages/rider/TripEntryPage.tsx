/** R1 · Trip entry (/rider). Composes F5 pieces. Page owner: Jon Teo. */
import { Button, Placeholder, Screen } from '../../components';
import { RideOptions, TripEntryForm } from '../../features/booking';

export function TripEntryPage() {
  return (
    <Screen code="R1 · Trip entry" footer={<Button to="/rider/fare">See fare</Button>}>
      <h1 className="m-0 text-[28px] font-semibold">Where to?</h1>
      <TripEntryForm />
      <Placeholder label="Map placeholder" grow />
      <RideOptions />
    </Screen>
  );
}
