/** Rider app / Driver app toggle above the phone frame. Owner: Jon Teo (F5). */
import { NavLink, useLocation } from 'react-router-dom';

export function AppSwitcher() {
  const { pathname } = useLocation();
  const driver = pathname.startsWith('/driver');
  const cls = (on: boolean) =>
    `rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap no-underline ${on ? 'bg-ink text-white' : 'text-ink hover:bg-white/60'}`;
  return (
    <nav
      aria-label="Switch app"
      className="flex gap-1 rounded-full border border-edge bg-white/70 p-1"
    >
      <NavLink to="/rider" className={cls(!driver)} aria-current={!driver ? 'page' : undefined}>
        Rider app
      </NavLink>
      <NavLink to="/driver/trip" className={cls(driver)} aria-current={driver ? 'page' : undefined}>
        Driver app
      </NavLink>
    </nav>
  );
}
