/**
 * Friend Group Intelligence — Tier 3 retention (reserved)
 * Steve's Bourbon Club: favorites, rankings, blind tastings, wishlists
 */

export type ClubIntelligence = {
  group_id: string;
  group_name: string;
  vertical_id: string;
  club_favorites: string[];
  club_rankings: Array<{ entity_slug: string; rank: number }>;
  most_collected: string[];
  shared_wishlists: string[];
  blind_tasting_results: Array<{ event_id: string; entity_slug: string; score: number }>;
};

export type UserContributionType =
  | 'recipe'
  | 'guide'
  | 'collection'
  | 'ranking'
  | 'learning_path'
  | 'review'
  | 'trivia'
  | 'comparison';
