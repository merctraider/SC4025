/**
 * F2 · Fare Forecast — main block on R3.
 * OWNER: SahnUzall
 *
 * TODO(SahnUzall):
 *  - Replace the chart placeholder with a small trend chart (now → 15 → 30 min).
 *  - Forecast values come from mock data (src/data/demandScenarios.ts). PRD 4.3
 *    asks for "a simple rule-based fare forecast, calculated from mock demand
 *    levels": write it as a pure function in src/lib with tests, so ranges move
 *    when the Demo-controls multiplier changes.
 *  - Always show a range + confidence label, never a single price (PRD 4.1.6).
 *  - Keep the disclaimer (FORECAST_DISCLAIMER in config).
 */
import { Divider, FeatureArea, Placeholder, StubNote } from '../../components';
import { FORECAST_DISCLAIMER } from '../../config/businessRules';
import { formatMoney, formatMoneyRange } from '../../lib';
import { useBooking } from '../../state';

export function FareForecast() {
  const b = useBooking();
  return (
    <FeatureArea feature="F2" title="Fare forecast" className="flex flex-col gap-3.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[15px]">Now</span>
        <strong className="text-xl tabular-nums">{formatMoney(b.fare.total)}</strong>
      </div>
      {b.forecast.map((f) => (
        <div key={f.horizonMinutes} className="flex flex-col gap-3.5">
          <Divider />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[15px]">In {f.horizonMinutes} min</span>
              <span className="font-mono text-[11px] text-muted uppercase">
                {f.confidence} confidence
              </span>
            </div>
            <strong className="text-xl tabular-nums">{formatMoneyRange(f.low, f.high)}</strong>
          </div>
        </div>
      ))}
      <Placeholder label="Fare trend chart: next 30 min" className="h-[120px]" />
      <p className="m-0 text-[13px] text-muted">{FORECAST_DISCLAIMER}</p>
      <StubNote owner="SahnUzall">trend chart + rule-based forecast from demand level</StubNote>
    </FeatureArea>
  );
}
