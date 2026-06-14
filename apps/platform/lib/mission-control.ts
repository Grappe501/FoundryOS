import catalogIndex from '../../../data/catalog/index.json';
import verticalSites from '../../../data/vertical-sites.json';
import { estimatePageCount } from '@foundry/content-engine';
import { getLivePlatformCounts, getEvidenceKpiCounts, getCollectionKpiCounts, getCommunityKpiCounts, getReputationKpiCounts, getMasteryKpiCounts, getDomainProofKpiCounts, ensureBourbonDomainProof, ensureAiBuilderDomainProof, isSupabaseConfigured } from '@foundry/db';
import { getEvidenceKpiSnapshot } from '@foundry/evidence-engine';
import { getCollectionKpiSnapshot } from '@foundry/collection-engine';
import { getCommunityKpiSnapshot } from '@foundry/community-engine';
import { getReputationKpiSnapshot } from '@foundry/reputation-engine';
import { getMasteryKpiSnapshot } from '@foundry/mastery-engine';
import { getDomainProofKpiSnapshot } from '@foundry/domain-blueprint';
import { getGrowthKpiSnapshot } from './growth-os';
import { getLaunchVelocitySnapshot } from './launch-factory-loader';
import { countExploreCatalogPaths } from './explore-catalog';
import { getTransformationAnalytics } from '@foundry/transformation-graph-engine';
import { getLoopKpiSnapshot } from '@foundry/transformation-loop';
import { getNorthStarMetrics } from '@foundry/path-engine';

export const PLATFORM_VERSION = '2.0.0-bourbon-confident-taster';
export const BOURBON_LEVEL_2_VERSION = '2.0.0-bourbon-confident-taster';

