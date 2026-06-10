import type { ProgrammaticPath } from './types';

/** Auto-generated SEO page types per topic */
export const programmaticPaths: ProgrammaticPath[] = [
  { path: '/collections', page_type: 'collection', title_template: '{topic} Collections', schema_types: ['Collection', 'ItemList'] },
  { path: '/rankings', page_type: 'ranking', title_template: '{topic} Rankings', schema_types: ['ItemList'] },
  { path: '/reviews', page_type: 'review', title_template: '{topic} Reviews', schema_types: ['Review', 'ItemList'] },
  { path: '/best-of', page_type: 'best-of', title_template: 'Best {topic}', schema_types: ['ItemList', 'Article'] },
  { path: '/beginners-guide', page_type: 'beginners-guide', title_template: '{topic} Beginner\'s Guide', schema_types: ['Article', 'FAQPage'] },
  { path: '/comparisons', page_type: 'comparison', title_template: '{topic} Comparisons', schema_types: ['Article', 'ItemList'] },
  { path: '/history', page_type: 'history', title_template: 'History of {topic}', schema_types: ['Article'] },
];

export function generateProgrammaticPaths(topicSlug: string, topicDisplayName: string): Array<{
  slug: string;
  path: string;
  page_type: string;
  title: string;
}> {
  return programmaticPaths.map((p) => ({
    slug: `${topicSlug}${p.path.replace(/\//g, '-')}`,
    path: `/${topicSlug}${p.path}`,
    page_type: p.page_type,
    title: p.title_template.replace('{topic}', topicDisplayName),
  }));
}
