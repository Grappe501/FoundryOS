import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type { EvidenceSubmission } from '@foundry/evidence-engine';

export type EvidenceSubmissionRow = {
  id: string;
  user_slug: string;
  transformation_loop_id: string | null;
  action_slug: string;
  action_text: string;
  project_slug: string | null;
  path_slug: string | null;
  domain_slug: string | null;
  tier: string;
  verification_status: string;
  title: string;
  description: string | null;
  evidence_type: string;
  metadata: Record<string, unknown>;
  trust_weight: number;
  identity_impact: string | null;
  next_step_guidance: string | null;
  submitted_at: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
};

function rowToSubmission(row: EvidenceSubmissionRow): EvidenceSubmission {
  return {
    id: row.id,
    user_slug: row.user_slug,
    transformation_loop_id: row.transformation_loop_id,
    action_slug: row.action_slug,
    action_text: row.action_text,
    project_slug: row.project_slug,
    path_slug: row.path_slug,
    domain_slug: row.domain_slug,
    tier: row.tier as EvidenceSubmission['tier'],
    verification_status: row.verification_status as EvidenceSubmission['verification_status'],
    title: row.title,
    description: row.description,
    evidence_type: row.evidence_type as EvidenceSubmission['evidence_type'],
    metadata: row.metadata,
    trust_weight: row.trust_weight,
    identity_impact: row.identity_impact,
    next_step_guidance: row.next_step_guidance,
    submitted_at: row.submitted_at,
    verified_at: row.verified_at,
  };
}

export async function getEvidenceByActionSlug(
  userSlug: string,
  actionSlug: string
): Promise<EvidenceSubmission | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data, error } = await client
    .from('evidence_submissions')
    .select('*')
    .eq('user_slug', userSlug)
    .eq('action_slug', actionSlug)
    .maybeSingle();

  if (error || !data) return null;
  return rowToSubmission(data as EvidenceSubmissionRow);
}

export async function upsertEvidenceSubmission(
  record: Omit<EvidenceSubmission, 'id'> & { id?: string }
): Promise<{ row: EvidenceSubmission | null; persisted: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { row: null, persisted: false, error: 'Supabase not configured' };
  }
  const client = createServiceClient();
  if (!client) {
    return { row: null, persisted: false, error: 'Service client unavailable' };
  }

  const payload = {
    user_slug: record.user_slug,
    transformation_loop_id: record.transformation_loop_id ?? null,
    action_slug: record.action_slug,
    action_text: record.action_text,
    project_slug: record.project_slug ?? null,
    path_slug: record.path_slug ?? null,
    domain_slug: record.domain_slug ?? null,
    tier: record.tier,
    verification_status: record.verification_status,
    title: record.title,
    description: record.description ?? null,
    evidence_type: record.evidence_type,
    metadata: record.metadata,
    trust_weight: record.trust_weight,
    identity_impact: record.identity_impact ?? null,
    next_step_guidance: record.next_step_guidance ?? null,
    submitted_at: record.submitted_at ?? new Date().toISOString(),
    verified_at: record.verified_at ?? null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('evidence_submissions')
    .upsert(payload, { onConflict: 'user_slug,action_slug' })
    .select('*')
    .single();

  if (error) {
    return { row: null, persisted: false, error: error.message };
  }

  const row = rowToSubmission(data as EvidenceSubmissionRow);

  await client.from('platform_metrics').upsert(
    {
      metric_key: 'evidence_submissions_total',
      metric_value: { count: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );
  if (record.verification_status !== 'pending' && record.verification_status !== 'rejected') {
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'evidence_verified_count',
        metric_value: { count: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'evidence_trust_weight_avg',
        metric_value: { avg: record.trust_weight },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'identity_evidence_strength',
        metric_value: { score: record.trust_weight },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }

  return { row, persisted: true };
}

export async function ensureDemoEvidenceSubmission(
  buildRecord: (loopId?: string | null) => Omit<EvidenceSubmission, 'id'>
): Promise<{ row: EvidenceSubmission | null; persisted: boolean; error?: string; loopLinked: boolean }> {
  const client = createServiceClient();
  let loopId: string | null = null;

  if (client) {
    const { data: loop } = await client
      .from('transformation_loops')
      .select('id')
      .eq('user_slug', 'demo-user')
      .maybeSingle();
    loopId = loop?.id ?? null;
  }

  const existing = await getEvidenceByActionSlug('demo-user', 'deliver-first-speech');
  if (existing?.verification_status === 'verified') {
    return {
      row: existing,
      persisted: true,
      loopLinked: Boolean(existing.transformation_loop_id),
    };
  }

  const record = buildRecord(loopId);
  const result = await upsertEvidenceSubmission(record);
  return {
    ...result,
    loopLinked: Boolean(loopId ?? record.transformation_loop_id),
  };
}

export async function getEvidenceKpiCounts(): Promise<{
  evidence_submissions_total: number;
  evidence_verified_count: number;
  evidence_trust_weight_avg: number;
  identity_evidence_strength: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: total } = await client
    .from('evidence_submissions')
    .select('*', { count: 'exact', head: true });

  const { count: verified } = await client
    .from('evidence_submissions')
    .select('*', { count: 'exact', head: true })
    .neq('verification_status', 'pending')
    .neq('verification_status', 'rejected');

  const { data: avgRow } = await client
    .from('evidence_submissions')
    .select('trust_weight')
    .limit(100);

  const weights = (avgRow ?? []).map((r) => r.trust_weight as number);
  const avg =
    weights.length > 0 ? weights.reduce((a, b) => a + b, 0) / weights.length : 0;

  return {
    evidence_submissions_total: total ?? 0,
    evidence_verified_count: verified ?? 0,
    evidence_trust_weight_avg: avg,
    identity_evidence_strength: avg,
  };
}
