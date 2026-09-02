import type { ReactNode } from 'react';
import type { RoomDepth } from '../../../lib/talent-foundry/implementations/company/room';

/** Persistent room. Later work mounts into slots. Do not replace this shell after Phase 1. */
export function WorkshopRoom({
  depth,
  object,
  voice,
  after,
}: {
  depth: RoomDepth;
  object?: ReactNode;
  voice: ReactNode;
  after?: ReactNode;
}) {
  return (
    <div className="ws-room" data-depth={depth}>
      <div className="ws-atmosphere" aria-hidden />
      <div className="ws-bench" aria-hidden />
      <div className="ws-slot-object">{object}</div>
      <div className="ws-slot-voice">{voice}</div>
      <div className="ws-slot-after">{after}</div>
    </div>
  );
}
