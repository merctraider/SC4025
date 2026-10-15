/**
 * Demo controls — collapsible panel shown on every screen for the presenter.
 * Owner: Jon Teo (F5). Every control writes to shared state (src/state).
 */
import type { ReactNode } from 'react';
import {
  DEMO_MULTIPLIER_OPTIONS,
  SURGE_REASONS,
  WEEKLY_CREDIT_CAP,
  type SurgeReason,
} from '../config/businessRules';
import { trips } from '../data';
import { formatMultiplier } from '../lib';
import { PICKUP_OUTCOMES, useAppState } from '../state';

function Field({
  label,
  children,
  group = false,
}: {
  label: string;
  children: ReactNode;
  /** true for button groups, which must not sit inside a <label>. */
  group?: boolean;
}) {
  const Tag = group ? 'div' : 'label';
  // <label> wraps the control so selects get an accessible name; segmented
  // controls carry their own aria-label.
  return (
    <Tag className="flex flex-col gap-1">
      <span className="font-mono text-[10px] tracking-wider text-muted uppercase">{label}</span>
      {children}
    </Tag>
  );
}

function Segmented<T extends string | number>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="flex overflow-hidden rounded-lg border border-edge"
    >
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={`flex-1 px-2 py-1.5 text-xs whitespace-nowrap ${o.value === value ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-fill'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const selectCls = 'rounded-lg border border-edge bg-white px-2 py-1.5 text-xs disabled:opacity-50';

export function DemoControls() {
  const s = useAppState();
  return (
    <aside
      aria-label="Demo controls"
      className="fixed right-3 bottom-3 z-50 w-[272px] max-w-[calc(100vw-24px)] rounded-xl border border-edge bg-white/95 text-ink shadow-lg backdrop-blur sm:right-5 sm:bottom-5"
    >
      <button
        type="button"
        aria-expanded={s.demoPanelOpen}
        onClick={() => s.update({ demoPanelOpen: !s.demoPanelOpen })}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm font-semibold"
      >
        Demo controls
        <span aria-hidden="true" className="font-mono text-xs text-muted">
          {s.demoPanelOpen ? '▾ hide' : '▸ show'}
        </span>
      </button>
      {s.demoPanelOpen && (
        <div className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto border-t border-line px-3 pt-3 pb-3">
          <Field label="Trip">
            <select
              className={selectCls}
              value={s.tripId}
              onChange={(e) => s.selectTrip(e.target.value)}
            >
              {trips.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <label className="flex items-center justify-between text-sm">
            Surge active
            <input
              type="checkbox"
              checked={s.surgeOn}
              onChange={(e) => s.update({ surgeOn: e.target.checked })}
              className="h-4 w-4 accent-ink"
            />
          </label>

          <div className="grid grid-cols-[88px_1fr] gap-2">
            <Field label="Multiplier">
              <select
                className={selectCls}
                disabled={!s.surgeOn}
                value={s.multiplier}
                onChange={(e) => s.update({ multiplier: Number(e.target.value) })}
              >
                {DEMO_MULTIPLIER_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {formatMultiplier(m)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Surge reason">
              <select
                className={selectCls}
                disabled={!s.surgeOn}
                value={s.reason}
                onChange={(e) => s.update({ reason: e.target.value as SurgeReason })}
              >
                {SURGE_REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Pickup outcome" group>
            <Segmented
              name="Pickup outcome"
              value={s.pickupOutcome}
              onChange={(v) => s.update({ pickupOutcome: v })}
              options={PICKUP_OUTCOMES.map((o) => ({ value: o.id, label: o.label }))}
            />
          </Field>

          <Field label="Credits already used this week" group>
            <Segmented
              name="Credits used this week"
              value={s.creditsUsedThisWeek}
              onChange={(v) => s.update({ creditsUsedThisWeek: v })}
              options={Array.from({ length: WEEKLY_CREDIT_CAP + 1 }, (_, i) => ({
                value: i,
                label: String(i),
              }))}
            />
          </Field>

          <label className="flex items-center justify-between text-sm">
            Show feature labels
            <input
              type="checkbox"
              checked={s.showFeatureLabels}
              onChange={(e) => s.update({ showFeatureLabels: e.target.checked })}
              className="h-4 w-4 accent-peak"
            />
          </label>

          <button
            type="button"
            onClick={s.resetDemo}
            className="self-start text-xs text-muted underline underline-offset-2 hover:text-ink"
          >
            Reset to reference scenario
          </button>
        </div>
      )}
    </aside>
  );
}
