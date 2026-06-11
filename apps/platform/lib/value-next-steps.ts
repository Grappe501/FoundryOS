/** PASS-029 — What comes next (free + premium steps visible) */

export type NextStep = {
  label: string;
  href: string;
  tier: 'free' | 'build' | 'mastery';
  description?: string;
};

export type WorldNextSteps = {
  worldSlug: string;
  displayName: string;
  steps: NextStep[];
};

export const WORLD_NEXT_STEPS: WorldNextSteps[] = [
  {
    worldSlug: 'ai-builder',
    displayName: 'AI Builder',
    steps: [
      { label: 'Mission 2 — Research Agent', href: '/ai-builder/missions/research-agent', tier: 'free' },
      { label: 'Full academy (7 levels)', href: '/ai-builder/academy', tier: 'build', description: 'Build tier' },
      { label: 'Foundry AI Lab community', href: '/community/ai-builder', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'financial-independence',
    displayName: 'Financial Independence',
    steps: [
      { label: 'Save $1,000 mission', href: '/financial-independence/missions/save-1000', tier: 'free' },
      { label: 'Wealth journey portfolio sync', href: '/financial-independence/portfolio', tier: 'build', description: 'Build tier' },
      { label: 'Wealth Builders Circle', href: '/community/financial-independence', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'public-speaking',
    displayName: 'Public Speaking',
    steps: [
      { label: 'Record & review mission', href: '/public-speaking/missions/record-review', tier: 'free' },
      { label: 'Advanced speaking paths', href: '/public-speaking/academy', tier: 'build', description: 'Build tier' },
      { label: 'Speaker Circle + mentor feedback', href: '/community/public-speaking', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'bourbon',
    displayName: 'Bourbon',
    steps: [
      { label: 'Compare five bourbons', href: '/bourbon/missions/compare-five', tier: 'free' },
      { label: 'Full tasting portfolio', href: '/bourbon/portfolio', tier: 'build', description: 'Build tier' },
      { label: 'Central Arkansas Bourbon Society', href: '/community/bourbon', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'bbq',
    displayName: 'BBQ',
    steps: [
      { label: 'First brisket mission', href: '/bbq/missions/first-brisket', tier: 'free' },
      { label: 'Cook log portfolio', href: '/bbq/portfolio', tier: 'build', description: 'Build tier' },
      { label: 'Pitmaster Collective', href: '/community/bbq', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'poker',
    displayName: 'Poker',
    steps: [
      { label: 'Review ten hands', href: '/poker/missions/review-ten-hands', tier: 'free' },
      { label: 'Bankroll tracker sync', href: '/poker/portfolio', tier: 'build', description: 'Build tier' },
      { label: 'Strategic Thinking Society', href: '/community/poker', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
  {
    worldSlug: 'civic-engagement',
    displayName: 'Civic Engagement',
    steps: [
      { label: 'Attend a local meeting', href: '/civic-engagement/missions/local-meeting', tier: 'free' },
      { label: 'Civic portfolio sync', href: '/civic-engagement/portfolio', tier: 'build', description: 'Build tier' },
      { label: 'Civic Action Circle', href: '/community/civic-engagement', tier: 'mastery', description: 'Mastery tier' },
    ],
  },
];

export function getWorldNextSteps(worldSlug: string): WorldNextSteps | undefined {
  return WORLD_NEXT_STEPS.find((w) => w.worldSlug === worldSlug);
}

const TIER_LABEL: Record<string, string> = {
  free: 'Free',
  build: 'Build $4',
  mastery: 'Mastery $18',
};

export function tierBadge(tier: NextStep['tier']): string {
  return TIER_LABEL[tier] ?? tier;
}
