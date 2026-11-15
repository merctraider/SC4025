/**
 * F2 · Fare Forecast — teaser row on R2.
 * Summarizes the forecast and alert status on the booking fare screen.
 */
import { Link } from 'react-router-dom';
import { FeatureArea, Icon } from '../../components';
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
    <FeatureArea feature="F2" title="Forecast" className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peak-soft text-peak"
      >
        {fareAlertSetAt ? (
          <Icon name="bell" className="h-5 w-5" />
        ) : (
          <Icon name={isDropExpected ? 'trendDown' : 'clock'} className="h-5 w-5" />
        )}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-medium text-ink">{text}</span>
        <Link
          to="/rider/forecast"
          className="flex w-fit items-center gap-1.5 text-[15px] font-semibold text-peak hover:text-peak-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak"
        >
          {fareAlertSetAt ? 'Manage fare-drop alert' : 'Check fare forecast'}
          <Icon name="arrowRight" className="h-4 w-4" />
        </Link>
      </div>
    </FeatureArea>
  );
}
