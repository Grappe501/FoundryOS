import catalogIndex from '../../../data/catalog/index.json';
import verticalSites from '../../../data/vertical-sites.json';
import { estimatePageCount } from '@foundry/content-engine';

export const PLATFORM_VERSION = '0.3.0-identity-ownership';

export const PASSES = [
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
    title: 'Supabase Live',
    status: 'planned' as const,
    summary: 'Steve provisions project, run migrations, auth, storage buckets, RLS verify.',
  },
  {
    code: 'PASS-005',
    title: 'Hostname Resolution',
    status: 'planned' as const,
    summary: 'Vertical domain routing, topic + entity paths.',
  },
  {
    code: 'PASS-006',
    title: 'SEO + Content Factory Live',
    status: 'planned' as const,
    summary: 'Publish qualified pages only (score >= 70), sitemaps staged.',
  },
  {
    code: 'PASS-007',
    title: 'Knowledge Graph Live',
    status: 'planned' as const,
    summary: 'Entity ingestion, relationship linking.',
  },
  {
    code: 'PASS-008',
    title: 'Collections + Ownership Live',
    status: 'planned' as const,
    summary: 'User shelves, favorites, watchlists via ownership graph.',
  },
  {
    code: 'PASS-009',
    title: 'Reputation Live',
    status: 'planned' as const,
    summary: 'Trust scores, expertise, Tier 3 attribution.',
  },
  {
    code: 'PASS-010',
    title: 'Bourbon Launch',
    status: 'planned' as const,
    summary: 'bourbon.foundryos.com vertical live.',
  },
  {
    code: 'PASS-011',
    title: 'Books Launch',
    status: 'planned' as const,
    summary: 'books.foundryos.com vertical live.',
  },
];

const TOPIC_COUNT = catalogIndex.total_apps;
const ESTIMATED_PAGES = estimatePageCount(TOPIC_COUNT, 0);

export function getMissionControlStats() {
  return {
    version: PLATFORM_VERSION,
    // Registry
    topics_in_registry: TOPIC_COUNT,
    verticals: catalogIndex.total_verticals,
    vertical_domains_planned: verticalSites.sites.filter((s) => s.type === 'vertical').length,
    entity_types_defined: 9,
    content_types_defined: 11,
    estimated_seo_pages_potential: ESTIMATED_PAGES,
    estimated_seo_pages_published: 0,
    // Platform assets (the real story)
    total_entities: 0,
    total_collections: 0,
    total_relationships: 0,
    total_user_entity_relationships: 0,
    // Live counts
    verticals_live: 0,
    topics_published: 0,
    entities_published: 0,
    collections_created: 0,
    reviews_written: 0,
    users_registered: 0,
    clubs_active: 0,
    ai_experts_deployed: 0,
    launch_readiness_pct: 38,
    last_pass: 'PASS-003',
    next_pass: 'PASS-004',
    current_focus: 'Identity & ownership layer complete — Supabase provisioning next',
    open_risks: ['Supabase not provisioned', 'Do not bulk-publish SEO pages'],
  };
}

/** Platform asset story for investors — scales over time */
export function getPlatformAssetStory() {
  const s = getMissionControlStats();
  return {
    topics: s.topics_in_registry.toLocaleString(),
    entities: s.total_entities.toLocaleString(),
    relationships: s.total_relationships.toLocaleString(),
    collections: s.total_collections.toLocaleString(),
  };
}
