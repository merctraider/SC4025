import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary';

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-black',
  secondary: 'border-[1.5px] border-ink bg-white text-ink hover:bg-fill',
};

const base =
  'flex min-h-[52px] w-full items-center justify-center rounded-xl px-4 text-base font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak';

/**
 * Full-width button. Pass `to` to render a router link, or `onClick` for an action
 * (pass both to run the action and then navigate). Owner: yeechen630.
 */
export function Button({
  children,
  to,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: Variant;
}) {
  const cls = `${base} ${styles[variant]}`;
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
