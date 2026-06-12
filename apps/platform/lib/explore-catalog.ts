/** PASS-016C — Public Explore Catalog (consumer-facing path directory) */

import { FACTORY_EXPLORE_PATHS } from './generated/world-factory-explore';
import type { UserSegment } from './world-governance';
import { getWorldAudience, segmentCanAccessWorld } from './world-governance';

export type ExploreStatus = 'live' | 'in_build' | 'validating' | 'planned' | 'paused';

export type ExploreTier =
  | 'Life Leverage'
  | 'Student Pathway'
  | 'Academic'
  | 'Hobby'
  | 'Career'
  | 'Community'
  | 'Civic';

export type ExploreCategoryFilter =
  | 'all'
  | 'life_leverage'
  | 'student_pathways'
  | 'academic'
  | 'hobbies'
  | 'careers'
  | 'civic'
  | 'food_drink'
  | 'sports'
  | 'arts_culture'
  | 'finance'
  | 'technology';

export type ExplorePath = {
  slug: string;
  name: string;
  outcome: string;
  status: ExploreStatus;
  tier: ExploreTier;
  launch_rank: number | null;
  section_id: string;
  categories: ExploreCategoryFilter[];
  live_href: string | null;
  planned_projects: string[];
  become: string;
};

export type ExploreSection = {
  id: string;
  title: string;
  description: string;
};

export const EXPLORE_HERO = {
  title: 'Explore every path Foundry is building.',
  subtitle: 'Explore what you can become — not a course list.',
};

export const EXPLORE_STATUS_LABELS: Record<ExploreStatus, string> = {
  live: 'Live now',
  in_build: 'In development',
  validating: 'Being validated',
  planned: 'Planned',
  paused: 'Not scheduled',
};

export const EXPLORE_STATUS_COLORS: Record<
  ExploreStatus,
  { dot: string; border: string; bg: string; text: string }
> = {
  live: { dot: '#6B9B6B', border: '#2A4A2A', bg: '#0F1A0F', text: '#6B9B6B' },
  in_build: { dot: '#6B9BD4', border: '#2A3A5A', bg: '#0F121A', text: '#6B9BD4' },
  validating: { dot: '#C8A96E', border: '#4A4020', bg: '#1A160F', text: '#C8A96E' },
  planned: { dot: '#8A8A8E', border: '#2A2A2E', bg: '#111114', text: '#8A8A8E' },
  paused: { dot: '#B06B6B', border: '#4A2A2A', bg: '#1A0F0F', text: '#B06B6B' },
};

export const EXPLORE_CATEGORY_FILTERS: { id: ExploreCategoryFilter; label: string }[] = [
  { id: 'all', label: 'All paths' },
  { id: 'life_leverage', label: 'Life Leverage' },
  { id: 'student_pathways', label: 'Student Pathways' },
  { id: 'academic', label: 'Academic' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'careers', label: 'Careers' },
  { id: 'civic', label: 'Civic' },
  { id: 'food_drink', label: 'Food & Drink' },
  { id: 'sports', label: 'Sports' },
  { id: 'arts_culture', label: 'Arts & Culture' },
  { id: 'finance', label: 'Finance' },
  { id: 'technology', label: 'Technology' },
];

export const EXPLORE_SECTIONS: ExploreSection[] = [
  {
    id: 'life-leverage',
    title: 'Life Leverage Domains',
    description: 'Paths that change life outcomes — parents pay, schools recommend, students spend years inside.',
  },
  {
    id: 'foundry-student',
    title: 'Foundry Student',
    description: 'Roads for middle school and high school — built around who you want to become.',
  },
  {
    id: 'finance-wealth',
    title: 'Finance & Wealth',
    description: 'Understand money, build wealth, and teach the next generation.',
  },
  {
    id: 'ai-technology',
    title: 'AI & Technology',
    description: 'Create value in an AI world — ship projects, not just watch tutorials.',
  },
  {
    id: 'communication-leadership',
    title: 'Communication & Leadership',
    description: 'Communicate what you know and lead with confidence.',
  },
  {
    id: 'civic-life',
    title: 'Civic Life',
    description: 'Become an informed citizen and community leader.',
  },
  {
    id: 'food-drink',
    title: 'Food & Drink',
    description: 'Lifelong identity domains around taste, craft, and community.',
  },
  {
    id: 'arts-culture',
    title: 'Books · Movies · Music',
    description: 'Collections, clubs, and mastery paths for cultural enthusiasts.',
  },
  {
    id: 'sports-games',
    title: 'Sports & Games',
    description: 'From fan to coach, host, analyst, or competitor.',
  },
  {
    id: 'outdoors-gardening',
    title: 'Outdoors & Gardening',
    description: 'Grow food, steward land, and teach what you harvest.',
  },
];

