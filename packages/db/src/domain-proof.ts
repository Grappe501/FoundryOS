import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import {
  BOURBON_ACTION_SLUG,
  BOURBON_ASSET_SLUG,
  BOURBON_COMMUNITY_SLUG,
  BOURBON_DOMAIN_BLUEPRINT,
  BOURBON_DOMAIN_SLUG,
  blueprintToRecord,
  buildBourbonLoopRecord,
  buildDomainProofChecklist,
  isDomainProofComplete,
  type BourbonProofState,
  type DomainTransformationLoop,
  type IdentityDomainSnapshot,
} from '@foundry/domain-blueprint';
import { calculateReputationFromEvidence } from '@foundry/reputation-engine';
import { assignMasteryFromEvidence } from '@foundry/mastery-engine';
import type { EvidenceInput } from '@foundry/reputation-engine';

export async function ensureDomainBlueprintSeeded(): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;
  const record = blueprintToRecord(BOURBON_DOMAIN_BLUEPRINT);
  const { error } = await client.from('domain_blueprints').upsert(
    { ...record, status: 'active', updated_at: new Date().toISOString() },
    { onConflict: 'slug' }
  );
  if (!error) {
    await client.from('platform_metrics').upsert(
      {
        metric_key: 'domain_blueprints_active',
        metric_value: { count: 1 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }
  return !error;
}

async function upsertDomainLoop(
  loop: Omit<DomainTransformationLoop, 'id'>
): Promise<DomainTransformationLoop | null> {
  const client = createServiceClient();
  if (!client) return null;

  const { data, error } = await client
    .from('domain_transformation_loops')
    .upsert(
      {
        user_slug: loop.user_slug,
        domain_slug: loop.domain_slug,
        user_display_name: 'Demo User',
        goal: loop.goal,
        outcome_slug: loop.outcome_slug,
        outcome_display_name: loop.outcome_display_name,
        path_slug: loop.path_slug,
        path_display_name: loop.path_display_name,
        project_slug: loop.project_slug,
        project_display_name: loop.project_display_name,
        action_text: loop.action_text,
        action_slug: loop.action_slug,
        evidence: { status: 'Blind tasting completed' },
        reflections: {
          surprised: 'I preferred wheated bourbons more than I expected.',
          learned: 'Mash bill changes the entire profile.',
        },
        insight: loop.insight,
        next_action: loop.next_action,
        next_action_why: loop.next_action_why,
        loop_complete: loop.loop_complete,
        status: 'complete',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_slug,domain_slug' }
    )
    .select('*')
    .single();

  if (error || !data) return null;
  return {
    id: data.id,
    user_slug: data.user_slug,
    domain_slug: data.domain_slug,
    goal: data.goal,
    outcome_slug: data.outcome_slug,
    outcome_display_name: data.outcome_display_name,
    path_slug: data.path_slug,
    path_display_name: data.path_display_name,
    project_slug: data.project_slug,
    project_display_name: data.project_display_name,
    action_text: data.action_text,
    action_slug: data.action_slug,
    insight: data.insight,
    next_action: data.next_action,
    next_action_why: data.next_action_why,
    loop_complete: data.loop_complete,
  };
}

async function upsertBourbonEvidence(): Promise<{ id: string } | null> {
  const client = createServiceClient();
  if (!client) return null;

  const payload = {
    user_slug: 'demo-user',
    action_slug: BOURBON_ACTION_SLUG,
    action_text: 'Compare 4 bourbons and record notes',
    project_slug: 'host-first-blind-tasting',
    path_slug: 'road-to-bourbon-enthusiast',
    domain_slug: BOURBON_DOMAIN_SLUG,
    tier: 'verified',
    verification_status: 'verified',
    title: 'Blind tasting completed — 4 bourbons compared',
    description:
      'Compared Buffalo Trace, Maker\'s Mark, Weller Special Reserve, and Larceny. Recorded notes on nose, palate, finish.',
    evidence_type: 'event',
    metadata: {
      bourbons: ['Buffalo Trace', "Maker's Mark", 'Weller Special Reserve', 'Larceny'],
      preference: 'wheated',
      location: 'Home tasting',
    },
    trust_weight: 50,
    identity_impact: 'Bourbon Enthusiast — first blind tasting verified',
    next_step_guidance: "Explore Maker's Mark, Weller, Larceny",
    submitted_at: new Date().toISOString(),
    verified_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from('evidence_submissions')
    .upsert(payload, { onConflict: 'user_slug,action_slug' })
    .select('id')
    .single();

  return error || !data ? null : { id: data.id as string };
}

async function upsertBourbonCollection(evidenceId: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const assetPayload = {
    user_slug: 'demo-user',
    slug: BOURBON_ASSET_SLUG,
    display_name: 'My Bourbon Shelf',
    description: 'Personal Knowledge Asset — starter shelf with tasting notes and evidence from first blind tasting.',
    domain_slug: BOURBON_DOMAIN_SLUG,
    asset_type: 'bourbon_collection',
    identity_impact: 'Bourbon Enthusiast — documented starter shelf',
    evidence_linked: true,
    entity_count: 4,
    metadata: { starter_shelf: true, tasting_complete: true },
    updated_at: new Date().toISOString(),
  };

  const { data: asset, error: assetError } = await client
    .from('personal_knowledge_assets')
    .upsert(assetPayload, { onConflict: 'user_slug,slug' })
    .select('id')
    .single();

  if (assetError || !asset) return false;

  const items = [
    { entity_slug: 'buffalo-trace', entity_display_name: "Buffalo Trace", sort_order: 1, personal_rating: 7.5 },
    { entity_slug: 'makers-mark', entity_display_name: "Maker's Mark", sort_order: 2, personal_rating: 8.0 },
    { entity_slug: 'weller-special-reserve', entity_display_name: 'Weller Special Reserve', sort_order: 3, personal_rating: 8.5 },
    { entity_slug: 'larceny', entity_display_name: 'Larceny', sort_order: 4, personal_rating: 8.0 },
  ];

  for (const item of items) {
    await client.from('personal_knowledge_asset_items').upsert(
      {
        asset_id: asset.id,
        ...item,
        personal_notes: 'First blind tasting — wheated preference noted.',
        evidence_submission_id: evidenceId,
      },
      { onConflict: 'asset_id,entity_slug' }
    );
  }
  return true;
}

async function upsertBourbonCommunity(evidenceId: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const bp = BOURBON_DOMAIN_BLUEPRINT;
  const { data: community, error: cErr } = await client
    .from('community_instances')
    .upsert(
      {
        slug: BOURBON_COMMUNITY_SLUG,
        display_name: bp.community.display_name,
        tagline: 'Shared mastery — not just social',
        vertical_slug: BOURBON_DOMAIN_SLUG,
        domain_slug: BOURBON_DOMAIN_SLUG,
        community_type: bp.community.community_type,
        host_user_slug: 'steve-grappe',
        region: 'Central Arkansas',
        member_count: 24,
        status: 'active',
        metadata: { capabilities: ['members', 'projects', 'tastings', 'collections'] },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' }
    )
    .select('id')
    .single();

  if (cErr || !community) return false;

  await client.from('community_members').upsert(
    {
      community_id: community.id,
      user_slug: 'demo-user',
      role: 'member',
      joined_at: new Date().toISOString(),
      recognition: 'Trusted Bourbon Enthusiast Candidate — Milestone 1 Complete',
      recognized_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,user_slug' }
  );

  await client.from('community_project_assignments').upsert(
    {
      community_id: community.id,
      project_slug: 'host-first-blind-tasting',
      project_title: 'Host First Blind Tasting',
      assigned_to_user_slug: 'demo-user',
      assigned_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,project_slug' }
  );

  await client.from('community_evidence_shares').upsert(
    {
      community_id: community.id,
      evidence_submission_id: evidenceId,
      shared_by_user_slug: 'demo-user',
      shared_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,evidence_submission_id' }
  );

  return true;
}

async function upsertBourbonReputation(evidence: EvidenceInput): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const calculated = calculateReputationFromEvidence({
    ...evidence,
    action_slug: BOURBON_ACTION_SLUG,
    domain_slug: BOURBON_DOMAIN_SLUG,
    title: evidence.title || 'Blind tasting completed',
  });
  const record = {
    ...calculated,
    reputation_title: 'Trusted Bourbon Enthusiast Candidate',
    identity_impact:
      'Trusted Bourbon Enthusiast Candidate — trust derived from verified blind tasting evidence',
  };

  const { error } = await client.from('reputation_records').upsert(
    {
      user_slug: record.user_slug,
      evidence_submission_id: record.evidence_submission_id,
      domain_slug: record.domain_slug,
      scope: record.scope,
      reputation_title: record.reputation_title,
      trust_weight: record.trust_weight,
      identity_impact: record.identity_impact,
      calculated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_slug,evidence_submission_id' }
  );
  return !error;
}

async function upsertBourbonMastery(evidence: EvidenceInput, reputationId?: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const built = assignMasteryFromEvidence(evidence, {
    id: reputationId,
    reputation_title: 'Trusted Bourbon Enthusiast Candidate',
    trust_weight: evidence.trust_weight,
  });

  const record = {
    ...built,
    path_slug: 'road-to-bourbon-enthusiast',
    path_display_name: 'Road to Bourbon Enthusiast',
    milestone_slug: 'milestone-1-blind-tasting',
    milestone_label: 'Milestone 1 Complete',
    mastery_title: 'Bourbon Enthusiast',
    domain_slug: BOURBON_DOMAIN_SLUG,
    identity_impact: 'Public Speaker Path Progress unchanged — Bourbon Enthusiast Milestone 1 Complete',
    community_instance_slug: BOURBON_COMMUNITY_SLUG,
    community_recognition_updated: true,
  };

  const { error } = await client.from('mastery_assignments').upsert(
    {
      user_slug: record.user_slug,
      evidence_submission_id: record.evidence_submission_id,
      reputation_record_id: reputationId ?? null,
      domain_slug: record.domain_slug,
      path_slug: record.path_slug,
      path_display_name: record.path_display_name,
      milestone_slug: record.milestone_slug,
      milestone_label: record.milestone_label,
      mastery_title: record.mastery_title,
      identity_impact: record.identity_impact,
      community_instance_slug: record.community_instance_slug,
      community_recognition_updated: record.community_recognition_updated,
      assigned_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_slug,path_slug,milestone_slug' }
  );
  return !error;
}

async function upsertIdentitySnapshot(): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const snapshot: IdentityDomainSnapshot = {
    user_slug: 'demo-user',
    identity_titles: ['Public Speaker', 'Bourbon Enthusiast'],
    domains: [
      { slug: 'public-speaking', title: 'Public Speaker', progress_label: 'Milestone 1 Complete' },
      { slug: BOURBON_DOMAIN_SLUG, title: 'Bourbon Enthusiast', progress_label: 'Milestone 1 Complete' },
    ],
    cross_domain_summary:
      'Cross-domain growth: Demo User is becoming both a Public Speaker and a Bourbon Enthusiast — same infrastructure, different domains.',
  };

  const { error } = await client.from('identity_domain_snapshots').upsert(
    {
      user_slug: snapshot.user_slug,
      identity_titles: snapshot.identity_titles,
      domains: snapshot.domains,
      cross_domain_summary: snapshot.cross_domain_summary,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_slug' }
  );
  return !error;
}

export async function ensureBourbonDomainProof(): Promise<{
  blueprint: typeof BOURBON_DOMAIN_BLUEPRINT;
  loop: DomainTransformationLoop | null;
  identity: IdentityDomainSnapshot | null;
  checklist: ReturnType<typeof buildDomainProofChecklist>;
  complete: boolean;
  persisted: boolean;
  error?: string;
}> {
  const blueprint = BOURBON_DOMAIN_BLUEPRINT;

  if (!isSupabaseConfigured()) {
    const loop = buildBourbonLoopRecord();
    const state: BourbonProofState = {
      loop,
      evidenceSubmitted: true,
      collectionCreated: true,
      communityJoined: true,
      reputationUpdated: true,
      masteryAssigned: true,
      identityUpdated: true,
      persisted: false,
    };
    const checklist = buildDomainProofChecklist(state);
    return {
      blueprint,
      loop,
      identity: {
        user_slug: 'demo-user',
        identity_titles: ['Public Speaker', 'Bourbon Enthusiast'],
        domains: [],
        cross_domain_summary: null,
      },
      checklist,
      complete: false,
      persisted: false,
      error: 'Supabase not configured',
    };
  }

  await ensureDomainBlueprintSeeded();
  const loop = await upsertDomainLoop(buildBourbonLoopRecord());
  const evidenceRow = await upsertBourbonEvidence();

  if (!evidenceRow?.id) {
    return {
      blueprint,
      loop,
      identity: null,
      checklist: buildDomainProofChecklist({
        loop,
        evidenceSubmitted: false,
        collectionCreated: false,
        communityJoined: false,
        reputationUpdated: false,
        masteryAssigned: false,
        identityUpdated: false,
        persisted: false,
      }),
      complete: false,
      persisted: false,
      error: 'Bourbon evidence not persisted',
    };
  }

  const evidence: EvidenceInput = {
    id: evidenceRow.id,
    user_slug: 'demo-user',
    action_slug: BOURBON_ACTION_SLUG,
    domain_slug: BOURBON_DOMAIN_SLUG,
    tier: 'verified',
    verification_status: 'verified',
    trust_weight: 50,
    title: 'Blind tasting completed — 4 bourbons compared',
  };

  const collectionOk = await upsertBourbonCollection(evidenceRow.id);
  const communityOk = await upsertBourbonCommunity(evidenceRow.id);
  const reputationOk = await upsertBourbonReputation(evidence);

  const client = createServiceClient();
  let reputationId: string | undefined;
  if (client) {
    const { data: rep } = await client
      .from('reputation_records')
      .select('id')
      .eq('user_slug', 'demo-user')
      .eq('evidence_submission_id', evidenceRow.id)
      .maybeSingle();
    reputationId = rep?.id as string | undefined;
  }

  const masteryOk = await upsertBourbonMastery(evidence, reputationId);
  const identityOk = await upsertIdentitySnapshot();

  const client2 = createServiceClient();
  let identity: IdentityDomainSnapshot | null = null;
  if (client2) {
    const { data } = await client2
      .from('identity_domain_snapshots')
      .select('*')
      .eq('user_slug', 'demo-user')
      .maybeSingle();
    if (data) {
      identity = {
        user_slug: data.user_slug,
        identity_titles: data.identity_titles as string[],
        domains: data.domains as IdentityDomainSnapshot['domains'],
        cross_domain_summary: data.cross_domain_summary,
      };
    }
  }

  const persisted = Boolean(loop && evidenceRow && collectionOk && communityOk && reputationOk && masteryOk && identityOk);

  if (persisted && client2) {
    await client2.from('platform_metrics').upsert(
      {
        metric_key: 'domain_proofs_complete',
        metric_value: { count: 1, domain: BOURBON_DOMAIN_SLUG },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }

  const state: BourbonProofState = {
    loop,
    evidenceSubmitted: Boolean(evidenceRow),
    collectionCreated: collectionOk,
    communityJoined: communityOk,
    reputationUpdated: reputationOk,
    masteryAssigned: masteryOk,
    identityUpdated: identityOk,
    persisted,
  };

  const checklist = buildDomainProofChecklist(state);
  const complete = isDomainProofComplete(checklist, persisted);

  return { blueprint, loop, identity, checklist, complete, persisted };
}

export async function getDomainProofKpiCounts(): Promise<{
  domain_blueprints_active: number;
  domain_proofs_complete: number;
} | null> {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;

  const { count: blueprints } = await client
    .from('domain_blueprints')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: proofs } = await client
    .from('domain_transformation_loops')
    .select('*', { count: 'exact', head: true })
    .eq('loop_complete', true);

  return {
    domain_blueprints_active: blueprints ?? 0,
    domain_proofs_complete: proofs ?? 0,
  };
}

export async function getDomainBlueprintFromDb(slug: string) {
  if (!isSupabaseConfigured()) return null;
  const client = createServiceClient();
  if (!client) return null;
  const { data } = await client.from('domain_blueprints').select('*').eq('slug', slug).maybeSingle();
  return data;
}
