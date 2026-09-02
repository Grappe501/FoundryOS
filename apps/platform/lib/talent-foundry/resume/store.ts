import { createServiceClient } from '@foundry/db';
import type { TalentFoundrySession } from '../types';
import { buildResumeSnapshot, isResumeSnapshot } from './snapshot';
import { generateResumeToken, hashResumeToken, isResumeTokenShape, resumeExpiresAt } from './token';

export class ResumeUnavailableError extends Error {
  constructor() {
    super('unavailable');
    this.name = 'ResumeUnavailableError';
  }
}

export async function createResumePlace(session: TalentFoundrySession): Promise<{ token: string }> {
  const db = createServiceClient();
  if (!db) throw new ResumeUnavailableError();
  if (!session.identity) throw new Error('not_identified');

  const token = generateResumeToken();
  const snapshot = buildResumeSnapshot(session);
  const { error } = await db.from('talent_foundry_resumes').insert({
    token_hash: hashResumeToken(token),
    campaign_id: session.campaignId,
    reddirt_submission_id: session.identity.submissionId ?? null,
    snapshot,
    expires_at: resumeExpiresAt().toISOString(),
  });
  if (error) throw new ResumeUnavailableError();
  return { token };
}

export async function loadResumePlace(
  token: string,
  campaignId: string,
): Promise<TalentFoundrySession | null> {
  if (!isResumeTokenShape(token)) return null;
  const db = createServiceClient();
  if (!db) return null;

  const { data, error } = await db
    .from('talent_foundry_resumes')
    .select('id, snapshot, expires_at, revoked_at, campaign_id')
    .eq('token_hash', hashResumeToken(token))
    .maybeSingle();

  if (error || !data) return null;
  if (data.campaign_id !== campaignId) return null;
  if (data.revoked_at) return null;
  if (data.expires_at && new Date(data.expires_at).getTime() < Date.now()) return null;
  if (!isResumeSnapshot(data.snapshot)) return null;

  await db.from('talent_foundry_resumes').update({ last_used_at: new Date().toISOString() }).eq('id', data.id);
  return data.snapshot;
}
