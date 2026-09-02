import type { ReactNode } from 'react';
import type { MakeSurface } from '../../../lib/talent-foundry/implementations/company/make/surface';
import type { RoomDepth } from '../../../lib/talent-foundry/implementations/company/room';
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
  traces,
  voice,
}: {
  depth: RoomDepth;
  stateId: WorkshopStateId | 'boot';
  surface?: MakeSurface;
  traces?: ReactNode;
  voice: ReactNode;
}) {
  const machine = machineOf(surface, depth);
  return (
    <div
      className="ws-room"
      data-depth={depth}
      data-state={stateId}
      data-surface={surface}
      data-machine={machine}
    >
      <div className="ws-far" aria-hidden>
        <span className="ws-far-frame" />
        <span className="ws-far-stub" />
      </div>
      <div className="ws-rail ws-rail--left" aria-hidden />
      <div className="ws-rail ws-rail--deep" aria-hidden />
      <div className="ws-coords" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="ws-atmosphere" aria-hidden />
      <div className="ws-bench" aria-hidden>
        <span className="ws-bench-plate" />
        <span className="ws-bench-edge" />
      </div>
      <div className="ws-slot-traces">{traces}</div>
      <div className="ws-slot-voice">{voice}</div>
    </div>
  );
}
