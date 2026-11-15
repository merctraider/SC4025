/**
 * F3 · Peak Pickup Promise — R7 "Pickup Promise status" card (peak trips only).
 * On time, credit applied, or late without credit (weekly cap / under threshold).
 * OWNER: chun1108
 */
import { FeatureArea, Icon } from '../../components';
import { formatMoney } from '../../lib';
import { useBooking } from '../../state';

export function CreditLine() {
  const b = useBooking();
  if (!b.peak) return null;
  const got = b.credit > 0;
  const text = !b.isLate
    ? 'On time: no late-pickup credit needed'
    : got
      ? `${b.minutesLate} min late: ${formatMoney(b.credit)} credit applied`
      : `${b.minutesLate} min late: no credit for this ride`;
  return (
    <FeatureArea feature="F3" title="Promise status" tone="ok" className="flex items-start gap-3">
      <Icon name={got ? 'gift' : 'checkCircle'} className="mt-0.5 h-5 w-5 text-ok" />
      <div className="flex flex-col gap-0.5">
        <strong className="text-[15px]">Pickup Promise status</strong>
        <span className="text-[15px] text-[#3a4156]">{text}</span>
      </div>
    </FeatureArea>
  );
}
