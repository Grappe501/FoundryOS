import type { IdentityDomain } from '../types';

export const FINANCIAL_INDEPENDENCE_DOMAIN: IdentityDomain = {
  slug: 'financial-independence',
  display_name: 'Financial Independence',
  tagline: 'Understand money · build wealth · teach others',
  category: 'life_leverage',
  care_reason:
    'Money literacy changes life outcomes. Parents pay for it. Schools struggle to teach it. Students need it for decades.',
  paths: [
    'Road to Financial Independence',
    'Road to Wealth Builder',
    'Road to Business & Money',
  ],
  projects: [
    'Open First Savings Account',
    'Track Spending For 30 Days',
    'Build First Budget',
    'Buy First Stock',
    'Analyze First Company',
    'Build Retirement Projection',
    'Create Emergency Fund',
  ],
  community_types: ['Wealth Builders Circle', 'Family Financial Literacy', 'Young Investors'],
  legacy_signals: ['Financial Mentor', 'Wealth Builder', 'Entrepreneur'],
  collection_types: ['My Wealth Builder'],
  status: 'planned',
};
