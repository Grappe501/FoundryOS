import type { WorkshopStateId } from './types';

/** How far the persistent room has disclosed itself. Later stages add depth — they do not replace the room. */
export type RoomDepth = 'void' | 'object' | 'aftermath' | 'named' | 'linger';

export function roomDepth(stateId: WorkshopStateId): RoomDepth {
  if (stateId === 'door') return 'void';
  if (stateId === 'notice' || stateId === 'notice_ack') return 'object';
  if (stateId === 'mess' || stateId === 'mess_consequence') return 'aftermath';
  if (stateId === 'named') return 'named';
  return 'linger';
}
