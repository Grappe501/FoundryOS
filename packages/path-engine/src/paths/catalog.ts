import type { MasteryPath } from '../types';
import { BOURBON_PATHS } from './bourbon';
import { IDENTITY_DOMAIN_PATHS } from './identity-domains';

const MOVIE_PATHS: MasteryPath[] = [
  {
    slug: 'road-to-film-critic',
    display_name: 'Road to Film Critic',
    tagline: 'Develop analytical cinema voice',
    vertical_id: 'film-cinema',
    vertical_slug: 'movies',
    tier: 'critic',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'reviews', 'contribute'],
    status: 'draft',
    milestones: [
      { slug: 'learn-film-language', category: 'learn', title: 'Film language basics', description: 'Shot, cut, mise-en-scène', requirement: 'Academy Level 1', sort_order: 1 },
      { slug: 'experience-25-reviews', category: 'experience', title: 'Review 25 films', description: 'Build critical voice', requirement: '25 reviews', target_count: 25, sort_order: 2 },
    ],
  },
  {
    slug: 'road-to-western-expert',
    display_name: 'Road to Western Expert',
    tagline: 'From Tombstone to The Searchers',
    vertical_id: 'film-cinema',
    vertical_slug: 'movies',
    tier: 'expert',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'collections'],
    status: 'draft',
    milestones: [
      { slug: 'collect-westerns', category: 'collect', title: 'Western collection', description: 'Curate essential westerns', requirement: '30 films collected', target_count: 30, sort_order: 1 },
    ],
  },
];

const BBQ_PATHS: MasteryPath[] = [
  {
    slug: 'road-to-backyard-pitmaster',
    display_name: 'Road to Backyard Pitmaster',
    tagline: 'Smoke, patience, flavor',
    vertical_id: 'food-culinary',
    vertical_slug: 'bbq',
    tier: 'enthusiast',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'projects'],
    status: 'draft',
    milestones: [
      { slug: 'learn-brisket', category: 'learn', title: 'Brisket fundamentals', description: 'Trim, rub, smoke', requirement: 'Complete brisket module', sort_order: 1 },
    ],
  },
  {
    slug: 'road-to-competition-pitmaster',
    display_name: 'Road to Competition Pitmaster',
    tagline: 'KCBS-ready skills',
    vertical_id: 'food-culinary',
    vertical_slug: 'bbq',
    tier: 'master',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'community', 'lead'],
    status: 'draft',
    milestones: [],
  },
];

const BOOK_PATHS: MasteryPath[] = [
  {
    slug: 'road-to-literary-scholar',
    display_name: 'Road to Literary Scholar',
    tagline: 'Deep reading across genres',
    vertical_id: 'books-literature',
    vertical_slug: 'books',
    tier: 'scholar',
    path_prefix: 'Road to',
    assembled_from: ['academy', 'knowledge', 'collections', 'contribute'],
    status: 'draft',
    milestones: [
      { slug: 'collect-reading-path', category: 'collect', title: 'Civil War reading path', description: 'Structured reading list', requirement: 'Complete reading path', sort_order: 1 },
    ],
  },
];

export const MASTERY_PATH_CATALOG: MasteryPath[] = [
  ...BOURBON_PATHS,
  ...MOVIE_PATHS,
  ...BBQ_PATHS,
  ...BOOK_PATHS,
  ...IDENTITY_DOMAIN_PATHS,
];

export function getPath(slug: string): MasteryPath | undefined {
  return MASTERY_PATH_CATALOG.find((p) => p.slug === slug);
}

export function getPathsForVertical(verticalSlug: string): MasteryPath[] {
  return MASTERY_PATH_CATALOG.filter((p) => p.vertical_slug === verticalSlug);
}

export function getActivePaths(): MasteryPath[] {
  return MASTERY_PATH_CATALOG.filter((p) => p.status === 'active');
}
