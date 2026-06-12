export type SearchResultType =
  | 'world'
  | 'academy_lesson'
  | 'glossary_term'
  | 'mission'
  | 'tool'
  | 'community'
  | 'guide'
  | 'incoming_world'
  | 'encyclopedia';

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  summary: string;
  world_slug: string | null;
  href: string;
  audience_classification?: string;
  tags?: string[];
};

export type SearchFilters = {
  query: string;
  world_slug?: string;
  audience?: 'student_safe' | 'all';
  student_safe_only?: boolean;
  types?: SearchResultType[];
  limit?: number;
};

export type SearchResponse = {
  query: string;
  total: number;
  results: SearchResult[];
  related_worlds: { slug: string; name: string; reason: string }[];
  learn_this_next: SearchResult[];
};
