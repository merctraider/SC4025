# Uber Peak — MVP prototype

Uber Peak is a set of features that make Uber the most transparent and reliable ride-hailing app in Singapore at peak times (whenever surge pricing is active). This repo is the **coded high-fidelity prototype** for the SC4025 group project: a clickable rider app and driver app running entirely on mock data in the browser. No real payments, maps, GPS or Uber APIs.

This is a **skeleton**: routing, shared types, mock data, business rules, shared logic (fully tested) and every screen roughed in from the wireframes. Each feature owner now builds their feature inside their own folder.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173  (opens on /rider)
npm test         # Vitest: fare, driver share, late credit, time helpers
npm run lint     # ESLint (Prettier-compatible)
npm run build    # type-check + production build into dist/
npm run format   # Prettier, whole repo
```

Needs Node 20 or newer. On desktop the app sits inside a 390×844 phone frame for screen recordings; on a real phone it fills the screen.

## Who owns what

| Feature                             | Owner        | Folder                                                                          | Used on            |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------- | ------------------ |
| F1 Surge Fare Breakdown             | sushruth2911 | `src/features/fare-breakdown/`                                                  | R2, R7             |
| F2 Fare Forecast                    | SahnUzall    | `src/features/forecast/`                                                        | R2 (teaser), R3    |
| F3 Peak Pickup Promise              | chun1108     | `src/features/pickup-promise/`                                                  | R2, R4, R5, R6, R7 |
| F4 Driver Surge Share               | jon_paul18   | `src/features/driver-share/`                                                    | D1, D2             |
| F5 Core Booking Flow + app skeleton | Jon Teo      | `src/features/booking/`, `src/pages/`, `src/state/`, `src/demo/`, `src/App.tsx` | R1–R7              |
| Shared UI components + styling      | yeechen630   | `src/components/`, `src/index.css`                                              | everywhere         |

**Where to start:** open your feature folder. Every component begins with a `TODO(<your name>)` comment listing what to build. Turn on **Show feature labels** in Demo controls to see your feature's outline in the app and the in-app `TODO @you` notes. Search the code for your name to find everything assigned to you:

```bash
grep -rn "TODO(sushruth2911" src     # replace with your handle
```

### Rules for working in parallel

- Stay inside your feature folder. Pages in `src/pages/` only _compose_ feature components, so you shouldn't need to edit them. If you do, tell Jon Teo in your PR.
- **Read numbers from `useBooking()`** (`src/state/useBooking.ts`), never recalculate in a component. That's how R2, R7 and D1 always show the same S$31.36 / S$8.96 / S$8.06.
- **Change rules only in `src/config/businessRules.ts`.** New calculation? Add a pure function in `src/lib/` with a test.
- Use the shared UI kit (`src/components/`: `Button`, `Row`, `Card`, `FeatureArea`, `Placeholder`, `Chip`, `Badge`, `ProgressBar`, `BackButton`, `Screen`). Need a new shared component? Ask yeechen630 or add it in a PR they review.
- Colors and fonts are Tailwind theme tokens in `src/index.css` (`text-ink`, `text-muted`, `border-edge`, `bg-fill`, `text-peak`, `text-late`…). Don't hard-code hex values in features.

## Folder structure

```
src/
  config/businessRules.ts   ALL business rules (one file)
  data/                     MOCK DATA — replace with the final mock data spec
    types.ts                shared data types
    trips.ts  drivers.ts  riders.ts  rideOptions.ts
    demandScenarios.ts      multiplier, surge reason, forecast ranges + confidence
    driverWeeklyEarnings.ts peak / off-peak by day, busiest surge times
  lib/                      shared pure functions + Vitest tests (fully implemented)
    fare.ts   credit.ts   money.ts   time.ts   *.test.ts
  state/                    React Context: booking + demo-control state, useBooking()
  components/               shared UI kit (yeechen630)
  features/
    fare-breakdown/         F1  (sushruth2911)
    forecast/               F2  (SahnUzall)
    pickup-promise/         F3  (chun1108)
    driver-share/           F4  (jon_paul18)
    booking/                F5  (Jon Teo)
  pages/
    rider/                  R1–R7 route pages
    driver/                 D1–D2 route pages
  demo/                     Demo controls panel + rider/driver app switcher
  App.tsx                   routes + phone-frame stage
