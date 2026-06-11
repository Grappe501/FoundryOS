import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type { EvidenceInput, ReputationRecord } from '@foundry/reputation-engine';
import { calculateReputationFromEvidence } from '@foundry/reputation-engine';

export type ReputationRecordRow = {
  id: string;
  user_slug: string;
  evidence_submission_id: string;
  domain_slug: string | null;
  scope: string;
  reputation_title: string;
  trust_weight: number;
  identity_impact: string | null;
  calculated_at: string;
  updated_at: string;
};

function rowToRecord(row: ReputationRecordRow): ReputationRecord {
  return {
    id: row.id,
    user_slug: row.user_slug,
    evidence_submission_id: row.evidence_submission_id,
    domain_slug: row.domain_slug,
    scope: row.scope as ReputationRecord['scope'],
    reputation_title: row.reputation_title,
    trust_weight: row.trust_weight,
    identity_impact: row.identity_impact,
    calculated_at: row.calculated_at,
  };
}

export async function getReputationByUserAndEvidence(
  userSlug: string,
  evidenceSubmissionId: string
): Promise<ReputationRecord | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data } = await client
    .from('reputation_records')
    .select('*')
    .eq('user_slug', userSlug)
    .eq('evidence_submission_id', evidenceSubmissionId)
    .maybeSingle();

  return data ? rowToRecord(data as ReputationRecordRow) : null;
}

export async function upsertReputationRecord(
  record: Omit<ReputationRecord, 'id'>
): Promise<{ row: ReputationRecord | null; persisted: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { row: null, persisted: false, error: 'Supabase not configured' };
  }
  const client = createServiceClient();
  if (!client) {
    return { row: null, persisted: false, error: 'Service client unavailable' };
  }

  const payload = {
    user_slug: record.user_slug,
    evidence_submission_id: record.evidence_submission_id,
    domain_slug: record.domain_slug,
    scope: record.scope,
    reputation_title: record.reputation_title,
    trust_weight: record.trust_weight,
    identity_impact: record.identity_impact,
    calculated_at: record.calculated_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('reputation_records')
    .upsert(payload, { onConflict: 'user_slug,evidence_submission_id' })
    .select('*')
    .single();

  if (error) {
    return { row: null, persisted: false, error: error.message };
  }

  await client.from('platform_metrics').upsert(
    {
      metric_key: 'reputation_records_total',
      metric_value: { count: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );
  await client.from('platform_metrics').upsert(
    {
      metric_key: 'identity_reputation_strength',
      metric_value: { score: record.trust_weight },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );

  return { row: rowToRecord(data as ReputationRecordRow), persisted: true };
}

async function getDemoEvidenceInput(): Promise<EvidenceInput | null> {
  const client = createServiceClient();
  if (!client) return null;

  const { data } = await client
    .from('evidence_submissions')
    .select('id, user_slug, action_slug, domain_slug, tier, verification_status, trust_weight, title')
    .eq('user_slug', 'demo-user')
    .eq('action_slug', 'deliver-first-speech')
    .maybeSingle();

  if (!data) return null;
  return data as EvidenceInput;
}

export async function ensureDemoReputationRecord(): Promise<{
  evidence: EvidenceInput | null;
  record: ReputationRecord | null;
  persisted: boolean;
  error?: string;
}> {
  const evidence = await getDemoEvidenceInput();
  if (!evidence?.id) {
    return { evidence: null, record: null, persisted: false, error: 'Demo evidence not found' };
  }

  const existing = await getReputationByUserAndEvidence('demo-user', evidence.id);
  if (existing?.reputation_title) {
    return { evidence, record: existing, persisted: true };
  }

  const calculated = calculateReputationFromEvidence(evidence);
  const result = await upsertReputationRecord({
    ...calculated,
    evidence_submission_id: evidence.id,
  });
  return { evidence, record: result.row, persisted: result.persisted, error: result.error };
}

export async function getReputationKpiCounts(): Promise<{
  reputation_records_total: number;
  avg_trust_weight: number;
  identity_reputation_strength: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: total } = await client
    .from('reputation_records')
    .select('*', { count: 'exact', head: true });

  const { data: rows } = await client.from('reputation_records').select('trust_weight').limit(100);
  const weights = (rows ?? []).map((r) => r.trust_weight as number);
  const avg = weights.length ? weights.reduce((a, b) => a + b, 0) / weights.length : 0;

  return {
    reputation_records_total: total ?? 0,
    avg_trust_weight: avg,
    identity_reputation_strength: avg,
  };
}
