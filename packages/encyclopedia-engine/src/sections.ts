import type { EncyclopediaSection } from './types';

/** Canonical encyclopedia sections — every entity gets all of them */
export const ENCYCLOPEDIA_SECTIONS: EncyclopediaSection[] = [
  {
    slug: 'definition',
    display_name: 'Definition',
    description: 'Basic answer — what is it?',
    path_segment: 'definition',
    schema_hint: 'DefinedTerm',
  },
  {
    slug: 'history',
    display_name: 'History',
    description: 'Timeline, origins, evolution',
    path_segment: 'history',
    schema_hint: 'Article',
  },
  {
    slug: 'cultural_significance',
    display_name: 'Cultural Significance',
    description: 'Why it matters, who values it',
    path_segment: 'culture',
    schema_hint: 'Article',
  },
  {
    slug: 'geographic_significance',
    display_name: 'Geographic Significance',
    description: 'Regional perspectives — Kentucky, US, Europe, Japan…',
    path_segment: 'geography',
    schema_hint: 'Place',
  },
  {
    slug: 'trivia',
    display_name: 'Trivia',
    description: 'Did you know? — high engagement content',
    path_segment: 'trivia',
    schema_hint: 'FAQPage',
  },
  {
    slug: 'related_concepts',
    display_name: 'Related Concepts',
    description: 'Knowledge graph driven connections',
    path_segment: 'related',
    schema_hint: 'ItemList',
  },
  {
    slug: 'common_misconceptions',
    display_name: 'Common Misconceptions',
    description: 'Myths vs facts — SEO opportunity',
    path_segment: 'misconceptions',
    schema_hint: 'FAQPage',
  },
  {
    slug: 'beginner_explanation',
    display_name: 'Beginner Explanation',
    description: 'Explain like I\'m new',
    path_segment: 'beginners',
    schema_hint: 'Article',
  },
  {
    slug: 'expert_explanation',
    display_name: 'Expert Explanation',
    description: 'Advanced deep dive',
    path_segment: 'expert',
    schema_hint: 'Article',
  },
  {
    slug: 'sources',
    display_name: 'Sources',
    description: 'Verified references',
    path_segment: 'sources',
    schema_hint: 'Citation',
  },
];

export function getSection(slug: string): EncyclopediaSection | undefined {
  return ENCYCLOPEDIA_SECTIONS.find((s) => s.slug === slug);
}
