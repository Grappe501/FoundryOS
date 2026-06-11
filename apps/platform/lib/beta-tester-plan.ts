/** PASS-026 — First 25 controlled tester plan */

export type TesterCohort = 'student' | 'parent' | 'adult_learner' | 'educator' | 'hobbyist';

export const FIRST_25_TESTER_PLAN: { cohort: TesterCohort; count: number; label: string }[] = [
  { cohort: 'student', count: 5, label: 'Students' },
  { cohort: 'parent', count: 5, label: 'Parents' },
  { cohort: 'adult_learner', count: 5, label: 'Adult learners' },
  { cohort: 'educator', count: 5, label: 'Educators' },
  { cohort: 'hobbyist', count: 5, label: 'Hobbyists' },
];

export const STARTING_WORLDS = [
  { slug: 'ai-builder', label: 'AI Builder', firstMission: 'homework-assistant', href: '/ai-builder/missions/homework-assistant' },
  { slug: 'financial-independence', label: 'Financial Independence', firstMission: 'first-budget', href: '/financial-independence/missions/first-budget' },
  { slug: 'public-speaking', label: 'Public Speaking', firstMission: 'first-talk', href: '/public-speaking/missions/first-talk' },
  { slug: 'bourbon', label: 'Bourbon', firstMission: 'first-tasting', href: '/bourbon/missions/first-tasting' },
  { slug: 'bbq', label: 'BBQ', firstMission: 'first-pork-butt', href: '/bbq/missions/first-pork-butt' },
  { slug: 'poker', label: 'Poker', firstMission: 'track-bankroll', href: '/poker/missions/track-bankroll' },
  { slug: 'civic-engagement', label: 'Civic Engagement', firstMission: 'research-ballot', href: '/civic-engagement/missions/research-ballot' },
] as const;

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://foundry-os.netlify.app';

export function buildInviteMessage(input: {
  email: string;
  inviteCode: string;
  startingWorldSlug: string;
  segment: string;
}): string {
  const world = STARTING_WORLDS.find((w) => w.slug === input.startingWorldSlug) ?? STARTING_WORLDS[0];
  const welcomeUrl = `${SITE_URL}/beta/welcome?code=${input.inviteCode}`;

  return `You're invited to the Foundry private beta.

Foundry helps you become the person you want to be — through missions, portfolios, and real progress across worlds like AI Builder, Financial Independence, and Bourbon.

Your cohort: ${input.segment.replace(/_/g, ' ')}
Your starting world: ${world.label}

1. Create your account: ${SITE_URL}/create-account
2. Read your welcome guide: ${welcomeUrl}
3. Start Mission 1: ${SITE_URL}${world.href}

This is a small, handpicked group — not a public launch. Your feedback shapes what we build next.

— The Foundry team`;
}
