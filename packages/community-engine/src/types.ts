/**
 * Community OS — not a club feature.
 * A full operating system for real-world communities.
 */

export type CommunityCapability =
  | 'members'
  | 'projects'
  | 'tastings'
  | 'collections'
  | 'rankings'
  | 'challenges'
  | 'academy_paths'
  | 'leadership_roles';

export type CommunityOS = {
  slug: string;
  display_name: string;
  tagline: string;
  vertical_slug: string;
  host_user_id?: string;
  region?: string;
  capabilities: CommunityCapability[];
  member_count: number;
  status: 'draft' | 'active' | 'archived';
};

export type CommunityUseCase = {
  slug: string;
  entity_slug: string;
  title: string;
  why_community_cares: string;
  suggested_activities: string[];
  status: 'draft';
};
