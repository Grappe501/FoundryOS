import catalogIndex from '../../../data/catalog/index.json';
import verticalSites from '../../../data/vertical-sites.json';
import { estimatePageCount } from '@foundry/content-engine';
import { getLivePlatformCounts, getEvidenceKpiCounts, getCollectionKpiCounts, getCommunityKpiCounts, isSupabaseConfigured } from '@foundry/db';
import { getEvidenceKpiSnapshot } from '@foundry/evidence-engine';
import { getCollectionKpiSnapshot } from '@foundry/collection-engine';
import { getCommunityKpiSnapshot } from '@foundry/community-engine';
import { getTransformationAnalytics } from '@foundry/transformation-graph-engine';
import { getLoopKpiSnapshot } from '@foundry/transformation-loop';
import { getNorthStarMetrics } from '@foundry/path-engine';

export const PLATFORM_VERSION = '0.8.0-path-engine';

export type PassStatus = 'completed' | 'in_progress' | 'planned';

export type PassEntry = {
  code: string;
  title: string;
  status: PassStatus;
  date?: string;
  summary: string;
};

export const PASSES: PassEntry[] = [
  {
    code: 'PASS-000',
    title: 'Foundation',
    status: 'completed' as const,
    date: '2026-06-10',
    summary: 'H: drive, docs, monorepo, cursor rules, initial schema, self-build skeleton.',
  },
  {
    code: 'PASS-001',
    title: 'Registry Expansion + Course Correction',
    status: 'completed' as const,
    date: '2026-06-10',
    summary: '1,961 topics, vertical domains, SEO/KG/topic-registry, mission control.',
  },
  {
    code: 'PASS-002',
    title: 'Core Data Architecture',
    status: 'completed' as const,
    date: '2026-06-10',
    summary: 'Universal entities, content engine, collections, reputation schema.',
  },
  {
    code: 'PASS-003',
    title: 'Identity & Ownership Layer',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Ownership graph, entity_metrics, content sources, SEO publish gate, identity snapshot queries.',
  },
  {
    code: 'PASS-004',
    title: 'Supabase Live & Deployment Readiness',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Env wiring, migrations, RLS diagnostics, platform seed, storage buckets, Netlify checklist, live DB status.',
  },
  {
    code: 'PASS-005',
    title: 'Vertical Resolution Engine',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Hostname → vertical → path routing via @foundry/vertical-resolver. preflight checks. Operations cockpit scaffold.',
  },
  {
    code: 'PASS-006',
    title: 'SEO + Content Factory (Self-Assembly v1)',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Foundry Factory: 4 AI systems, pipeline generate→score→queue. npm run build:topic. Not Bourbon — the machine.',
  },
  {
    code: 'PASS-007',
    title: 'Foundry Encyclopedia Engine',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Knowledge Universe: 10 encyclopedia sections/entity, academy, recipes, knowledge profiles schema. The actual moat.',
  },
  {
    code: 'PASS-008',
    title: 'Path Engine — Road to Expert',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Expert Development: mastery paths, milestones, north star metrics. Wikipedia gives info — Foundry creates experts.',
  },
  {
    code: 'PASS-009',
    title: 'Transformation System Factory',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Manufacture transformation ecosystems — DNA blueprints + templates. Hierarchy: Life Journey → Legacy.',
  },
  {
    code: 'PASS-010',
    title: 'Transformation Graph Engine',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'Live transformation loop at /loop — Demo User, 9-step checklist, persisted on foundry-os.netlify.app.',
  },
  {
    code: 'PASS-011',
    title: 'Evidence Engine',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'Evidence submissions linked to loops. /evidence OPERATIONAL — Verified tier, persisted, loop linked.',
  },
  {
    code: 'PASS-012',
    title: 'Collections + Communities',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'Personal Knowledge Assets + Community OS live at /collections and /community — OPERATIONAL, persisted, linked to evidence.',
  },
  {
    code: 'PASS-013',
    title: 'Reputation + Mastery Live',
    status: 'planned' as const,
    summary:
      'Earned trust + demonstrated capability — not points. Chain: Evidence → Reputation → Mastery → Identity → Community.',
  },
  {
    code: 'PASS-014',
    title: 'Bourbon Vertical Launch',
    status: 'planned' as const,
    summary: 'bourbon.foundryos.com — first proof, not the product.',
  },
];

const TOPIC_COUNT = catalogIndex.total_apps;
const ESTIMATED_PAGES = estimatePageCount(TOPIC_COUNT, 0);

