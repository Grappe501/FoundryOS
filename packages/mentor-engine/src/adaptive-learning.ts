import type { AdaptiveRecommendation, LivingJourneySnapshot, WorldJourneySlice } from './types';

const GLOSSARY_GAPS: Record<string, { term: string; href: string; trigger: RegExp; ifMissing: RegExp }[]> = {
  'financial-independence': [
    {
      term: 'Compound interest',
      href: '/financial-independence/glossary',
      trigger: /budget|save/i,
      ifMissing: /invest|compound|interest/i,
    },
    {
      term: 'Emergency fund',
      href: '/financial-independence/glossary',
      trigger: /budget|expense/i,
      ifMissing: /emergency|buffer/i,
    },
  ],
  'public-speaking': [
    {
      term: 'Finish',
      href: '/public-speaking/glossary',
      trigger: /talk|speak|present/i,
      ifMissing: /finish|linger|after/i,
    },
  ],
  bourbon: [
    {
      term: 'Mash bill',
      href: '/bourbon/glossary',
      trigger: /tast|pour|flavor/i,
      ifMissing: /mash|wheat|rye/i,
    },
  ],
  'ai-builder': [
    {
      term: 'Automation',
      href: '/ai-builder/glossary',
      trigger: /built|workflow/i,
      ifMissing: /automat|trigger/i,
    },
  ],
};

const LESSON_NUDGES: Record<string, { slug: string; title: string; when: (w: WorldJourneySlice) => boolean }[]> = {
  bourbon: [
    {
      slug: 'first-nosing-ritual',
      title: 'First nosing ritual',
      when: (w) => w.completed_missions.length >= 1 && w.journal_items === 0,
    },
    {
      slug: 'know-the-house-before-the-hype',
      title: 'Know the house before the hype',
      when: (w) => (w.journal_items ?? 0) >= 2,
    },
  ],
  'public-speaking': [
    {
      slug: 'first-talk',
      title: 'Mission prep: structure beats charisma',
      when: (w) => w.completed_missions.length === 0,
    },
  ],
};

export function getAdaptiveRecommendations(
  snapshot: LivingJourneySnapshot,
  worldSlug?: string,
): AdaptiveRecommendation[] {
  const out: AdaptiveRecommendation[] = [];
  const targets = worldSlug ? snapshot.worlds.filter((w) => w.world_slug === worldSlug) : snapshot.worlds.filter((w) => w.completed_missions.length > 0 || (w.journal_items ?? 0) > 0);

  for (const world of targets) {
    const text = world.completed_missions.map((m) => m.reflection).join(' ');
    for (const gap of GLOSSARY_GAPS[world.world_slug] ?? []) {
      if (gap.trigger.test(text) && gap.ifMissing.test(text)) {
        out.push({
          type: 'glossary',
          title: `Learn: ${gap.term}`,
          href: gap.href,
          reason: `Your reflections show progress but have not touched ${gap.term} yet.`,
        });
      }
    }
    for (const lesson of LESSON_NUDGES[world.world_slug] ?? []) {
      if (lesson.when(world)) {
        out.push({
          type: 'lesson',
          title: lesson.title,
          href: `/${world.world_slug}/academy/${lesson.slug}`,
          reason: 'Adaptive path — matched to your current evidence.',
        });
      }
    }
    if (world.completed_missions.length > 0 && world.completed_missions.length < world.mission_count) {
      out.push({
        type: 'mission',
        title: 'Next mission in this world',
        href: `${world.href}/missions`,
        reason: 'Continue the loop while momentum is fresh.',
      });
    }
  }

  return out.slice(0, 6);
}
