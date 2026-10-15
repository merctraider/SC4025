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
    <div className="flex min-h-full flex-col items-center sm:justify-center sm:gap-5 sm:py-6">
      <div className="hidden sm:block">
        <AppSwitcher />
      </div>
      <PhoneFrame>
        <Outlet />
      </PhoneFrame>
      <div className="fixed top-3 left-1/2 z-40 -translate-x-1/2 sm:hidden">
        <AppSwitcher />
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
