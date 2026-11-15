/**
 * F4 · Driver Surge Share — D2 busiest times for the displayed demo week.
 * OWNER: jon_paul18
 * Historical demand windows are supplied by the existing weekly mock data.
 */
import { Card } from '../../components';
import { getWeeklyEarnings } from '../../data';
import { formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

export function BusiestSurgeTimes() {
  const b = useBooking();
  const week = getWeeklyEarnings(b.driver.id);
  return (
    <Card className="gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-[17px] font-semibold">Busiest surge times</h2>
        <p className="m-0 text-[13px] text-muted">Demo week · {week.weekLabel}</p>
      </div>
      {week.busiestSurgeTimes.length > 0 ? (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {week.busiestSurgeTimes.map((w) => (
            <li
              key={`${w.day}-${w.window}-${w.area}`}
              className="flex items-start justify-between gap-3 text-[15px]"
            >
              <div className="min-w-0">
                <span className="font-medium">
                  {w.day}, {w.window}
                </span>
                <span className="block text-[13px] leading-relaxed text-muted">{w.area}</span>
              </div>
              <span
                aria-label={`Surge multiplier ${formatMultiplier(w.multiplier)}`}
                className="shrink-0 rounded-full bg-peak-soft px-2.5 py-1 text-xs font-semibold text-peak"
              >
                {formatMultiplier(w.multiplier)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 text-sm text-muted">No surge times recorded for this demo week.</p>
      )}
    </Card>
  );
}
