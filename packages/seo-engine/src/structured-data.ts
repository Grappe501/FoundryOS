import type { PageSEOContext, StructuredData, SchemaType } from './types';

const SCHEMA_MAP: Record<string, SchemaType[]> = {
  topic: ['Article', 'BreadcrumbList'],
  collection: ['Collection', 'ItemList'],
  ranking: ['ItemList'],
  review: ['Review', 'Product'],
  'best-of': ['ItemList', 'Article'],
  'beginners-guide': ['Article', 'FAQPage'],
  comparison: ['Article', 'ItemList'],
  history: ['Article'],
  entity: ['Product', 'Organization'],
  'vertical-home': ['WebSite', 'Organization'],
};

export function schemaTypesForPage(pageType: string): SchemaType[] {
  return SCHEMA_MAP[pageType] ?? ['Article'];
}

export function generateStructuredData(ctx: PageSEOContext): StructuredData[] {
  const schemas: StructuredData[] = [];
  const types = schemaTypesForPage(ctx.page_type);
  const url = buildPageUrl(ctx);

  for (const type of types) {
    schemas.push(buildSchema(type, ctx, url));
  }

  return schemas;
}

function buildPageUrl(ctx: PageSEOContext): string {
  const base = `https://${ctx.vertical_domain}`;
  if (ctx.page_type === 'vertical-home') return base;
  if (!ctx.topic_slug) return base;
  const suffix = ctx.page_type === 'topic' ? '' : `/${ctx.page_type}`;
  return `${base}/${ctx.topic_slug}${suffix}`;
}

function buildSchema(type: SchemaType, ctx: PageSEOContext, url: string): StructuredData {
  const base = { '@context': 'https://schema.org' as const, '@type': type, url, name: ctx.title };

  switch (type) {
    case 'Organization':
      return { ...base, description: ctx.description, logo: ctx.image_url };
    case 'WebSite':
      return { ...base, description: ctx.description, publisher: { '@type': 'Organization', name: 'FoundryOS' } };
    case 'Article':
      return {
        ...base,
        headline: ctx.title,
        description: ctx.description,
        datePublished: ctx.date_published,
        dateModified: ctx.date_modified,
        author: ctx.author ? { '@type': 'Person', name: ctx.author } : undefined,
        image: ctx.image_url,
      };
    case 'Review':
      return {
        ...base,
        reviewRating: ctx.rating
          ? { '@type': 'Rating', ratingValue: ctx.rating.value, reviewCount: ctx.rating.count }
          : undefined,
        reviewBody: ctx.description,
      };
    case 'Product':
      return { ...base, description: ctx.description, image: ctx.image_url };
    case 'Collection':
      return { ...base, description: ctx.description, numberOfItems: ctx.items?.length ?? 0 };
    case 'ItemList':
      return {
        ...base,
        itemListElement: ctx.items?.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          url: item.url,
        })),
      };
    case 'FAQPage':
      return {
        ...base,
        mainEntity: ctx.faq?.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      };
    case 'Person':
      return { ...base, description: ctx.description };
    case 'Event':
      return { ...base, description: ctx.description };
    case 'BreadcrumbList':
      return {
        ...base,
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: ctx.vertical_domain, item: `https://${ctx.vertical_domain}` },
          ...(ctx.topic_slug
            ? [{ '@type': 'ListItem', position: 2, name: ctx.topic_slug, item: url }]
            : []),
        ],
      };
    default:
      return base;
  }
}