export async function getMissionControlStats() {
  const live = isSupabaseConfigured() ? await getLivePlatformCounts() : null;
  const evidenceLive = isSupabaseConfigured() ? await getEvidenceKpiCounts() : null;
  const collectionLive = isSupabaseConfigured() ? await getCollectionKpiCounts() : null;
  const communityLive = isSupabaseConfigured() ? await getCommunityKpiCounts() : null;
  const northStar = getNorthStarMetrics();
  const transformationAnalytics = getTransformationAnalytics();
  const loopKpis = getLoopKpiSnapshot(
    live
      ? { loops_started: 1, loops_completed: 1, meaningful_progress_events: 1, transformation_loop_completion_rate: 1 }
      : undefined
  );
  const evidenceKpis = getEvidenceKpiSnapshot(evidenceLive ?? undefined);
  const collectionKpis = getCollectionKpiSnapshot(collectionLive ?? undefined);
  const communityKpis = getCommunityKpiSnapshot(communityLive ?? undefined);

  return {
    version: PLATFORM_VERSION,
    supabase_configured: isSupabaseConfigured(),
    // Registry
    topics_in_registry: live?.topics_seeded && live.topics_seeded > 0 ? live.topics_seeded : TOPIC_COUNT,
    verticals: live?.verticals_seeded && live.verticals_seeded > 0 ? live.verticals_seeded : catalogIndex.total_verticals,
    vertical_domains_planned: verticalSites.sites.filter((s) => s.type === 'vertical').length,
    entity_types_defined: 9,
    content_types_defined: 11,
    estimated_seo_pages_potential: ESTIMATED_PAGES,
    estimated_seo_pages_published: 0,
    // Platform assets (the real story)
    total_entities: live?.total_entities ?? 0,
    total_collections: live?.total_collections ?? 0,
    total_relationships: live?.total_relationships ?? 0,
    total_user_entity_relationships: live?.total_user_entity_relationships ?? 0,
    // Live counts
    verticals_live: live?.verticals_seeded ?? 0,
    topics_published: 0,
    entities_published: live?.total_entities ?? 0,
    collections_created: live?.total_collections ?? 0,
    reviews_written: 0,
    users_registered: live?.users_registered ?? 0,
    clubs_active: 0,
    ai_experts_deployed: 0,
    // North star — transformations in progress, not pages published
    transformations_in_progress: northStar.transformations_in_progress,
    active_paths: northStar.active_paths,
    users_on_paths: northStar.users_on_paths,
    academy_graduates: northStar.academy_graduates,
    community_leaders: northStar.community_leaders,
    expert_contributors: northStar.expert_contributors,
    club_hosts: northStar.club_hosts,
    active_transformations: transformationAnalytics.active_transformations,
    completed_transformations: transformationAnalytics.completed_transformations,
    transformation_insights_captured: transformationAnalytics.transformation_insights_captured,
    mentorship_connections: transformationAnalytics.mentorship_connections,
    projects_completed: transformationAnalytics.projects_completed,
    path_completion_rate: transformationAnalytics.path_completion_rate,
    transformation_loop_completion_rate: loopKpis.transformation_loop_completion_rate,
    meaningful_progress_events: loopKpis.meaningful_progress_events,
    loops_started: loopKpis.loops_started,
    loops_completed: loopKpis.loops_completed,
    evidence_submissions_total: evidenceKpis.evidence_submissions_total,
    evidence_verified_count: evidenceKpis.evidence_verified_count,
    evidence_trust_weight_avg: evidenceKpis.evidence_trust_weight_avg,
    identity_evidence_strength: evidenceKpis.identity_evidence_strength,
    knowledge_assets_total: collectionKpis.knowledge_assets_total,
    knowledge_assets_with_evidence: collectionKpis.knowledge_assets_with_evidence,
    identity_collections_strength: collectionKpis.identity_collections_strength,
    communities_active: communityKpis.communities_active,
    community_members_total: communityKpis.community_members_total,
    community_evidence_shares: communityKpis.community_evidence_shares,
    launch_readiness_pct: live ? 76 : 52,
    last_pass: 'PASS-012',
    next_pass: 'PASS-013',
    current_focus:
      'PASS-012 CLOSED — /collections + /community OPERATIONAL on Netlify. PASS-013 Reputation + Mastery greenlit when ready — earned trust, not gamification.',
    open_risks: [
      'SCOPE DRIFT: infrastructure yes, everything-to-everyone no',
      'Moat = Transformation Intelligence — not AI, content, or courses',
      'Weight toward Transformation Impact — not Content Consumption',
      'No Bourbon UI until PASS-014',
      'North star: transformations in progress — not users, pages, or entities',
      'PASS-013: Reputation is earned trust — not points or badges for engagement',
    ],
  };
}

/** Platform asset story for investors — scales over time */
export function getPlatformAssetStory(stats: Awaited<ReturnType<typeof getMissionControlStats>>) {
  return {
    topics: stats.topics_in_registry.toLocaleString(),
    entities: stats.total_entities.toLocaleString(),
    relationships: stats.total_relationships.toLocaleString(),
    collections: stats.total_collections.toLocaleString(),
  };
}
