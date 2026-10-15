/**
 * F3 · Peak Pickup Promise — R7 line, shown ONLY if a credit was applied.
 * OWNER: chun1108
 */
import { FeatureArea, Row } from '../../components';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function CreditLine() {
  const b = useBooking();
  if (b.credit <= 0) return null;
  return (
    <FeatureArea feature="F3" title="Shown only if late" className="py-3.5">
      <Row label="Pickup promise credit added" value={<strong>{formatMoney(b.credit)}</strong>} />
    </FeatureArea>
  );
}
