/** PASS-015 — Customer Acquisition Infrastructure + Growth Factory */

import { getLaunchCostSnapshot } from './domain-launch-cost';
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
  { label: 'Exceptional Domains', target: '5', deadline: 'Jan 2027' },
  { label: 'Factory capacity', target: '100+ domains launchable', deadline: 'Jan 2027' },
  { label: 'Cost to launch (factory)', target: '< 1 hour', deadline: 'Post PASS-024' },
  { label: 'Registered users', target: '25,000', deadline: 'Jan 2027' },
  { label: 'Paid users', target: '2,500', deadline: 'Jan 2027' },
  { label: 'MRR', target: '$10,000–25,000', deadline: 'Jan 2027' },
  { label: 'Factory automation', target: '80%+', deadline: 'PASS-024' },
];

export const REVENUE_MILESTONES = [
  { period: 'Sep 2026', paid_users: 10, mrr: '$40', note: '1 active domain · 100 users · validation' },
  { period: 'Oct 2026', paid_users: 50, mrr: '$200', note: '3 active domains · 500 users' },
  { period: 'Nov 2026', paid_users: 200, mrr: '$800', note: '5 active domains · 2,000 users' },
  { period: 'Jan 2027', paid_users: 2500, mrr: '$10k–25k', note: '5 exceptional domains + factory for 100 · Future-Proof Academy funnel' },
  { period: 'End 2027', paid_users: 50000, mrr: '$250k–500k', note: 'If factory works' },
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
  factory_target_hours: number;
  next_domain_target_hours: number;
  avg_automation_pct: number;
  factory_automation_target_pct: number;
};

export function getLaunchCostKpiSnapshot(): LaunchCostKpiSnapshot {
  const s = getLaunchCostSnapshot();
  return {
    avg_hours_completed: s.avg_hours_completed,
    factory_target_hours: s.factory_target_hours,
    next_domain_target_hours: s.next_domain_target_hours,
    avg_automation_pct: s.avg_automation_pct,
    factory_automation_target_pct: s.factory_automation_target_pct,
  };
}

export { getLaunchCostSnapshot, DOMAIN_LAUNCH_COST_REGISTRY } from './domain-launch-cost';

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
