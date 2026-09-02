'use client';

import { useEffect, useState } from 'react';
import { MAKE_COPY } from '../../../../lib/talent-foundry/implementations/company/make/copy';
import { scrapsFor } from '../../../../lib/talent-foundry/implementations/company/make/scraps';
import { makeTrack } from '../../../../lib/talent-foundry/implementations/company/make/tracks';
import type { ArtifactTrack } from '../../../../lib/talent-foundry/implementations/company/spine/envelope';

export function MakeNeed({
  tracks,
  onChoose,
}: {
  tracks: readonly ArtifactTrack[];
  onChoose: (trackId: ArtifactTrack) => void;
}) {
  return (
    <div className="ws-object-notes">
      {scrapsFor(tracks).map((scrap) => (
        <button key={scrap.id} type="button" className="ws-scrap" onClick={() => onChoose(scrap.id)}>
          <span className="ws-scrap-when">{scrap.when}</span>
          <span className="ws-scrap-struck">{scrap.struck}</span>
          <span className="ws-scrap-lure">{scrap.lure}</span>
        </button>
      ))}
    </div>
  );
}

export function MakeAttemptVoice({
  trackId,
  ready,
  onFinish,
}: {
  trackId: ArtifactTrack;
  ready: boolean;
  onFinish: () => void;
}) {
  const track = makeTrack(trackId);
  return (
    <>
      <p className="ws-line ws-line--quiet">{track.job}</p>
      <p className="ws-prompt">{track.definitionOfDone}</p>
      {ready ? (
        <button type="button" className="ws-threshold" onClick={onFinish} aria-label="Leave it on the bench">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </>
  );
}

export function MakeEquipped({ onReset, soulLine = null }: { onReset: () => void; soulLine?: string | null }) {
  const [step, setStep] = useState(1);
  const [late, setLate] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStep(2);
      const t = window.setTimeout(() => setLate(true), 4000);
      return () => window.clearTimeout(t);
    }
    const next = window.setTimeout(() => setStep(2), 2800);
    const reset = window.setTimeout(() => setLate(true), 24000);
    return () => {
      window.clearTimeout(next);
      window.clearTimeout(reset);
    };
  }, []);

  return (
    <>
      <p className="ws-line">{MAKE_COPY.methodArrived}</p>
      {step >= 2 ? <p className="ws-line ws-line--quiet">{MAKE_COPY.methodTurn}</p> : null}
      {step >= 2 && soulLine ? <p className="ws-soul">{soulLine}</p> : null}
      {late ? (
        <button type="button" className="ws-ghost" onClick={onReset}>
          Start over
        </button>
      ) : null}
    </>
  );
}
