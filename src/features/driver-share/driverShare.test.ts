import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { COMMISSION_RATE_PLACEHOLDER } from '../../config/businessRules';
import { driverWeeklyEarnings, trips } from '../../data';
import { calculateDriverEarnings, calculateFare, formatMoney, roundMoney } from '../../lib';
import { summarizeWeeklyEarnings } from '../../lib/driverWeeklyEarnings';
import { AppStateContext } from '../../state/context';
import { defaultState } from '../../state/defaults';
import type { AppState } from '../../state/types';
import { BusiestSurgeTimes, SurgeShareCard, TripEarningsCard, WeeklySummary } from './index';
import { WeeklyEarningsChart } from './WeeklyEarningsChart';

function renderFeature(element: ReactElement, overrides: Partial<AppState> = {}) {
  const noop = () => {};
  return renderToStaticMarkup(
    createElement(
      AppStateContext.Provider,
      {
        value: {
          ...defaultState(),
          ...overrides,
          update: noop,
          selectTrip: noop,
          finishTrip: noop,
          resetDemo: noop,
        },
      },
      element,
    ),
  );
}

describe('F4 trip earnings presentation', () => {
  it('renders the booking fare, rounded 90% share and accessible split bar', () => {
    const html = renderFeature(createElement(SurgeShareCard));
    for (const text of [
      'S$31.36',
      'S$8.96',
      'S$8.06',
      'You keep 90% of every surge',
      'Uber · 10%',
    ]) {
      expect(html).toContain(text);
    }
    expect(html).toContain('aria-valuenow="90"');
    expect(html).toContain('Surge split: you 90%, Uber 10%');
  });

  it('shows commission only on the non-surge fare and includes the surge share in net pay', () => {
    const html = renderFeature(createElement(TripEarningsCard));
    for (const text of [
      'S$22.40',
      '−S$5.60',
      'S$8.06',
      'S$24.86',
      '25% commission is a demo assumption',
    ]) {
      expect(html).toContain(text);
    }
    expect(html).toContain('Commission applies only to the fare before surge.');
  });

  it('omits the surge earnings row when surge is off', () => {
    const html = renderFeature(createElement(TripEarningsCard), { surgeOn: false });
    expect(html).toContain('S$16.80');
    expect(html).not.toContain('Your surge share');
  });

  it.each(trips)('reconciles earnings for $id across ride types and surge multipliers', (trip) => {
    for (const multiplier of [1, 1.01, 1.4, 2]) {
      for (const rideType of ['UberX', 'UberXL'] as const) {
        const factor = rideType === 'UberXL' ? 1.3 : 1;
        const inputs = {
          baseFare: roundMoney(trip.baseFare * factor),
          distanceAndTime: roundMoney(trip.distanceAndTime * factor),
        };
        const fare = calculateFare(inputs, multiplier);
        const earnings = calculateDriverEarnings(inputs, multiplier);
        expect(earnings.commission).toBe(roundMoney(fare.preSurge * COMMISSION_RATE_PLACEHOLDER));
        expect(earnings.surgeShare).toBe(roundMoney(fare.surgeAmount * 0.9));
        expect(earnings.total).toBe(
          roundMoney(fare.preSurge - earnings.commission + earnings.surgeShare),
        );
        const html = renderFeature(createElement(TripEarningsCard), {
          tripId: trip.id,
          rideType,
          multiplier,
        });
        expect(html).toContain(formatMoney(earnings.total));
      }
    }
  });
});

describe('F4 weekly presentation', () => {
  it('renders the daily-data aggregates and all seven chart days', () => {
    const html = renderFeature(createElement(WeeklySummary));
    for (const text of ['S$1461.20', 'S$189.50', 'S$770.70', '>39<', 'Demo week · 5–11 Oct 2026']) {
      expect(html).toContain(text);
    }
    expect(html.match(/<rect /g)).toHaveLength(14);
    expect(html).toContain('<div class="sr-only"><table>');
    for (const day of driverWeeklyEarnings[0].days) {
      expect(html).toContain(day.day);
      expect(html).toContain(formatMoney(day.peak));
      expect(html).toContain(formatMoney(day.offPeak));
    }
    expect(html).not.toContain('Stacked bar chart:');
    expect(html).not.toContain('TODO');
  });

  it('renders an empty week without invalid bar dimensions', () => {
    const html = renderToStaticMarkup(
      createElement(WeeklyEarningsChart, {
        days: summarizeWeeklyEarnings([]).days,
      }),
    );
    expect(html).toContain('No earnings recorded this week.');
    expect(html).not.toMatch(/NaN|Infinity/);
    expect(html.match(/height="0"/g)).toHaveLength(14);
  });

  it('scales a high-earnings day to stay inside the chart', () => {
    const html = renderToStaticMarkup(
      createElement(WeeklyEarningsChart, {
        days: summarizeWeeklyEarnings([
          { day: 'Mon', peak: 2000, offPeak: 1000, surgeShare: 100, peakTrips: 25 },
        ]).days,
      }),
    );
    expect(html).toContain('>3000</span>');
    expect(html).toContain('y="0" width="24" height="40"');
    expect(html).not.toMatch(/NaN|Infinity/);
  });

  it('keeps all seven day labels outside the scaling SVG', () => {
    const html = renderToStaticMarkup(
      createElement(WeeklyEarningsChart, {
        days: summarizeWeeklyEarnings(driverWeeklyEarnings[0].days).days,
      }),
    );
    const svg = html.slice(html.indexOf('<svg'), html.indexOf('</svg>'));
    expect(svg).not.toContain('<text');
    const dayLabels = html.slice(html.indexOf('</svg>'), html.indexOf('<table>'));
    for (const day of driverWeeklyEarnings[0].days) {
      expect(dayLabels).toContain(`<span>${day.day}</span>`);
    }
  });

  it('states the same dated demo period for both weekly cards without implying a prior week', () => {
    const summary = renderFeature(createElement(WeeklySummary));
    const busiest = renderFeature(createElement(BusiestSurgeTimes));
    const period = `Demo week · ${driverWeeklyEarnings[0].weekLabel}`;
    expect(summary).toContain(period);
    expect(busiest).toContain(period);
    expect(busiest).toContain('Busiest surge times');
    expect(summary + busiest).not.toMatch(/last week|this week/i);
  });

  it('renders historic surge windows as a readable list with areas and multipliers', () => {
    const html = renderFeature(createElement(BusiestSurgeTimes));
    for (const window of driverWeeklyEarnings[0].busiestSurgeTimes) {
      expect(html).toContain(`${window.day}, ${window.window}`);
      expect(html).toContain(window.area);
    }
    expect(html.match(/<li /g)).toHaveLength(3);
  });
});
