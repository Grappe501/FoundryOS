import type { LaunchDefinition } from '../types';

/**
 * Life Leverage Domain — not stocks app, not accounting course.
 * Outcome: Financial Independence · Parents pay · Schools need it · Students need it.
 */
export const FINANCIAL_INDEPENDENCE_LAUNCH: LaunchDefinition = {
  slug: 'financial-independence',
  display_name: 'Financial Independence',
  vertical_slug: 'finance',
  launch_priority: 3,
  blueprint: {
    slug: 'financial-independence',
    display_name: 'Financial Independence',
    vertical_slug: 'finance',
    care_reason:
      'Money literacy changes life outcomes. Parents pay for it. Schools struggle to teach it. Students need it for decades — not a one-semester course.',
    outcome: {
      slug: 'achieve-financial-independence',
      display_name: 'Achieve Financial Independence',
    },
    mastery_levels: [
      { slug: 'financially-literate-teen', display_name: 'Financially Literate Teen', order: 1 },
      { slug: 'investor', display_name: 'Investor', order: 2 },
      { slug: 'wealth-builder', display_name: 'Wealth Builder', order: 3 },
      { slug: 'financial-mentor', display_name: 'Financial Mentor', order: 4 },
    ],
    paths: [
      { slug: 'road-to-financial-independence', display_name: 'Road to Financial Independence', tier: 'investor' },
      { slug: 'road-to-wealth-builder', display_name: 'Road to Wealth Builder', tier: 'wealth-builder' },
      { slug: 'road-to-business-and-money', display_name: 'Road to Business & Money', tier: 'investor' },
    ],
    projects: [
      { slug: 'open-first-savings-account', display_name: 'Open First Savings Account' },
      { slug: 'track-spending-30-days', display_name: 'Track Spending For 30 Days' },
      { slug: 'build-first-budget', display_name: 'Build First Budget' },
      { slug: 'buy-first-stock', display_name: 'Buy First Stock' },
      { slug: 'analyze-first-company', display_name: 'Analyze First Company' },
      { slug: 'build-retirement-projection', display_name: 'Build Retirement Projection' },
      { slug: 'create-emergency-fund', display_name: 'Create Emergency Fund' },
    ],
    collection: {
      slug: 'my-wealth-builder',
      display_name: 'My Wealth Builder',
      asset_type: 'project_portfolio',
    },
    community: {
      slug: 'wealth-builders-circle',
      display_name: 'Wealth Builders Circle',
      community_type: 'circle',
    },
    roles: ['Learner', 'Investor', 'Wealth Builder', 'Financial Mentor', 'Entrepreneur'],
  },
  seo_pages: [
    { slug: 'what-is-financial-independence', title: 'What Is Financial Independence?', intent: 'definition' },
    { slug: 'beginner-guide-money', title: 'Beginner Guide to Money', intent: 'beginner' },
    { slug: 'road-to-financial-independence', title: 'Road to Financial Independence', intent: 'path' },
    { slug: 'how-to-budget', title: 'How to Build Your First Budget', intent: 'projects' },
    { slug: 'first-stock', title: 'How to Buy Your First Stock', intent: 'projects' },
    { slug: 'common-money-mistakes', title: 'Common Money Mistakes', intent: 'mistakes' },
  ],
  growth: {
    target_user: 'Student, parent, or young adult who wants financial freedom — not stock tips',
    traffic_sources: ['SEO', 'Schools', 'Parents', 'YouTube', 'Reddit personal finance'],
    opportunity_score: 68,
    tier_2_hook: 'My Wealth Builder — budgets, goals, investment notes, evidence of progress',
    tier_3_hook: 'Wealth Builders Circle — accountability, mentors, family financial literacy',
    kpis: ['registered_users', 'parent_signups', 'projects_completed', 'evidence_submitted', 'paid_conversions'],
  },
  first_project_action: {
    slug: 'build-first-budget',
    text: 'Build your first monthly budget and track spending for 30 days',
    evidence_title: 'Budget completed — 30-day spending tracked',
  },
  notes:
    'Life Leverage Domain. Do NOT launch Accounting or Stocks apps. Business & Money is a path. Foundry Student Grades 6-12 is key channel.',
};

/** Knowledge subdomains — paths and SEO clusters, not separate apps */
export const FINANCE_KNOWLEDGE_SUBDOMAINS = [
  'banking',
  'checking-accounts',
  'credit-scores',
  'loans',
  'mortgages',
  'taxes',
  'investing',
  'stock-market',
  'options',
  'retirement',
  'economics',
  'federal-reserve',
  'world-banking',
  'government-finance',
  'entrepreneurship',
  'business-finance',
  'accounting',
] as const;