export type PassStatus = 'completed' | 'in_progress' | 'planned' | 'paused';

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
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      '/reputation + /mastery OPERATIONAL. Chain live: Evidence → Reputation → Mastery → Identity → Community. Human Potential Infrastructure core complete.',
  },
  {
    code: 'PASS-014',
    title: 'Domain Proof',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'Reusable Domain Blueprint — bourbon first instance. /bourbon + /verticals/bourbon OPERATIONAL. HPI stack proven in real domain.',
  },
  {
    code: 'PASS-015B',
    title: 'Launch Factory',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'npm run launch:domain — one command scaffolds platform + SEO + marketing + growth assets. AI Builder scaffolded.',
  },
  {
    code: 'PASS-016',
    title: 'AI Builder Active Domain',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'First Life Leverage Domain. /future-proof assessment + /ai-builder stranger entry. Foundry Trinity locked.',
  },
  {
    code: 'PASS-016A',
    title: 'Market Validation',
    status: 'paused' as const,
    date: '2026-06-11',
    summary: '/validation infrastructure live — stranger beta paused. Private build mode.',
  },
  {
    code: 'PASS-016C',
    title: 'Public Explore Catalog',
    status: 'completed' as const,
    date: '2026-06-11',
    summary: '/explore consumer path directory · /course-catalog operator alias · status colors · planned detail pages.',
  },
  {
    code: 'PASS-016D',
    title: 'Stranger Conversion Cleanup',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'Consumer journey nav · Start here CTA · Choose this path · interest capture · explore_viewed / path_clicked / interest_submitted events.',
  },
  {
    code: 'PASS-017',
    title: 'AI Builder World',
    status: 'completed' as const,
    date: '2026-06-11',
    summary:
      'World not course — missions, academy, playground, portfolio, parent view. Mission 1 walkthrough + tomorrow hook.',
  },
  {
    code: 'PASS-018',
    title: 'Financial Independence World',
    status: 'completed' as const,
    date: '2026-06-11',
    summary: 'Keep Value — missions, academy, My Wealth Portfolio, parent one-liner. Mission 1 close gate met.',
  },
  {
    code: 'PASS-019',
    title: 'Public Speaking World',
    status: 'completed' as const,
    date: '2026-06-11',
    summary: 'Communicate Value — completes Future-Proof Trinity. 5 missions, My Speaking Portfolio, parent one-liner. Close gate met.',
  },
  {
    code: 'PASS-021',
    title: 'Consumer Experience Polish',
    status: 'completed' as const,
    date: '2026-06-11',
    summary: 'Consumer home, /trinity, /parents, /my-journey, operator middleware, unified nav, cross-world journey.',
  },
  {
    code: 'PASS-020A',
    title: 'Domain Factory Audit',
    status: 'completed' as const,
    date: '2026-06-11',
    summary: 'world-factory package, audit:worlds + build:world stub. Baseline 43% automation.',
  },
  {
    code: 'PASS-020',
    title: 'Civic Engagement World',
    status: 'planned' as const,
    summary: 'Future-Proof Academy leg 4 — Improve Your Community. Last hand-guided Life Leverage world.',
  },
  {
    code: 'PASS-024',
    title: 'Factory Automation',
    status: 'completed' as const,
    summary: 'npm run build:world — 92% avg automation, ~1h factory launch. Bourbon/BBQ/Poker/Civic generated.',
  },
  {
    code: 'PASS-023',
    title: 'Bourbon Consumer World',
    status: 'completed' as const,
    summary: 'Passion Trinity #1 via factory — structure live at /bourbon.',
  },
  {
    code: 'PASS-025',
    title: 'World Depth Expansion',
    status: 'completed' as const,
    summary: '7 worlds deepened — 35 lessons, 50 glossary terms, guides, portfolio, parent, community per world.',
  },
  {
    code: 'PASS-022',
    title: 'Private Beta Readiness',
    status: 'completed' as const,
    summary: 'Auth, /beta waitlist, /pricing, mission sync to Supabase, /operator/beta dashboard.',
  },
  {
    code: 'PASS-026',
    title: 'Invite + Tester Operations',
    status: 'completed' as const,
    summary: '/operator/invites, /beta/welcome, first-25 cohort plan, invite/joined/active tracking.',
  },
  {
    code: 'PASS-027',
    title: 'Transformation Analytics & Learning Engine',
    status: 'completed' as const,
    summary: '/operator/analytics funnel, world + mission effectiveness, velocity, success indicators, /operator/feedback.',
  },
  {
    code: 'PASS-028',
    title: 'Community Activation',
    status: 'completed' as const,
    summary: '/community/[world] feed, weekly challenges, showcase, mentor recognition — 7 living communities.',
  },
  {
    code: 'PASS-028A',
    title: 'Community Seeding',
    status: 'completed' as const,
    summary: '25 discussions + 10 showcases + 12-week challenges + mentor profiles per world — atmosphere before billing.',
  },
  {
    code: 'PASS-029',
    title: 'Revenue Validation Infrastructure',
    status: 'completed' as const,
    summary: 'Pricing funnel instrumentation, upgrade moments, /operator/revenue + /operator/business, Stripe checkout Build $4 / Mastery $18.',
  },
  {
    code: 'PASS-029A',
    title: 'Revenue & Analytics Verification',
    status: 'completed' as const,
    summary: '5 test personas, attribution fixes, dashboard consistency, /operator/revenue/verify, npm run verify:revenue.',
  },
  {
    code: 'PASS-030',
    title: 'Learning Lane — First 25 Testers',
    status: 'planned' as const,
    summary: 'Deferred to PASS-034 — invite after World Immersion proves 30+ day depth.',
  },
  {
    code: 'PASS-031',
    title: 'Marketing Factory',
    status: 'completed' as const,
    summary: 'npm run build:marketing — SEO, YouTube, TikTok, lead magnets, email, social calendar per world — /operator/marketing.',
  },
  {
    code: 'PASS-032',
    title: 'World Immersion Expansion',
    status: 'in_progress' as const,
    summary: '25 AI Builder missions · 15 FI/PS/Civic · 10 Passion · tracks + experiences — 30+ days engagement before testers.',
  },
  {
    code: 'PASS-033',
    title: 'Growth Flywheel Engine',
    status: 'completed' as const,
    summary: 'Connect 4 factories — insight→marketing, marketing→world, revenue→product — /operator/flywheel.',
  },
  {
    code: 'PASS-034',
    title: 'First 25 Testers',
    status: 'planned' as const,
    summary: 'After immersion — 5×5 segments, no ads. Goal: "Wow, there is way more here than I expected."',
  },
  {
    code: 'PASS-040B3',
    title: 'Graph Enrichment + Inline Atlas Links',
    status: 'completed' as const,
    date: '2026-06-10',
    summary: 'InlineAtlasLink · GraphWanderFooter · link saturation on every graph route. npm run audit:graph-enrichment.',
  },
  {
    code: 'PASS-034P+',
    title: 'World Continuity Expansion',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      '@foundry/world-memory-engine · welcome-back panels · localStorage v1 · graph/compare/rabbit-hole memory · npm run audit:memory. Layer 1 stack complete.',
  },
  {
    code: 'PASS-040D',
    title: 'Personal Database Persistence',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Portable Identity — user_artifacts, user_memories, user_graph_history. Hydrate + write-through on auth. npm run verify:040d.',
  },
  {
    code: 'PASS-040D.5',
    title: 'Identity Sync Compound Loop',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      '@foundry/identity-sync-engine · propagateIdentityEvent · artifact→collection→narrative→memory→welcome-back→passport. npm run verify:040d5.',
  },
  {
    code: 'PASS-040C',
    title: 'Atlas-Aware AI',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      '@foundry/atlas-aware-ai · buildAtlasContext · portable identity context · Ask the Atlas panel · /operator/ai-context debugger. npm run verify:040c.',
  },
  {
    code: 'PASS-040E',
    title: 'Review Engine',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      '@foundry/review-engine · graph reviews · operator /operator/reviews · consumer panels on bourbon graph.',
  },
  {
    code: 'PASS-040F',
    title: 'Recommendation Engine v2',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      '@foundry/recommendation-engine-v2 · identity-aware recommendations · operator /operator/recommendations.',
  },
  {
    code: 'PASS-041',
    title: 'Bourbon Level 1 Depth + System v1.0',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      '32-bottle catalog (craft + rye + TN) · light/dark theme · whiskey category map · 11 campus maps · 13 detective cases · X-Ray overrides · authored academy L2–7 (35 lessons). npm run audit:bourbon-links · audit:bourbon-graph.',
  },
  {
    code: 'PASS-042',
    title: 'Bourbon Level 2 — Confident Taster',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      'Tasting Lab (8 flights) · Comparison Grid (6 presets) · Level 2 HQ · mash bill flight · 10 authored academy lessons with tryThis · local session storage · /bourbon/level-2 · /bourbon/tasting-lab.',
  },
  {
    code: 'PASS-043',
    title: 'Bourbon Craft Inventory — 55 Bottle Catalog',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      '55 bottles · 24 producers · 13 craft houses — major sweet-spot depth + 5 new craft distilleries · catalog-seeds sync · X-Ray overrides · craft compare presets · Tasting Lab craft + finish flights. npm run audit:bourbon-intelligence · audit:bourbon-graph · sandbox.',
  },
  {
    code: 'PASS-044',
    title: 'Bourbon Level 2 Comprehensive',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      '16 tasting flights · 12 comparison grids · 15 academy lessons · 16 curriculum modules · Palate Journal · Water & Proof Lab · flight grouping · expanded checkpoint logic.',
  },
  {
    code: 'PASS-045',
    title: 'Bourbon Level 2 — v2.0 Confident Taster Release',
    status: 'completed' as const,
    date: '2026-06-13',
    summary:
      'Level 2 tier semver `2.0.0-bourbon-confident-taster` — copy sync, landing doors, tool-depth, sandbox verified. Confident Taster surface production-complete.',
  },
];

