/** D2 · Weekly summary (/driver/weekly). F4. Page owner: Jon Teo. */
import { BackButton, Button, Screen } from '../../components';
import { BusiestSurgeTimes, WeeklySummary } from '../../features/driver-share';

export function WeeklyPage() {
  return (
    <Screen
      code="D2 · Driver · This week"
      footer={<Button to="/driver/trip">Back to trips</Button>}
    >
      <BackButton to="/driver/trip" label="Back to trip earnings" />
      <h1 className="m-0 text-[26px] font-semibold">Your peak week</h1>
      <WeeklySummary />
      <BusiestSurgeTimes />
    </Screen>
  );
}
