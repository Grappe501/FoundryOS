import type { FoundryProject } from '../types';

export const BOOKS_PROJECTS: FoundryProject[] = [
  {
    slug: 'read-great-books',
    display_name: 'Read the Great Books',
    tagline: 'Structured literary mastery',
    vertical_slug: 'books',
    category: 'experience',
    path_slug: 'road-to-literary-scholar',
    description: 'Reading path with milestones and discussion',
    estimated_days: 365,
    status: 'active',
    steps: [
      { slug: 'select-canon', title: 'Select reading list', description: 'Great Books or themed path', sort_order: 1 },
      { slug: 'read-ten', title: 'Complete 10 books', description: 'Review each in Foundry', sort_order: 2 },
      { slug: 'read-twenty-five', title: 'Complete 25 books', description: 'Publish reading reflections', sort_order: 3 },
    ],
  },
  {
    slug: 'build-home-library',
    display_name: 'Build Home Library',
    tagline: 'Curate a physical collection',
    vertical_slug: 'books',
    category: 'build',
    description: 'Collections make expertise visible',
    estimated_days: 180,
    status: 'active',
    steps: [
      { slug: 'catalog-shelf', title: 'Catalog your shelf', description: 'Add books to Foundry collection', sort_order: 1 },
      { slug: 'organize-system', title: 'Organize by system', description: 'Genre, era, or reading path', sort_order: 2 },
    ],
  },
  {
    slug: 'start-book-club',
    display_name: 'Start a Book Club',
    tagline: 'Community around reading',
    vertical_slug: 'books',
    category: 'host',
    path_slug: 'road-to-literary-scholar',
    description: 'Book clubs create belonging and mastery',
    estimated_days: 60,
    status: 'active',
    steps: [
      { slug: 'recruit-readers', title: 'Recruit 5 readers', description: 'Monthly discussion group', sort_order: 1 },
      { slug: 'run-three-months', title: 'Run 3 months', description: 'Consistent meetings and notes', sort_order: 2 },
    ],
  },
];
