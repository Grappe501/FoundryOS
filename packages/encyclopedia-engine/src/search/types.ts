/**
 * Semantic Search — reserved capability (not a pass deliverable).
 * Traverses: Encyclopedia, KG, Collections, Reviews, Academy, Friend Groups
 */

export type SemanticSearchScope =
  | 'encyclopedia'
  | 'knowledge_graph'
  | 'collections'
  | 'reviews'
  | 'academy'
  | 'friend_groups'
  | 'recipes'
  | 'rankings';

export type SemanticSearchQuery = {
  query: string;
  scopes: SemanticSearchScope[];
  vertical_id?: string;
  user_id?: string;
  /** Example: "best bourbon under $50", "movies similar to Tombstone" */
  intent?: 'similarity' | 'recommendation' | 'pairing' | 'comparison' | 'learning';
};

export type SemanticSearchResult = {
  query: string;
  entity_slugs: string[];
  topic_slugs: string[];
  recipe_slugs: string[];
  academy_lessons: string[];
  explanation: string;
};

/** Example queries the engine should eventually answer */
export const SEMANTIC_SEARCH_EXAMPLES = [
  'best bourbon under $50',
  'bourbons similar to Eagle Rare',
  'what bourbon pairs with smoked brisket',
  'movies similar to Tombstone',
  'books about bourbon history',
];
