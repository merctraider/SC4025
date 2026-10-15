/**
 * Grey box standing in for something not built (map, chart, photo).
 * Owner: yeechen630.
 */
export function Placeholder({
  label,
  className = '',
  grow = false,
}: {
  label: string;
  className?: string;
  /** Fill remaining vertical space (maps). */
  grow?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-fill text-center text-[13px] text-muted ${grow ? 'min-h-[120px] flex-1' : ''} ${className}`}
    >
      [ {label} ]
    </div>
  );
}
