import type { ArtifactRelation, GraphEntityRef } from './types';

/** Dedupe graph entity refs by world + type + slug */
export function mergeGraphEntities(...lists: GraphEntityRef[][]): GraphEntityRef[] {
  const seen = new Set<string>();
  const out: GraphEntityRef[] = [];
  for (const list of lists) {
    for (const e of list) {
      const key = `${e.world_slug}:${e.entity_type}:${e.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(e);
    }
  }
  return out;
}

/** Turn entity refs into artifact relations — graph edges grow from every artifact */
export function entitiesToRelations(entities: GraphEntityRef[]): ArtifactRelation[] {
  return entities.map((target) => ({ type: 'connected_to', target }));
}

export function entitiesFromRelations(relations: ArtifactRelation[]): GraphEntityRef[] {
  return relations
    .filter((r): r is ArtifactRelation & { target: GraphEntityRef } => 'world_slug' in r.target)
    .map((r) => r.target);
}
