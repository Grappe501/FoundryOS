'use client';

import { useEffect, useState } from 'react';

export function NamedReveal({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setStep(3);
      return;
    }
    const t2 = window.setTimeout(() => setStep(2), 2200);
    const t3 = window.setTimeout(() => setStep(3), 4400);
    return () => {
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <>
      <h1 className="ws-named">THIS IS TALENT FOUNDRY.</h1>
      {step >= 2 ? <p className="ws-line ws-line--quiet">We don’t start with résumés.</p> : null}
      {step >= 3 ? <p className="ws-line ws-line--quiet">We start with the work.</p> : null}
      {step >= 3 ? (
        <button type="button" className="ws-threshold" onClick={onContinue} aria-label="Continue">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </>
  );
}

export function LingerRest({ onReset }: { onReset: () => void }) {
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
    const bench = window.setTimeout(() => setStep(2), 2400);
    const reset = window.setTimeout(() => setLate(true), 14000);
    return () => {
      window.clearTimeout(bench);
      window.clearTimeout(reset);
    };
  }, []);

  return (
    <>
      <p className="ws-line">You can go.</p>
      {step >= 2 ? <p className="ws-line ws-line--quiet">The bench will still be here.</p> : null}
      {late ? (
        <button type="button" className="ws-ghost" onClick={onReset}>
          Start over
        </button>
      ) : null}
    </>
  );
}
