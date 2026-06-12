import type { ArtifactType, FoundryArtifact } from './types';

export type EntityArtifactStats = {
  total: number;
  reviews: number;
  comparisons: number;
  visits: number;
  journals: number;
  notes: number;
  collection_entries: number;
  events: number;
  by_type: Partial<Record<ArtifactType, number>>;
};

function matchesEntity(
  artifact: FoundryArtifact,
  ref: { world_slug: string; entity_type: string; slug: string },
): boolean {
  return (artifact.metadata.entities ?? []).some(
    (e) =>
      e.world_slug === ref.world_slug &&
      e.entity_type === ref.entity_type &&
      e.slug === ref.slug,
  );
}

/** Knowledge + experience counts for an atlas node */
export function aggregateEntityArtifacts(
  artifacts: FoundryArtifact[],
  ref: { world_slug: string; entity_type: string; slug: string },
  filter?: { user_id?: string },
): EntityArtifactStats {
  let list = artifacts.filter((a) => matchesEntity(a, ref));
  if (filter?.user_id) list = list.filter((a) => a.user_id === filter.user_id);

  const by_type: Partial<Record<ArtifactType, number>> = {};
  for (const a of list) {
    by_type[a.type] = (by_type[a.type] ?? 0) + 1;
  }

  return {
    total: list.length,
    reviews: by_type.review ?? 0,
    comparisons: by_type.comparison ?? 0,
    visits: by_type.visit ?? 0,
    journals: by_type.journal ?? 0,
    notes: by_type.note ?? 0,
    collection_entries: by_type.collection_entry ?? 0,
    events: by_type.event ?? 0,
    by_type,
  };
}

export type PassportArtifactSummary = {
  total: number;
  by_world: Record<string, number>;
  by_type: Partial<Record<ArtifactType, number>>;
  latest: FoundryArtifact | null;
};

export function summarizeUserArtifacts(
  artifacts: FoundryArtifact[],
  userId?: string,
): PassportArtifactSummary {
  let list = userId ? artifacts.filter((a) => a.user_id === userId) : artifacts;
  list = [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));

  const by_world: Record<string, number> = {};
  const by_type: Partial<Record<ArtifactType, number>> = {};
  for (const a of list) {
    by_world[a.metadata.world_slug] = (by_world[a.metadata.world_slug] ?? 0) + 1;
    by_type[a.type] = (by_type[a.type] ?? 0) + 1;
  }

  return {
    total: list.length,
    by_world,
    by_type,
    latest: list[0] ?? null,
  };
}
