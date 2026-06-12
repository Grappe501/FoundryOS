import type { DailyObsessionHook, LivingJourneySnapshot } from './types';
import { discoverCrossWorldPaths } from './cross-world-discovery';
import { pickPrimaryMentorInsight } from './mentor-messages';

export function generateDailyHooks(snapshot: LivingJourneySnapshot): DailyObsessionHook[] {
  const hooks: DailyObsessionHook[] = [];
  const mentor = pickPrimaryMentorInsight(snapshot);
  const cross = discoverCrossWorldPaths(snapshot);
  const day = new Date().getDate();

  hooks.push({
    id: 'mentor-primary',
    kind: 'mentor',
    headline: `${mentor.mentor_name}:`,
    body: mentor.body,
    href: mentor.actions[0]?.href ?? '/my-journey',
    world_slug: mentor.world_slug,
  });

  if (cross[0]) {
    hooks.push({
      id: 'cross-world',
      kind: 'discovery',
      headline: `What Foundry sees next: ${cross[0].world_name}`,
      body: cross[0].reason + ' — ' + cross[0].because[0],
      href: cross[0].href,
      world_slug: cross[0].world_slug,
    });
  }

  const bourbon = snapshot.worlds.find((w) => w.world_slug === 'bourbon');
  if (bourbon && (bourbon.journal_items ?? 0) < 3 && snapshot.user_segment === 'adult') {
    hooks.push({
      id: 'bourbon-journal',
      kind: 'collection',
      headline: 'One pour, one note',
      body: 'Add a tasting to your Legendary Journal — nose, palate, finish. Producer Atlas has tonight\'s rabbit hole.',
      href: '/bourbon/portfolio',
      world_slug: 'bourbon',
    });
  }

  const challenges = [
    { headline: 'Two-sniff drill', body: '90 seconds between sniffs changes everything.', href: '/bourbon/academy/first-nosing-ritual', world: 'bourbon' },
    { headline: 'Record 60 seconds', body: 'Film yourself speaking — watch once, note one fix.', href: '/public-speaking/missions', world: 'public-speaking' },
    { headline: 'Log one expense', body: 'Single honest line in your budget beats a perfect spreadsheet.', href: '/financial-independence/missions', world: 'financial-independence' },
    { headline: 'Ship a tiny automation', body: 'One trigger, one action, one reflection.', href: '/ai-builder/missions', world: 'ai-builder' },
  ];
  const challenge = challenges[day % challenges.length];
  hooks.push({
    id: 'daily-challenge',
    kind: 'challenge',
    headline: challenge.headline,
    body: challenge.body,
    href: challenge.href,
    world_slug: challenge.world,
  });

  hooks.push({
    id: 'community',
    kind: 'community',
    headline: 'Someone in your world posted today',
    body: 'Browse community showcases — reply with one thoughtful question, not applause.',
    href: '/community/bourbon',
  });

  return hooks.slice(0, 4);
}
