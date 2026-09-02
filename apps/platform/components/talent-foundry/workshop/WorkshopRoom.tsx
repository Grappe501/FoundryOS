import type { ReactNode } from 'react';
import type { RoomDepth } from '../../../lib/talent-foundry/implementations/company/room';
import type { WorkshopStateId } from '../../../lib/talent-foundry/implementations/company/types';

/** Persistent room. Later work mounts into slots. Do not replace this shell after Phase 1. */
export function WorkshopRoom({
  depth,
  stateId,
  traces,
  voice,
}: {
  depth: RoomDepth;
  stateId: WorkshopStateId | 'boot';
  traces?: ReactNode;
  voice: ReactNode;
}) {
  return (
    <div className="ws-room" data-depth={depth} data-state={stateId}>
      <div className="ws-atmosphere" aria-hidden />
      <div className="ws-bench" aria-hidden />
      <div className="ws-slot-traces">{traces}</div>
      <div className="ws-slot-voice">{voice}</div>
    </div>
  );
}
