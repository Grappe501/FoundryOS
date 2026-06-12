import { buildAtlasEntry, atlasNarrativeWords } from './build-entry';
import { ATLAS_SEEDS } from './seeds';
import type { AtlasEntry } from './types';
import { getAtlasRabbitHole } from './rabbit-holes';

export const BOURBON_ATLAS_ENTRIES: AtlasEntry[] = ATLAS_SEEDS.map(buildAtlasEntry);

const bySlug = new Map(BOURBON_ATLAS_ENTRIES.map((e) => [e.slug, e]));

export function getAtlasEntry(slug: string): AtlasEntry | undefined {
  return bySlug.get(slug);
}

export function listAtlasEntries(): AtlasEntry[] {
  return BOURBON_ATLAS_ENTRIES;
}

export function getAtlasEntryByTitle(title: string): AtlasEntry | undefined {
  const lower = title.toLowerCase();
  return BOURBON_ATLAS_ENTRIES.find(
    (e) => e.title.toLowerCase() === lower || e.slug === lower.replace(/\s+/g, '-'),
  );
}

/** Sorted titles for inline term matching (longest first to avoid partial overlaps) */
export function atlasMatchTerms(): { slug: string; title: string; patterns: string[] }[] {
  return BOURBON_ATLAS_ENTRIES.map((e) => ({
    slug: e.slug,
    title: e.title,
    patterns: [e.title, e.title.replace(/'/g, "'"), ...(e.slug.includes('-') ? [e.slug.replace(/-/g, ' ')] : [])],
  })).sort((a, b) => b.title.length - a.title.length);
}

export function atlasStats() {
  const count = BOURBON_ATLAS_ENTRIES.length;
  const under250 = BOURBON_ATLAS_ENTRIES.filter((e) => atlasNarrativeWords(e) < 250).length;
  const missingRelated = BOURBON_ATLAS_ENTRIES.filter((e) => e.relatedTerms.length === 0).length;
  const missingLinks = BOURBON_ATLAS_ENTRIES.filter((e) => e.forwardLinks.length < 3).length;
  return { count, under250, missingRelated, missingLinks };
}

export { getAtlasRabbitHole, atlasNarrativeWords };
export type { AtlasEntry } from './types';
export { atlasTermHref, atlasSlug } from './slug';
