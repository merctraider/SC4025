/**
 * F2 · Fare Forecast — teaser row on R2.
 * OWNER: SahnUzall
 *
 * TODO(SahnUzall):
 *  - Teaser copy rule: currently "Likely to drop in 30 min" if the 30-min range
 *    tops out below the current fare (matches the wireframe). Decide the real
 *    rule (should a confident 15-min drop say "15 min"? what about Low confidence?).
 *  - Hide or change copy when the fare is not expected to drop.
 *  - If a fare-drop alert is set, show it here ("Alert set · expires …").
 */
import { Link } from 'react-router-dom';
import { FeatureArea } from '../../components';
import { useBooking } from '../../state';

export function ForecastTeaser() {
  const b = useBooking();
  if (!b.peak) return null;
  const in30 = b.forecast.find((f) => f.horizonMinutes === 30);
  const text =
    in30 && in30.high < b.fare.total ? 'Likely to drop in 30 min' : 'Unlikely to drop soon';
  return (
    <FeatureArea
      feature="F2"
      title="Forecast"
      className="flex items-center justify-between gap-3 py-3.5"
    >
      <span className="text-[15px]">{text}</span>
      <Link
        to="/rider/forecast"
        className="py-2 text-[15px] font-semibold text-peak hover:text-peak-dark"
      >
        See forecast
      </Link>
    </FeatureArea>
  );
}
