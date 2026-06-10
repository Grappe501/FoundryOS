export type DeployStatus = 'pending' | 'building' | 'live' | 'error' | 'archived';

export interface Vertical {
  id: string;
  slug: string;
  display_name: string;
  description?: string;
  icon: string;
  is_mega_vertical: boolean;
  app_count_target: number;
  status: 'active' | 'archived';
}

export interface AppSite {
  id: string;
  category_id: string;
  subdomain: string;
  custom_domain?: string;
  site_url: string;
  standalone: boolean;
  netlify_site_id?: string;
  deploy_status: DeployStatus;
  ssl_status: 'pending' | 'active' | 'error';
  last_deployed_at?: string;
  seo_config: Record<string, unknown>;
}

export interface SiteContext {
  site: AppSite;
  category_slug: string;
  display_name: string;
  vertical_slug?: string;
  theme_config: Record<string, unknown>;
  tier_config: Record<string, unknown>;
}
