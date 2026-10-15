/**
 * F3 · Peak Pickup Promise — cancel note on R5.
 * OWNER: chun1108
 *
 * TODO(chun1108): cancel flow (confirm sheet → back to R1, no credit given; PRD 4.4 edge cases).
 */
export function CancelRideNote() {
  return (
    <p className="m-0 text-center text-[13px] text-muted">
      <button
        type="button"
        className="cursor-not-allowed underline decoration-dotted underline-offset-2"
        title="Not built yet (F3)"
      >
        Cancel ride
      </button>{' '}
      · no credit is given if you cancel
    </p>
  );
}
