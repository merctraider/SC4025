/**
 * F4 · Driver Surge Share — D2 "Earnings by hour" with Mon–Sun day tabs.
 * OWNER: jon_paul18 (UI: yeechen630)
 * Stacked bars per online hour: non-surge fare (grey) + the driver's surge share
 * (indigo). Hours with no online time are gaps. Data is illustrative mock data.
 */
import { useId, useState } from 'react';
import { CheckList } from '../../components';
import { getHourlyEarnings, type DailyEarnings } from '../../data';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

type Day = DailyEarnings['day'];
const DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TICKS = [0, 6, 12, 18, 23];
const SLOT = 12; // viewBox units per hour
const BAR = 8;
const PLOT_H = 120;

const pct = (hour: number) => `${((hour + 0.5) / 24) * 100}%`;

export function HourlyEarningsChart({ defaultDay = 'Fri' }: { defaultDay?: Day }) {
  const b = useBooking();
  const [day, setDay] = useState<Day>(defaultDay);
  const titleId = useId();
  const hours = getHourlyEarnings(b.driver.id).days[day];

  const totals = hours.map((h) => h.nonSurge + h.surgeShare);
  const maximum = Math.max(0, ...totals);
  const ceiling = Math.max(40, Math.ceil(maximum / 20) * 20);
  const peak = hours[totals.indexOf(maximum)];

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white px-4 py-4 shadow-card">
      <div className="flex flex-col gap-1">
        <h2 id={titleId} className="m-0 text-[19px] font-semibold">
          Earnings by hour · {day}
        </h2>
        <p className="m-0 text-[14px] text-muted">Average earnings per online hour (S$/h)</p>
      </div>

      <div role="group" aria-label="Day of week" className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => {
          const on = d === day;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={on}
              onClick={() => setDay(d)}
              className={`flex min-h-11 flex-col items-center justify-center rounded-xl text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak ${on ? 'bg-peak text-white shadow-button' : 'border border-line bg-white text-ink hover:bg-fill'}`}
            >
              {d}
              {on && <span aria-hidden="true" className="mt-0.5 h-1 w-1 rounded-full bg-white" />}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-bar" />
          Non-surge
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-peak" />
          Your surge share
        </span>
      </div>

      {/* Text stays outside the scaling SVG so it keeps its CSS size. */}
      <div className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-1.5">
        <div aria-hidden="true" className="relative mt-5 h-36 text-xs text-muted tabular-nums">
          {[ceiling, ceiling / 2, 0].map((v) => (
            <span
              key={v}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(1 - v / ceiling) * 100}%` }}
            >
              {v}
            </span>
          ))}
        </div>
        <div className="relative mt-5 h-36">
          {peak && (
            <span
              aria-hidden="true"
              className={`absolute -translate-y-full pb-1 text-[12px] font-semibold whitespace-nowrap ${peak.hour >= 19 ? '-translate-x-[85%]' : peak.hour <= 4 ? '-translate-x-[15%]' : '-translate-x-1/2'}`}
              style={{ left: pct(peak.hour), top: `${(1 - maximum / ceiling) * 100}%` }}
            >
              Peak S${Math.round(maximum)}/h
            </span>
          )}
          <svg
            viewBox={`0 0 ${24 * SLOT} ${PLOT_H}`}
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={titleId}
            className="block h-full w-full overflow-visible"
          >
            {[ceiling, ceiling / 2, 0].map((v) => {
              const y = PLOT_H - (v / ceiling) * PLOT_H;
              return (
                <line
                  key={v}
                  x1="0"
                  x2={24 * SLOT}
                  y1={y}
                  y2={y}
                  vectorEffect="non-scaling-stroke"
                  className={v === 0 ? 'stroke-muted' : 'stroke-line'}
                />
              );
            })}
            {hours.map((h) => {
              const x = h.hour * SLOT + (SLOT - BAR) / 2;
              const baseH = (h.nonSurge / ceiling) * PLOT_H;
              const surgeH = (h.surgeShare / ceiling) * PLOT_H;
              return (
                <g key={h.hour}>
                  <title>{`${String(h.hour).padStart(2, '0')}:00 · non-surge ${formatMoney(h.nonSurge)}/h, surge share ${formatMoney(h.surgeShare)}/h`}</title>
                  <rect x={x} y={PLOT_H - baseH} width={BAR} height={baseH} className="fill-bar" />
                  <rect
                    x={x}
                    y={PLOT_H - baseH - surgeH}
                    width={BAR}
                    height={surgeH}
                    className="fill-peak"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <div aria-hidden="true" className="relative col-start-2 mt-1.5 h-4 text-xs text-muted">
          {TICKS.map((t) => (
            <span key={t} className="absolute -translate-x-1/2" style={{ left: pct(t) }}>
              {String(t).padStart(2, '0')}
            </span>
          ))}
        </div>
        <span className="col-start-2 mt-1 text-center text-[13px] text-muted">
          Hour of day (24-hour)
        </span>
      </div>

      <p className="m-0 text-[13px] text-muted">Gaps = no online time · Illustrative hourly data</p>

      <div className="sr-only">
        <table>
          <caption>Average earnings per online hour on {day}, Singapore dollars</caption>
          <thead>
            <tr>
              <th scope="col">Hour</th>
              <th scope="col">Non-surge</th>
              <th scope="col">Your surge share</th>
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h.hour}>
                <th scope="row">{String(h.hour).padStart(2, '0')}:00</th>
                <td>{formatMoney(h.nonSurge)}</td>
                <td>{formatMoney(h.surgeShare)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CheckList
        className="text-[14px] text-[#3a4156]"
        iconClassName="text-peak"
        items={[
          'Compare days and hours to plan your shifts.',
          'Historical earnings do not guarantee future surge.',
          'Peak = surge active, not fixed hours.',
        ]}
      />
    </div>
  );
}
