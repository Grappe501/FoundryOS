import type { DomainBlueprint } from './types';

export const FINANCIAL_INDEPENDENCE_DOMAIN_SLUG = 'financial-independence';

export const FINANCIAL_INDEPENDENCE_DOMAIN_BLUEPRINT: DomainBlueprint = {
  "slug": "financial-independence",
  "display_name": "Financial Independence",
  "vertical_slug": "finance",
  "care_reason": "Money literacy changes life outcomes. Parents pay for it. Schools struggle to teach it. Students need it for decades — not a one-semester course.",
  "outcome": {
    "slug": "achieve-financial-independence",
    "display_name": "Achieve Financial Independence"
  },
  "mastery_levels": [
    {
      "slug": "financially-literate-teen",
      "display_name": "Financially Literate Teen",
      "order": 1
    },
    {
      "slug": "investor",
      "display_name": "Investor",
      "order": 2
    },
    {
      "slug": "wealth-builder",
      "display_name": "Wealth Builder",
      "order": 3
    },
    {
      "slug": "financial-mentor",
      "display_name": "Financial Mentor",
      "order": 4
    }
  ],
  "paths": [
    {
      "slug": "road-to-financial-independence",
      "display_name": "Road to Financial Independence",
      "tier": "investor"
    },
    {
      "slug": "road-to-wealth-builder",
      "display_name": "Road to Wealth Builder",
      "tier": "wealth-builder"
    },
    {
      "slug": "road-to-business-and-money",
      "display_name": "Road to Business & Money",
      "tier": "investor"
    }
  ],
  "projects": [
    {
      "slug": "open-first-savings-account",
      "display_name": "Open First Savings Account"
    },
    {
      "slug": "track-spending-30-days",
      "display_name": "Track Spending For 30 Days"
    },
    {
      "slug": "build-first-budget",
      "display_name": "Build First Budget"
    },
    {
      "slug": "buy-first-stock",
      "display_name": "Buy First Stock"
    },
    {
      "slug": "analyze-first-company",
      "display_name": "Analyze First Company"
    },
    {
      "slug": "build-retirement-projection",
      "display_name": "Build Retirement Projection"
    },
    {
      "slug": "create-emergency-fund",
      "display_name": "Create Emergency Fund"
    }
  ],
  "collection": {
    "slug": "my-wealth-builder",
    "display_name": "My Wealth Builder",
    "asset_type": "project_portfolio"
  },
  "community": {
    "slug": "wealth-builders-circle",
    "display_name": "Wealth Builders Circle",
    "community_type": "circle"
  },
  "roles": [
    "Learner",
    "Investor",
    "Wealth Builder",
    "Financial Mentor",
    "Entrepreneur"
  ]
};
