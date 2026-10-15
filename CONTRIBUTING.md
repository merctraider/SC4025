# Contributing

Six people, one repo, one week. These rules keep us out of each other's way.

## Branches: one per feature

Branch off `main`, named after your feature:

| Owner        | Branch                      |
| ------------ | --------------------------- |
| sushruth2911 | `feature/f1-fare-breakdown` |
| SahnUzall    | `feature/f2-forecast`       |
| chun1108     | `feature/f3-pickup-promise` |
| jon_paul18   | `feature/f4-driver-share`   |
| Jon Teo      | `feature/f5-booking`        |
| yeechen630   | `feature/ui-components`     |

Smaller pieces of work can get their own short-lived branch, e.g. `feature/f2-trend-chart`.

```bash
git checkout main && git pull
git checkout -b feature/f1-fare-breakdown
```

Keep your branch fresh: `git pull --rebase origin main` (or merge `main` in) at least once a day.

## Stay in your folder

Edit your own feature folder (see the ownership table in the README). Shared files need a heads-up to their owner in the PR:

- `src/config/businessRules.ts`, `src/state/`, `src/pages/`, `src/App.tsx`, `src/demo/` — Jon Teo
- `src/components/`, `src/index.css` — yeechen630
- `src/data/` — whoever owns the mock data spec; change types in one PR, not piecemeal

## Commits: small, frequent, clear

- Commit whenever something works, even a small step.
- Message = imperative summary under ~70 characters, prefixed with the feature:
  - `F1: show surge reason chip next to multiplier`
  - `F3: animate promise tracker on a mock clock`
  - `UI: add Toggle component`
  - `Data: add 2 more weekday commute trips`
- One idea per commit. Don't mix formatting changes with logic.

## Pull requests into `main`

1. Before opening the PR, run all four and fix anything red:
   ```bash
   npm run lint && npm test && npm run build && npm run dev
   ```
   Then click through R1 → R7 and D1 ↔ D2 with Demo controls on the reference scenario.
2. Open a PR into `main`. In the description: what changed, a screenshot of your screen(s) (turn on "Show feature labels"), and anything you changed outside your folder.
3. **At least one teammate reviews and approves** before merging. Reviewers: check the reference numbers still show (S$31.36, S$8.96, S$8.06, S$3 credit at 7 min late) and that nothing outside the feature folder changed without a reason.
4. Squash-merge or merge, then delete the branch.

Never push directly to `main`.

## Code conventions

- TypeScript strict, no `any`.
- Numbers on screens come from `useBooking()`; rules come from `src/config/businessRules.ts`.
- New calculation → pure function in `src/lib/` + a Vitest test.
- Style with Tailwind classes and the theme tokens in `src/index.css`; reuse `src/components/`.
- Accessible by default: real `<button>` / `<a>` elements, `aria-label` on icon-only buttons, 44px+ touch targets.
- Prettier formats everything (`npm run format`). ESLint must pass.
- Delete your `TODO(...)` comment and `<StubNote>` when you finish that piece.
