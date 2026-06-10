export type EntityStatus = 'draft' | 'published' | 'archived';

export type RelationshipType =
  | 'pairs_with'
  | 'featured_in'
  | 'related_to'
  | 'alternative_to'
  | 'part_of'
  | 'created_by'
  | 'inspired_by'
  | 'complements'
  | 'cross_vertical'
  | 'directed_by'
  | 'performed_by'
  | 'authored_by'
  | 'member_of'
  | 'competes_with';

export interface EntityType {
  id: string;
  slug: string;
  display_name: string;
  description?: string;
  vertical_id?: string;
  schema_definition: Record<string, unknown>;
  status: 'active' | 'archived';
}

export interface Entity {
  id: string;
  entity_type_id: string;
  slug: string;
  display_name: string;
  description?: string;
  vertical_id?: string;
  topic_id?: string;
  status: EntityStatus;
  metadata: Record<string, unknown>;
  image_url?: string;
}

export interface EntityAttribute {
  id: string;
  entity_id: string;
  attribute_key: string;
  attribute_value: unknown;
  value_type: 'string' | 'number' | 'boolean' | 'date' | 'json' | 'array';
}

export interface EntityRelationship {
  id: string;
  source_entity_id: string;
  target_entity_id: string;
  relationship_type: RelationshipType;
  strength: number;
  metadata: Record<string, unknown>;
}

export interface Collection {
  id: string;
  user_id: string;
  slug: string;
  display_name: string;
  description?: string;
  vertical_id?: string;
  topic_id?: string;
  collection_type: 'personal' | 'wishlist' | 'ranked' | 'shared' | 'club';
  is_public: boolean;
  entity_count: number;
}

export interface UserReputation {
  user_id: string;
  vertical_id?: string;
  topic_id?: string;
  trust_score: number;
  collections_count: number;
  reviews_count: number;
  rankings_count: number;
  contributions_count: number;
  region?: string;
}

export interface UserExpertise {
  user_id: string;
  title: string;
  vertical_id?: string;
  topic_id?: string;
  region?: string;
  level: number;
  verified: boolean;
}
