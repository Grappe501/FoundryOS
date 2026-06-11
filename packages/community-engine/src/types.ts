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

export type CommunityType = 'society' | 'circle' | 'network' | 'lab' | 'collective' | 'club';

export type CommunityOS = {
  id?: string;
  slug: string;
  display_name: string;
  tagline: string;
  vertical_slug: string;
  domain_slug: string;
  community_type: CommunityType;
  host_user_slug?: string;
  host_user_id?: string;
  region?: string;
  capabilities: CommunityCapability[];
  member_count: number;
  status: 'draft' | 'active' | 'archived';
};

export type CommunityMember = {
  id?: string;
  community_id?: string;
  user_slug: string;
  role: 'host' | 'member' | 'mentor' | 'steward';
  joined_at?: string;
};

export type CommunityProjectAssignment = {
  id?: string;
  community_id?: string;
  project_slug: string;
  project_title: string;
  assigned_to_user_slug: string;
  assigned_at?: string;
};

export type CommunityEvidenceShare = {
  id?: string;
  community_id?: string;
  evidence_submission_id: string;
  shared_by_user_slug: string;
  shared_at?: string;
};

export type CommunityVerificationStep = {
  key: string;
  label: string;
  complete: boolean;
};

export type CommunityUseCase = {
  slug: string;
  entity_slug: string;
  title: string;
  why_community_cares: string;
  suggested_activities: string[];
  status: 'draft';
};
