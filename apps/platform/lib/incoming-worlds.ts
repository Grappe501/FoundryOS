/**
 * Ranked incoming worlds — acquisition pipeline, not a build queue.
 * Add worlds here as they are considered; rank by traffic + conversion + retention potential.
 * Chess is one entry — not a special track. Depth on live worlds comes first.
 */

export type IncomingWorldStatus = 'live' | 'in_build' | 'queued' | 'idea';
export type IncomingWorldTier = 'Life Leverage' | 'Passion' | 'Skills Guild' | 'Academic' | 'Civic';
export type AcquisitionAvenue =
  | 'seo'
  | 'parent'
  | 'youtube'
  | 'tiktok'
  | 'school'
  | 'club'
  | 'tournament'
  | 'community'
  | 'newsletter'
  | 'educator';

export type IncomingWorld = {
  rank: number;
  slug: string;
  name: string;
  frame: string;
  tier: IncomingWorldTier;
  status: IncomingWorldStatus;
  outcome: string;
  /** Composite score for ordering (traffic + conversion + retention + community) */
  score: number;
  acquisition_avenues: AcquisitionAvenue[];
  note: string;
  live_href?: string | null;
};

/** Single source of truth — sync explore catalog + flywheel candidates from here */
export const INCOMING_WORLDS: IncomingWorld[] = [
  {
    rank: 1,
    slug: 'career-change',
    name: 'Career Change',
    frame: 'Navigate Transitions',
    tier: 'Life Leverage',
    status: 'queued',
    outcome: 'Become a Career Pivot Strategist',
    score: 87,
    acquisition_avenues: ['seo', 'parent', 'youtube', 'newsletter'],
    note: 'Parents and adult learners buy outcomes — high conversion wedge',
  },
  {
    rank: 2,
    slug: 'master-gardener',
    name: 'Master Gardener',
    frame: 'Steward the Land',
    tier: 'Skills Guild',
    status: 'queued',
    outcome: 'Become a Master Gardener',
    score: 82,
    acquisition_avenues: ['seo', 'community', 'school', 'youtube'],
    note: 'Seasonal projects + local chapters — strong retention',
  },
  {
    rank: 3,
    slug: 'grassroots-nonprofit',
    name: 'Grassroots & Nonprofits',
    frame: 'Organize for Change',
    tier: 'Civic',
    status: 'queued',
    outcome: 'Run a Campaign or Launch a 501(c)(3)',
    score: 84,
    acquisition_avenues: ['community', 'newsletter', 'seo', 'educator', 'youtube'],
    note:
      '501(c)(3) vs 501(c)(4) vs fiscal sponsor education + grassroots campaign ops — pairs Civic Engagement; high community entry',
  },
  {
    rank: 4,
    slug: 'homesteading',
    name: 'Homesteading',
    frame: 'Build Self-Reliance',
    tier: 'Skills Guild',
    status: 'queued',
    outcome: 'Become a Homesteader',
    score: 81,
    acquisition_avenues: ['youtube', 'seo', 'community', 'newsletter'],
    note: 'Project-heavy, community-native — retention champion',
  },
  {
    rank: 5,
    slug: 'campaign-management',
    name: 'Campaign Management',
    frame: 'Win Elections',
    tier: 'Civic',
    status: 'idea',
    outcome: 'Become a Campaign Strategist',
    score: 78,
    acquisition_avenues: ['community', 'seo', 'newsletter'],
    note: 'Election-cycle wedge — subset of Grassroots & Nonprofits path',
  },
  {
    rank: 6,
    slug: 'computer-science',
    name: 'Computer Science',
    frame: 'Build Systems',
    tier: 'Academic',
    status: 'queued',
    outcome: 'Road to Software Mastery',
    score: 76,
    acquisition_avenues: ['school', 'parent', 'seo', 'youtube'],
    note: 'Student pathway — pairs with AI Builder',
  },
  {
    rank: 7,
    slug: 'soccer',
    name: 'Soccer',
    frame: 'Read the Game',
    tier: 'Skills Guild',
    status: 'idea',
    outcome: 'Become a Coach or Analyst',
    score: 74,
    acquisition_avenues: ['club', 'parent', 'youtube', 'tiktok'],
    note: 'Youth coaches + fantasy analysts — tournament and club entry',
  },
  {
    rank: 8,
    slug: 'books',
    name: 'Books',
    frame: 'Curate & Discuss',
    tier: 'Passion',
    status: 'idea',
    outcome: 'Become a Literary Enthusiast',
    score: 72,
    acquisition_avenues: ['seo', 'community', 'newsletter', 'youtube'],
    note: 'Salon culture — book clubs as acquisition loop',
  },
  {
    rank: 9,
    slug: 'chess',
    name: 'Chess',
    frame: 'Think Deeply',
    tier: 'Skills Guild',
    status: 'in_build',
    outcome: 'Beginner → Master',
    score: 71,
    acquisition_avenues: ['club', 'tournament', 'school', 'youtube', 'seo'],
    note: 'Prototype world — club/tournament/school channels; prove loop before scaling',
    live_href: '/chess',
  },
  {
    rank: 10,
    slug: 'movies',
    name: 'Movies',
    frame: 'Watch with Intention',
    tier: 'Passion',
    status: 'idea',
    outcome: 'Become a Film Enthusiast',
    score: 68,
    acquisition_avenues: ['seo', 'youtube', 'community', 'tiktok'],
    note: 'Watch parties and director deep-dives — community-led',
  },
  {
    rank: 11,
    slug: 'physics',
    name: 'Physics',
    frame: 'Understand Reality',
    tier: 'Academic',
    status: 'idea',
    outcome: 'Road to Physics Fluency',
    score: 65,
    acquisition_avenues: ['school', 'parent', 'seo', 'educator'],
    note: 'Academic domain — long horizon, educator channel',
  },
];

export function getIncomingWorld(slug: string): IncomingWorld | undefined {
  return INCOMING_WORLDS.find((w) => w.slug === slug);
}

export function listIncomingWorldsByRank(): IncomingWorld[] {
  return [...INCOMING_WORLDS].sort((a, b) => a.rank - b.rank);
}

export const ACQUISITION_AVENUE_LABELS: Record<AcquisitionAvenue, string> = {
  seo: 'SEO / search',
  parent: 'Parents',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  school: 'Schools',
  club: 'Clubs',
  tournament: 'Tournaments',
  community: 'Community',
  newsletter: 'Newsletter',
  educator: 'Educators',
};
