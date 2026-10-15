import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppStateContext } from './context';
import { defaultState, stateForTrip } from './defaults';
import type { AppState } from './types';

const STORAGE_KEY = 'uber-peak-demo-state-v1';

function loadState(): AppState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...(JSON.parse(raw) as Partial<AppState>) };
  } catch {
    /* storage unavailable: use defaults */
  }
  return defaultState();
}

/** Owner: Jon Teo (F5). Holds booking state + demo-control state for every screen. */
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const update = useCallback(
    (patch: Partial<AppState>) => setState((s) => ({ ...s, ...patch })),
    [],
  );
  const selectTrip = useCallback(
    (tripId: string) => setState((s) => ({ ...s, ...stateForTrip(tripId), rating: null })),
    [],
  );
  const finishTrip = useCallback(
    () => setState((s) => ({ ...s, rating: null, fareAlertSetAt: null })),
    [],
  );
  const resetDemo = useCallback(
    () => setState((s) => ({ ...defaultState(), demoPanelOpen: s.demoPanelOpen })),
    [],
  );

  const value = useMemo(
    () => ({ ...state, update, selectTrip, finishTrip, resetDemo }),
    [state, update, selectTrip, finishTrip, resetDemo],
  );
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
