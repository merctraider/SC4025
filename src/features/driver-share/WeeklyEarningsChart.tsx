import { useId } from 'react';
import type { DailyEarnings } from '../../data';
import { formatMoney, roundMoney } from '../../lib';

/** The summary supplies normalized Mon–Sun data, including zero-earnings days. */
export function WeeklyEarningsChart({ days }: { days: readonly DailyEarnings[] }) {
  const titleId = useId();
  const descriptionId = useId();
  const maximum = Math.max(...days.map((day) => roundMoney(day.peak + day.offPeak)), 0);
  const ceiling = Math.max(100, Math.ceil(maximum / 100) * 100);
  const plotHeight = 120;

  return (
    <figure className="m-0 flex min-w-0 flex-col gap-2">
      <figcaption className="text-sm font-medium">Earnings by day, peak vs off-peak</figcaption>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-peak" />
          Peak
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm border border-edge bg-line" />
          Off-peak
        </span>
      </div>
      {/* Keep text outside the scaling SVG so labels retain their CSS font size. */}
      <div className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-x-1 gap-y-2">
        <span aria-hidden="true" className="col-span-2 text-xs text-muted">
          S$
        </span>
        <div aria-hidden="true" className="relative h-36 text-xs text-muted tabular-nums">
          {[ceiling, ceiling / 2, 0].map((value) => (
            <span
              key={value}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(1 - value / ceiling) * 100}%` }}
            >
              {value}
            </span>
          ))}
        </div>
        <svg
          viewBox="0 0 280 120"
          preserveAspectRatio="none"
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
          className="block h-36 w-full overflow-visible"
        >
          <title id={titleId}>Daily driver earnings, Monday to Sunday</title>
          <desc id={descriptionId}>
            Stacked bars in Singapore dollars: blue for peak earnings, grey for off-peak. Surge
            share is included in peak earnings. Exact amounts follow in the data table.
            {maximum === 0 ? ' No earnings recorded this week.' : ''}
          </desc>
          {[ceiling, ceiling / 2, 0].map((value) => {
            const y = plotHeight - (value / ceiling) * plotHeight;
            return (
              <line
                key={value}
                x1="0"
                x2="280"
                y1={y}
                y2={y}
                className="stroke-line"
                aria-hidden="true"
              />
            );
          })}
          {days.map((day, index) => {
            const x = 8 + index * 40;
            const peakHeight = (day.peak / ceiling) * plotHeight;
            const offPeakHeight = (day.offPeak / ceiling) * plotHeight;
            return (
              <g key={day.day}>
                <title>
                  {day.day}: peak {formatMoney(day.peak)}, off-peak {formatMoney(day.offPeak)},
                  total {formatMoney(roundMoney(day.peak + day.offPeak))}
                </title>
                <rect
                  x={x}
                  y={plotHeight - peakHeight}
                  width="24"
                  height={peakHeight}
                  className="fill-peak"
                />
                <rect
                  x={x}
                  y={plotHeight - peakHeight - offPeakHeight}
                  width="24"
                  height={offPeakHeight}
                  className="fill-line"
                />
              </g>
            );
          })}
        </svg>
        <div
          aria-hidden="true"
          className="col-start-2 grid grid-cols-7 text-center text-xs text-muted"
        >
          {days.map((day) => (
            <span key={day.day}>{day.day}</span>
          ))}
        </div>
      </div>
      {maximum === 0 && <p className="m-0 text-xs text-muted">No earnings recorded this week.</p>}
      <div className="sr-only">
        <table>
          <caption>
            Daily earnings in Singapore dollars; surge share is included in peak earnings.
          </caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Peak</th>
              <th scope="col">Off-peak</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.day}>
                <th scope="row">{day.day}</th>
                <td>{formatMoney(day.peak)}</td>
                <td>{formatMoney(day.offPeak)}</td>
                <td>{formatMoney(roundMoney(day.peak + day.offPeak))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
