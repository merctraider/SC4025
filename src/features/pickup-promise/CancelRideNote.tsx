/**
 * F3 · Peak Pickup Promise — cancel ride on R5. PRD 4.4: if the rider cancels after
 * booking, the promise no longer applies and no credit is given. Confirming clears the
 * per-trip state and returns to R1.
 * OWNER: chun1108
 */
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { useAppState, useBooking } from '../../state';
import { PromiseSheet } from './PromiseSheet';

export function CancelRideNote() {
  const b = useBooking();
  const { finishTrip } = useAppState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <p className="m-0 flex flex-wrap items-center gap-x-1 text-[13px] text-muted">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 text-base font-semibold text-peak hover:text-peak-dark"
        >
          Cancel ride
        </button>
        {b.peak && ' · no credit is given if you cancel'}
      </p>
      {open && (
        <PromiseSheet
          title="Cancel this ride?"
          onClose={close}
          actions={
            <>
              <Button onClick={close} arrow={false}>
                Keep my ride
              </Button>
              <Button
                variant="secondary"
                arrow={false}
                onClick={() => {
                  finishTrip();
                  navigate('/rider');
                }}
              >
                Cancel ride
              </Button>
            </>
          }
        >
          <p className="m-0">
            {b.peak
              ? "Your pickup promise no longer applies, and you won't get a late-pickup credit for this ride."
              : "You'll go back to trip entry."}
          </p>
        </PromiseSheet>
      )}
    </>
  );
}
