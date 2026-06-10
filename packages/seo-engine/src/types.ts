export type SchemaType =
  | 'Organization'
  | 'Review'
  | 'Product'
  | 'Collection'
  | 'Article'
  | 'FAQPage'
  | 'Event'
  | 'Person'
  | 'ItemList'
  | 'BreadcrumbList'
  | 'WebSite';

export type PageType =
  | 'topic'
  | 'collection'
  | 'ranking'
  | 'review'
  | 'best-of'
  | 'beginners-guide'
  | 'comparison'
  | 'history'
  | 'entity'
  | 'vertical-home';

export interface PageSEOContext {
  vertical_domain: string;
  topic_slug?: string;
  page_type: PageType;
  title: string;
  description: string;
  image_url?: string;
  author?: string;
  date_published?: string;
  date_modified?: string;
  faq?: Array<{ question: string; answer: string }>;
  items?: Array<{ name: string; url: string }>;
  rating?: { value: number; count: number };
}

export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': SchemaType;
  [key: string]: unknown;
}

export interface ProgrammaticPath {
  path: string;
  page_type: PageType;
  title_template: string;
  schema_types: SchemaType[];
}
