'use client';

import { useRef, type ReactNode } from 'react';
import { PHASE_1_NOTICE } from '../../../../lib/talent-foundry/implementations/company/scenarios/lab';

export function PulseFirstRun({ onAttend }: { onAttend: (regionId: string, dwellMs: number) => void }) {
  return (
    <aside className="ws-fragment" aria-label={PHASE_1_NOTICE.title}>
      <div className="ws-frag-top">
        <Region id="heading" kind="surface" onAttend={onAttend}>
          <span className="ws-frag-name">Get started with Pulse</span>
        </Region>
        <Region id="badge" kind="conflict" onAttend={onAttend}>
          <span className="ws-badge">Draft · 14 conflicts</span>
        </Region>
      </div>
      <Region id="primary" kind="conflict" onAttend={onAttend}>
        <span className="ws-primary-wrong">Delete workspace</span>
      </Region>
      <Region id="helper" kind="surface" onAttend={onAttend}>
        <span className="ws-helper">You’re all set.</span>
      </Region>
      <Region id="import" kind="buried" onAttend={onAttend}>
        Import from last night
      </Region>
    </aside>
  );
}

function Region({
  id,
  kind,
  onAttend,
  children,
}: {
  id: string;
  kind: 'surface' | 'buried' | 'conflict';
  onAttend: (regionId: string, dwellMs: number) => void;
  children: ReactNode;
}) {
  const entered = useRef<number | null>(null);

  function start() {
    if (entered.current == null) entered.current = Date.now();
  }

  function end() {
    if (entered.current == null) return;
    const dwellMs = Date.now() - entered.current;
    entered.current = null;
    onAttend(id, dwellMs);
  }

  return (
    <button
      type="button"
      className="ws-region"
      data-kind={kind}
      data-region={id}
      onPointerEnter={start}
      onFocus={start}
      onPointerLeave={end}
      onBlur={end}
    >
      {children}
    </button>
  );
}
