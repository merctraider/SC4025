import { useAppState } from '../state';

/**
 * Small dashed note marking an unbuilt part of a feature. Shown only while
 * "Show feature labels" is on, so normal demos stay clean. Delete it when you
 * build the real thing. Owner: yeechen630.
 */
export function StubNote({ owner, children }: { owner: string; children: string }) {
  const { showFeatureLabels } = useAppState();
  if (!showFeatureLabels) return null;
  return (
    <p className="rounded-md border border-dashed border-edge px-2 py-1 font-mono text-[10px] leading-snug text-muted">
      TODO @{owner}: {children}
    </p>
  );
}
