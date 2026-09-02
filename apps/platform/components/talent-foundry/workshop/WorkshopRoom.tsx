import type { ReactNode } from 'react';
import type { MakeSurface } from '../../../lib/talent-foundry/implementations/company/make/surface';
import type { RoomDepth } from '../../../lib/talent-foundry/implementations/company/room';
import type { WorkshopStateId } from '../../../lib/talent-foundry/implementations/company/types';

/** Persistent room. Later work mounts into slots. Do not replace this shell after Phase 1. */
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
  return (
    <div className="ws-room" data-depth={depth} data-state={stateId} data-surface={surface}>
      <div className="ws-atmosphere" aria-hidden />
      <div className="ws-bench" aria-hidden />
      <div className="ws-slot-traces">{traces}</div>
      <div className="ws-slot-voice">{voice}</div>
    </div>
  );
}
