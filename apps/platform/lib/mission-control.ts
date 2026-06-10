import catalogIndex from '../../../data/catalog/index.json';
import verticalSites from '../../../data/vertical-sites.json';

export const PLATFORM_VERSION = '0.1.0-course-correction';

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
      '1,961 topics, vertical domains model, SEO engine, knowledge graph, topic registry, mission control.',
  },
  {
    code: 'PASS-002',
    title: 'Supabase Wiring',
    status: 'planned' as const,
    summary: 'Provision DB, run migrations, wire registry to Supabase.',
  },
  {
    code: 'PASS-003',
    title: 'Hostname Resolution',
    status: 'planned' as const,
    summary: 'Vertical domain routing, topic path resolution.',
  },
  {
    code: 'PASS-004',
    title: 'SEO Engine',
    status: 'planned' as const,
    summary: 'Structured data live, programmatic pages, sitemaps.',
  },
  {
    code: 'PASS-005',
    title: 'Knowledge Graph',
    status: 'planned' as const,
    summary: 'Entity ingestion, relationship linking, internal links.',
  },
];

export function getMissionControlStats() {
  return {
    version: PLATFORM_VERSION,
    topics_in_registry: catalogIndex.total_apps,
    verticals: catalogIndex.total_verticals,
    vertical_domains_planned: verticalSites.sites.filter((s) => s.type === 'vertical').length,
    verticals_live: 0,
    topics_published: 0,
    collections_created: 0,
    reviews_written: 0,
    users_registered: 0,
    clubs_active: 0,
    ai_experts_deployed: 0,
    launch_readiness_pct: 15,
    last_pass: 'PASS-001',
    next_pass: 'PASS-002',
    current_focus: 'Foundation systems before niche launch',
  };
}
