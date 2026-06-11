import verticalRegistry from '../../../data/vertical-registry.json';
import {
  getVerticalDomains,
  resolveVertical,
  type LaunchStatus,
} from '@foundry/vertical-resolver';

export type DomainHealth = {
  domain: string;
  local_domain: string;
  vertical_name: string;
  theme: string;
  launch_status: LaunchStatus;
  resolves: boolean;
  error?: string;
};

export type RoutingHealthReport = {
  configured_verticals: number;
  configured_domains: number;
  resolved_domains: number;
  routing_healthy: boolean;
  domains: DomainHealth[];
  launch_status: Array<{
    vertical: string;
    theme: string;
    status: LaunchStatus;
    launch_pass: string | null;
    domain: string;
  }>;
};

export function getRoutingHealthReport(): RoutingHealthReport {
  const configs = verticalRegistry.verticals;
  const domainRecords = getVerticalDomains();

  const domains: DomainHealth[] = domainRecords.map((d) => {
    try {
      const resolved = resolveVertical(d.domain);
      const ok =
        resolved.vertical_id === d.vertical_id &&
        resolved.vertical_name.length > 0 &&
        resolved.theme.length > 0;
      return {
        domain: d.domain,
        local_domain: d.local_domain,
        vertical_name: resolved.vertical_name,
        theme: resolved.theme,
        launch_status: resolved.launch_status,
        resolves: ok,
      };
    } catch (e) {
      return {
        domain: d.domain,
        local_domain: d.local_domain,
        vertical_name: '—',
        theme: '—',
        launch_status: 'unknown',
        resolves: false,
        error: e instanceof Error ? e.message : 'resolve failed',
      };
    }
  });

  const localChecks = ['bourbon.localhost', 'books.localhost', 'movies.localhost'].map((host) => {
    const r = resolveVertical(host);
    return { host, ok: r.vertical_id !== null && r.is_local_dev };
  });

  const resolvedCount = domains.filter((d) => d.resolves).length;
  const localOk = localChecks.every((c) => c.ok);

  const launch_status = configs.map((c) => {
    const domain = domainRecords.find((d) => d.vertical_id === c.id);
    return {
      vertical: c.name,
      theme: c.theme,
      status: c.launch_status as LaunchStatus,
      launch_pass: c.launch_pass ?? null,
      domain: domain?.domain ?? '—',
    };
  });

  return {
    configured_verticals: configs.length,
    configured_domains: domainRecords.length,
    resolved_domains: resolvedCount,
    routing_healthy: resolvedCount === domainRecords.length && localOk,
    domains,
    launch_status,
  };
}
