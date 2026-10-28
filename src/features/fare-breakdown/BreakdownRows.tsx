/**
 * F1 · Shared breakdown rows for R2 and R7.
 * One source of markup so both screens show the same numbers in the same order (PRD 4.5).
 * OWNER: sushruth2911
 */
import { Row } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

type Props = {
  /** 'fare' = R2 (driver share on its own row), 'summary' = R7 (share folded into surge label) */
  variant: 'fare' | 'summary';
};

export function BreakdownRows({ variant }: Props) {
  const b = useBooking();
  const driverPct = Math.round(DRIVER_SURGE_SHARE * 100);
  const mult = formatMultiplier(b.multiplier);

  return (
    <>
      <Row label="Base fare" value={formatMoney(b.fareInputs.baseFare)} />
      <Row label="Distance and time" value={formatMoney(b.fareInputs.distanceAndTime)} />

      {b.peak &&
        (variant === 'fare' ? (
          <>
            <Row label={`Surge (${mult})`} value={formatMoney(b.fare.surgeAmount)} bold />
            <Row
              label={`Goes to your driver (${driverPct}%)`}
              value={formatMoney(b.driverSurgeShare)}
              muted
              indent
            />
          </>
        ) : (
          <Row
            label={`Surge (${mult}, ${driverPct}% to driver)`}
            value={formatMoney(b.fare.surgeAmount)}
          />
        ))}
    </>
  );
}