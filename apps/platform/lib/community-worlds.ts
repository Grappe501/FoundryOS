/** PASS-028 — Living community config per world */

import { getWorldDepth } from './world-depth/registry';

export type CommunityWorldConfig = {
  slug: string;
  name: string;
  mentorTitle: string;
  weeklyChallengeTheme: string;
  showcaseLabel: string;
  peerReviewLabel: string;
  communityType: 'lab' | 'circle' | 'society' | 'collective';
  weeklyChallengePrompt: string;
};

export const COMMUNITY_WORLDS: CommunityWorldConfig[] = [
  {
    slug: 'ai-builder',
    name: 'Foundry AI Lab',
    mentorTitle: 'AI Guide',
    weeklyChallengeTheme: 'Build one useful AI workflow',
    showcaseLabel: 'What members built this week',
    peerReviewLabel: 'Review two projects before requesting feedback',
    communityType: 'lab',
    weeklyChallengePrompt: 'Share one AI workflow you built or improved this week — what problem does it solve?',
  },
  {
    slug: 'financial-independence',
    name: 'Wealth Builders Circle',
    mentorTitle: 'Financial Coach',
    weeklyChallengeTheme: 'Save, earn, or invest challenge',
    showcaseLabel: 'Financial wins',
    peerReviewLabel: 'Celebrate wins and ask one constructive question',
    communityType: 'circle',
    weeklyChallengePrompt: 'Post one financial win this week — saved, earned, or invested. Include the amount or % if comfortable.',
  },
  {
    slug: 'public-speaking',
    name: 'Speaker Circle',
    mentorTitle: 'Mentor Speaker',
    weeklyChallengeTheme: '3-minute talk prompt',
    showcaseLabel: 'Talk showcases',
    peerReviewLabel: 'Constructive feedback loop — kind and specific',
    communityType: 'circle',
    weeklyChallengePrompt: 'Record or outline a 3-minute talk on this week\'s prompt. Share your hook and one thing you\'d improve.',
  },
  {
    slug: 'bourbon',
    name: 'Central Arkansas Bourbon Society',
    mentorTitle: 'Bourbon Steward',
    weeklyChallengeTheme: 'Blind tasting',
    showcaseLabel: 'Tasting notes & shelf showcases',
    peerReviewLabel: 'Compare notes — nose, palate, finish',
    communityType: 'society',
    weeklyChallengePrompt: 'Post a blind tasting note: nose, palate, finish, and your guess before the reveal.',
  },
  {
    slug: 'bbq',
    name: 'Pitmaster Collective',
    mentorTitle: 'Pitmaster Mentor',
    weeklyChallengeTheme: 'Cook and post results',
    showcaseLabel: 'Cook logs & turn-in photos',
    peerReviewLabel: 'Comment on temp, timing, and one improvement',
    communityType: 'collective',
    weeklyChallengePrompt: 'Share your cook: meat, temps, stall, wrap decision, pull time, and honest 1–10 rating.',
  },
  {
    slug: 'poker',
    name: 'Strategic Thinking Society',
    mentorTitle: 'Poker Mentor',
    weeklyChallengeTheme: 'Analyze a hand',
    showcaseLabel: 'Hand reviews',
    peerReviewLabel: 'Street-by-street feedback on decisions',
    communityType: 'society',
    weeklyChallengePrompt: 'Post one hand history with your decision on each street — mark one spot you\'d play differently.',
  },
  {
    slug: 'civic-engagement',
    name: 'Civic Action Circle',
    mentorTitle: 'Circle Mentor',
    weeklyChallengeTheme: 'Attend something · Learn something · Do something',
    showcaseLabel: 'Civic action reports',
    peerReviewLabel: 'Encourage first-time participation',
    communityType: 'circle',
    weeklyChallengePrompt: 'Report one civic action: what you attended, learned, or did locally this week.',
  },
];

export function getCommunityWorldConfig(slug: string): CommunityWorldConfig | undefined {
  const base = COMMUNITY_WORLDS.find((w) => w.slug === slug);
  if (!base) return undefined;
  const bundle = getWorldDepth(slug);
  return {
    ...base,
    weeklyChallengePrompt: bundle?.community.weeklyChallenge ?? base.weeklyChallengePrompt,
  };
}

export function getMentorTier(helpCount: number): { label: string; next: number | null } {
  if (helpCount >= 50) return { label: 'Helped 50+ members', next: null };
  if (helpCount >= 10) return { label: 'Helped 10+ members', next: 50 };
  if (helpCount >= 3) return { label: 'Helped 3+ members', next: 10 };
  return { label: 'New member', next: 3 };
}

export function getWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}
