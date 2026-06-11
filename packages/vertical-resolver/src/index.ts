export type {
  SiteType,
  RouteKind,
  LaunchStatus,
  VerticalSiteRecord,
  VerticalResolution,
  PathResolution,
  ResolvedRoute,
} from './types';

export {
  getVerticalSites,
  getSiteByDomain,
  CONTENT_PATH_SEGMENTS,
  isContentPathSegment,
  slugToDisplayName,
} from './registry';

export {
  getVerticalConfigs,
  getVerticalDomains,
  normalizeHostname,
} from './registry';

export { resolveVertical, resolveVerticalFromHost } from './resolve-host';
export {
  resolvePathFromUrl,
  resolveRoute,
  routeKindLabel,
} from './resolve-path';
