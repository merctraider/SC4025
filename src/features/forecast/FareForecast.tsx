/**
 * F2 · Fare Forecast — main block on R3.
 * Shows current fare, rule-based forecast ranges with confidence levels,
 * SVG trend chart, and mandatory forecast disclaimer.
 */
import { CardTitle, FeatureArea, Icon, Pill, type IconName, type PillTone } from '../../components';
import { FORECAST_DISCLAIMER } from '../../config/businessRules';
import type { ForecastPoint } from '../../data/types';
import { addMinutes, formatClock, formatMoney, formatMoneyRange } from '../../lib';
import { useBooking } from '../../state';
import { FareTrendChart } from './FareTrendChart';

const confidenceStyle: Record<ForecastPoint['confidence'], { tone: PillTone; icon: IconName }> = {
  High: { tone: 'ok', icon: 'checkCircle' },
  Medium: { tone: 'info', icon: 'info' },
  Low: { tone: 'neutral', icon: 'info' },
};

export function FareForecast() {
  const b = useBooking();

  return (
    <FeatureArea feature="F2" title="Fare forecast" card={false} className="flex flex-col gap-3.5">
      {/* Current Fare */}
      <div className="flex flex-col gap-1">
        <h2 className="m-0 text-[28px] leading-tight font-bold tracking-tight tabular-nums">
          Current fare: {formatMoney(b.fare.total)}
        </h2>
        <span className="text-base text-muted">Estimated fares for this same trip</span>
      </div>

      {/* Forecast Horizons */}
      {b.forecast.map((f) => {
        const style = confidenceStyle[f.confidence];
        const lowerBy = Math.round(b.fare.total - f.low);
        return (
          <div
            key={f.horizonMinutes}
            className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4 shadow-card"
          >
            <CardTitle icon="clock" className="text-base">
              In {f.horizonMinutes} minutes ·{' '}
              {formatClock(addMinutes(b.bookedAt, f.horizonMinutes))}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              <strong className="text-[28px] leading-none font-bold tabular-nums">
                {formatMoneyRange(f.low, f.high)}
              </strong>
              {f.high < b.fare.total && <Icon name="trendDown" className="h-5 w-5 text-ok" />}
              <Pill tone={style.tone} icon={style.icon}>
                {f.confidence} confidence
              </Pill>
            </div>
            <span className="text-[13px] text-muted">
              {lowerBy > 0
                ? `Up to S$${lowerBy} lower than now · estimate`
                : 'Not expected to be lower than now · estimate'}
            </span>
          </div>
        );
      })}

      {/* Mandatory Disclaimer */}
      <p className="m-0 flex items-start gap-2 rounded-2xl border-[1.5px] border-info-edge bg-info-soft px-4 py-3.5 text-[15px] leading-snug text-info">
        <Icon name="info" className="mt-0.5 h-[18px] w-[18px]" />
        {FORECAST_DISCLAIMER}
      </p>

      {/* Dynamic SVG Trend Chart */}
      <FareTrendChart currentFare={b.fare.total} forecast={b.forecast} bookedAt={b.bookedAt} />
    </FeatureArea>
  );
}
