export type ContentTypeSlug =
  | 'overview'
  | 'history'
  | 'faq'
  | 'guides'
  | 'best_of'
  | 'comparisons'
  | 'reviews'
  | 'collections'
  | 'rankings'
  | 'news'
  | 'events';

export type ContentTarget = 'topic' | 'entity';

export interface ContentType {
  slug: ContentTypeSlug;
  display_name: string;
  path_segment: string;
  description: string;
  auto_generate: boolean;
  schema_types: string[];
}

export interface ContentPageSpec {
  content_type: ContentTypeSlug;
  target_type: ContentTarget;
  target_slug: string;
  target_display_name: string;
  vertical_domain: string;
  path: string;
  title: string;
  status: 'draft' | 'published';
}

export interface ContentGenerationContext {
  target_type: ContentTarget;
  target_slug: string;
  target_display_name: string;
  vertical_domain: string;
  entity_type?: string;
}
