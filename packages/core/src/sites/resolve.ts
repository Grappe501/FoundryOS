import type { SiteContext } from './types';

/**
 * Resolve site context from hostname.
 * Production: Supabase lookup on app_sites + categories.
 * Pass 1: slug extraction for site-engine middleware.
 */
export function resolveSlugFromHost(host: string): string {
  const clean = host.split(':')[0];
  const parts = clean.split('.');

  if (parts[0] === 'admin') return 'admin';
  if (parts[0] === 'www' || parts[0] === 'foundryos') return 'platform';

  return parts[0];
}

export function buildSiteUrl(slug: string): string {
  return `https://${slug}.foundryos.app`;
}

export function createPlaceholderSiteContext(slug: string, displayName: string): SiteContext {
  return {
    site: {
      id: 'placeholder',
      category_id: 'placeholder',
      subdomain: slug,
      site_url: buildSiteUrl(slug),
      standalone: true,
      deploy_status: 'pending',
      ssl_status: 'pending',
      seo_config: {},
    },
    category_slug: slug,
    display_name: displayName,
    theme_config: { primary_color: '#C8A96E', accent_color: '#E8D5B0' },
    tier_config: {},
  };
}