const FACTORY_SLUGS = new Set(FACTORY_EXPLORE_PATHS.map((p) => p.slug));

const STATIC_EXPLORE_PATHS: ExplorePath[] = [
  {
    slug: 'future-proof',
    name: 'Build Future-Proof Skills',
    outcome: 'Create, communicate, and keep value in an uncertain world',
    status: 'live',
    tier: 'Life Leverage',
    launch_rank: 1,
    section_id: 'life-leverage',
    categories: ['all', 'life_leverage', 'student_pathways', 'technology', 'finance'],
    live_href: '/future-proof',
    planned_projects: ['Future-Proof Starter Assessment', 'Pick your first path', 'Start your first project'],
    become: 'Someone ready for what comes next — with a clear path and next step.',
  },
  {
    slug: 'ai-builder',
    name: 'AI Builder',
    outcome: 'Become an AI Builder',
    status: 'live',
    tier: 'Life Leverage',
    launch_rank: 2,
    section_id: 'ai-technology',
    categories: ['all', 'life_leverage', 'student_pathways', 'technology', 'careers'],
    live_href: '/ai-builder',
    planned_projects: [
      'Use AI to solve a problem',
      'Build first automation',
      'Build first website',
      'Build first assistant',
      'Build first business workflow',
    ],
    become: 'Someone who creates value with AI — not just consumes it.',
  },
  {
    slug: 'financial-independence',
    name: 'Financial Independence',
    outcome: 'Achieve Financial Independence',
    status: 'live',
    tier: 'Life Leverage',
    launch_rank: 3,
    section_id: 'finance-wealth',
    categories: ['all', 'life_leverage', 'student_pathways', 'finance', 'careers'],
    live_href: '/financial-independence',
    planned_projects: [
      'Build first budget',
      'Save first $1,000',
      'Analyze first stock',
      'Create first investment plan',
      'Open first savings account',
    ],
    become: 'Someone who understands money, builds wealth, and can teach others.',
  },
  {
    slug: 'public-speaking',
    name: 'Public Speaking',
    outcome: 'Become a Confident Speaker',
    status: 'live',
    tier: 'Life Leverage',
    launch_rank: 4,
    section_id: 'communication-leadership',
    categories: ['all', 'life_leverage', 'student_pathways', 'careers'],
    live_href: '/public-speaking',
    planned_projects: [
      'Deliver a 2-minute talk',
      'Record and review yourself',
      'Speak at a meeting',
      'Host a feedback circle',
    ],
    become: 'Someone who communicates ideas with clarity and confidence.',
  },
  {
    slug: 'civic-engagement',
    name: 'Civic Engagement',
    outcome: 'Become an Informed Citizen',
    status: 'planned',
    tier: 'Life Leverage',
    launch_rank: 5,
    section_id: 'civic-life',
    categories: ['all', 'life_leverage', 'student_pathways', 'civic'],
    live_href: null,
    planned_projects: [
      'Register to vote',
      'Research your ballot',
      'Attend a local meeting',
      'Volunteer for a cause',
    ],
    become: 'Someone who participates in community and leads locally.',
  },
  {
    slug: 'foundry-student-middle',
    name: 'Foundry Student · Middle School',
    outcome: 'Build foundations early (Grades 6–8)',
    status: 'validating',
    tier: 'Student Pathway',
    launch_rank: null,
    section_id: 'foundry-student',
    categories: ['all', 'student_pathways', 'life_leverage'],
    live_href: '/future-proof',
    planned_projects: ['What do you want to become?', 'First budget', 'First AI project', 'First talk'],
    become: 'A teen with clarity about who they are becoming — not just what class is next.',
  },
  {
    slug: 'foundry-student-high',
    name: 'Foundry Student · High School',
    outcome: 'Prepare for adulthood (Grades 9–12)',
    status: 'validating',
    tier: 'Student Pathway',
    launch_rank: null,
    section_id: 'foundry-student',
    categories: ['all', 'student_pathways', 'life_leverage'],
    live_href: '/future-proof',
    planned_projects: [
      'Financial literacy path',
      'AI builder path',
      'Public speaking path',
      'College & career planning',
    ],
    become: 'A young adult ready for college, career, and financial independence.',
  },
  {
    slug: 'bourbon',
    name: 'Bourbon',
    outcome: 'Become a Bourbon Enthusiast',
    status: 'live',
    tier: 'Community',
    launch_rank: 1,
    section_id: 'food-drink',
    categories: ['all', 'food_drink', 'hobbies'],
    live_href: '/verticals/bourbon',
    planned_projects: [
      'Host first blind tasting',
      'Build starter shelf',
      'Visit first distillery',
      'Lead a tasting for friends',
    ],
    become: 'A bourbon enthusiast with taste, community, and a shelf that tells your story.',
  },
  {
    slug: 'bbq',
    name: 'BBQ & Pitmaster',
    outcome: 'Become a Pitmaster',
    status: 'planned',
    tier: 'Hobby',
    launch_rank: null,
    section_id: 'food-drink',
    categories: ['all', 'food_drink', 'hobbies'],
    live_href: null,
    planned_projects: ['Smoke first brisket', 'Build your rub', 'Host a cookout', 'Competition timeline'],
    become: 'A pitmaster who feeds people and shares the craft.',
  },
  {
    slug: 'master-gardener',
    name: 'Master Gardener',
    outcome: 'Become a Master Gardener',
    status: 'planned',
    tier: 'Hobby',
    launch_rank: 6,
    section_id: 'outdoors-gardening',
    categories: ['all', 'hobbies'],
    live_href: null,
    planned_projects: ['Start raised bed', 'First harvest', 'Teach a neighbor', 'Community garden project'],
    become: 'Someone who grows food, stewards land, and teaches others.',
  },
  {
    slug: 'poker',
    name: 'Poker',
    outcome: 'Become a Home Game Host',
    status: 'planned',
    tier: 'Hobby',
    launch_rank: 7,
    section_id: 'sports-games',
    categories: ['all', 'hobbies', 'sports'],
    live_href: null,
    planned_projects: ['Learn home game rules', 'Host first game', 'Study bankroll basics', 'Run a tournament'],
    become: 'A host who creates memorable nights and understands the game deeply.',
  },
  {
    slug: 'chess',
    name: 'Chess',
    outcome: 'Beginner → Master',
    status: 'in_build',
    tier: 'Hobby',
    launch_rank: 7,
    section_id: 'sports-games',
    categories: ['all', 'hobbies', 'sports'],
    live_href: '/chess',
    planned_projects: ['First complete game', '50 tactics puzzles', 'Mini repertoire', 'First rated game', 'Lead study session'],
    become: 'A club player who studies seriously — post-mortems, rating, and the master track.',
  },
  {
    slug: 'soccer',
    name: 'Soccer',
    outcome: 'Become a Soccer Coach or Analyst',
    status: 'planned',
    tier: 'Hobby',
    launch_rank: 8,
    section_id: 'sports-games',
    categories: ['all', 'sports', 'hobbies'],
    live_href: null,
    planned_projects: ['Learn the game deeply', 'Coach youth team', 'Fantasy league mastery', 'World Cup study path'],
    become: 'A fan who goes deep — coach, analyst, or community leader.',
  },
  {
    slug: 'books',
    name: 'Books',
    outcome: 'Become a Literary Enthusiast',
    status: 'planned',
    tier: 'Community',
    launch_rank: 9,
    section_id: 'arts-culture',
    categories: ['all', 'arts_culture', 'hobbies'],
    live_href: null,
    planned_projects: ['Build home library', 'Start a book club', 'Read 12 classics', 'Host literary salon'],
    become: 'A reader who builds a library and leads conversations.',
  },
  {
    slug: 'movies',
    name: 'Movies',
    outcome: 'Become a Film Enthusiast',
    status: 'planned',
    tier: 'Community',
    launch_rank: 10,
    section_id: 'arts-culture',
    categories: ['all', 'arts_culture', 'hobbies'],
    live_href: null,
    planned_projects: ['Curate top 100 list', 'Write first review', 'Host watch party', 'Deep dive a director'],
    become: 'Someone who watches with intention and shares what they discover.',
  },
  {
    slug: 'campaign-management',
    name: 'Campaign Management',
    outcome: 'Become a Campaign Strategist',
    status: 'paused',
    tier: 'Career',
    launch_rank: null,
    section_id: 'civic-life',
    categories: ['all', 'careers', 'civic'],
    live_href: null,
    planned_projects: ['Canvass neighborhood', 'Run precinct team', 'Statewide campaign role'],
    become: 'An organizer who wins elections and builds movements.',
  },
  {
    slug: 'computer-science',
    name: 'Computer Science',
    outcome: 'Road to Software Mastery',
    status: 'planned',
    tier: 'Academic',
    launch_rank: null,
    section_id: 'ai-technology',
    categories: ['all', 'academic', 'technology', 'careers'],
    live_href: null,
    planned_projects: ['First program', 'Data structures project', 'Open source contribution'],
    become: 'A programmer who builds real systems — not just completes assignments.',
  },
];

