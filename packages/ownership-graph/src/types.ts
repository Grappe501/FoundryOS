export type OwnershipRelationshipType =
  | 'owns'
  | 'favorites'
  | 'reviewed'
  | 'ranked'
  | 'wants'
  | 'watched'
  | 'read'
  | 'listened'
  | 'visited'
  | 'experienced';

export interface UserEntityRelationship {
  id: string;
  user_id: string;
  entity_id: string;
  relationship_type: OwnershipRelationshipType;
  collection_id?: string;
  rank_position?: number;
  personal_rating?: number;
  personal_notes?: string;
  review_id?: string;
  is_public: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** Maps relationship types to user-facing labels */
export const RELATIONSHIP_LABELS: Record<OwnershipRelationshipType, string> = {
  owns: 'My Shelf',
  favorites: 'Favorites',
  reviewed: 'Reviewed',
  ranked: 'Rankings',
  wants: 'Watchlist',
  watched: 'Watched',
  read: 'Read',
  listened: 'Listened',
  visited: 'Visited',
  experienced: 'Experienced',
};

export interface EntityMetrics {
  entity_id: string;
  reviews_count: number;
  collections_count: number;
  favorites_count: number;
  ownership_count: number;
  ranking_count: number;
  wants_count: number;
  visited_count: number;
  trust_score: number;
  total_engagement: number;
}

export interface UserIdentitySnapshot {
  user_id: string;
  display_name?: string;
  region?: string;
  owns: string[];
  favorites: string[];
  reviewed: string[];
  ranked: Array<{ entity_id: string; position: number }>;
  wants: string[];
  collections_count: number;
  expertise_titles: string[];
  trust_score?: number;
}
