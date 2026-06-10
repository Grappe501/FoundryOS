import type { ContentType } from './types';

/**
 * Universal content types — never hand-built per niche.
 * CMS + SEO factory generates these for every topic and entity.
 */
export const CONTENT_TYPES: ContentType[] = [
  { slug: 'overview', display_name: 'Overview', path_segment: 'overview', description: 'Primary landing content', auto_generate: true, schema_types: ['Article', 'WebPage'] },
  { slug: 'history', display_name: 'History', path_segment: 'history', description: 'Historical context and timeline', auto_generate: true, schema_types: ['Article'] },
  { slug: 'faq', display_name: 'FAQ', path_segment: 'faq', description: 'Frequently asked questions', auto_generate: true, schema_types: ['FAQPage', 'Article'] },
  { slug: 'guides', display_name: 'Guides', path_segment: 'guides', description: 'How-to and beginner guides', auto_generate: true, schema_types: ['Article', 'HowTo'] },
  { slug: 'best_of', display_name: 'Best Of', path_segment: 'best-of', description: 'Curated best-of lists', auto_generate: true, schema_types: ['ItemList', 'Article'] },
  { slug: 'comparisons', display_name: 'Comparisons', path_segment: 'comparisons', description: 'Side-by-side comparisons', auto_generate: true, schema_types: ['Article', 'ItemList'] },
  { slug: 'reviews', display_name: 'Reviews', path_segment: 'reviews', description: 'Community and expert reviews', auto_generate: true, schema_types: ['Review', 'ItemList'] },
  { slug: 'collections', display_name: 'Collections', path_segment: 'collections', description: 'Public collection showcases', auto_generate: true, schema_types: ['Collection', 'ItemList'] },
  { slug: 'rankings', display_name: 'Rankings', path_segment: 'rankings', description: 'Ordered rankings', auto_generate: true, schema_types: ['ItemList'] },
  { slug: 'news', display_name: 'News', path_segment: 'news', description: 'Recent news and updates', auto_generate: true, schema_types: ['Article', 'NewsArticle'] },
  { slug: 'events', display_name: 'Events', path_segment: 'events', description: 'Upcoming and past events', auto_generate: true, schema_types: ['Event', 'ItemList'] },
];

export function getContentType(slug: string): ContentType | undefined {
  return CONTENT_TYPES.find((t) => t.slug === slug);
}