```

## Screens and routes

| Screen               | Route              | Feature blocks                                               |
| -------------------- | ------------------ | ------------------------------------------------------------ |
| R1 Trip entry        | `/rider`           | F5 inputs, map placeholder, ride options with SURGE badge    |
| R2 Fare              | `/rider/fare`      | F1 breakdown, F2 teaser, F3 promise line                     |
| R3 Forecast          | `/rider/forecast`  | F2 ranges, chart placeholder, fare-drop alert                |
| R4 Booking confirmed | `/rider/confirmed` | Driver card, F3 promise + credit tiers                       |
| R5 Waiting           | `/rider/waiting`   | Map placeholder, F3 tracker, driver card                     |
| R6 Credit            | `/rider/credit`    | F3 automatic credit (only reachable when late)               |
| R7 Trip complete     | `/rider/complete`  | F1 repeated, F3 credit line (only if credit applied), rating |
| D1 Trip earnings     | `/driver/trip`     | F4 surge share + split bar, earnings card                    |
| D2 Weekly summary    | `/driver/weekly`   | F4 2×2 stats, chart placeholder, busiest surge times         |

Click-through: R1 → R2 → (R3) → R4 → R5 → R6 (late) or R7 (on time) → R1, and D1 ↔ D2. Use the **Rider app / Driver app** toggle above the phone to switch.

## Demo controls

The collapsible panel in the bottom-right corner works on every screen and writes to shared state (kept in `sessionStorage`, so a page reload keeps your settings):

- **Trip**: the reference trip plus 3 more Singapore trips; switching loads that trip's multiplier and reason.
- **Surge active**, **Multiplier**, **Surge reason**. Turning surge off (multiplier 1.0) hides the surge rows, badges, forecast teaser and pickup promise, because Uber Peak only applies at peak.
- **Pickup outcome**: On time / 7 min late / 12 min late. Sets the R5 tracker status and the minutes used by R5's late button (see changes below).
- **Credits already used this week**: 0, 1 or 2. At 2, R6 shows the weekly-cap message and R7 shows no credit line.
- **Show feature labels**: outlines F1–F4 with the wireframes' blue dashed boxes and tags, shows screen codes (R2 · Fare) and the `TODO` stub notes. Use it when explaining screens in the presentation video; turn it off for the clean prototype.
- **Reset to reference scenario**.

## Business rules

All in `src/config/businessRules.ts`:

- Peak = any time the surge multiplier is above 1.0.
- Pre-surge fare = base fare + distance and time.
- Total fare = pre-surge fare × surge multiplier.
- Surge amount = total fare − pre-surge fare.
- Driver keeps **90%** of the surge amount; Uber keeps 10%.
- Uber's commission applies only to the pre-surge fare: **25% — placeholder, not final** (`COMMISSION_RATE_PLACEHOLDER`).
- All money rounded to 2 decimal places, half up.
- Late-pickup credit: **S$3 if more than 5 min late, S$5 if more than 10 min late** (exactly 5 or 10 min does not step up). Applied only if the ride is completed; none if the rider cancels.
- Credit cap: **2 per rider per week**.
- Surge reasons (exactly five): High demand near you · Few drivers nearby · Rain in your area · Event ending nearby · Peak commute hours.
- Forecast horizons: 15 and 30 minutes, as fare ranges with a High / Medium / Low confidence label.
- Fare-drop alerts expire after 30 minutes.

## Reference scenario (default demo data and unit test)

Raffles Place MRT, Exit H → Jurong East Mall, UberX, evening peak (trip `t1`, scenario `evening-peak-cbd`):

|                                              |                                                                              |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| Base fare + distance and time                | S$3.00 + S$19.40 = **S$22.40** pre-surge                                     |
| Surge                                        | 1.4×, "High demand near you"                                                 |
| Total / surge amount / driver's share        | **S$31.36 / S$8.96 / S$8.06**                                                |
| Driver earnings (25% placeholder commission) | S$22.40 − S$5.60 + S$8.06 = S$24.86                                          |
| Booked / promised                            | 6:36 pm / 6:42 pm (6 min)                                                    |
| Late branch                                  | arrives 6:49 pm (7 min late) → **S$3 credit**, credits used this week 1 of 2 |
| Forecast                                     | in 15 min S$27–30 (Medium), in 30 min S$23–26 (Low)                          |

Tests in `src/lib/*.test.ts` cover this scenario plus the edge cases: exactly 5 and 10 min late, cancelled ride, weekly cap reached, multiplier of 1.0, half-up rounding.

## Mock data

Everything in `src/data/` is mock data and clearly marked as such. When the final mock data spec is ready, replace the arrays but keep the types in `src/data/types.ts` (or change them in one reviewed PR). The reference trip `t1` must stay the default, since the tests use it. Extra trips: Changi T3 → Tampines (1.6×, few drivers), ION Orchard → Bishan (1.8×, rain), Stadium MRT → Punggol (2.0×, event ending). Driver names, plates and UberXL's 1.3× fare factor are invented.

## Changes from the original spec

The build prompt said to follow the team's two artifacts where they differ from it. I read both on 14 Oct 2026 (Chapter 4 PRD doc and the "Uber Peak Wireframes" canvas). Differences, and what the code does:

1. **R5 has two buttons, not one preset-driven button.** The wireframe shows "Driver arrived on time" (→ R7) and a secondary "Demo: driver arrives 7 min late" (→ R6). Built that way. The Demo-controls preset still matters: it sets the tracker status (On track / Late) and whether the late button says 7 or 12 min. The default preset is "On time" so the reference walkthrough matches the wireframe ("On track").
2. **R6** has a map placeholder above the credit block, and its explanation reads "Added to your account when this ride ends. You don't need to do anything." Promised and arrived times share one line ("Promised 6:42 pm · arrived 6:49 pm").
3. **R7** heading is "You've arrived". The repeated F1 breakdown has no separate driver-share row; the surge row reads "Surge (1.4×, 90% to driver)". The F3 line reads "Pickup promise credit added · S$3.00".
4. **R4** fare row reads "Fare (incl. 1.4× surge)".
5. **D1** heading is "Trip completed", with trip times (6:49–7:16 pm on the late branch). The second card's first row is "Base fare + distance and time".
6. **D2** heading is "Your peak week"; the surge stat reads "From surge (your 90%)"; the bottom button is "Back to trips" (→ D1) as well as the back arrow. The wireframe labels the screen "This week" but the card says "Busiest surge times last week"; left as a TODO for jon_paul18.
7. **R3 "Notify me when the fare drops"** returns to R2 (the wireframe links it there; PRD flow 2 says riders return to the fare screen when notified).
8. **Visual style** follows the wireframes: IBM Plex Sans / Mono, near-black primary buttons, blue (#1F5FBF) for Uber Peak features, dashed blue feature boxes (shown via "Show feature labels").
9. **Commission wording.** The PRD (F1) says Uber's commission "applies only to the base fare"; this prompt says "only to the pre-surge fare", and the D1 wireframe applies it to "Base fare + distance and time". The code follows the prompt and the wireframe (pre-surge fare). Worth fixing the PRD wording.
10. **Not in the prompt, from the PRD, left as TODOs:** the in-app notification when a credit is applied (F3), the fare-drop notification (US4, F2), a simple rule-based forecast from mock demand levels (PRD 4.3, F2), and the "driver cancels → rematch, promise measured from the original booking" edge case (PRD 4.4, F3/F5).
11. **Fonts** load from Google Fonts; offline the app falls back to system fonts.

## What's real vs stubbed

Fully implemented: business rules, all calculations in `src/lib` (with tests), mock data, routing, state, demo controls, feature labels, and every number on every screen. Stubbed (look for `TODO(` and `[ … ]` placeholders): maps, the R3 trend chart, the D2 stacked bar chart, the fare-drop alert behaviour, the R5 countdown animation, cancel ride, editable trip entry, and final visual design of each feature block.
