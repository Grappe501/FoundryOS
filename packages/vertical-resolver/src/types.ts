export type SiteType = 'headquarters' | 'vertical';

export type LaunchStatus = 'planned' | 'active_build' | 'staging' | 'live' | 'archived' | 'unknown';

export type RouteKind =
  | 'vertical_home'
  | 'vertical_content'
  | 'topic_home'
  | 'topic_content'
  | 'entity_page'
  | 'unknown';

export interface VerticalSiteRecord {
  domain: string;
  slug: string;
  display_name: string;
  type: SiteType;
  vertical_id: string | null;
  flagship_topic?: string;
  status?: string;
  launch_pass?: string;
}

export interface VerticalConfigRecord {
  id: string;
  slug: string;
  name: string;
  theme: string;
  launch_status: LaunchStatus;
  launch_pass?: string | null;
}

export interface VerticalDomainRecord {
  domain: string;
  local_domain: string;
  vertical_id: string;
  site_slug: string;
  site_display_name: string;
}

/** PASS-005 success criteria output */
export interface VerticalResolution {
  host: string;
  domain: string;
  site_slug: string;
  site_display_name: string;
  site_type: SiteType;
  vertical_id: string | null;
  vertical_slug: string | null;
  /** Ernie format: "Books", "Spirits", "Music" */
  vertical_name: string;
  /** Ernie format: "Literature", "Bourbon", "Audio" */
  theme: string;
  vertical_display_name: string;
  flagship_topic: string | null;
  launch_status: LaunchStatus;
  is_local_dev: boolean;
}

export interface PathResolution {
  kind: RouteKind;
  pathname: string;
  segments: string[];
  topic_slug: string | null;
  topic_display_name: string | null;
  content_type: string | null;
  content_path_segment: string | null;
  entity_slug: string | null;
  canonical_path: string;
}

export interface ResolvedRoute {
  vertical: VerticalResolution;
  path: PathResolution;
}
