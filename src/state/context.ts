import { createContext } from 'react';
import type { AppActions, AppState } from './types';

export const AppStateContext = createContext<(AppState & AppActions) | null>(null);
