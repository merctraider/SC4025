/** D2 · Weekly summary (/driver/weekly). F4. Page owner: Jon Teo. */
import { Button, Screen } from '../../components';
import { getWeeklyEarnings } from '../../data';
import { BusiestSurgeTimes, HourlyEarningsChart, WeeklySummary } from '../../features/driver-share';
import { useBooking } from '../../state';

export function WeeklyPage() {
  const b = useBooking();
  const week = getWeeklyEarnings(b.driver.id);
  return (
    <Screen
      code="D2 / F4 · Driver / Weekly summary"
      title="Weekly earnings"
      back={{ to: '/driver/trip', label: 'Back to trip earnings' }}
      footer={<Button to="/driver/trip">View latest trip earnings</Button>}
    >
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-[28px] leading-tight font-bold tracking-tight">{week.weekLabel}</h2>
        <span className="text-base text-muted">Completed week · Sample earnings</span>
      </div>
      <WeeklySummary>
        <HourlyEarningsChart />
      </WeeklySummary>
      <BusiestSurgeTimes />
    </Screen>
  );
}
