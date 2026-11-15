/**
 * F5 · 5-star rating on R7.
 * OWNER: Jon Teo
 */
import { useAppState, useBooking } from '../../state';

export function RatingStars() {
  const { rating, update } = useAppState();
  const { driver } = useBooking();
  const firstName = driver.name.trim().split(/\s+/)[0];
  return (
    <div className="flex flex-col gap-2">
      <h2 className="m-0 text-[17px] font-semibold">How was your ride with {firstName}?</h2>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const on = rating !== null && n <= rating;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              aria-pressed={rating === n}
              onClick={() => update({ rating: n })}
              className={`flex h-12 w-12 items-center justify-center rounded-full text-[30px] leading-none transition-colors hover:bg-white ${on ? 'text-peak' : 'text-muted'}`}
            >
              {on ? '★' : '☆'}
            </button>
          );
        })}
      </div>
      <div className="flex w-[264px] justify-between text-[13px] text-muted">
        <span>1 · Poor</span>
        <span>5 · Excellent</span>
      </div>
      <p className="m-0 text-[13px] text-muted">
        {rating === null
          ? 'Tap a star to rate this demo trip.'
          : `Thanks! You rated this trip ${rating} out of 5.`}
      </p>
    </div>
  );
}
