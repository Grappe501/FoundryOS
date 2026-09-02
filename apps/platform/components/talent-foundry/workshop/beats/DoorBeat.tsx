'use client';

import { useEffect, useState } from 'react';
import type { DoorLineId, WorkshopSession } from '../../../../lib/talent-foundry/implementations/company/types';

const LINES: { id: Exclude<DoorLineId, 'enter'>; text: string }[] = [
  { id: 'line1', text: 'YOU FOUND THE WORKSHOP.' },
  { id: 'line2', text: 'Most people tell us what they can do.' },
  { id: 'line3', text: "We'd rather see it." },
];

export function DoorBeat({
  session,
  onReveal,
  onEnter,
}: {
  session: WorkshopSession;
  onReveal: (line: DoorLineId) => void;
  onEnter: () => void;
}) {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    onReveal('line1');
    const reduce =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(3);
      onReveal('line2');
      onReveal('line3');
      return;
    }
    const t2 = window.setTimeout(() => {
      setShown(2);
      onReveal('line2');
    }, 2200);
    const t3 = window.setTimeout(() => {
      setShown(3);
      onReveal('line3');
    }, 4400);
    return () => {
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onReveal]);

  const ready = shown >= 3 || Boolean(session.doorPacing.line3At);

  return (
    <>
      {LINES.slice(0, Math.max(shown, session.doorPacing.line2At ? 2 : 1, session.doorPacing.line3At ? 3 : 1)).map(
        (line, i) => (
          <p key={line.id} className={i === 0 ? 'ws-line' : 'ws-line ws-line--quiet'}>
            {line.text}
          </p>
        ),
      )}
      {ready ? (
        <button type="button" className="ws-enter" onClick={onEnter}>
          Enter
        </button>
      ) : null}
    </>
  );
}
