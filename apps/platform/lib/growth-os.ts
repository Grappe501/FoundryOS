/** PASS-015 scaffold — Customer Acquisition Infrastructure */

export const GROWTH_NORTH_STAR = 'Monthly Active Transformations';

export const PRODUCTION_LAUNCH = 'January 2027';

export const FIRST_TEN_DOMAINS = [
  'bourbon',
  'bbq',
  'poker',
  'public-speaking',
  'ai-builder',
  'master-gardener',
  'books',
  'movies',
  'college-baseball',
  'campaign-management',
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
  domains_live: number;
  monthly_active_transformations: number;
  indexed_pages: number;
};

export type GrowthTarget = {
  label: string;
  target: string;
  deadline: string;
};

export const JANUARY_2027_TARGETS: GrowthTarget[] = [
  { label: 'Domains live', target: '25', deadline: 'Jan 2027' },
  { label: 'Registered users', target: '100,000', deadline: 'Jan 2027' },
  { label: 'Paid users', target: '5,000', deadline: 'Jan 2027' },
  { label: 'MRR', target: '$20,000–50,000', deadline: 'Jan 2027' },
  { label: 'Indexed pages', target: '250,000', deadline: 'Jan 2027' },
];

export const REVENUE_MILESTONES = [
  { period: 'Q3 2026', paid_users: 100, mrr: '$500', note: 'Proof of monetization' },
  { period: 'Q4 2026', paid_users: 1000, mrr: '$5,000–10,000', note: 'Scale signal' },
  { period: 'Jan 2027', paid_users: 5000, mrr: '$20,000–50,000', note: 'Production launch' },
  { period: 'End 2027', paid_users: 50000, mrr: '$250k–500k', note: 'If factory works' },
];

/** Baseline until analytics wired — domain proof counts as 1 live domain */
export function getGrowthKpiSnapshot(live?: Partial<GrowthKpiSnapshot>): GrowthKpiSnapshot {
  return {
    visitors: live?.visitors ?? 0,
    registered_users: live?.registered_users ?? 0,
    active_users: live?.active_users ?? 0,
    paid_users: live?.paid_users ?? 0,
    mrr_usd: live?.mrr_usd ?? 0,
    cac_usd: live?.cac_usd ?? 0,
    referral_rate: live?.referral_rate ?? 0,
    seo_traffic: live?.seo_traffic ?? 0,
    domains_live: live?.domains_live ?? 1,
    monthly_active_transformations: live?.monthly_active_transformations ?? 0,
    indexed_pages: live?.indexed_pages ?? 0,
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
  domains_live: 'Domains Live',
  monthly_active_transformations: 'Monthly Active Transformations',
  indexed_pages: 'Indexed Pages',
};
