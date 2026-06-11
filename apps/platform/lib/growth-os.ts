/** PASS-015 — Customer Acquisition Infrastructure + Growth Factory */

import { getLaunchCostSnapshot } from './domain-launch-cost';
import { getWorldDepthSnapshot } from './world-depth/audit';
import { countExploreCatalogPaths } from './explore-catalog';

export const GROWTH_NORTH_STAR = 'Monthly Active Transformations';

export const PRODUCTION_LAUNCH = 'January 2027';

export const FIRST_TEN_DOMAINS = [
  'bourbon',
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'civic-engagement',
  'master-gardener',
  'poker',
  'soccer',
  'books',
  'movies',
] as const;

export const SEO_PAGE_TYPES = [
  'What Is',
  'Beginner Guide',
  'Road to Expert',
  'Top 100',
  'Best Of',
  'History Of',
  'Common Mistakes',
  'Projects',
  'Community',
] as const;

export type GrowthKpiSnapshot = {
  visitors: number;
  registered_users: number;
  active_users: number;
  paid_users: number;
  mrr_usd: number;
  cac_usd: number;
  referral_rate: number;
  seo_traffic: number;
  domains_built: number;
  active_domains: number;
  domain_activation_rate: number;
  monthly_active_transformations: number;
  monthly_active_communities: number;
  monthly_active_knowledge_assets: number;
  indexed_pages: number;
  domain_launch_velocity_days: number | null;
  domain_launch_velocity_target: number;
  public_catalog_paths: number;
};

export type GrowthTarget = {
  label: string;
  target: string;
  deadline: string;
};

export const JANUARY_2027_TARGETS: GrowthTarget[] = [
  { label: 'Active testers', target: '100', deadline: 'Jan 2027' },
  { label: 'Paying users', target: '25', deadline: 'Jan 2027' },
  { label: 'MRR', target: '$250', deadline: 'Jan 2027' },
  { label: 'Domains with proven retention', target: '3', deadline: 'Jan 2027' },
  { label: 'Domain with proven conversion', target: '1', deadline: 'Jan 2027' },
  { label: 'Factory capacity', target: '100+ domains launchable', deadline: 'Jan 2027' },
  { label: 'Flywheel connected', target: '4 factories compounding', deadline: 'PASS-032' },
];

export const REVENUE_MILESTONES = [
  { period: 'Jul 2026', paid_users: 25, mrr: '$0→$100', note: 'First 25 learning lane — prove conversion' },
  { period: 'Aug 2026', paid_users: 125, mrr: '$100→$500', note: 'SEO + lead magnets — AI Builder + FI' },
  { period: 'Sep 2026', paid_users: 375, mrr: '$500→$1,500', note: 'Public Speaking launch + parent/educator channels' },
  { period: 'Oct 2026', paid_users: 1250, mrr: '$1,500→$5,000', note: 'Email nurture + partnerships' },
  { period: 'Nov 2026', paid_users: 1875, mrr: '$5,000→$7,500', note: 'Affiliate + influencer pilots' },
  { period: 'Dec 2026', paid_users: 2250, mrr: '$7,500→$9,000', note: 'Holiday parent campaigns' },
  { period: 'Jan 2027', paid_users: 2500, mrr: '$10,000+', note: 'Production readiness — January 2027 target' },
  { period: 'End 2027', paid_users: 50000, mrr: '$250k–500k', note: 'If factory + marketing factory work' },
];

/**
 * Active Domain = full HPI stack operational (loop, evidence, collections, communities, reputation, mastery).
 * domains_built = blueprints started; active_domains = operational proofs.
 */
export function getGrowthKpiSnapshot(live?: Partial<GrowthKpiSnapshot>): GrowthKpiSnapshot {
  const active_domains = live?.active_domains ?? 1;
  const domains_built = live?.domains_built ?? Math.max(active_domains, 1);
  const domain_activation_rate =
    live?.domain_activation_rate ??
    (domains_built > 0 ? active_domains / domains_built : 0);

  return {
    visitors: live?.visitors ?? 0,
    registered_users: live?.registered_users ?? 0,
    active_users: live?.active_users ?? 0,
    paid_users: live?.paid_users ?? 0,
    mrr_usd: live?.mrr_usd ?? 0,
    cac_usd: live?.cac_usd ?? 0,
    referral_rate: live?.referral_rate ?? 0,
    seo_traffic: live?.seo_traffic ?? 0,
    domains_built,
    active_domains,
    domain_activation_rate,
    monthly_active_transformations: live?.monthly_active_transformations ?? 0,
    monthly_active_communities: live?.monthly_active_communities ?? 0,
    monthly_active_knowledge_assets: live?.monthly_active_knowledge_assets ?? 0,
    indexed_pages: live?.indexed_pages ?? 0,
    domain_launch_velocity_days: live?.domain_launch_velocity_days ?? null,
    domain_launch_velocity_target: live?.domain_launch_velocity_target ?? 7,
    public_catalog_paths: live?.public_catalog_paths ?? countExploreCatalogPaths(),
  };
}

