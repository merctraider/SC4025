import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

type Variant = 'primary' | 'secondary' | 'text';

const styles: Record<Variant, string> = {
  primary:
    'min-h-14 w-full justify-between rounded-full bg-peak px-5 text-white shadow-button hover:bg-peak-dark',
  secondary:
    'min-h-14 w-full justify-between rounded-full border-[1.5px] border-peak bg-peak-soft px-5 text-peak hover:bg-white',
  text: 'min-h-11 self-start gap-2 text-peak hover:text-peak-dark',
};

const base =
  'flex items-center text-left text-base font-semibold no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peak';

/**
 * Pill button from the designs: label on the left, arrow on the right.
 * Pass `to` to render a router link, or `onClick` for an action (pass both to
 * run the action and then navigate). `arrow={false}` hides the arrow.
 * `variant="text"` is the inline link style ("Return to current fare →").
 * Owner: yeechen630.
 */
export function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  arrow = true,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: Variant;
  arrow?: boolean;
}) {
  const cls = `${base} ${styles[variant]}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name="arrowRight" className="h-5 w-5" />}
    </>
  );
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
