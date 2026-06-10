import type { KGEntity, KGRelationship, RelationshipType } from './types';

let entityCounter = 0;
let relCounter = 0;

export function createEntity(
  slug: string,
  displayName: string,
  entityType: KGEntity['entity_type'],
  opts?: Partial<KGEntity>
): KGEntity {
  return {
    id: `ent_${++entityCounter}`,
    slug,
    display_name: displayName,
    entity_type: entityType,
    metadata: {},
    ...opts,
  };
}

export function createRelationship(
  sourceId: string,
  targetId: string,
  type: RelationshipType,
  strength = 1
): KGRelationship {
  return {
    id: `rel_${++relCounter}`,
    source_entity_id: sourceId,
    target_entity_id: targetId,
    relationship_type: type,
    strength,
    metadata: {},
  };
}
