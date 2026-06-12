/** PASS-033 — Platform search index builder */

import type { SearchIndexEntry } from '@foundry/search-engine';
import { INCOMING_WORLDS } from '../incoming-worlds';
import { WORLD_DEPTH_BUNDLES } from '../world-depth/registry';
import { getWorldAudience } from '../world-governance';
import { listBourbonProducers } from '../world-depth/bourbon-producers';
import { listAtlasEntries } from '../bourbon-atlas/registry';

export function buildPlatformSearchIndex(): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  for (const bundle of WORLD_DEPTH_BUNDLES) {
    const audience = getWorldAudience(bundle.slug);

    entries.push({
      id: `world:${bundle.slug}`,
      type: 'world',
      title: bundle.displayName,
      summary: `${bundle.displayName} — academy, missions, glossary, community`,
      world_slug: bundle.slug,
      href: `/${bundle.slug}`,
      audience_classification: audience?.audience_classification,
      tags: [bundle.slug, 'world', 'live'],
    });

    for (const lesson of bundle.academyLessons) {
      entries.push({
        id: `lesson:${bundle.slug}:${lesson.slug}`,
        type: 'academy_lesson',
        title: lesson.title,
        summary: lesson.description,
        world_slug: bundle.slug,
        href: `/${bundle.slug}/academy/${lesson.slug}`,
        audience_classification: audience?.audience_classification,
        tags: ['academy', `level-${lesson.level}`, ...((lesson.glossaryTerms ?? []) as string[])],
      });
    }

    for (const term of bundle.glossary) {
      entries.push({
        id: `glossary:${bundle.slug}:${term.term}`,
        type: 'glossary_term',
        title: term.term,
        summary: term.definition,
        world_slug: bundle.slug,
        href: `/${bundle.slug}/encyclopedia/${slugify(term.term)}`,
        audience_classification: audience?.audience_classification,
        tags: term.relatedTerms,
      });
      entries.push({
        id: `encyclopedia:${bundle.slug}:${term.term}`,
        type: 'encyclopedia',
        title: term.term,
        summary: `${term.definition} — ${term.whyItMatters}`,
        world_slug: bundle.slug,
        href: `/${bundle.slug}/encyclopedia/${slugify(term.term)}`,
        audience_classification: audience?.audience_classification,
        tags: ['encyclopedia', ...term.relatedTerms],
      });
    }

    for (const guide of bundle.seoGuides ?? []) {
      entries.push({
        id: `guide:${bundle.slug}:${guide.slug}`,
        type: 'guide',
        title: guide.title,
        summary: guide.summary,
        world_slug: bundle.slug,
        href: `/${bundle.slug}/learn/${guide.slug}`,
        audience_classification: audience?.audience_classification,
        tags: ['guide', 'seo'],
      });
    }
  }

  for (const world of INCOMING_WORLDS) {
    const audience = getWorldAudience(world.slug);
    entries.push({
      id: `incoming:${world.slug}`,
      type: 'incoming_world',
      title: world.name,
      summary: `${world.frame} — ${world.outcome}`,
      world_slug: world.slug,
      href: world.live_href ?? `/explore/${world.slug}`,
      audience_classification: audience?.audience_classification,
      tags: ['incoming', world.tier, world.status],
    });
  }

  for (const producer of listBourbonProducers()) {
    entries.push({
      id: `producer:bourbon:${producer.slug}`,
      type: 'guide',
      title: `${producer.name} — Producer Atlas`,
      summary: producer.differentiator.slice(0, 200),
      world_slug: 'bourbon',
      href: `/bourbon/producers/${producer.slug}`,
      audience_classification: 'adult_21_plus',
      tags: ['producer', 'atlas', ...producer.styleTags],
    });
  }

  for (const term of listAtlasEntries()) {
    entries.push({
      id: `atlas:bourbon:${term.slug}`,
      type: 'encyclopedia',
      title: `${term.title} — The Atlas`,
      summary: term.shortDefinition,
      world_slug: 'bourbon',
      href: `/bourbon/atlas/${term.slug}`,
      audience_classification: 'adult_21_plus',
      tags: ['atlas', 'bourbon', ...term.relatedTerms],
    });
  }

  const level1Tools = [
    { href: '/bourbon/watchtower', title: 'Bourbon Watchtower', summary: 'Market signals — discussed, rising, controversial' },
    { href: '/bourbon/rabbit-hole', title: 'Rabbit Hole of the Day', summary: 'One curated weird thing — five minutes' },
    { href: '/bourbon/hunt', title: 'Bourbon Hunt Engine', summary: 'Monthly missions — check off and participate' },
    { href: '/bourbon/shelf-intelligence', title: 'Shelf Intelligence', summary: 'Gaps, next bottle, blind spot alerts' },
    { href: '/bourbon/chains', title: 'Progression Chains', summary: 'Legendary bottle ladders — WT, Maker\'s, BT' },
    { href: '/bourbon/detective', title: 'Bourbon Detective', summary: 'Close cases — pricing, Weller, DSP, store picks' },
    { href: '/bourbon/x-ray', title: 'Bottle X-Ray', summary: 'Analyst breakdown — mashbill to flavor sources' },
    { href: '/bourbon/compare', title: 'Compare 5 Bottles', summary: 'Bookmark comparison tool — value, proof, best use' },
    { href: '/bourbon/bottles', title: 'Bottle Progression Database', summary: 'What each bottle teaches — who for — what next' },
    { href: '/bourbon/economy', title: 'Bourbon Economy', summary: 'Allocation, MSRP, secondary market' },
    { href: '/bourbon/store-picks', title: 'Store Pick Academy', summary: 'When store picks are worth it' },
    { href: '/bourbon/league', title: 'Blind Tasting League', summary: 'Monthly blind challenges' },
    { href: '/bourbon/what-should-i-buy', title: 'What Should I Buy?', summary: 'Three bottle picks for your budget and taste' },
    { href: '/bourbon/games', title: 'Blind Tasting Games', summary: 'Mystery bottle, distillery match, brackets' },
    { href: '/bourbon/lab', title: 'Bourbon Lab', summary: 'Char, age, and proof simulators' },
    { href: '/bourbon/dna', title: 'Bourbon DNA', summary: 'Your flavor fingerprint from games and votes' },
    { href: '/bourbon/shelf-builder', title: 'Shelf Builder', summary: 'Starter, advanced, and collector shelves' },
    { href: '/bourbon/wars', title: 'Distillery Wars', summary: 'Buffalo Trace vs Heaven Hill and more' },
    { href: '/bourbon/map', title: 'Kentucky Map', summary: 'Regions, distilleries, Bourbon Trail planner' },
    { href: '/bourbon/pairings', title: 'Bourbon Pairings', summary: 'Steak, BBQ, chocolate — what to pour' },
    { href: '/bourbon/myths', title: 'Bourbon Myths', summary: 'True or false — older is better?' },
    { href: '/bourbon/stories', title: 'Bourbon History Stories', summary: 'Pappy, Prohibition, red wax narratives' },
    { href: '/bourbon/daily', title: 'Daily Bourbon', summary: 'One fact, bottle, challenge every day' },
    { href: '/bourbon/beyond-the-bottle', title: 'Beyond the Bottle', summary: 'Bourbon in the wild — origins, pop culture, connections' },
    { href: '/bourbon/today', title: "What's Alive Today — Bourbon", summary: 'Daily mystery, debate, legend, rabbit hole' },
    { href: '/bourbon/universe', title: 'Bourbon Universe Map', summary: 'Wander Kentucky, France, Jazz, Prohibition nodes' },
    { href: '/bourbon/lore', title: 'Bourbon World Lore', summary: 'Legends, debates, mythology layer' },
    { href: '/bourbon/origins', title: 'Bourbon Origins Map', summary: 'House of Bourbon — whiskey vs Bourbon Street' },
    { href: '/bourbon/pop-culture', title: 'Bourbon Pop Culture', summary: 'Movies, music, Derby, presidents' },
    { href: '/bourbon/connections', title: 'Bourbon Connections Graph', summary: 'Explore the bourbon universe' },
    { href: '/bourbon/pour-guide', title: 'Pour Impact Guide', summary: 'Neat, rocks, cola — how serve changes taste' },
    { href: '/bourbon/where-to-buy', title: 'Where to Buy Bourbon', summary: 'Regional buying guide USA' },
    { href: '/bourbon/wild/bourbon-street', title: 'Why Bourbon Street?', summary: 'Not named after whiskey — French royalty' },
  ];
  for (const t of level1Tools) {
    entries.push({
      id: `level1:bourbon:${t.href}`,
      type: 'guide',
      title: t.title,
      summary: t.summary,
      world_slug: 'bourbon',
      href: t.href,
      audience_classification: 'adult_21_plus',
      tags: ['level-1', 'tool'],
    });
  }

  return entries;
}

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export { slugify as termToSlug };
