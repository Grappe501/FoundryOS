import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import type {
  CommunityEvidenceShare,
  CommunityMember,
  CommunityOS,
  CommunityProjectAssignment,
} from '@foundry/community-engine';

export type CommunityInstanceRow = {
  id: string;
  slug: string;
  display_name: string;
  tagline: string | null;
  vertical_slug: string;
  domain_slug: string;
  community_type: string;
  host_user_slug: string;
  region: string | null;
  member_count: number;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

function rowToCommunity(row: CommunityInstanceRow): CommunityOS {
  return {
    id: row.id,
    slug: row.slug,
    display_name: row.display_name,
    tagline: row.tagline ?? '',
    vertical_slug: row.vertical_slug,
    domain_slug: row.domain_slug,
    community_type: row.community_type as CommunityOS['community_type'],
    host_user_slug: row.host_user_slug,
    region: row.region ?? undefined,
    capabilities: (row.metadata.capabilities as CommunityOS['capabilities']) ?? ['members', 'projects'],
    member_count: row.member_count,
    status: row.status as CommunityOS['status'],
  };
}

export async function getCommunityBySlug(slug: string): Promise<{
  community: CommunityOS | null;
  member: CommunityMember | null;
  project: CommunityProjectAssignment | null;
  evidenceShare: CommunityEvidenceShare | null;
}> {
  if (!isSupabaseConfigured()) {
    return { community: null, member: null, project: null, evidenceShare: null };
  }
  const client = createServiceClient();
  if (!client) {
    return { community: null, member: null, project: null, evidenceShare: null };
  }

  const { data: row } = await client.from('community_instances').select('*').eq('slug', slug).maybeSingle();
  if (!row) return { community: null, member: null, project: null, evidenceShare: null };

  const community = rowToCommunity(row as CommunityInstanceRow);

  const { data: memberRow } = await client
    .from('community_members')
    .select('*')
    .eq('community_id', community.id!)
    .eq('user_slug', 'demo-user')
    .maybeSingle();

  const { data: projectRow } = await client
    .from('community_project_assignments')
    .select('*')
    .eq('community_id', community.id!)
    .maybeSingle();

  const { data: shareRow } = await client
    .from('community_evidence_shares')
    .select('*')
    .eq('community_id', community.id!)
    .maybeSingle();

  return {
    community,
    member: memberRow
      ? {
          id: memberRow.id,
          community_id: memberRow.community_id,
          user_slug: memberRow.user_slug,
          role: memberRow.role,
          joined_at: memberRow.joined_at,
        }
      : null,
    project: projectRow
      ? {
          id: projectRow.id,
          community_id: projectRow.community_id,
          project_slug: projectRow.project_slug,
          project_title: projectRow.project_title,
          assigned_to_user_slug: projectRow.assigned_to_user_slug,
          assigned_at: projectRow.assigned_at,
        }
      : null,
    evidenceShare: shareRow
      ? {
          id: shareRow.id,
          community_id: shareRow.community_id,
          evidence_submission_id: shareRow.evidence_submission_id,
          shared_by_user_slug: shareRow.shared_by_user_slug,
          shared_at: shareRow.shared_at,
        }
      : null,
  };
}

export async function ensureDemoCommunity(
  buildCommunity: () => CommunityOS,
  buildMember: (communityId: string) => Omit<CommunityMember, 'id'>,
  buildProject: (communityId: string) => Omit<CommunityProjectAssignment, 'id'>,
  buildEvidenceShare: (communityId: string, evidenceId: string) => Omit<CommunityEvidenceShare, 'id'>
): Promise<{
  community: CommunityOS | null;
  member: CommunityMember | null;
  project: CommunityProjectAssignment | null;
  evidenceShare: CommunityEvidenceShare | null;
  persisted: boolean;
  error?: string;
}> {
  const slug = buildCommunity().slug;
  const existing = await getCommunityBySlug(slug);
  if (
    existing.community &&
    existing.member &&
    existing.project &&
    existing.evidenceShare?.evidence_submission_id
  ) {
    return { ...existing, persisted: true };
  }

  if (!isSupabaseConfigured()) {
    return { ...existing, persisted: false, error: 'Supabase not configured' };
  }
  const client = createServiceClient();
  if (!client) {
    return { ...existing, persisted: false, error: 'Service client unavailable' };
  }

  const c = buildCommunity();
  const communityPayload = {
    slug: c.slug,
    display_name: c.display_name,
    tagline: c.tagline,
    vertical_slug: c.vertical_slug,
    domain_slug: c.domain_slug,
    community_type: c.community_type,
    host_user_slug: c.host_user_slug ?? 'demo-user',
    region: c.region ?? null,
    member_count: c.member_count,
    status: c.status,
    metadata: { capabilities: c.capabilities },
    updated_at: new Date().toISOString(),
  };

  const { data: communityRow, error: communityError } = await client
    .from('community_instances')
    .upsert(communityPayload, { onConflict: 'slug' })
    .select('*')
    .single();

  if (communityError || !communityRow) {
    return {
      community: null,
      member: null,
      project: null,
      evidenceShare: null,
      persisted: false,
      error: communityError?.message,
    };
  }

  const communityId = communityRow.id as string;

  const memberPayload = { ...buildMember(communityId), community_id: communityId };
  await client.from('community_members').upsert(memberPayload, { onConflict: 'community_id,user_slug' });

  const projectPayload = { ...buildProject(communityId), community_id: communityId };
  await client
    .from('community_project_assignments')
    .upsert(projectPayload, { onConflict: 'community_id,project_slug' });

  const { data: evidence } = await client
    .from('evidence_submissions')
    .select('id')
    .eq('user_slug', 'demo-user')
    .eq('action_slug', 'deliver-first-speech')
    .maybeSingle();

  const evidenceId = evidence?.id as string | undefined;
  if (evidenceId) {
    const sharePayload = { ...buildEvidenceShare(communityId, evidenceId), community_id: communityId };
    await client
      .from('community_evidence_shares')
      .upsert(sharePayload, { onConflict: 'community_id,evidence_submission_id' });
  }

  const fresh = await getCommunityBySlug(slug);

  await client.from('platform_metrics').upsert(
    {
      metric_key: 'communities_active',
      metric_value: { count: 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );
  await client.from('platform_metrics').upsert(
    {
      metric_key: 'community_members_total',
      metric_value: { count: fresh.community?.member_count ?? 1 },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'metric_key' }
  );

  return { ...fresh, persisted: true };
}

export async function getCommunityKpiCounts(): Promise<{
  communities_active: number;
  community_members_total: number;
  community_evidence_shares: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: active } = await client
    .from('community_instances')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: members } = await client.from('community_members').select('*', { count: 'exact', head: true });

  const { count: shares } = await client
    .from('community_evidence_shares')
    .select('*', { count: 'exact', head: true });

  return {
    communities_active: active ?? 0,
    community_members_total: members ?? 0,
    community_evidence_shares: shares ?? 0,
  };
}
