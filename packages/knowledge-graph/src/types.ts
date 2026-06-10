export type RelationshipType =
  | 'pairs_with'
  | 'featured_in'
  | 'related_to'
  | 'alternative_to'
  | 'part_of'
  | 'created_by'
  | 'inspired_by'
  | 'complements'
  | 'cross_vertical';

export interface KGEntity {
  id: string;
  slug: string;
  display_name: string;
  entity_type: 'topic' | 'product' | 'person' | 'place' | 'event' | 'concept';
  vertical_id?: string;
  topic_slug?: string;
  metadata: Record<string, unknown>;
}

export interface KGRelationship {
  id: string;
  source_entity_id: string;
  target_entity_id: string;
  relationship_type: RelationshipType;
  strength: number;
  metadata: Record<string, unknown>;
}

export interface GraphTraversal {
  entity: KGEntity;
  relationship: KGRelationship;
  depth: number;
}
