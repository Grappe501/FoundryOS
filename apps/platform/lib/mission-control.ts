import catalogIndex from '../../../data/catalog/index.json';
import verticalSites from '../../../data/vertical-sites.json';
import { estimatePageCount } from '@foundry/content-engine';

export const PLATFORM_VERSION = '0.2.0-core-data-architecture';

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
    summary:
      '1,961 topics, vertical domains, SEO/KG/topic-registry, mission control, admin dashboards.',
  },
  {
    code: 'PASS-002',
    title: 'Core Data Architecture',
    status: 'completed' as const,
    date: '2026-06-10',
    summary:
      'Universal entities, content engine, collections, reputation schema, ENTITY/COLLECTION/REPUTATION docs.',
  },
  {
    code: 'PASS-003',
    title: 'Supabase Live + Auth',
    status: 'planned' as const,
    summary: 'Provision project, run migrations, RLS verify, storage buckets.',
  },
  {
    code: 'PASS-004',
    title: 'Hostname Resolution',
    status: 'planned' as const,
    summary: 'Vertical domain routing, topic + entity path resolution.',
  },
  {
    code: 'PASS-005',
    title: 'SEO + Content Factory Live',
    status: 'planned' as const,
    summary: 'Auto-generate content pages, structured data, sitemaps.',
  },
  {
    code: 'PASS-006',
    title: 'Knowledge Graph Live',
    status: 'planned' as const,
    summary: 'Entity ingestion, relationship linking, internal links.',
  },
  {
    code: 'PASS-007',
    title: 'Collections Live',
    status: 'planned' as const,
    summary: 'User collections, public shelves, cross-vertical.',
  },
  {
    code: 'PASS-008',
    title: 'Reputation Live',
    status: 'planned' as const,
    summary: 'Trust scores, expertise titles, Tier 3 attribution.',
  },
  {
    code: 'PASS-009',
    title: 'Bourbon Launch',
    status: 'planned' as const,
    summary: 'bourbon.foundryos.com vertical live.',
  },
  {
    code: 'PASS-010',
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
    topics_in_registry: TOPIC_COUNT,
    verticals: catalogIndex.total_verticals,
    vertical_domains_planned: verticalSites.sites.filter((s) => s.type === 'vertical').length,
    entity_types_defined: 9,
    content_types_defined: 11,
    estimated_seo_pages: ESTIMATED_PAGES,
    verticals_live: 0,
    topics_published: 0,
    entities_published: 0,
    collections_created: 0,
    reviews_written: 0,
    users_registered: 0,
    clubs_active: 0,
    ai_experts_deployed: 0,
    launch_readiness_pct: 28,
    last_pass: 'PASS-002',
    next_pass: 'PASS-003',
    current_focus: 'Core data architecture complete — Supabase provisioning next',
    open_risks: ['Supabase not provisioned', 'Netlify domains not wired'],
  };
}
