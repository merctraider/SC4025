/**
 * F2 · Fare Forecast — main block on R3.
 * Shows current fare, rule-based forecast ranges with confidence levels,
 * SVG trend chart, and mandatory forecast disclaimer.
 */
import { Divider, FeatureArea } from '../../components';
import { FORECAST_DISCLAIMER } from '../../config/businessRules';
import { formatMoney, formatMoneyRange } from '../../lib';
import { useBooking } from '../../state';
import { FareTrendChart } from './FareTrendChart';

export function FareForecast() {
  const b = useBooking();

  return (
    <FeatureArea feature="F2" title="Fare forecast" className="flex flex-col gap-3.5">
      {/* Current Fare */}
      <div className="flex items-baseline justify-between">
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-ink">Now</span>
          <span className="text-xs text-muted">Current peak rate</span>
        </div>
        <strong className="text-xl tabular-nums text-ink">{formatMoney(b.fare.total)}</strong>
      </div>

      {/* Forecast Horizons */}
      {b.forecast.map((f) => {
        const isConfident = f.confidence === 'High';
        const isMed = f.confidence === 'Medium';
        const badgeColor = isConfident
          ? 'bg-ok/10 text-ok'
          : isMed
            ? 'bg-peak/10 text-peak'
            : 'bg-fill text-muted';

        return (
          <div key={f.horizonMinutes} className="flex flex-col gap-3.5">
            <Divider />
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[15px] font-medium text-ink">In {f.horizonMinutes} min</span>
                <span
                  className={`inline-flex w-fit items-center rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${badgeColor}`}
                >
                  {f.confidence} confidence
                </span>
              </div>
              <strong className="text-xl tabular-nums text-ink">
                {formatMoneyRange(f.low, f.high)}
              </strong>
            </div>
          </div>
        );
      })}

      {/* Dynamic SVG Trend Chart */}
      <FareTrendChart currentFare={b.fare.total} forecast={b.forecast} bookedAt={b.bookedAt} />

      {/* Mandatory Disclaimer */}
      <p className="m-0 text-[13px] leading-relaxed text-muted">{FORECAST_DISCLAIMER}</p>
    </FeatureArea>
  );
}
