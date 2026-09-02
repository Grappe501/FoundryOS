'use client';

import { useRef, type ReactNode } from 'react';
import { PHASE_1_NOTICE } from '../../../../lib/talent-foundry/implementations/company/scenarios/lab';
import type { ObjectPresence } from '../../../../lib/talent-foundry/implementations/company/traces';

export function PulseFirstRun({
  presence,
  attended,
  interactive,
  onAttend,
  reachable = false,
  onReach,
  notes,
}: {
  presence: ObjectPresence;
  attended: string[];
  interactive: boolean;
  onAttend: (regionId: string, dwellMs: number) => void;
  reachable?: boolean;
  onReach?: () => void;
  notes?: ReactNode;
}) {
  if (presence === 'absent') return null;
  return (
    <aside
      className="ws-object ws-fragment"
      data-presence={presence}
      data-place="pulse"
      data-origin="found"
      data-reachable={reachable ? 'true' : 'false'}
      aria-label={PHASE_1_NOTICE.title}
      aria-hidden={presence === 'ghost' && !reachable}
    >
      <div className="ws-frag-top">
        <Region id="heading" kind="surface" attended={attended} interactive={interactive} onAttend={onAttend}>
          <span className="ws-frag-name">Get started with Pulse</span>
        </Region>
        <Region id="badge" kind="conflict" attended={attended} interactive={interactive} onAttend={onAttend}>
          <span className="ws-badge">Draft · 14 conflicts</span>
        </Region>
      </div>
      <Region id="primary" kind="conflict" attended={attended} interactive={interactive} onAttend={onAttend}>
        <span className="ws-primary-wrong">Delete workspace</span>
      </Region>
      <Region id="helper" kind="surface" attended={attended} interactive={interactive} onAttend={onAttend}>
        <span className="ws-helper">You’re all set.</span>
      </Region>
      <Region id="import" kind="buried" attended={attended} interactive={interactive} onAttend={onAttend}>
        Import from last night
      </Region>
      {notes}
      {reachable && !notes ? (
        <button type="button" className="ws-reach" onClick={onReach} aria-label="Pulse is still on the bench">
          <span className="ws-threshold-mark" aria-hidden />
        </button>
      ) : null}
    </aside>
  );
}

function Region({
  id,
  kind,
  attended,
  interactive,
  onAttend,
  children,
}: {
  id: string;
  kind: 'surface' | 'buried' | 'conflict';
  attended: string[];
  interactive: boolean;
  onAttend: (regionId: string, dwellMs: number) => void;
  children: ReactNode;
}) {
  const entered = useRef<number | null>(null);
  const seen = attended.includes(id);

  function start() {
    if (!interactive) return;
    if (entered.current == null) entered.current = Date.now();
  }

  function end() {
    if (!interactive || entered.current == null) return;
    const dwellMs = Date.now() - entered.current;
    entered.current = null;
    onAttend(id, dwellMs);
  }

  if (!interactive) {
    return (
      <div className="ws-region" data-kind={kind} data-region={id} data-attended={seen ? 'true' : 'false'}>
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="ws-region"
      data-kind={kind}
      data-region={id}
      data-attended={seen ? 'true' : 'false'}
      onPointerEnter={start}
      onFocus={start}
      onPointerLeave={end}
      onBlur={end}
    >
      {children}
    </button>
  );
}
