import { createServiceClient } from './client';
import { isSupabaseConfigured } from './env';
import {
  AI_BUILDER_ACTION_SLUG,
  AI_BUILDER_ASSET_SLUG,
  AI_BUILDER_COMMUNITY_SLUG,
  AI_BUILDER_DOMAIN_BLUEPRINT,
  AI_BUILDER_DOMAIN_SLUG,
  DEMO_USER_SLUG,
  blueprintToRecord,
  buildAiBuilderLoopRecord,
  buildDomainProofChecklistFromState,
  isDomainProofOperational,
  type DomainProofState,
  type IdentityDomainSnapshot,
  type DomainTransformationLoop,
} from '@foundry/domain-blueprint';
import { ensureDomainBlueprintSeeded } from './domain-proof';
import { calculateReputationFromEvidence } from '@foundry/reputation-engine';
import { assignMasteryFromEvidence } from '@foundry/mastery-engine';
import type { EvidenceInput } from '@foundry/reputation-engine';

async function seedAiBuilderBlueprint(): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;
  const record = blueprintToRecord(AI_BUILDER_DOMAIN_BLUEPRINT);
  const { error } = await client.from('domain_blueprints').upsert(
    { ...record, status: 'active', updated_at: new Date().toISOString() },
    { onConflict: 'slug' }
  );
  return !error;
}

async function upsertAiBuilderLoop(
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
        evidence: { status: 'Project completed' },
        reflections: {
          surprised: 'AI solved my problem faster than I expected.',
          learned: 'Shipping a small project beats watching another tutorial.',
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
    next_action_why: loop.next_action_why,
    loop_complete: data.loop_complete,
  };
}

