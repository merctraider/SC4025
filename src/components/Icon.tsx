/**
 * Small stroke icons used across the designs (24×24, 2px stroke).
 * Decorative by default; pass `label` to expose one to screen readers.
 * Owner: yeechen630.
 */
const paths = {
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 010-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 010 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 10a6 6 0 0112 0c0 5 2 6.5 2 6.5H4S6 15 6 10z" />
      <path d="M10 20a2 2 0 004 0" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  car: (
    <>
      <path d="M5 17h14v-4.5L17 7H7l-2 5.5V17z" />
      <path d="M5 12.5h14M7.5 17v2M16.5 17v2" />
      <circle cx="8" cy="14.8" r=".6" />
      <circle cx="16" cy="14.8" r=".6" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H16a3 3 0 000-6H8a3 3 0 010-6h7.5" />
    </>
  ),
  trendDown: <path d="M3 7l6 6 4-4 8 8M21 11v6h-6" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = 'h-5 w-5',
  label,
}: {
  name: IconName;
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {paths[name]}
    </svg>
  );
}
