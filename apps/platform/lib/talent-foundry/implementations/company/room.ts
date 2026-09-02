import { makeSurface } from './make/surface';
import type { WorkshopSession, WorkshopStateId } from './types';

/** How far the persistent room has disclosed itself. Later stages add depth — they do not replace the room. */
export type RoomDepth = 'void' | 'object' | 'aftermath' | 'named' | 'linger' | 'make' | 'equipped';

export function roomDepth(stateId: WorkshopStateId): RoomDepth {
  if (stateId === 'door') return 'void';
  if (stateId === 'notice' || stateId === 'notice_ack') return 'object';
  if (stateId === 'mess' || stateId === 'mess_consequence') return 'aftermath';
  if (stateId === 'named') return 'named';
  return 'linger';
}

/** Depth from the live session. MAKE does not invent a new Ernie state. */
export function workshopDepth(session: WorkshopSession): RoomDepth {
  const surface = makeSurface(session);
  if (surface === 'equipped') return 'equipped';
  if (surface === 'need' || surface === 'attempt') return 'make';
  return roomDepth(session.stateId);
}
