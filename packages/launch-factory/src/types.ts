import type { DomainBlueprint } from '@foundry/domain-blueprint';

export const PASS_015B_TITLE = 'PASS-015B Launch Factory';
export const PASS_015B_PASS_GATE =
  'Does this create users, revenue, and retention — not another system?';
export const PASS_015B_COMMAND = 'npm run launch:domain <slug>';

export type LaunchSeoPage = {
  slug: string;
  title: string;
  intent: string;
};

export type LaunchGrowthPlan = {
  target_user: string;
  traffic_sources: string[];
  opportunity_score: number;
  tier_2_hook: string;
  tier_3_hook: string;
  kpis: string[];
};

export type LaunchDefinition = {
  slug: string;
  display_name: string;
  vertical_slug: string;
  launch_priority: number;
  blueprint: DomainBlueprint;
  seo_pages: LaunchSeoPage[];
  growth: LaunchGrowthPlan;
  first_project_action: {
    slug: string;
    text: string;
    evidence_title: string;
  };
  notes?: string;
};

export type LaunchManifest = {
  slug: string;
  display_name: string;
  launched_at: string;
  status: 'scaffolded' | 'active' | 'archived';
  assets: {
    platform: string[];
    seo: string[];
    marketing: string[];
    growth: string[];
  };
  blueprint_path: string;
  marketing_path: string;
};

export type LaunchRegistryEntry = {
  slug: string;
  display_name: string;
  blueprint_started_at: string | null;
  launched_at: string | null;
  active_at: string | null;
  days_blueprint_to_launch: number | null;
  days_launch_to_active: number | null;
  status: 'proof' | 'scaffolded' | 'active' | 'planned';
};

export const DOMAIN_LAUNCH_VELOCITY_TARGET_Q4_DAYS = 7;
export const DOMAIN_LAUNCH_VELOCITY_TARGET_MATURE_DAYS = 3;

export const VALIDATION_MILESTONES = [
  { date: '2026-09-01', active_domains: 1, users: 100, paid: 10, note: 'First validation' },
  { date: '2026-10-01', active_domains: 3, users: 500, paid: 50, note: 'Factory proof · life leverage begins' },
  { date: '2026-11-01', active_domains: 8, users: 2000, paid: 200, note: 'Launch velocity scaling' },
  { date: '2027-01-01', active_domains: 20, users: 10000, paid: 1000, mrr: '$4,000', note: '20 active domains · velocity target' },
] as const;
