import { Link } from 'react-router-dom';

/** 44×44 back arrow, as in the wireframes. Owner: yeechen630. */
export function BackButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="-ml-3 flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-fill"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </Link>
  );
}
