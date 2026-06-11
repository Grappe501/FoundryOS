/**
 * Foundry Project Engine — Experts build things.
 * Projects transform knowledge into action.
 */

export type ProjectCategory =
  | 'experience'   // Blind tasting, smoke first brisket
  | 'build'        // Build shelf, family tree, home library
  | 'explore'      // Visit distilleries, ancestral sites
  | 'host'         // Host club, town hall, book club
  | 'compete'      // Enter cookoff, judge competition
  | 'organize'     // Register voters, build precinct team
  | 'document';    // Document grandparents, tasting notes

export type ProjectStatus = 'draft' | 'active' | 'archived';

export type FoundryProject = {
  slug: string;
  display_name: string;
  tagline: string;
  vertical_slug: string;
  category: ProjectCategory;
  description: string;
  /** Optional path this project advances */
  path_slug?: string;
  /** Steps to complete — visible progress, not gamification */
  steps: ProjectStep[];
  estimated_days?: number;
  status: ProjectStatus;
};

export type ProjectStep = {
  slug: string;
  title: string;
  description: string;
  sort_order: number;
};

export type UserProjectProgress = {
  user_id: string;
  project_slug: string;
  progress_pct: number;
  steps_completed: string[];
  steps_total: number;
  started_at: string;
  completed_at?: string;
  status: 'in_progress' | 'completed' | 'abandoned';
};

/** Journey event — Foundry remembers journeys, not just answers */
export type JourneyEvent = {
  year: number;
  title: string;
  event_type: 'started' | 'milestone' | 'project' | 'club' | 'mentor' | 'mastery';
  description: string;
};
