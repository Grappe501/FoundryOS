import {
  getLaunchStatus,
  getSiteByDomain,
  getVerticalConfig,
  getVerticalDisplayName,
  getVerticalTheme,
  normalizeHostname,
} from './registry';
import type { VerticalResolution } from './types';

/**
 * PASS-005: resolveVertical(hostname)
 *
 * bourbon.foundryos.com → Vertical: Spirits, Theme: Bourbon
 * books.foundryos.com   → Vertical: Books, Theme: Literature
 * music.foundryos.com   → Vertical: Music, Theme: Audio
 * books.localhost       → same as books.foundryos.com (local dev)
 */
export function resolveVertical(hostname: string): VerticalResolution {
  return resolveVerticalFromHost(hostname);
}

export function resolveVerticalFromHost(host: string): VerticalResolution {
  const { hostname, isLocalDev } = normalizeHostname(host);
  const site = getSiteByDomain(host);

  if (!site || site.type !== 'vertical') {
    const fallbackSlug = hostname.split('.')[0];
    return {
      host: host.split(':')[0].toLowerCase(),
      domain: hostname,
      site_slug: fallbackSlug,
      site_display_name: fallbackSlug,
      site_type: site?.type ?? 'vertical',
      vertical_id: site?.vertical_id ?? null,
      vertical_slug: site?.vertical_id ?? null,
      vertical_name: fallbackSlug,
      theme: 'General',
      vertical_display_name: fallbackSlug,
      flagship_topic: site?.flagship_topic ?? null,
      launch_status: 'unknown',
      is_local_dev: isLocalDev,
    };
  }

  const config = getVerticalConfig(site.vertical_id);
  const verticalName = config?.name ?? getVerticalDisplayName(site.vertical_id);
  const theme = config?.theme ?? getVerticalTheme(site.vertical_id);

  return {
    host: host.split(':')[0].toLowerCase(),
    domain: site.domain,
    site_slug: site.slug,
    site_display_name: site.display_name,
    site_type: site.type,
    vertical_id: site.vertical_id,
    vertical_slug: site.vertical_id,
    vertical_name: verticalName,
    theme,
    vertical_display_name: getVerticalDisplayName(site.vertical_id),
    flagship_topic: site.flagship_topic ?? null,
    launch_status: getLaunchStatus(site.vertical_id),
    is_local_dev: isLocalDev,
  };
}
