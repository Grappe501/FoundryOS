import type { AtlasRabbitHoleResume, WorldMemorySignals } from './types';

function graphHref(worldSlug: string, slug: string): string {
  return worldSlug === 'bourbon' ? `/bourbon/graph/${slug}` : `/${worldSlug}/graph/${slug}`;
}

/** Resume the most recent saved rabbit hole, or last graph hallway if none saved */
export function resolveAtlasRabbitHoleResume(
  worldSlug: string,
  memory: WorldMemorySignals,
): AtlasRabbitHoleResume | undefined {
  const saved = memory.saved_rabbit_holes.find((h) => h.world_slug === worldSlug);
  if (saved) {
    return {
      slug: saved.slug,
      title: saved.title,
      href: graphHref(worldSlug, saved.slug),
      saved_at: saved.at,
      label: 'Pick the thread back up',
    };
  }

  const lastGraph = memory.graph_views.find((g) => g.world_slug === worldSlug);
  if (lastGraph) {
    return {
      slug: lastGraph.slug,
      title: lastGraph.title,
      href: graphHref(worldSlug, lastGraph.slug),
      saved_at: lastGraph.at,
      label: 'Pick the thread back up',
    };
  }

  return undefined;
}
