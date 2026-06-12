/** PASS-033 — Platform search index builder */

import type { SearchIndexEntry } from '@foundry/search-engine';
import { INCOMING_WORLDS } from '../incoming-worlds';
import { WORLD_DEPTH_BUNDLES } from '../world-depth/registry';
import { getWorldAudience } from '../world-governance';

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

  return entries;
}

function slugify(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export { slugify as termToSlug };
