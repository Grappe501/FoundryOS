import type { PyramidLayer } from '@foundry/learning-pyramid';

export type MentorTier = 'helper' | 'guide' | 'mentor' | 'master_mentor';

export type MentorMilestone = {
  slug: string;
  title: string;
  description: string;
  requirement: string;
  target_count?: number;
  sort_order: number;
};

/** Academic mastery path — Learn → Apply → Build → Research → Mentor */
export type MasteryRoad = {
  slug: string;
  display_name: string;
  domain_slug: string;
  pyramid_layers: PyramidLayer[];
  levels: Array<{
    level: number;
    name: string;
    layer: PyramidLayer;
    milestones: MentorMilestone[];
  }>;
  status: 'draft' | 'active' | 'exemplar';
};

export type MentorProfile = {
  user_id: string;
  domains_mentored: string[];
  people_mentored: number;
  guides_created: number;
  study_groups_led: number;
  curricula_built: number;
  mentor_tier: MentorTier;
};
