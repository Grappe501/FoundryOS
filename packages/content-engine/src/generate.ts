import { CONTENT_TYPES } from './content-types';
import type { ContentGenerationContext, ContentPageSpec } from './types';

function buildBasePath(ctx: ContentGenerationContext): string {
  if (ctx.target_type === 'topic') {
    return `/${ctx.target_slug}`;
  }
  return `/${ctx.target_slug}`;
}

export function generateContentPages(ctx: ContentGenerationContext): ContentPageSpec[] {
  const base = buildBasePath(ctx);

  return CONTENT_TYPES.map((type) => {
    const path =
      type.slug === 'overview' && ctx.target_type === 'entity'
        ? base
        : `${base}/${type.path_segment}`;

    const title =
      type.slug === 'overview'
        ? ctx.target_display_name
        : `${type.display_name} — ${ctx.target_display_name}`;

    return {
      content_type: type.slug,
      target_type: ctx.target_type,
      target_slug: ctx.target_slug,
      target_display_name: ctx.target_display_name,
      vertical_domain: ctx.vertical_domain,
      path,
      title,
      status: 'draft' as const,
      content_source: 'generated' as const,
      content_score: 0,
      minimum_publish_score: 70,
    };
  });
}

export function estimatePageCount(topicCount: number, entityCount: number): number {
  const pagesPerTopic = CONTENT_TYPES.length;
  const pagesPerEntity = CONTENT_TYPES.length;
  return topicCount * pagesPerTopic + entityCount * pagesPerEntity;
}
