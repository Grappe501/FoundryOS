import type { CampaignConfig, TalentFoundrySession } from './types';
import { createSession, migrateSessionState } from './journey';

function isSession(value: unknown, campaignId: string): value is TalentFoundrySession {
  if (!value || typeof value !== 'object') return false;
  const s = value as TalentFoundrySession;
  return s.v === 1 && s.campaignId === campaignId && typeof s.stateId === 'string' && Array.isArray(s.evidence);
}

export function loadSession(campaign: CampaignConfig): TalentFoundrySession {
  if (typeof window === 'undefined') return createSession(campaign);
  try {
    const raw = window.sessionStorage.getItem(campaign.sessionKey);
    if (!raw) return createSession(campaign);
    const parsed: unknown = JSON.parse(raw);
    if (!isSession(parsed, campaign.id)) return createSession(campaign);
    const fresh = createSession(campaign, new Date(parsed.startedAt || Date.now()));
    return {
      ...fresh,
      ...parsed,
      stateId: migrateSessionState(parsed.stateId),
      runs: parsed.runs ?? {},
      flags: { ...fresh.flags, ...parsed.flags },
      conversion: { ...fresh.conversion, ...parsed.conversion },
    };
  } catch {
    /* start clean */
  }
  return createSession(campaign);
}

export function saveSession(campaign: CampaignConfig, session: TalentFoundrySession): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(campaign.sessionKey, JSON.stringify(session));
}

export function resetSession(campaign: CampaignConfig): TalentFoundrySession {
  const next = createSession(campaign);
  saveSession(campaign, next);
  return next;
}
