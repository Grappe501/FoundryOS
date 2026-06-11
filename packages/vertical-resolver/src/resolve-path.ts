import {
  contentSlugFromSegment,
  isContentPathSegment,
  slugToDisplayName,
} from './registry';
import { resolveVertical } from './resolve-host';
import type { PathResolution, RouteKind, ResolvedRoute, VerticalResolution } from './types';

/**
 * Route paths through one engine:
 * / → vertical_home
 * /overview → vertical_content
 * /fantasy → topic_home
 * /fantasy/rankings → topic_content
 * /entities/buffalo-trace → entity_page
 */
export function resolvePathFromUrl(
  pathname: string,
  vertical: VerticalResolution
): PathResolution {
  const segments = pathname.split('/').filter(Boolean);
  const base: PathResolution = {
    kind: 'unknown',
    pathname,
    segments,
    topic_slug: null,
    topic_display_name: null,
    content_type: null,
    content_path_segment: null,
    entity_slug: null,
    canonical_path: pathname || '/',
  };

  if (segments.length === 0) {
    return { ...base, kind: 'vertical_home', canonical_path: '/' };
  }

  // /entities/{slug}
  if (segments[0] === 'entities' && segments[1]) {
    const entitySlug = segments[1];
    return {
      ...base,
      kind: 'entity_page',
      entity_slug: entitySlug,
      topic_display_name: slugToDisplayName(entitySlug),
      canonical_path: `/entities/${entitySlug}`,
    };
  }

  // /overview, /history, /rankings at vertical root
  if (segments.length === 1 && isContentPathSegment(segments[0])) {
    return {
      ...base,
      kind: 'vertical_content',
      content_path_segment: segments[0],
      content_type: contentSlugFromSegment(segments[0]),
      canonical_path: `/${segments[0]}`,
    };
  }

  const topicSlug = segments[0];

  // /fantasy
  if (segments.length === 1) {
    return {
      ...base,
      kind: 'topic_home',
      topic_slug: topicSlug,
      topic_display_name: slugToDisplayName(topicSlug),
      canonical_path: `/${topicSlug}`,
    };
  }

  // /fantasy/overview
  if (segments.length === 2 && isContentPathSegment(segments[1])) {
    return {
      ...base,
      kind: 'topic_content',
      topic_slug: topicSlug,
      topic_display_name: slugToDisplayName(topicSlug),
      content_path_segment: segments[1],
      content_type: contentSlugFromSegment(segments[1]),
      canonical_path: `/${topicSlug}/${segments[1]}`,
    };
  }

  // Flagship topic shortcut: bourbon.foundryos.com/distilleries/x
  if (vertical.flagship_topic && topicSlug !== vertical.flagship_topic) {
    return {
      ...base,
      kind: 'topic_home',
      topic_slug: topicSlug,
      topic_display_name: slugToDisplayName(topicSlug),
      canonical_path: `/${topicSlug}`,
    };
  }

  return base;
}

export function resolveRoute(host: string, pathname: string): ResolvedRoute {
  const vertical = resolveVertical(host);
  const path = resolvePathFromUrl(pathname, vertical);
  return { vertical, path };
}

export function routeKindLabel(kind: RouteKind): string {
  const labels: Record<RouteKind, string> = {
    vertical_home: 'Vertical Home',
    vertical_content: 'Vertical Content',
    topic_home: 'Topic Home',
    topic_content: 'Topic Content',
    entity_page: 'Entity Page',
    unknown: 'Unknown',
  };
  return labels[kind];
}
