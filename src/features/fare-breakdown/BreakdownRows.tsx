/**
 * F1 · Shared breakdown card for R2 and R7.
 * One source of markup so both screens show the same numbers in the same order (PRD 4.5).
 * OWNER: sushruth2911
 */
import { CardTitle, Divider, Row } from '../../components';
import { DRIVER_SURGE_SHARE } from '../../config/businessRules';
import { formatMoney, formatMultiplier } from '../../lib';
import { useBooking } from '../../state';

type Props = {
  /** 'fare' = R2, 'summary' = R7. Both show the same rows (PRD 4.5 R7). */
  variant: 'fare' | 'summary';
};

export function BreakdownRows({ variant }: Props) {
  const b = useBooking();
  const driverPct = Math.round(DRIVER_SURGE_SHARE * 100);

  return (
    <div
      className="flex flex-col gap-3.5 rounded-2xl bg-white px-4 py-4 shadow-card"
      data-variant={variant}
    >
      <CardTitle>Fare breakdown · shown automatically</CardTitle>
      <Row label="Base fare" value={formatMoney(b.fareInputs.baseFare)} />
      <Row label="Distance & time" value={formatMoney(b.fareInputs.distanceAndTime)} />

      {b.peak && (
        <>
          <Row
            label={`Surge amount · ${formatMultiplier(b.multiplier)}`}
            value={formatMoney(b.fare.surgeAmount)}
          />
          <Divider />
          <Row
            label={`Driver gets ${driverPct}% of surge`}
            value={formatMoney(b.driverSurgeShare)}
          />
        </>
      )}
    </div>
  );
}
