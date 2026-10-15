/**
 * F5 · Core Booking Flow — R1 pickup and destination inputs.
 * OWNER: Jon Teo
 *
 * Both inputs are comboboxes over the mock trips (src/data/trips.ts). Typing
 * filters the list; picking a suggestion selects that trip (same as the trip
 * picker in Demo controls). Leaving a field without picking restores the
 * current trip's value, so the screen never shows a trip we have no data for.
 */
import { useId, useState, type KeyboardEvent } from 'react';
import { trips } from '../../data';
import type { Trip } from '../../data/types';
import { useAppState, useBooking } from '../../state';

type FieldKey = 'pickup' | 'destination';

function matches(trip: Trip, field: FieldKey, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return trip[field].toLowerCase().includes(q);
}

function TripField({
  label,
  field,
  current,
  onPick,
}: {
  label: string;
  field: FieldKey;
  current: Trip;
  onPick: (tripId: string) => void;
}) {
  const id = useId();
  const listId = `${id}-list`;
  // What the rider has typed; null = untouched, show the current trip's value.
  const [draft, setDraft] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const options = trips.filter((t) => matches(t, field, draft ?? ''));

  function close() {
    setOpen(false);
    setDraft(null);
  }

  function pick(trip: Trip) {
    onPick(trip.id);
    close();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && open && options[active]) {
      e.preventDefault();
      pick(options[active]);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  }

  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
      </label>
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && options[active] ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        value={draft ?? current[field]}
        onChange={(e) => {
          setDraft(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => {
          setActive(0);
          setOpen(true);
        }}
        onBlur={close}
        onKeyDown={onKeyDown}
        className="min-h-12 rounded-xl border-[1.5px] border-edge px-3.5 text-base text-ink outline-none focus:border-ink"
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute top-full right-0 left-0 z-20 m-0 mt-1 flex list-none flex-col overflow-hidden rounded-xl border-[1.5px] border-edge bg-white p-0 shadow-lg"
        >
          {options.length === 0 ? (
            <li className="px-3.5 py-3 text-sm text-muted">
              No matching trips in this demo. Try “Raffles” or “Changi”.
            </li>
          ) : (
            options.map((t, i) => (
              <li
                key={t.id}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                // mousedown, not click: fires before the input's blur closes the list
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(t);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex min-h-12 cursor-pointer flex-col justify-center gap-0.5 px-3.5 py-2 ${i > 0 ? 'border-t border-line' : ''} ${i === active ? 'bg-fill' : ''}`}
              >
                <span className="text-[15px] text-ink">{t[field]}</span>
                <span className="text-[12px] text-muted">
                  {t.pickup} → {t.destination}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export function TripEntryForm() {
  const b = useBooking();
  const { selectTrip } = useAppState();
  return (
    <div className="flex flex-col gap-2.5">
      <TripField label="Pickup" field="pickup" current={b.trip} onPick={selectTrip} />
      <TripField label="Destination" field="destination" current={b.trip} onPick={selectTrip} />
    </div>
  );
}
