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

/** Mastery title earned via path completion — portable across verticals */
export type MasteryTitle = {
  title: string;
  vertical_slug: string;
  path_slug?: string;
  completed_at?: string;
};

/** Role — how people think about identity (Enthusiast, Steward, Pitmaster, etc.) */
export type FoundryRole = {
  role: string;
  vertical_slug: string;
  earned_via?: 'path' | 'project' | 'community' | 'mentor';
};

export type LegacyMilestone = {
  year: number;
  title: string;
  milestone_type: 'path' | 'project' | 'community' | 'mentor' | 'legacy';
};

/** Long-term profile — effort matters, Foundry remembers */
export type FoundryLegacyProfile = {
  user_id: string;
  display_name: string;
  joined_year: number;
  paths_completed: number;
  projects_completed: number;
  people_mentored: number;
  communities_built: number;
  knowledge_contributions: number;
  legacy_impact_score: number;
  milestones: LegacyMilestone[];
};

/** Active path with visible progress — "What are you becoming?" */
export type ActivePathProgress = {
  path_slug: string;
  display_name: string;
  progress_pct: number;
};

/** Active project — knowledge into action */
export type ActiveProjectProgress = {
  project_slug: string;
  display_name: string;
  progress_pct: number;
};

/**
 * Foundry Identity — not merely an account.
 * Follows the user across web verticals, mobile app, and offline sync.
 */
export type FoundryIdentity = {
  user_id: string;
  display_name: string;
  roles: FoundryRole[];
  mastery_titles: MasteryTitle[];
  active_paths: ActivePathProgress[];
  active_projects: ActiveProjectProgress[];
  collections_count: number;
  reviews_count: number;
  paths_completed: number;
  projects_completed: number;
  people_mentored: number;
  communities_led: number;
  region?: string;
  trust_score?: number;
};

/** Share card for viral loop — "What I'm becoming" */
export type IdentityShareCard = {
  display_name: string;
  hook: string;
  primary_path?: { display_name: string; progress_pct: number };
  mastery_titles: string[];
  stats: {
    collections: number;
    reviews: number;
    paths_completed: number;
    communities_led: number;
  };
};
