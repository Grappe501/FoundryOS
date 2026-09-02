'use client';

import { useEffect, useState } from 'react';
import { MAKE_COPY } from '../../../../lib/talent-foundry/implementations/company/make/copy';
import { trackLure } from '../../../../lib/talent-foundry/implementations/company/make/surface';
import { MAKE_TRACKS, makeTrack } from '../../../../lib/talent-foundry/implementations/company/make/tracks';
import type { ArtifactTrack } from '../../../../lib/talent-foundry/implementations/company/spine/envelope';

export function MakeNeed({ onChoose }: { onChoose: (trackId: ArtifactTrack) => void }) {
  return (
    <>
      {MAKE_TRACKS.map((track) => (
        <button
          key={track.id}
          type="button"
          className="ws-choice"
          onClick={() => onChoose(track.id)}
        >
          {trackLure(track.id)}
        </button>
      ))}
    </>
  );
}

export function MakeAttempt({
  trackId,
  body,
  onBody,
  onTyping,
  onFinish,
}: {
  trackId: ArtifactTrack;
  body: string;
  onBody: (value: string) => void;
  onTyping: () => void;
  onFinish: () => void;
}) {
  const track = makeTrack(trackId);
  return (
    <>
      <p className="ws-line ws-line--quiet">{track.job}</p>
      <p className="ws-prompt">{track.definitionOfDone}</p>
      <textarea
        className="ws-field"
        value={body}
        onChange={(e) => onBody(e.target.value)}
        onInput={onTyping}
        rows={5}
        aria-label="The work"
      />
      {body.trim() ? (
        <button type="button" className="ws-threshold" onClick={onFinish} aria-label="Leave it on the bench">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </>
  );
}

export function MakeEquipped({ onReset }: { onReset: () => void }) {
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
      {late ? (
        <button type="button" className="ws-ghost" onClick={onReset}>
          Start over
        </button>
      ) : null}
    </>
  );
}
