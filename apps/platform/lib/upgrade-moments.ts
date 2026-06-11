/** PASS-029 — Contextual upgrade triggers after transformation moments */

import type { PaidTier } from './billing';

export type UpgradeTrigger = 'mission_complete' | 'portfolio_entry';

export type UpgradeMomentDef = {
  worldSlug: string;
  trigger: UpgradeTrigger;
  /** First mission slug or any mission for portfolio trigger */
  missionSlug?: string;
  tier: PaidTier;
  headline: string;
  body: string;
  premiumNext?: string;
};

export const UPGRADE_MOMENTS: UpgradeMomentDef[] = [
  {
    worldSlug: 'ai-builder',
    trigger: 'mission_complete',
    missionSlug: 'homework-assistant',
    tier: 'build',
    headline: 'Want the complete Academy?',
    body: 'Unlock all missions, synced portfolios, and parent views across devices.',
    premiumNext: 'Full AI Builder academy · Research agent · Personal AI team',
  },
  {
    worldSlug: 'financial-independence',
    trigger: 'portfolio_entry',
    tier: 'build',
    headline: 'Track your entire wealth journey',
    body: 'Save every budget, reflection, and milestone — synced across devices.',
    premiumNext: 'Full FI path · Save $1,000 mission · Investment analysis',
  },
  {
    worldSlug: 'public-speaking',
    trigger: 'mission_complete',
    missionSlug: 'first-talk',
    tier: 'mastery',
    headline: 'Unlock advanced speaking paths',
    body: 'Join Speaker Circle, get peer feedback, and access mentor pathways.',
    premiumNext: 'Advanced paths · Community showcases · Speaking Coach feedback',
  },
  {
    worldSlug: 'bourbon',
    trigger: 'mission_complete',
    missionSlug: 'first-tasting',
    tier: 'build',
    headline: 'Build your bourbon shelf',
    body: 'Sync tastings, rankings, and distillery notes across devices.',
    premiumNext: 'Full tasting log · Blind tasting missions · Shelf portfolio',
  },
  {
    worldSlug: 'bbq',
    trigger: 'mission_complete',
    missionSlug: 'first-pork-butt',
    tier: 'build',
    headline: 'Log every cook',
    body: 'Track brisket cooks, temps, and competition prep in one portfolio.',
    premiumNext: 'Pitmaster Collective · Cook logs · Competition timeline',
  },
  {
    worldSlug: 'poker',
    trigger: 'mission_complete',
    missionSlug: 'track-bankroll',
    tier: 'mastery',
    headline: 'Analyze hands with mentors',
    body: 'Join Strategic Thinking Society for hand reviews and advanced paths.',
    premiumNext: 'Hand analysis community · Tournament prep · Poker Mentor feedback',
  },
  {
    worldSlug: 'civic-engagement',
    trigger: 'mission_complete',
    missionSlug: 'research-ballot',
    tier: 'build',
    headline: 'Document your civic journey',
    body: 'Sync meeting notes, volunteer hours, and reflections across devices.',
    premiumNext: 'Civic Action Circle · Meeting reflections · Community leadership',
  },
];

export function getUpgradeMoment(
  worldSlug: string,
  trigger: UpgradeTrigger,
  missionSlug?: string,
): UpgradeMomentDef | undefined {
  return UPGRADE_MOMENTS.find((m) => {
    if (m.worldSlug !== worldSlug || m.trigger !== trigger) return false;
    if (trigger === 'mission_complete' && m.missionSlug) {
      return m.missionSlug === missionSlug;
    }
    return true;
  });
}
