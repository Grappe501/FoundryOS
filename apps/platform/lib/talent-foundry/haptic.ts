export type TfHapticKind = 'key' | 'interrupt' | 'share';

export function tfHaptic(kind: TfHapticKind): void {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  try {
    if (kind === 'key') navigator.vibrate([20, 30, 40]);
    else if (kind === 'interrupt') navigator.vibrate([16, 24, 16]);
    else navigator.vibrate(12);
  } catch {
    /* ignore */
  }
}
