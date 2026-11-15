/**
 * Stand-in for something not built. `map` draws the designs' map preview
 * (streets, dotted route, two pins, caption); otherwise a plain grey box.
 * No live map or GPS in the MVP (PRD 4.3). Owner: yeechen630.
 */
export function Placeholder({
  label,
  className = '',
  grow = false,
  map = false,
}: {
  label: string;
  className?: string;
  /** Fill remaining vertical space. */
  grow?: boolean;
  map?: boolean;
}) {
  const size = grow ? 'min-h-[120px] flex-1' : '';
  if (!map) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-fill text-center text-[13px] text-muted ${size} ${className}`}
      >
        [ {label} ]
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative shrink-0 overflow-hidden rounded-2xl bg-[#e8ecf4] shadow-card ${size || 'h-[168px]'} ${className}`}
    >
      {/* streets */}
      <span className="absolute inset-x-0 top-[24%] h-3.5 bg-white" />
      <span className="absolute inset-x-0 top-[68%] h-3.5 bg-white" />
      <span className="absolute inset-y-0 left-[44%] w-3.5 bg-white" />
      <span className="absolute inset-y-0 left-[76%] w-3.5 bg-white" />
      <span className="absolute -right-8 -bottom-10 h-36 w-44 rounded-full bg-[#d7defb]" />
      {/* route */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M20 28 H48 V72 H78"
          fill="none"
          stroke="var(--color-peak)"
          strokeWidth="3.5"
          strokeDasharray="0.1 7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Pin className="top-[28%] left-[20%] text-peak" />
      <Pin className="top-[72%] left-[78%] text-ok" />
      <span className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-full bg-white px-3 py-1 text-[13px] text-ink shadow-card">
        {label}
      </span>
    </div>
  );
}

function Pin({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`absolute h-7 w-7 -translate-x-1/2 -translate-y-full ${className}`}
      fill="white"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M12 22s7-6.2 7-12a7 7 0 00-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" fill="none" />
    </svg>
  );
}
