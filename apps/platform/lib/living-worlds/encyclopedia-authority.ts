/** PASS-034 — Encyclopedia authority links per term */

import { getWorldDepth } from '../world-depth/registry';
import { listBourbonProducers } from '../world-depth/bourbon-producers';

export type EncyclopediaAuthorityLinks = {
  missions: { title: string; href: string }[];
  lessons: { title: string; href: string }[];
  producers: { title: string; href: string }[];
  communityHref: string;
  relatedWorlds: { title: string; href: string }[];
};

export function getEncyclopediaAuthorityLinks(worldSlug: string, term: string): EncyclopediaAuthorityLinks {
  const bundle = getWorldDepth(worldSlug);
  const termLower = term.toLowerCase();

  const lessons =
    bundle?.academyLessons
      .filter(
        (l) =>
          l.title.toLowerCase().includes(termLower) ||
          (l.glossaryTerms ?? []).some((g) => g.toLowerCase() === termLower),
      )
      .slice(0, 5)
      .map((l) => ({ title: l.title, href: `/${worldSlug}/academy/${l.slug}` })) ?? [];

  const missions: { title: string; href: string }[] = [];
  if (worldSlug === 'bourbon' && /mash|tast|nose|proof|barrel/i.test(term)) {
    missions.push({ title: 'Host First Tasting', href: '/bourbon/missions/first-tasting' });
  }
  if (worldSlug === 'ai-builder' && /automat|workflow|prompt/i.test(term)) {
    missions.push({ title: 'Homework Assistant', href: '/ai-builder/missions/homework-assistant' });
  }

  const producers =
    worldSlug === 'bourbon'
      ? listBourbonProducers()
          .filter(
            (p) =>
              p.mashBillSignature.toLowerCase().includes(termLower) ||
              p.differentiator.toLowerCase().includes(termLower) ||
              p.sweetSpot.some((b) => b.whatToExpect.toLowerCase().includes(termLower)),
          )
          .slice(0, 3)
          .map((p) => ({ title: p.name, href: `/bourbon/producers/${p.slug}` }))
      : [];

  const relatedWorlds: { title: string; href: string }[] = [];
  if (/speak|present|host/i.test(term)) {
    relatedWorlds.push({ title: 'Public Speaking', href: '/public-speaking' });
  }
  if (/budget|invest|money|compound/i.test(term)) {
    relatedWorlds.push({ title: 'Financial Independence', href: '/financial-independence' });
  }

  return {
    missions,
    lessons,
    producers,
    communityHref: `/community/${worldSlug}`,
    relatedWorlds,
  };
}
