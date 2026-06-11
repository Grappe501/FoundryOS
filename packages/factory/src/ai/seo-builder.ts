import { generateEntitySEOPaths, generateStructuredData } from '@foundry/seo-engine';
import type { AssemblyInput, SeoDraft } from '../types';

/**
 * AI #4 — SEO Builder
 * Titles, descriptions, schema, internal links, topic clusters.
 */
export async function buildSeo(input: AssemblyInput): Promise<SeoDraft> {
  const paths = generateEntitySEOPaths(input.slug, input.topic, input.vertical_domain);
  const canonical = `https://${input.vertical_domain}/${input.slug}`;

  const structured_data = generateStructuredData({
    page_type: 'entity',
    vertical_domain: input.vertical_domain,
    topic_slug: input.slug,
    title: `${input.topic} — ${input.entity_type}`,
    description: `Complete guide to ${input.topic}.`,
  });

  const internal_links = paths.slice(0, 6).map((p) => ({
    href: p.url,
    label: p.title,
  }));

  return {
    title: `${input.topic} — ${input.entity_type} | FoundryOS`,
    description: `Complete guide to ${input.topic}. Overview, history, reviews, rankings, and collections.`,
    canonical_url: canonical,
    structured_data,
    internal_links,
    topic_clusters: [input.entity_type, input.vertical_domain.split('.')[0]],
  };
}
