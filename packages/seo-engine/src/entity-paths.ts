import { CONTENT_TYPES } from '@foundry/content-engine';

/**
 * SEO Phase 2 — every entity gets programmatic paths automatically.
 * Powers hundreds of thousands of indexed pages at scale.
 */
export function generateEntitySEOPaths(
  entitySlug: string,
  entityDisplayName: string,
  verticalDomain: string
): Array<{ path: string; content_type: string; title: string; url: string }> {
  return CONTENT_TYPES.map((type) => {
    const path = type.slug === 'overview' ? `/${entitySlug}` : `/${entitySlug}/${type.path_segment}`;
    const title = type.slug === 'overview' ? entityDisplayName : `${type.display_name} — ${entityDisplayName}`;
    return {
      path,
      content_type: type.slug,
      title,
      url: `https://${verticalDomain}${path}`,
    };
  });
}

export function generateTopicSEOPaths(
  topicSlug: string,
  topicDisplayName: string,
  verticalDomain: string
): Array<{ path: string; content_type: string; title: string; url: string }> {
  return CONTENT_TYPES.map((type) => {
    const path = type.slug === 'overview' ? `/${topicSlug}` : `/${topicSlug}/${type.path_segment}`;
    const title = type.slug === 'overview' ? topicDisplayName : `${type.display_name} — ${topicDisplayName}`;
    return {
      path,
      content_type: type.slug,
      title,
      url: `https://${verticalDomain}${path}`,
    };
  });
}
