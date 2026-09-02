import { createWorkshopSession } from './journey';
import type { WorkshopSession, WorkshopStateId } from './types';
import { WORKSHOP_IMPLEMENTATION, WORKSHOP_SESSION_KEY, WORKSHOP_SESSION_VERSION } from './types';

export const WORKSHOP_DRAFT_KEY = 'workshop.v1.drafts';

const STATES: WorkshopStateId[] = [
  'door',
  'notice',
  'notice_ack',
  'mess',
  'mess_consequence',
  'named',
  'linger',
];

export type WorkshopDrafts = {
  notice: string;
  change: string;
  artifact: string;
  reach: 'pulse' | 'draft' | '';
  happens: string;
};

const EMPTY_DRAFTS: WorkshopDrafts = { notice: '', change: '', artifact: '', reach: '', happens: '' };

function isWorkshopSession(value: unknown): value is WorkshopSession {
  if (!value || typeof value !== 'object') return false;
  const s = value as WorkshopSession;
  return (
    s.v === WORKSHOP_SESSION_VERSION &&
    s.implementation === WORKSHOP_IMPLEMENTATION &&
    s.sessionKey === WORKSHOP_SESSION_KEY &&
    STATES.includes(s.stateId) &&
    Array.isArray(s.evidence) &&
    Array.isArray(s.thinking) &&
    Boolean(s.envelope)
  );
}

export function loadWorkshopSession(): WorkshopSession {
  if (typeof window === 'undefined') return createWorkshopSession();
  try {
    const raw = window.sessionStorage.getItem(WORKSHOP_SESSION_KEY);
    if (!raw) return createWorkshopSession();
    const parsed: unknown = JSON.parse(raw);
    if (!isWorkshopSession(parsed)) return createWorkshopSession();
    return parsed;
  } catch {
    return createWorkshopSession();
  }
}

export function saveWorkshopSession(session: WorkshopSession): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(WORKSHOP_SESSION_KEY, JSON.stringify(session));
}

export function resetWorkshopSession(): WorkshopSession {
  const next = createWorkshopSession();
  saveWorkshopSession(next);
  if (typeof window !== 'undefined') window.sessionStorage.removeItem(WORKSHOP_DRAFT_KEY);
  return next;
}

export function loadWorkshopDrafts(): WorkshopDrafts {
  if (typeof window === 'undefined') return { ...EMPTY_DRAFTS };
  try {
    const raw = window.sessionStorage.getItem(WORKSHOP_DRAFT_KEY);
    if (!raw) return { ...EMPTY_DRAFTS };
    const parsed = JSON.parse(raw) as Partial<WorkshopDrafts>;
    return {
      notice: typeof parsed.notice === 'string' ? parsed.notice : '',
      change: typeof parsed.change === 'string' ? parsed.change : '',
      artifact: typeof parsed.artifact === 'string' ? parsed.artifact : '',
      reach: parsed.reach === 'pulse' || parsed.reach === 'draft' ? parsed.reach : '',
      happens: typeof parsed.happens === 'string' ? parsed.happens : '',
    };
  } catch {
    return { ...EMPTY_DRAFTS };
  }
}

export function saveWorkshopDrafts(drafts: WorkshopDrafts): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(WORKSHOP_DRAFT_KEY, JSON.stringify(drafts));
}