export type LaunchCostKpiSnapshot = {
  avg_hours_completed: number | null;
  avg_factory_hours: number | null;
  factory_target_hours: number;
  next_domain_target_hours: number;
  avg_automation_pct: number;
  factory_automation_target_pct: number;
  domains_generated: number;
  domains_activated: number;
};

export function getLaunchCostKpiSnapshot(): LaunchCostKpiSnapshot {
  const s = getLaunchCostSnapshot();
  return {
    avg_hours_completed: s.avg_hours_completed,
    avg_factory_hours: s.avg_factory_hours,
    factory_target_hours: s.factory_target_hours,
    next_domain_target_hours: s.next_domain_target_hours,
    avg_automation_pct: s.avg_automation_pct,
    factory_automation_target_pct: s.factory_automation_target_pct,
    domains_generated: s.domains_generated,
    domains_activated: s.domains_activated,
  };
}

export { getLaunchCostSnapshot, DOMAIN_LAUNCH_COST_REGISTRY } from './domain-launch-cost';
export { getWorldDepthSnapshot, auditAllWorldDepth } from './world-depth/audit';
export { getWorldExperienceKpiSnapshot, getWorldExperienceSnapshot } from './world-experience/audit';

export type WorldDepthKpiSnapshot = {
  avg_depth_score: number;
  avg_consumer_readiness_pct: number;
  total_academy_lessons: number;
  total_glossary_terms: number;
  worlds: number;
};

export function getWorldDepthKpiSnapshot(): WorldDepthKpiSnapshot {
  const s = getWorldDepthSnapshot();
  return {
    avg_depth_score: s.avg_depth_score,
    avg_consumer_readiness_pct: s.avg_consumer_readiness_pct,
    total_academy_lessons: s.total_academy_lessons,
    total_glossary_terms: s.total_glossary_terms,
    worlds: s.worlds,
  };
}

export type DomainReadinessRow = {
  slug: string;
  label: string;
  depth: number;
  engagement: number;
  retention: number;
  conversion: number;
  readiness: number;
};

/** PASS-027 — Domain readiness score (Depth + Engagement + Retention + Conversion) */
export function getDomainReadinessPlaceholder(): DomainReadinessRow[] {
  const depth = getWorldDepthSnapshot();
  return depth.rows.map((r) => ({
    slug: r.slug,
    label: r.displayName,
    depth: r.depthScore,
    engagement: 0,
    retention: 0,
    conversion: 0,
    readiness: Math.round(r.depthScore * 0.3),
  }));
}

export const DOMAIN_READINESS_LABELS = {
  depth: 'Depth',
  engagement: 'Engagement',
  retention: 'Retention',
  conversion: 'Conversion',
  readiness: 'Readiness',
} as const;

export const GROWTH_STAT_LABELS: Record<keyof GrowthKpiSnapshot, string> = {
  visitors: 'Visitors',
  registered_users: 'Registered Users',
  active_users: 'Active Users',
  paid_users: 'Paid Users',
  mrr_usd: 'MRR',
  cac_usd: 'CAC',
  referral_rate: 'Referral Rate',
  seo_traffic: 'SEO Traffic',
  domains_built: 'Domains Built',
  active_domains: 'Active Domains',
  domain_activation_rate: 'Domain Activation Rate',
  monthly_active_transformations: 'Monthly Active Transformations',
  monthly_active_communities: 'Monthly Active Communities',
  monthly_active_knowledge_assets: 'Monthly Active Knowledge Assets',
  indexed_pages: 'Indexed Pages',
  domain_launch_velocity_days: 'Domain Launch Velocity (days)',
  domain_launch_velocity_target: 'Launch Velocity Target (Q4)',
  public_catalog_paths: 'Public Catalog Paths',
};
