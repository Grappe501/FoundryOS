/** PASS-034E — World crossover missions */

export type WorldCrossover = {
  id: string;
  title: string;
  description: string;
  worlds: string[];
  href: string;
  unlock: (s: import('./types').LivingJourneySnapshot) => boolean;
};

const crossovers: WorldCrossover[] = [
  {
    id: 'bourbon-tasting-app',
    title: 'Build a bourbon tasting app',
    description: 'AI Builder + Bourbon — catalog pours, notes, and blind rankings in one tool you ship.',
    worlds: ['ai-builder', 'bourbon'],
    href: '/ai-builder/missions/homework-assistant',
    unlock: (s) => active(s, 'ai-builder') || active(s, 'bourbon'),
  },
  {
    id: 'host-bourbon-tasting',
    title: 'Host a bourbon tasting (with a narrative arc)',
    description: 'Public Speaking + Bourbon — structure the evening like a talk, not a pour line.',
    worlds: ['public-speaking', 'bourbon'],
    href: '/public-speaking/missions/first-talk',
    unlock: (s) => active(s, 'public-speaking') || active(s, 'bourbon'),
  },
  {
    id: 'bbq-food-truck-plan',
    title: 'Business plan for a BBQ food truck',
    description: 'Entrepreneur + BBQ — margins, menu, and smoke as a moat. (Entrepreneur world preview)',
    worlds: ['bbq', 'entrepreneur'],
    href: '/bbq/missions/first-pork-butt',
    unlock: (s) => active(s, 'bbq'),
  },
  {
    id: 'civic-comment-speech',
    title: 'Comment at a public meeting',
    description: 'Civic Engagement + Public Speaking — two minutes that change a agenda item.',
    worlds: ['civic-engagement', 'public-speaking'],
    href: '/civic-engagement/missions',
    unlock: (s) => active(s, 'civic-engagement') && active(s, 'public-speaking'),
  },
  {
    id: 'fi-invest-after-budget',
    title: 'Research your first index fund',
    description: 'Financial Independence depth — after budgeting, model one investment scenario.',
    worlds: ['financial-independence'],
    href: '/financial-independence/missions',
    unlock: (s) => missionCount(s, 'financial-independence') >= 1,
  },
];

function active(s: import('./types').LivingJourneySnapshot, slug: string): boolean {
  return s.active_world_slugs.includes(slug) || missionCount(s, slug) > 0;
}

function missionCount(s: import('./types').LivingJourneySnapshot, slug: string): number {
  return s.worlds.find((w) => w.world_slug === slug)?.completed_missions.length ?? 0;
}

export function getWorldCrossovers(snapshot: import('./types').LivingJourneySnapshot): WorldCrossover[] {
  return crossovers.filter((c) => c.unlock(snapshot)).slice(0, 4);
}
