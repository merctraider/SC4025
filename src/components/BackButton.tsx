import { Link } from 'react-router-dom';
import { Icon } from './Icon';

/** 44×44 round back button, as in the designs. Owner: yeechen630. */
export function BackButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-card transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak"
    >
      <Icon name="chevronLeft" className="h-5 w-5" />
    </Link>
  );
}
