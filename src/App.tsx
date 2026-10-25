/**
 * App shell + routes. Owner: Jon Teo (F5).
 * Feature owners should not need to edit this file.
 */
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PhoneFrame } from './components';
import { AppSwitcher, DemoControls } from './demo';
import { TripEarningsPage } from './pages/driver/TripEarningsPage';
import { WeeklyPage } from './pages/driver/WeeklyPage';
import { CompletePage } from './pages/rider/CompletePage';
import { ConfirmedPage } from './pages/rider/ConfirmedPage';
import { CreditPage } from './pages/rider/CreditPage';
import { FarePage } from './pages/rider/FarePage';
import { ForecastPage } from './pages/rider/ForecastPage';
import { TripEntryPage } from './pages/rider/TripEntryPage';
import { WaitingPage } from './pages/rider/WaitingPage';
import { AppStateProvider } from './state';

function Stage() {
  return (
    // Mobile: switcher bar, phone, demo controls stacked in one viewport-high
    // column so nothing floats over the phone's buttons. The phone fills the
    // space between (overriding PhoneFrame's own full-viewport height).
    <div className="flex h-dvh flex-col items-center sm:h-auto sm:min-h-full sm:justify-center sm:gap-5 sm:py-6">
      <div className="flex w-full shrink-0 justify-center border-b border-line bg-white py-2 sm:w-auto sm:border-0 sm:bg-transparent sm:py-0">
        <AppSwitcher />
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col max-sm:*:h-full sm:w-auto sm:flex-none">
        <PhoneFrame>
          <Outlet />
        </PhoneFrame>
      </div>
      <DemoControls />
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Stage />}>
            <Route path="/" element={<Navigate to="/rider" replace />} />
            <Route path="/rider" element={<TripEntryPage />} />
            <Route path="/rider/fare" element={<FarePage />} />
            <Route path="/rider/forecast" element={<ForecastPage />} />
            <Route path="/rider/confirmed" element={<ConfirmedPage />} />
            <Route path="/rider/waiting" element={<WaitingPage />} />
            <Route path="/rider/credit" element={<CreditPage />} />
            <Route path="/rider/complete" element={<CompletePage />} />
            <Route path="/driver" element={<Navigate to="/driver/trip" replace />} />
            <Route path="/driver/trip" element={<TripEarningsPage />} />
            <Route path="/driver/weekly" element={<WeeklyPage />} />
            <Route path="*" element={<Navigate to="/rider" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  );
}
