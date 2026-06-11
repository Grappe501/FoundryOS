import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type { MasteryAssignment } from '@foundry/mastery-engine';
import { assignMasteryFromEvidence } from '@foundry/mastery-engine';
import type { EvidenceInput } from '@foundry/reputation-engine';
import { ensureDemoReputationRecord } from './reputation-records';

export type MasteryAssignmentRow = {
  id: string;
  user_slug: string;
  evidence_submission_id: string;
  reputation_record_id: string | null;
  domain_slug: string;
  path_slug: string;
  path_display_name: string;
  milestone_slug: string;
  milestone_label: string;
  mastery_title: string;
  identity_impact: string | null;
  community_instance_slug: string | null;
  community_recognition_updated: boolean;
  assigned_at: string;
  updated_at: string;
};

function rowToAssignment(row: MasteryAssignmentRow): MasteryAssignment {
  return {
    id: row.id,
    user_slug: row.user_slug,
    evidence_submission_id: row.evidence_submission_id,
    reputation_record_id: row.reputation_record_id,
    domain_slug: row.domain_slug,
    path_slug: row.path_slug,
    path_display_name: row.path_display_name,
    milestone_slug: row.milestone_slug,
    milestone_label: row.milestone_label,
    mastery_title: row.mastery_title,
    identity_impact: row.identity_impact,
    community_instance_slug: row.community_instance_slug,
    community_recognition_updated: row.community_recognition_updated,
    assigned_at: row.assigned_at,
  };
}

export async function getMasteryByUserAndMilestone(
  userSlug: string,
  pathSlug: string,
  milestoneSlug: string
): Promise<MasteryAssignment | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { data } = await client
    .from('mastery_assignments')
    .select('*')
    .eq('user_slug', userSlug)
    .eq('path_slug', pathSlug)
    .eq('milestone_slug', milestoneSlug)
    .maybeSingle();

  return data ? rowToAssignment(data as MasteryAssignmentRow) : null;
}

export async function upsertMasteryAssignment(
  record: Omit<MasteryAssignment, 'id'>
): Promise<{ row: MasteryAssignment | null; persisted: boolean; error?: string }> {
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
    reputation_record_id: record.reputation_record_id,
    domain_slug: record.domain_slug,
    path_slug: record.path_slug,
    path_display_name: record.path_display_name,
    milestone_slug: record.milestone_slug,
    milestone_label: record.milestone_label,
    mastery_title: record.mastery_title,
    identity_impact: record.identity_impact,
    community_instance_slug: record.community_instance_slug,
    community_recognition_updated: record.community_recognition_updated,
    assigned_at: record.assigned_at ?? new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('mastery_assignments')
    .upsert(payload, { onConflict: 'user_slug,path_slug,milestone_slug' })
    .select('*')
    .single();

  if (error) {
    return { row: null, persisted: false, error: error.message };
  }

  await client.from('platform_metrics').upsert(
    {
      metric_key: 'mastery_assignments_total',
      metric_value: { count: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );
  if (record.community_recognition_updated) {
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'community_recognitions_total',
        metric_value: { count: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }
  await client.from('platform_metrics').upsert(
    {
      metric_key: 'identity_mastery_strength',
      metric_value: { score: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );

  return { row: rowToAssignment(data as MasteryAssignmentRow), persisted: true };
}

async function updateCommunityRecognition(
  communitySlug: string,
  userSlug: string,
  recognition: string
): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const { data: community } = await client
    .from('community_instances')
    .select('id')
    .eq('slug', communitySlug)
    .maybeSingle();

  if (!community?.id) return false;

  const { error } = await client
    .from('community_members')
    .update({
      recognition,
      recognized_at: new Date().toISOString(),
    })
    .eq('community_id', community.id)
    .eq('user_slug', userSlug);

  return !error;
}

export async function ensureDemoMasteryAssignment(): Promise<{
  evidence: EvidenceInput | null;
  reputationCalculated: boolean;
  assignment: MasteryAssignment | null;
  persisted: boolean;
  error?: string;
}> {
  const repResult = await ensureDemoReputationRecord();
  if (!repResult.evidence?.id || !repResult.record) {
    return {
      evidence: repResult.evidence,
      reputationCalculated: false,
      assignment: null,
      persisted: false,
      error: repResult.error ?? 'Reputation must be calculated first',
    };
  }

  const pathSlug = 'road-to-confident-speaker';
  const milestoneSlug = 'milestone-1-first-speech';
  const existing = await getMasteryByUserAndMilestone('demo-user', pathSlug, milestoneSlug);
  if (existing?.community_recognition_updated && existing.mastery_title) {
    return {
      evidence: repResult.evidence,
      reputationCalculated: true,
      assignment: existing,
      persisted: true,
    };
  }

  const built = assignMasteryFromEvidence(repResult.evidence, repResult.record);
  const withRep = {
    ...built,
    evidence_submission_id: repResult.evidence.id,
    reputation_record_id: repResult.record.id ?? null,
  };

  const communitySlug = withRep.community_instance_slug ?? 'speaker-circle';
  const recognition = `${repResult.record.reputation_title} — ${withRep.milestone_label}`;
  const communityUpdated = await updateCommunityRecognition(
    communitySlug,
    'demo-user',
    recognition
  );

  const finalRecord = {
    ...withRep,
    community_recognition_updated: communityUpdated,
  };

  const result = await upsertMasteryAssignment(finalRecord);
  return {
    evidence: repResult.evidence,
    reputationCalculated: true,
    assignment: result.row,
    persisted: result.persisted,
    error: result.error,
  };
}

export async function getMasteryKpiCounts(): Promise<{
  mastery_assignments_total: number;
  community_recognitions_total: number;
  identity_mastery_strength: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: total } = await client
    .from('mastery_assignments')
    .select('*', { count: 'exact', head: true });

  const { count: recognitions } = await client
    .from('mastery_assignments')
    .select('*', { count: 'exact', head: true })
    .eq('community_recognition_updated', true);

  return {
    mastery_assignments_total: total ?? 0,
    community_recognitions_total: recognitions ?? 0,
    identity_mastery_strength: total && total > 0 ? 1 : 0,
  };
}
