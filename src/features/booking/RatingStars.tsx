/**
 * F5 · 5-star rating on R7.
 * OWNER: Jon Teo
 */
import { useAppState } from '../../state';

export function RatingStars() {
  const { rating, update } = useAppState();
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span className="text-[15px]">Rate your driver</span>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const on = rating !== null && n <= rating;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              aria-pressed={rating === n}
              onClick={() => update({ rating: n })}
              className={`h-12 w-12 rounded-[10px] border-[1.5px] text-[22px] ${on ? 'border-ink bg-ink text-white' : 'border-edge bg-white text-ink'}`}
            >
              {on ? '★' : '☆'}
            </button>
          );
        })}
      </div>
    </div>
  );
}
