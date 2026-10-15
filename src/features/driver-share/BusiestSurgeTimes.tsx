/**
 * F4 · Driver Surge Share — D2 "Busiest surge times last week" card.
 * OWNER: jon_paul18
 *
 * TODO(jon_paul18): final design; consider linking to a peak-demand heatmap (Could-have).
 */
import { Card } from '../../components';
import { getWeeklyEarnings } from '../../data';
import { formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function BusiestSurgeTimes() {
  const b = useBooking();
  const week = getWeeklyEarnings(b.driver.id);
  return (
    <Card className="gap-1.5">
      <strong className="text-[15px]">Busiest surge times last week</strong>
      {week.busiestSurgeTimes.map((w) => (
        <div key={`${w.day}-${w.window}`} className="flex justify-between text-sm text-muted">
          <span>
            {w.day}, {w.window} · {w.area}
          </span>
          <span className="font-mono">{formatMultiplier(w.multiplier)}</span>
        </div>
      ))}
    </Card>
  );
}
