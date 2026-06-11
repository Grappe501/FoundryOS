/** PASS-031 — Marketing Factory types */

export type MarketingAudience = 'students' | 'parents' | 'educators' | 'adult_learners' | 'hobbyists';

export type MarketingBlueprint = {
  slug: string;
  display_name: string;
  frame: string;
  outcome_statement: string;
  care_reason: string;
  parent_headline: string;
  portfolio_label: string;
  community_name: string;
  priority_tier: 'primary' | 'expansion' | 'retention';
  target_audiences: MarketingAudience[];
  missions: { slug: string; title: string }[];
  seo_pages: { slug: string; title: string; intent: string }[];
  projects: string[];
  tier_2_hook: string;
  tier_3_hook: string;
  traffic_sources: string[];
};

export type MarketingManifest = {
  slug: string;
  display_name: string;
  generated_at: string;
  pass: 'PASS-031';
  priority_tier: string;
  artifacts: string[];
  automation_pct: number;
};

export type MrrMilestone = {
  period: string;
  mrr_target_usd: number;
  mrr_range?: string;
  paid_users_target: number;
  focus: string;
};

export const MARKETING_ARTIFACTS = [
  'README.md',
  'manifest.json',
  'seo-map.md',
  'seo-cluster-map.json',
  'seo-top-100.md',
  'youtube-topics.md',
  'tiktok-topics.md',
  'lead-magnets.md',
  'email-sequence.md',
  'parent-messaging.md',
  'educator-messaging.md',
  'social-calendar.md',
  'content-calendar-30d.md',
  'partnership-targets.md',
  'LAUNCH_CHECKLIST.md',
  'growth-plan.json',
] as const;
