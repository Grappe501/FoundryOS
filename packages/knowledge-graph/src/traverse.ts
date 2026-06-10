import type { KGEntity, KGRelationship, GraphTraversal } from './types';

export function getRelatedEntities(
  entityId: string,
  relationships: KGRelationship[],
  entities: Map<string, KGEntity>,
  direction: 'out' | 'in' | 'both' = 'out'
): KGEntity[] {
  const related: KGEntity[] = [];

  for (const rel of relationships) {
    let targetId: string | null = null;
    if (direction !== 'in' && rel.source_entity_id === entityId) targetId = rel.target_entity_id;
    if (direction !== 'out' && rel.target_entity_id === entityId) targetId = rel.source_entity_id;
    if (targetId) {
      const entity = entities.get(targetId);
      if (entity) related.push(entity);
    }
  }

  return related;
}

export function traverseGraph(
  startEntityId: string,
  relationships: KGRelationship[],
  entities: Map<string, KGEntity>,
  maxDepth = 3
): GraphTraversal[] {
  const results: GraphTraversal[] = [];
  const visited = new Set<string>();

  function walk(entityId: string, depth: number) {
    if (depth > maxDepth || visited.has(entityId)) return;
    visited.add(entityId);

    for (const rel of relationships) {
      if (rel.source_entity_id !== entityId) continue;
      const target = entities.get(rel.target_entity_id);
      if (!target) continue;
      results.push({ entity: target, relationship: rel, depth });
      walk(rel.target_entity_id, depth + 1);
    }
  }

  walk(startEntityId, 1);
  return results;
}
