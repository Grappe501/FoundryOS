import type { AcademyCurriculum } from './types';

/** Bourbon Academy — 7 levels (template for all verticals) */
export const BOURBON_ACADEMY: AcademyCurriculum = {
  vertical_id: 'spirits-beverages',
  vertical_slug: 'bourbon',
  display_name: 'Bourbon Academy',
  academy_path: '/academy',
  levels: [
    { level: 1, title: 'What is bourbon?', lessons: [{ slug: 'what-is-bourbon', level: 1, title: 'What is bourbon?', description: 'Legal definition and basics', entity_slugs: [], estimated_minutes: 15, path: '/academy/level-1/what-is-bourbon' }] },
    { level: 2, title: 'How bourbon is made', lessons: [{ slug: 'how-bourbon-is-made', level: 2, title: 'How bourbon is made', description: 'Distillation fundamentals', entity_slugs: [], estimated_minutes: 25, path: '/academy/level-2/how-bourbon-is-made' }] },
    { level: 3, title: 'Mash bills', lessons: [{ slug: 'mash-bills', level: 3, title: 'Mash bills', description: 'Corn, rye, wheat, barley', entity_slugs: [], estimated_minutes: 30, path: '/academy/level-3/mash-bills' }] },
    { level: 4, title: 'Regional differences', lessons: [{ slug: 'regional-differences', level: 4, title: 'Regional differences', description: 'Kentucky vs national styles', entity_slugs: [], estimated_minutes: 30, path: '/academy/level-4/regional-differences' }] },
    { level: 5, title: 'Blind tasting', lessons: [{ slug: 'blind-tasting', level: 5, title: 'Blind tasting', description: 'Structured tasting methodology', entity_slugs: [], estimated_minutes: 45, path: '/academy/level-5/blind-tasting' }] },
    { level: 6, title: 'Collecting and valuation', lessons: [{ slug: 'collecting-valuation', level: 6, title: 'Collecting and valuation', description: 'Secondary market and rarity', entity_slugs: [], estimated_minutes: 40, path: '/academy/level-6/collecting-valuation' }] },
    { level: 7, title: 'Master class', lessons: [{ slug: 'master-class', level: 7, title: 'Master class', description: 'Expert-level synthesis', entity_slugs: [], estimated_minutes: 60, path: '/academy/level-7/master-class' }] },
  ],
};

export const ACADEMY_CURRICULA: Record<string, AcademyCurriculum> = {
  bourbon: BOURBON_ACADEMY,
  books: {
    vertical_id: 'books-literature',
    vertical_slug: 'books',
    display_name: 'Literature Academy',
    academy_path: '/academy',
    levels: [
      { level: 1, title: 'How to read critically', lessons: [] },
      { level: 2, title: 'Genres and forms', lessons: [] },
      { level: 3, title: 'Author context', lessons: [] },
    ],
  },
  movies: {
    vertical_id: 'film-cinema',
    vertical_slug: 'movies',
    display_name: 'Cinema Academy',
    academy_path: '/academy',
    levels: [
      { level: 1, title: 'Film language basics', lessons: [] },
      { level: 2, title: 'Genre mastery', lessons: [] },
    ],
  },
};

export function getAcademyForVertical(verticalSlug: string): AcademyCurriculum | undefined {
  return ACADEMY_CURRICULA[verticalSlug];
}

export function academyUrl(verticalDomain: string): string {
  return `https://${verticalDomain}/academy`;
}
