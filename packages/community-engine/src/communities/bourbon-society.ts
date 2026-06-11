import type { CommunityCapability, CommunityOS } from '../types';

/** Central Arkansas Bourbon Society — Community OS example */
export const CENTRAL_ARKANSAS_BOURBON_SOCIETY: CommunityOS = {
  slug: 'central-arkansas-bourbon-society',
  display_name: 'Central Arkansas Bourbon Society',
  tagline: 'Shared mastery — not just social',
  vertical_slug: 'bourbon',
  host_user_id: 'steve-grappe',
  region: 'Central Arkansas',
  capabilities: [
    'members',
    'projects',
    'tastings',
    'collections',
    'rankings',
    'challenges',
    'academy_paths',
    'leadership_roles',
  ],
  member_count: 24,
  status: 'active',
};

export const COMMUNITY_OS_CAPABILITIES: Array<{ key: CommunityCapability; label: string }> = [
  { key: 'members', label: 'Members' },
  { key: 'projects', label: 'Projects' },
  { key: 'tastings', label: 'Tastings' },
  { key: 'collections', label: 'Collections' },
  { key: 'rankings', label: 'Rankings' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'academy_paths', label: 'Academy Paths' },
  { key: 'leadership_roles', label: 'Leadership Roles' },
];
