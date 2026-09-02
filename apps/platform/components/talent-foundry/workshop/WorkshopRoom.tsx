'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import type { BenchObject, MakeSurface } from '../../../lib/talent-foundry/implementations/company/make/surface';
import type { RoomDepth } from '../../../lib/talent-foundry/implementations/company/room';
import type { SoulState } from '../../../lib/talent-foundry/implementations/company/soul/engine';
import type { InquirySurface } from '../../../lib/talent-foundry/implementations/company/soul/research';
import type { WorkshopStateId } from '../../../lib/talent-foundry/implementations/company/types';

function machineOf(surface: MakeSurface, depth: RoomDepth): 'dormant' | 'aware' | 'equipped' {
  if (depth === 'equipped' || surface === 'equipped') return 'equipped';
  if (surface === 'need' || surface === 'attempt' || depth === 'make') return 'aware';
  return 'dormant';
}

/** Persistent room. Later work mounts into slots. Do not replace this shell. */
export function WorkshopRoom({
  depth,
  stateId,
  surface = 'rest',
  open = '',
  soul,
  inquiry = 'rest',
  history = false,
  traces,
  voice,
}: {
  depth: RoomDepth;
  stateId: WorkshopStateId | 'boot';
  surface?: MakeSurface;
  open?: BenchObject | '';
  soul?: SoulState;
  inquiry?: InquirySurface;
  history?: boolean;
  traces?: ReactNode;
  voice: ReactNode;
}) {
  const room = useRef<HTMLDivElement>(null);
  const machine = machineOf(surface, depth);

  useEffect(() => {
    const root = room.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;
    const onMove = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - 0.5) * 2;
      const y = ((event.clientY - box.top) / box.height - 0.5) * 2;
      root.style.setProperty('--ws-look-x', x.toFixed(3));
      root.style.setProperty('--ws-look-y', y.toFixed(3));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={room}
      className="ws-room"
      data-depth={depth}
      data-state={stateId}
      data-surface={surface}
      data-open={open || undefined}
      data-machine={machine}
      data-soul={soul?.presence}
      data-rhythm={soul?.rhythm}
      data-trust={soul?.trust}
      data-loop={soul?.loop}
      data-mystery={soul?.mystery.join(' ') || undefined}
      data-inquiry={inquiry !== 'rest' ? inquiry : undefined}
      data-history={history ? 'trail' : undefined}
    >
      <div className="ws-layer ws-layer--back" aria-hidden>
        <span className="ws-far-frame" />
        <span className="ws-far-frame ws-far-frame--rear" />
        <span className="ws-far-stub" />
        <span className="ws-rear-bay" />
        {soul?.mystery.includes('far-tool') ? <span className="ws-mystery" data-mark="far-tool" /> : null}
      </div>
      <div className="ws-layer ws-layer--mid" aria-hidden>
        <span className="ws-rail ws-rail--left" />
        <span className="ws-rail ws-rail--deep" />
        <span className="ws-join" />
        <span className="ws-node ws-node--pulse" />
        <span className="ws-node ws-node--draft" />
        <span className="ws-node ws-node--persist" />
        <div className="ws-coords">
          <i />
          <i />
          <i />
        </div>
        <div className="ws-align">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="ws-bench">
          <span className="ws-bench-plate" />
          <span className="ws-bench-grain" />
          <span className="ws-bench-edge" />
          {history ? <span className="ws-scratch" /> : null}
        </div>
      </div>
      <div className="ws-atmosphere" aria-hidden />
      <div className="ws-layer ws-layer--fore">
        <div className="ws-slot-traces">{traces}</div>
      </div>
      <div className="ws-layer ws-layer--air">
        <div className="ws-slot-voice">{voice}</div>
      </div>
    </div>
  );
}
