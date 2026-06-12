/** PASS-034 — All seven live consumer worlds for living journey */

import { getMissionCount } from '../immersion/registry';
import { getCopilotPersona } from '@foundry/ai-orchestration';

export type ActiveWorldConfig = {
  slug: string;
  name: string;
  identityTitle: string;
  href: string;
  portfolioKey: string;
  portfolioLabel: string;
  missionCount: number;
  mentorName: string;
  tier: 'life_leverage' | 'civic' | 'passion';
  legendaryStorageKey?: string;
};

export const ACTIVE_WORLDS: ActiveWorldConfig[] = [
  {
    slug: 'ai-builder',
    name: 'AI Builder',
    identityTitle: 'AI Builder',
    href: '/ai-builder',
    portfolioKey: 'foundry-ai-portfolio',
    portfolioLabel: 'My AI Portfolio',
    missionCount: getMissionCount('ai-builder'),
    mentorName: getCopilotPersona('ai-builder')?.persona_name ?? 'Builder Coach',
    tier: 'life_leverage',
  },
  {
    slug: 'financial-independence',
    name: 'Financial Independence',
    identityTitle: 'Wealth Builder',
    href: '/financial-independence',
    portfolioKey: 'foundry-fi-portfolio',
    portfolioLabel: 'My Wealth Portfolio',
    missionCount: getMissionCount('financial-independence'),
    mentorName: getCopilotPersona('financial-independence')?.persona_name ?? 'Money Coach',
    tier: 'life_leverage',
  },
  {
    slug: 'public-speaking',
    name: 'Public Speaking',
    identityTitle: 'Confident Speaker',
    href: '/public-speaking',
    portfolioKey: 'foundry-ps-portfolio',
    portfolioLabel: 'My Speaking Portfolio',
    missionCount: getMissionCount('public-speaking'),
    mentorName: getCopilotPersona('public-speaking')?.persona_name ?? 'Speech Coach',
    tier: 'life_leverage',
  },
  {
    slug: 'civic-engagement',
    name: 'Civic Engagement',
    identityTitle: 'Informed Citizen',
    href: '/civic-engagement',
    portfolioKey: 'foundry-civic-portfolio',
    portfolioLabel: 'My Civic Portfolio',
    missionCount: getMissionCount('civic-engagement'),
    mentorName: getCopilotPersona('civic-engagement')?.persona_name ?? 'Civic Guide',
    tier: 'civic',
  },
  {
    slug: 'bourbon',
    name: 'Bourbon',
    identityTitle: 'Bourbon Enthusiast',
    href: '/bourbon',
    portfolioKey: 'foundry-bourbon-portfolio',
    portfolioLabel: 'My Bourbon Journal',
    missionCount: getMissionCount('bourbon'),
    mentorName: getCopilotPersona('bourbon')?.persona_name ?? 'Bourbon Steward',
    tier: 'passion',
    legendaryStorageKey: 'foundry-bourbon-legendary',
  },
  {
    slug: 'bbq',
    name: 'BBQ',
    identityTitle: 'Pitmaster',
    href: '/bbq',
    portfolioKey: 'foundry-bbq-portfolio',
    portfolioLabel: 'My BBQ Journal',
    missionCount: getMissionCount('bbq'),
    mentorName: getCopilotPersona('bbq')?.persona_name ?? 'Pitmaster Coach',
    tier: 'passion',
    legendaryStorageKey: 'foundry-bbq-legendary',
  },
  {
    slug: 'poker',
    name: 'Poker',
    identityTitle: 'Home Game Host',
    href: '/poker',
    portfolioKey: 'foundry-poker-portfolio',
    portfolioLabel: 'My Poker Journey',
    missionCount: getMissionCount('poker'),
    mentorName: getCopilotPersona('poker')?.persona_name ?? 'Strategy Coach',
    tier: 'passion',
    legendaryStorageKey: 'foundry-poker-legendary',
  },
];

export function getActiveWorld(slug: string): ActiveWorldConfig | undefined {
  return ACTIVE_WORLDS.find((w) => w.slug === slug);
}
