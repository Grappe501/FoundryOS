export type TopicStatus = 'draft' | 'ready' | 'published' | 'archived';

export interface Topic {
  id: number;
  slug: string;
  displayName: string;
  vertical_id: string;
  vertical_slug: string;
  crossRefs: string[];
  priority: string;
  status: TopicStatus;
  site_url?: string;
  /** Topic page URL on vertical domain */
  topic_url?: string;
}

export interface Vertical {
  id: string;
  slug: string;
  name: string;
  icon: string;
  app_count: number;
  is_mega_vertical: boolean;
}

export interface VerticalSite {
  domain: string;
  slug: string;
  display_name: string;
  type: 'headquarters' | 'vertical';
  vertical_id: string | null;
  flagship_topic?: string;
  status?: string;
  launch_pass?: string;
}

export interface RegistryStats {
  total_topics: number;
  total_verticals: number;
  topics_by_vertical: Record<string, number>;
  vertical_domains: number;
}
