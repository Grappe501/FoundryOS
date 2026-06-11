/**
 * Foundry Path System — Expert Development
 * People want: Identity, Progress, Belonging, Mastery, Recognition, Application
 */

export type PathTier = 'enthusiast' | 'collector' | 'historian' | 'steward' | 'master' | 'critic' | 'expert' | 'judge' | 'scholar';

export type MilestoneCategory =
  | 'learn'      // Academy + Knowledge
  | 'experience' // Reviews, tastings
  | 'collect'    // Collections
  | 'compare'    // Rankings
  | 'contribute' // Guides, trivia, corrections
  | 'mentor'     // Help new members
  | 'lead'       // Host events, run clubs
  | 'influence'; // Expert rankings, recommendations

export type PathMilestone = {
  slug: string;
  category: MilestoneCategory;
  title: string;
  description: string;
  requirement: string;
  target_count?: number;
  academy_lesson_slug?: string;
  encyclopedia_sections?: string[];
  sort_order: number;
};

export type MasteryPath = {
  slug: string;
  display_name: string;
  tagline: string;
  vertical_id: string;
  vertical_slug: string;
  tier: PathTier;
  path_prefix: string;
  milestones: PathMilestone[];
  assembled_from: Array<
    | 'academy'
    | 'knowledge'
    | 'collections'
    | 'reviews'
    | 'community'
    | 'projects'
    | 'contribute'
    | 'mentor'
    | 'lead'
    | 'compare'
  >;
  estimated_weeks?: number;
  status: 'draft' | 'active' | 'archived';
};

export type UserPathProgress = {
  user_id: string;
  path_slug: string;
  progress_pct: number;
  milestones_completed: string[];
  milestones_total: number;
  started_at: string;
  updated_at: string;
  /** Visible expertise — not gamified badges */
  mastery_label?: string;
};

export type ClubPathChallenge = {
  club_id: string;
  club_name: string;
  path_slug: string;
  challenge_title: string;
  host_user_id: string;
  member_count: number;
  status: 'active' | 'completed';
};
