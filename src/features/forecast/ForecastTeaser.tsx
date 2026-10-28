/**
 * F2 · Fare Forecast — teaser row on R2.
 * Summarizes the forecast and alert status on the booking fare screen.
 */
import { Link } from 'react-router-dom';
import { FeatureArea } from '../../components';
import { FARE_DROP_ALERT_EXPIRY_MIN } from '../../config/businessRules';
import { addMinutes, formatClock, getForecastTeaserCopy } from '../../lib';
import { useAppState, useBooking } from '../../state';

export function ForecastTeaser() {
  const b = useBooking();
  const { fareAlertSetAt } = useAppState();

  if (!b.peak) return null;

  const expiryClock = fareAlertSetAt
    ? formatClock(addMinutes(fareAlertSetAt, FARE_DROP_ALERT_EXPIRY_MIN))
    : null;

  const { text, isDropExpected } = getForecastTeaserCopy(b.fare.total, b.forecast, expiryClock);

  return (
    <FeatureArea
      feature="F2"
      title="Forecast"
      className="flex items-center justify-between gap-3 py-3.5"
    >
      <div className="flex items-center gap-2">
        {fareAlertSetAt ? (
          <span className="flex h-2 w-2 rounded-full bg-peak animate-pulse" aria-hidden="true" />
        ) : isDropExpected ? (
          <span className="font-mono text-sm text-peak" aria-hidden="true">
            ▾
          </span>
        ) : null}
        <span className="text-[15px] font-medium text-ink">{text}</span>
      </div>
      <Link
        to="/rider/forecast"
        className="shrink-0 py-1 text-[15px] font-semibold text-peak hover:text-peak-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak"
      >
        {fareAlertSetAt ? 'Manage' : 'See forecast'}
      </Link>
    </FeatureArea>
  );
}
