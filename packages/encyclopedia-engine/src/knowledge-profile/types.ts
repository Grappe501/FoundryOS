/**
 * User Knowledge Profiles — not gamified, just progress.
 * Steve: Bourbon 84%, BBQ 72%, Steak 91%
 */

export type KnowledgeDomain = {
  vertical_id: string;
  vertical_slug: string;
  display_name: string;
  progress_pct: number;
  lessons_completed: number;
  lessons_total: number;
  entities_engaged: number;
  last_activity_at?: string;
};

export type UserKnowledgeProfile = {
  user_id: string;
  display_name: string;
  domains: KnowledgeDomain[];
  updated_at: string;
};
