import type { WorkshopSession, WorkshopStateId } from './types';

/** How an object sits in the room. UI only. Not a score. */
export type ObjectPresence = 'absent' | 'focus' | 'ghost';

/** What the last draft looks like after their decision. A place-fact, not a grade. */
export type DraftTrace = 'intact' | 'gone' | 'restored' | 'question' | 'copy';

export function pulsePresence(stateId: WorkshopStateId): ObjectPresence {
  if (stateId === 'door') return 'absent';
  if (stateId === 'notice' || stateId === 'notice_ack') return 'focus';
  return 'ghost';
}

export function draftPresence(stateId: WorkshopStateId): ObjectPresence {
  if (stateId === 'door' || stateId === 'notice' || stateId === 'notice_ack') return 'absent';
  if (stateId === 'mess' || stateId === 'mess_consequence') return 'focus';
  return 'ghost';
}

export function attendedRegionIds(session: WorkshopSession): string[] {
  return session.addressedRegionIds;
}

export function messChoiceId(session: WorkshopSession): string | null {
  const item = [...session.evidence].reverse().find((e) => e.type === 'decision' && e.label);
  const value = item?.value as { choiceId?: string } | undefined;
  return value?.choiceId ?? null;
}

export function draftTrace(session: WorkshopSession): DraftTrace {
  const choice = messChoiceId(session);
  if (choice === 'continue') return 'gone';
  if (choice === 'restore') return 'restored';
  if (choice === 'ask') return 'question';
  if (choice === 'split') return 'copy';
  return 'intact';
}
