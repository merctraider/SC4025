# F4 · Driver Surge Share

The existing driver routes compose these components:

- `/driver/trip`: `SurgeShareCard` and `TripEarningsCard`.
- `/driver/weekly`: `WeeklySummary`, `WeeklyEarningsChart` and `BusiestSurgeTimes`.

Trip amounts come from `useBooking()`, using the shared fare calculations. The
driver keeps 90% of the surge amount, rounded to cents. Commission applies only
to the pre-surge fare. The current **25% is a demo assumption, not an official
Uber policy**; its rate and placeholder flag remain configurable in
`src/config/businessRules.ts`.

Reference reconciliation: S$22.40 pre-surge − S$5.60 commission + S$8.06 surge
share = **S$24.86** earned. The rider pays S$31.36, including S$8.96 surge.

No completed-trip fallback is needed: `useBooking()` supplies `arrivedAt` and
`dropOffAt`. For the wireframe's 6:49–7:16 pm example, select the reference trip
and **7 min late** in Demo controls. The default on-time scenario intentionally
shows 6:42–7:09 pm. Do not substitute fixed timestamps in F4.

Weekly values come from `src/data/driverWeeklyEarnings.ts`. The shared
`getWeeklyEarnings()` selector currently falls back to the default driver's
mock week for drivers without their own data; F4 preserves that scaffold
behavior. This is a fixed demo period, **5–11 Oct 2026**, not live calendar data.
The shared page title “Your peak week” refers to that displayed demo period.
Both the weekly summary and “Busiest surge times” card explicitly show
“Demo week · 5–11 Oct 2026”, from the same `weekLabel` field. The earlier
wireframe wording “last week” is removed because the model supplies no separate
prior-week dataset. The shared “D2 · Driver · This week” annotation is retained
as a wireframe screen code, not a live calendar calculation.

`summarizeWeeklyEarnings()` in `src/lib/driverWeeklyEarnings.ts` supplies both the
stats and chart. It orders Monday–Sunday, fills absent days with zero, combines
duplicate day entries, and sums money in cents. Surge share is already part of
peak earnings and must not be added to the weekly total again. Reference totals:
**S$1461.20** overall, **S$770.70** peak, **S$690.50** off-peak,
**S$189.50** surge share, **39** peak trips.

The lightweight SVG chart uses existing theme tokens and a dynamic shared
scale. Axis and Monday–Sunday labels use HTML text outside the SVG, maintaining
12px text at 320px, 390px and 430px while the seven stacked bars resize. Its
accessible table exposes exact peak/off-peak and total values for each day.
An empty week renders zero-height bars and an explicit empty message.

Enable **Show feature labels** to show the shared screen codes and blue F4 tags
as in wireframe pages 8–9. Those annotations follow the existing demo toggle.
F5-owned routes, page headings, trip details, state and navigation are unchanged.
On viewports below 640px, the existing shared app switcher and floating Demo
controls can overlap the page header and footer. This comes from the shared app
shell, outside F4; changing their placement needs the user's approval for
F5-owned files. F4 cards themselves fit 320px without horizontal overflow.

## Local verification

```sh
npm ci
npm run dev -- --host 127.0.0.1
npm test
npm run lint
npm run build
```

The build includes TypeScript checking. F4 tests are in
`src/features/driver-share/driverShare.test.ts` and
`src/lib/driverWeeklyEarnings.test.ts`; shared fare tests remain in
`src/lib/fare.test.ts`. In the browser, verify D1 → “See weekly summary” → D2 →
“Back to trips”, then test surge off, UberXL and the other demo trips.
