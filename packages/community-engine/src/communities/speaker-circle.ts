import type { CommunityOS } from '../types';

/** Speaker Circle — public speaking community (Demo User PASS-012 proof) */
export const SPEAKER_CIRCLE: CommunityOS = {
  slug: 'speaker-circle',
  display_name: 'Speaker Circle',
  tagline: 'Shared mastery for aspiring speakers — not just social',
  vertical_slug: 'public-speaking',
  host_user_slug: 'demo-user',
  region: 'Central Arkansas',
  domain_slug: 'public-speaking',
  community_type: 'circle',
  capabilities: ['members', 'projects', 'collections', 'rankings', 'challenges', 'academy_paths', 'leadership_roles'],
  member_count: 12,
  status: 'active',
};

/** Central Arkansas Bourbon Society — architecture example (not demo proof user) */
export const CENTRAL_ARKANSAS_BOURBON_SOCIETY: CommunityOS = {
  slug: 'central-arkansas-bourbon-society',
  display_name: 'Central Arkansas Bourbon Society',
  tagline: 'Shared mastery — not just social',
  vertical_slug: 'bourbon',
  host_user_slug: 'steve-grappe',
  region: 'Central Arkansas',
  domain_slug: 'bourbon',
  community_type: 'society',
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

export const COMMUNITY_OS_CAPABILITIES: Array<{ key: import('../types').CommunityCapability; label: string }> = [
  { key: 'members', label: 'Members' },
  { key: 'projects', label: 'Projects' },
  { key: 'tastings', label: 'Tastings' },
  { key: 'collections', label: 'Collections' },
  { key: 'rankings', label: 'Rankings' },
  { key: 'challenges', label: 'Challenges' },
  { key: 'academy_paths', label: 'Academy Paths' },
  { key: 'leadership_roles', label: 'Leadership Roles' },
];

export const COMMUNITY_EXAMPLES = [
  SPEAKER_CIRCLE,
  CENTRAL_ARKANSAS_BOURBON_SOCIETY,
  {
    slug: 'regional-organizers-network',
    display_name: 'Regional Organizers Network',
    tagline: 'Campaign management shared mastery',
    vertical_slug: 'politics',
    domain_slug: 'campaign-management',
    community_type: 'network' as const,
    capabilities: ['members', 'projects', 'challenges'] as const,
    member_count: 0,
    status: 'draft' as const,
  },
  {
    slug: 'foundry-ai-lab',
    display_name: 'Foundry AI Lab',
    tagline: 'Builders growing together',
    vertical_slug: 'technology',
    domain_slug: 'ai-building',
    community_type: 'lab' as const,
    capabilities: ['members', 'projects', 'collections'] as const,
    member_count: 0,
    status: 'draft' as const,
  },
];
