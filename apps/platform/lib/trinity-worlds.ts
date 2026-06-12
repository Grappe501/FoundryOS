/** Future-Proof Trinity — shared consumer config (PASS-021) */

import { getMissionCount } from './immersion/registry';

export type TrinityWorldSlug = 'ai-builder' | 'financial-independence' | 'public-speaking';

export type TrinityWorld = {
  slug: TrinityWorldSlug;
  name: string;
  frame: string;
  href: string;
  mission1Href: string;
  portfolioKey: string;
  portfolioLabel: string;
  missionCount: number;
  accent: string;
  border: string;
  nextWorld: TrinityWorldSlug;
};

export const TRINITY_WORLDS: TrinityWorld[] = [
  {
    slug: 'ai-builder',
    name: 'AI Builder',
    frame: 'Create Value',
    href: '/ai-builder',
    mission1Href: '/ai-builder/missions/homework-assistant',
    portfolioKey: 'foundry-ai-portfolio',
    portfolioLabel: 'My AI Portfolio',
    missionCount: getMissionCount('ai-builder'),
    accent: 'var(--foundry-success)',
    border: 'var(--foundry-success-bg)',
    nextWorld: 'financial-independence',
  },
  {
    slug: 'financial-independence',
    name: 'Financial Independence',
    frame: 'Keep Value',
    href: '/financial-independence',
    mission1Href: '/financial-independence/missions/first-budget',
    portfolioKey: 'foundry-fi-portfolio',
    portfolioLabel: 'My Wealth Portfolio',
    missionCount: getMissionCount('financial-independence'),
    accent: 'var(--foundry-primary)',
    border: 'var(--foundry-primary-border-dim)',
    nextWorld: 'public-speaking',
  },
  {
    slug: 'public-speaking',
    name: 'Public Speaking',
    frame: 'Communicate Value',
    href: '/public-speaking',
    mission1Href: '/public-speaking/missions/first-talk',
    portfolioKey: 'foundry-ps-portfolio',
    portfolioLabel: 'My Speaking Portfolio',
    missionCount: getMissionCount('public-speaking'),
    accent: '#6B8BB8',
    border: '#3A4A6A',
    nextWorld: 'ai-builder',
  },
];

export const TRINITY_BY_SLUG = Object.fromEntries(
  TRINITY_WORLDS.map((w) => [w.slug, w]),
) as Record<TrinityWorldSlug, TrinityWorld>;

export function getNextWorld(slug: TrinityWorldSlug): TrinityWorld {
  return TRINITY_BY_SLUG[TRINITY_BY_SLUG[slug].nextWorld];
}

export const FOUNDRY_PARENT_VIEW = {
  headline: 'Foundry helps your child become future-proof',
  oneLiner:
    'Three worlds — create value, keep value, communicate value — through real missions, portfolios, and projects. Not worksheets.',
  sections: [
    {
      title: 'What Foundry is',
      body: 'Foundry is a transformation platform. Students build things, reflect on what they learned, and grow a portfolio that proves real skill — across AI, money, and speaking.',
    },
    {
      title: 'Why these three domains',
      body: 'AI Builder teaches how to create value in an AI world. Financial Independence teaches how to keep it. Public Speaking teaches how to communicate it. Together they form the Future-Proof Trinity.',
    },
    {
      title: 'What students build',
      body: 'AI projects · budgets and savings plans · recorded talks and presentations · reflections saved to portfolios · progress across all three worlds.',
    },
    {
      title: 'How progress is measured',
      body: 'Completed missions · portfolio artifacts · reflections — not grades. You can see what your child built and what they learned from it.',
    },
  ],
};