async function upsertAiBuilderEvidence(): Promise<{ id: string } | null> {
  const client = createServiceClient();
  if (!client) return null;

  const payload = {
    user_slug: DEMO_USER_SLUG,
    action_slug: AI_BUILDER_ACTION_SLUG,
    action_text: 'Use AI to solve a real problem and document what you built',
    project_slug: 'use-ai-to-solve-problem',
    path_slug: 'road-to-ai-builder',
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    tier: 'verified',
    verification_status: 'verified',
    title: 'Project completed — AI problem solved',
    description:
      'Built a weekly meal-planning workflow using AI. Documented inputs, prompts, and output. Saved ~2 hours per week.',
    evidence_type: 'project',
    metadata: {
      project_type: 'workflow',
      problem: 'meal planning',
      tools: ['ChatGPT', 'Google Sheets'],
    },
    trust_weight: 50,
    identity_impact: 'AI Explorer — first project verified',
    next_step_guidance: 'Build your first automation',
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

async function upsertAiBuilderCollection(evidenceId: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const assetPayload = {
    user_slug: DEMO_USER_SLUG,
    slug: AI_BUILDER_ASSET_SLUG,
    display_name: 'My AI Toolkit',
    description: 'Personal Knowledge Asset — projects, workflows, and evidence from first AI build.',
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    asset_type: 'project_portfolio',
    identity_impact: 'AI Explorer — documented first project',
    evidence_linked: true,
    entity_count: 1,
    metadata: { first_project: true },
    updated_at: new Date().toISOString(),
  };

  const { data: asset, error: assetError } = await client
    .from('personal_knowledge_assets')
    .upsert(assetPayload, { onConflict: 'user_slug,slug' })
    .select('id')
    .single();

  if (assetError || !asset) return false;

  await client.from('personal_knowledge_asset_items').upsert(
    {
      asset_id: asset.id,
      entity_slug: 'meal-planning-workflow',
      entity_display_name: 'Meal Planning Workflow',
      sort_order: 1,
      personal_notes: 'First AI project — weekly meal plan automation.',
      evidence_submission_id: evidenceId,
    },
    { onConflict: 'asset_id,entity_slug' }
  );
  return true;
}

async function upsertAiBuilderCommunity(evidenceId: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const bp = AI_BUILDER_DOMAIN_BLUEPRINT;
  const { data: community, error: cErr } = await client
    .from('community_instances')
    .upsert(
      {
        slug: AI_BUILDER_COMMUNITY_SLUG,
        display_name: bp.community.display_name,
        tagline: 'Ship projects together — not just chat about AI',
        vertical_slug: AI_BUILDER_DOMAIN_SLUG,
        domain_slug: AI_BUILDER_DOMAIN_SLUG,
        community_type: bp.community.community_type,
        host_user_slug: 'steve-grappe',
        region: 'Global',
        member_count: 128,
        status: 'active',
        metadata: { capabilities: ['members', 'projects', 'feedback', 'collections'] },
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
      user_slug: DEMO_USER_SLUG,
      role: 'member',
      joined_at: new Date().toISOString(),
      recognition: 'AI Explorer Candidate — First Project Complete',
      recognized_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,user_slug' }
  );

  await client.from('community_project_assignments').upsert(
    {
      community_id: community.id,
      project_slug: 'use-ai-to-solve-problem',
      project_title: 'Use AI to Solve a Problem',
      assigned_to_user_slug: DEMO_USER_SLUG,
      assigned_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,project_slug' }
  );

  await client.from('community_evidence_shares').upsert(
    {
      community_id: community.id,
      evidence_submission_id: evidenceId,
      shared_by_user_slug: DEMO_USER_SLUG,
      shared_at: new Date().toISOString(),
    },
    { onConflict: 'community_id,evidence_submission_id' }
  );

  return true;
}

async function upsertAiBuilderReputation(evidence: EvidenceInput): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const calculated = calculateReputationFromEvidence({
    ...evidence,
    action_slug: AI_BUILDER_ACTION_SLUG,
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    title: evidence.title || 'Project completed',
  });
  const record = {
    ...calculated,
    reputation_title: 'Trusted AI Explorer Candidate',
    identity_impact: 'Trusted AI Explorer Candidate — trust derived from verified project evidence',
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

async function upsertAiBuilderMastery(evidence: EvidenceInput, reputationId?: string): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const built = assignMasteryFromEvidence(evidence, {
    id: reputationId,
    reputation_title: 'Trusted AI Explorer Candidate',
    trust_weight: evidence.trust_weight,
  });

  const record = {
    ...built,
    path_slug: 'road-to-ai-builder',
    path_display_name: 'Road to AI Builder',
    milestone_slug: 'milestone-1-first-project',
    milestone_label: 'Milestone 1 Complete',
    mastery_title: 'AI Explorer',
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    identity_impact: 'AI Explorer — first project verified on Road to AI Builder',
    community_instance_slug: AI_BUILDER_COMMUNITY_SLUG,
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

async function upsertAiBuilderIdentity(): Promise<boolean> {
  const client = createServiceClient();
  if (!client) return false;

  const { data: existing } = await client
    .from('identity_domain_snapshots')
    .select('*')
    .eq('user_slug', DEMO_USER_SLUG)
    .maybeSingle();

  const titles = new Set<string>(['Public Speaker', 'Bourbon Enthusiast', 'AI Explorer']);
  const domains: IdentityDomainSnapshot['domains'] = [
    { slug: 'public-speaking', title: 'Public Speaker', progress_label: 'Milestone 1 Complete' },
    { slug: 'bourbon', title: 'Bourbon Enthusiast', progress_label: 'Milestone 1 Complete' },
    { slug: AI_BUILDER_DOMAIN_SLUG, title: 'AI Explorer', progress_label: 'Milestone 1 Complete' },
  ];

  if (existing?.identity_titles) {
    for (const t of existing.identity_titles as string[]) titles.add(t);
  }

  const snapshot: IdentityDomainSnapshot = {
    user_slug: DEMO_USER_SLUG,
    identity_titles: Array.from(titles),
    domains,
    cross_domain_summary:
      'Cross-domain growth: becoming a Public Speaker, Bourbon Enthusiast, and AI Explorer — same infrastructure, Life Leverage paths.',
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

export async function ensureAiBuilderDomainProof(): Promise<{
  blueprint: typeof AI_BUILDER_DOMAIN_BLUEPRINT;
  loop: DomainTransformationLoop | null;
  identity: IdentityDomainSnapshot | null;
  checklist: ReturnType<typeof buildDomainProofChecklistFromState>;
  complete: boolean;
  persisted: boolean;
  error?: string;
}> {
  const blueprint = AI_BUILDER_DOMAIN_BLUEPRINT;

  if (!isSupabaseConfigured()) {
    const loop = buildAiBuilderLoopRecord();
    const state: DomainProofState = {
      loop,
      evidenceSubmitted: true,
      collectionCreated: true,
      communityJoined: true,
      reputationUpdated: true,
      masteryAssigned: true,
      identityUpdated: true,
      persisted: false,
    };
    const checklist = buildDomainProofChecklistFromState(state);
    return {
      blueprint,
      loop,
      identity: {
        user_slug: DEMO_USER_SLUG,
        identity_titles: ['Public Speaker', 'AI Explorer'],
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
  await seedAiBuilderBlueprint();

  const loop = await upsertAiBuilderLoop(buildAiBuilderLoopRecord());
  const evidenceRow = await upsertAiBuilderEvidence();

  if (!evidenceRow?.id) {
    return {
      blueprint,
      loop,
      identity: null,
      checklist: buildDomainProofChecklistFromState({
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
      error: 'AI Builder evidence not persisted',
    };
  }

  const evidence: EvidenceInput = {
    id: evidenceRow.id,
    user_slug: DEMO_USER_SLUG,
    action_slug: AI_BUILDER_ACTION_SLUG,
    domain_slug: AI_BUILDER_DOMAIN_SLUG,
    tier: 'verified',
    verification_status: 'verified',
    trust_weight: 50,
    title: 'Project completed — AI problem solved',
  };

  const collectionOk = await upsertAiBuilderCollection(evidenceRow.id);
  const communityOk = await upsertAiBuilderCommunity(evidenceRow.id);
  const reputationOk = await upsertAiBuilderReputation(evidence);

  const client = createServiceClient();
  let reputationId: string | undefined;
  if (client) {
    const { data: rep } = await client
      .from('reputation_records')
      .select('id')
      .eq('user_slug', DEMO_USER_SLUG)
      .eq('evidence_submission_id', evidenceRow.id)
      .maybeSingle();
    reputationId = rep?.id as string | undefined;
  }

  const masteryOk = await upsertAiBuilderMastery(evidence, reputationId);
  const identityOk = await upsertAiBuilderIdentity();

  let identity: IdentityDomainSnapshot | null = null;
  if (client) {
    const { data } = await client
      .from('identity_domain_snapshots')
      .select('*')
      .eq('user_slug', DEMO_USER_SLUG)
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

  const persisted = Boolean(
    loop && evidenceRow && collectionOk && communityOk && reputationOk && masteryOk && identityOk
  );

  if (persisted && client) {
    const { count } = await client
      .from('domain_transformation_loops')
      .select('*', { count: 'exact', head: true })
      .eq('loop_complete', true);

    await client.from('platform_metrics').upsert(
      {
        metric_key: 'domain_proofs_complete',
        metric_value: { count: count ?? 2, domain: AI_BUILDER_DOMAIN_SLUG },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );

    const { count: blueprintCount } = await client
      .from('domain_blueprints')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    await client.from('platform_metrics').upsert(
      {
        metric_key: 'domain_blueprints_active',
        metric_value: { count: blueprintCount ?? 2 },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'metric_key' }
    );
  }

  const state: DomainProofState = {
    loop,
    evidenceSubmitted: Boolean(evidenceRow),
    collectionCreated: collectionOk,
    communityJoined: communityOk,
    reputationUpdated: reputationOk,
    masteryAssigned: masteryOk,
    identityUpdated: identityOk,
    persisted,
  };

  const checklist = buildDomainProofChecklistFromState(state);
  const complete = isDomainProofOperational(checklist, persisted);

  return { blueprint, loop, identity, checklist, complete, persisted };
}