export const EXPLORE_PATHS: ExplorePath[] = [
  ...STATIC_EXPLORE_PATHS.filter((p) => !FACTORY_SLUGS.has(p.slug)),
  ...FACTORY_EXPLORE_PATHS,
];

export function getExplorePath(slug: string): ExplorePath | undefined {
  return EXPLORE_PATHS.find((p) => p.slug === slug);
}

export function getExplorePathHref(path: ExplorePath): string {
  return path.live_href ?? `/explore/${path.slug}`;
}

export function listExplorePathsBySection(sectionId: string): ExplorePath[] {
  return EXPLORE_PATHS.filter((p) => p.section_id === sectionId);
}

export function countExploreCatalogPaths(): number {
  return EXPLORE_PATHS.length;
}

export function countExploreLivePaths(): number {
  return EXPLORE_PATHS.filter((p) => p.status === 'live').length;
}

export function filterExplorePaths(category: ExploreCategoryFilter): ExplorePath[] {
  if (category === 'all') return EXPLORE_PATHS;
  return EXPLORE_PATHS.filter((p) => p.categories.includes(category));
}

export function getExploreSectionsWithPaths(category: ExploreCategoryFilter = 'all') {
  const paths = filterExplorePaths(category);
  return EXPLORE_SECTIONS.map((section) => ({
    section,
    paths: paths.filter((p) => p.section_id === section.id),
  })).filter((g) => g.paths.length > 0);
}

export function filterExplorePathsForAudience(
  paths: ExplorePath[],
  segment: UserSegment,
  studentSafeOnly = false,
): ExplorePath[] {
  return paths.filter((p) => {
    const access = segmentCanAccessWorld(segment, p.slug);
    if (!access.allowed) return false;
    if (studentSafeOnly) {
      const record = getWorldAudience(p.slug);
      if (record && record.audience_classification !== 'student_safe') return false;
    }
    return true;
  });
}

export function getExploreSectionsWithPathsForAudience(
  category: ExploreCategoryFilter = 'all',
  segment: UserSegment = 'adult',
  studentSafeOnly = false,
) {
  const paths = filterExplorePathsForAudience(filterExplorePaths(category), segment, studentSafeOnly);
  return EXPLORE_SECTIONS.map((section) => ({
    section,
    paths: paths.filter((p) => p.section_id === section.id),
  })).filter((g) => g.paths.length > 0);
}
