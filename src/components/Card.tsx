import type { ReactNode } from 'react';
import { cardTones, type CardTone } from './cardTones';
import { Icon, type IconName } from './Icon';

/** Card surface (white by default). Owner: yeechen630. */
export function Card({
  children,
  className = '',
  tone = 'white',
}: {
  children: ReactNode;
  className?: string;
  tone?: CardTone;
}) {
  return <div className={`flex flex-col gap-3 ${cardTones[tone]} ${className}`}>{children}</div>;
}

/** Bold card heading, with an optional leading icon. Owner: yeechen630. */
export function CardTitle({
  children,
  icon,
  className = '',
}: {
  children: ReactNode;
  icon?: IconName;
  className?: string;
}) {
  return (
    <h2
      className={`m-0 flex items-center gap-2 text-[17px] leading-snug font-semibold ${className}`}
    >
      {icon && <Icon name={icon} className="h-5 w-5" />}
      <span>{children}</span>
    </h2>
  );
}

/** Lines of supporting copy with a leading check (or other) icon. Owner: yeechen630. */
export function CheckList({
  items,
  icon = 'check',
  className = 'text-[15px]',
  iconClassName = 'text-ok',
}: {
  items: ReactNode[];
  icon?: IconName;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <ul className={`m-0 flex list-none flex-col gap-2 p-0 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 leading-snug">
          <Icon name={icon} className={`mt-[2px] h-[18px] w-[18px] ${iconClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
