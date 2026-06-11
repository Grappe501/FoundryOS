import verticalSites from '../../../data/vertical-sites.json';
import verticalRegistry from '../../../data/vertical-registry.json';
import catalogIndex from '../../../data/catalog/index.json';
import { CONTENT_TYPES } from '@foundry/content-engine';
import type { LaunchStatus, VerticalConfigRecord, VerticalDomainRecord, VerticalSiteRecord } from './types';

const sites: VerticalSiteRecord[] = verticalSites.sites as VerticalSiteRecord[];
const configs: VerticalConfigRecord[] = verticalRegistry.verticals as VerticalConfigRecord[];
const domains: VerticalDomainRecord[] = verticalRegistry.vertical_domains as VerticalDomainRecord[];

const configByVerticalId = Object.fromEntries(configs.map((c) => [c.id, c]));
const catalogNameById = Object.fromEntries(catalogIndex.verticals.map((v) => [v.id, v.name]));

export const CONTENT_PATH_SEGMENTS = new Set(CONTENT_TYPES.map((t) => t.path_segment));

const segmentToContentSlug = Object.fromEntries(
  CONTENT_TYPES.map((t) => [t.path_segment, t.slug])
);

const localDomainToProduction = Object.fromEntries(
  domains.filter((d) => d.local_domain).map((d) => [d.local_domain.toLowerCase(), d.domain])
);

const domainToRecord = Object.fromEntries([
  ...domains.map((d) => [d.domain.toLowerCase(), d]),
  ...domains.filter((d) => d.local_domain).map((d) => [d.local_domain.toLowerCase(), d]),
]);

export function getVerticalSites(): VerticalSiteRecord[] {
  return sites;
}

export function getVerticalConfigs(): VerticalConfigRecord[] {
  return configs;
}

export function getVerticalDomains(): VerticalDomainRecord[] {
  return domains;
}

export function normalizeHostname(host: string): { hostname: string; isLocalDev: boolean } {
  const hostname = host.split(':')[0].toLowerCase();

  if (hostname.endsWith('.localhost')) {
    const production = localDomainToProduction[hostname];
    if (production) {
      return { hostname: production, isLocalDev: true };
    }
    const slug = hostname.replace('.localhost', '');
    const bySlug = domains.find((d) => d.site_slug === slug);
    if (bySlug) {
      return { hostname: bySlug.domain, isLocalDev: true };
    }
  }

  return { hostname, isLocalDev: false };
}

export function getSiteByDomain(domain: string): VerticalSiteRecord | undefined {
  const { hostname } = normalizeHostname(domain);
  return sites.find((s) => s.domain.toLowerCase() === hostname);
}

export function getDomainRecord(host: string): VerticalDomainRecord | undefined {
  const raw = host.split(':')[0].toLowerCase();
  return domainToRecord[raw];
}

export function getVerticalConfig(verticalId: string | null): VerticalConfigRecord | undefined {
  if (!verticalId) return undefined;
  return configByVerticalId[verticalId];
}

export function getVerticalDisplayName(verticalId: string | null): string {
  if (!verticalId) return 'FoundryOS';
  const config = configByVerticalId[verticalId];
  if (config) return config.name;
  return catalogNameById[verticalId] ?? verticalId;
}

export function getVerticalTheme(verticalId: string | null): string {
  if (!verticalId) return 'Platform';
  return configByVerticalId[verticalId]?.theme ?? 'General';
}

export function getLaunchStatus(verticalId: string | null): LaunchStatus {
  if (!verticalId) return 'unknown';
  return configByVerticalId[verticalId]?.launch_status ?? 'planned';
}

export function isContentPathSegment(segment: string): boolean {
  return CONTENT_PATH_SEGMENTS.has(segment);
}

export function contentSlugFromSegment(segment: string): string | null {
  return segmentToContentSlug[segment] ?? null;
}

export function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