const TOPIC_COUNT = catalogIndex.total_apps;
const ESTIMATED_PAGES = estimatePageCount(TOPIC_COUNT, 0);

export async function getMissionControlStats() {
  const live = isSupabaseConfigured() ? await getLivePlatformCounts() : null;
  const evidenceLive = isSupabaseConfigured() ? await getEvidenceKpiCounts() : null;
  const collectionLive = isSupabaseConfigured() ? await getCollectionKpiCounts() : null;
  const communityLive = isSupabaseConfigured() ? await getCommunityKpiCounts() : null;
  const reputationLive = isSupabaseConfigured() ? await getReputationKpiCounts() : null;
  const masteryLive = isSupabaseConfigured() ? await getMasteryKpiCounts() : null;
  const domainProofLive = isSupabaseConfigured()
    ? await Promise.all([ensureBourbonDomainProof(), ensureAiBuilderDomainProof(), getDomainProofKpiCounts()]).then(
        ([, , counts]) => counts
      )
    : null;
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
  const reputationKpis = getReputationKpiSnapshot(reputationLive ?? undefined);
  const masteryKpis = getMasteryKpiSnapshot(masteryLive ?? undefined);
  const domainProofKpis = getDomainProofKpiSnapshot(domainProofLive ?? undefined);
  const activeDomains = Math.max(domainProofKpis.domain_proofs_complete, 1);
  const domainsBuilt = Math.max(domainProofKpis.domain_blueprints_active, activeDomains, 1);
  const launchVelocity = getLaunchVelocitySnapshot();
  const growthKpis = getGrowthKpiSnapshot({
    active_domains: activeDomains,
    domains_built: domainsBuilt,
    domain_activation_rate: activeDomains / domainsBuilt,
    monthly_active_communities: communityKpis.communities_active,
    monthly_active_knowledge_assets: collectionKpis.knowledge_assets_total,
    domain_launch_velocity_days: launchVelocity.avg_days_blueprint_to_active,
    domain_launch_velocity_target: launchVelocity.target_q4_days,
    public_catalog_paths: countExploreCatalogPaths(),
  });

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
    reputation_records_total: reputationKpis.reputation_records_total,
    avg_reputation_trust_weight: reputationKpis.avg_trust_weight,
    identity_reputation_strength: reputationKpis.identity_reputation_strength,
    mastery_assignments_total: masteryKpis.mastery_assignments_total,
    community_recognitions_total: masteryKpis.community_recognitions_total,
    identity_mastery_strength: masteryKpis.identity_mastery_strength,
    domain_blueprints_active: domainProofKpis.domain_blueprints_active,
    domain_proofs_complete: domainProofKpis.domain_proofs_complete,
    // Growth OS — Customer Acquisition Infrastructure (PASS-015)
    visitors: growthKpis.visitors,
    registered_users_growth: growthKpis.registered_users,
    active_users: growthKpis.active_users,
    paid_users: growthKpis.paid_users,
    mrr_usd: growthKpis.mrr_usd,
    cac_usd: growthKpis.cac_usd,
    referral_rate: growthKpis.referral_rate,
    seo_traffic: growthKpis.seo_traffic,
    domains_built: growthKpis.domains_built,
    active_domains: growthKpis.active_domains,
    domain_activation_rate: growthKpis.domain_activation_rate,
    monthly_active_transformations: growthKpis.monthly_active_transformations,
    monthly_active_communities: growthKpis.monthly_active_communities,
    monthly_active_knowledge_assets: growthKpis.monthly_active_knowledge_assets,
    domain_launch_velocity_days: growthKpis.domain_launch_velocity_days,
    domain_launch_velocity_target: growthKpis.domain_launch_velocity_target,
    indexed_pages: growthKpis.indexed_pages,
    public_catalog_paths: growthKpis.public_catalog_paths,
    launch_readiness_pct: live ? 100 : 55,
    last_pass: 'PASS-045',
    next_pass: 'PASS-046',
    current_focus:
      'PASS-046 — Level 3 Shelf Builder depth. Level 2 v2.0 Confident Taster tier complete.',
    open_risks: [
      'Enable email confirmation in Supabase for production auth',
      'Stripe billing when ready to charge Build/Mastery tiers',
      'Invite-only beta — no public launch yet',
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
