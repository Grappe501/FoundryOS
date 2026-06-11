/** PASS-015 — Customer Acquisition Infrastructure + Growth Factory */

import { ACTIVE_DOMAINS_JAN_2027_TARGET } from './growth-factory';

export const GROWTH_NORTH_STAR = 'Monthly Active Transformations';

export const PRODUCTION_LAUNCH = 'January 2027';

export const FIRST_TEN_DOMAINS = [
  'bourbon',
  'ai-builder',
  'public-speaking',
  'civic-engagement',
  'master-gardener',
  'bbq',
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
};

export type GrowthTarget = {
  label: string;
  target: string;
  deadline: string;
};

export const JANUARY_2027_TARGETS: GrowthTarget[] = [
  { label: 'Active Domains', target: String(ACTIVE_DOMAINS_JAN_2027_TARGET), deadline: 'Jan 2027' },
  { label: 'Registered users', target: '100,000', deadline: 'Jan 2027' },
  { label: 'Paid users', target: '5,000', deadline: 'Jan 2027' },
  { label: 'MRR', target: '$20,000–50,000', deadline: 'Jan 2027' },
  { label: 'Indexed pages', target: '250,000', deadline: 'Jan 2027' },
];

export const REVENUE_MILESTONES = [
  { period: 'Sep 2026', paid_users: 10, mrr: '$40', note: '1 active domain · 100 users · validation' },
  { period: 'Oct 2026', paid_users: 50, mrr: '$200', note: '3 active domains · 500 users' },
  { period: 'Nov 2026', paid_users: 200, mrr: '$800', note: '5 active domains · 2,000 users' },
  { period: 'Jan 2027', paid_users: 1000, mrr: '$4,000', note: '10 active domains · 10,000 users · factory scales' },
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
  };
}

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
};
