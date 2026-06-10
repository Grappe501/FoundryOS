import * as fs from 'fs';
import * as path from 'path';
import type { Topic, Vertical, VerticalSite, RegistryStats } from './types';

const ROOT = process.cwd();

export function loadRegistry(): {
  topics: Topic[];
  verticals: Vertical[];
  verticalSites: VerticalSite[];
  stats: RegistryStats;
} {
  const catalogIndex = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data/catalog/index.json'), 'utf-8')
  );
  const allApps = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data/catalog/all-apps.json'), 'utf-8')
  );
  const verticalSitesData = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'data/vertical-sites.json'), 'utf-8')
  );

  const verticalSites: VerticalSite[] = verticalSitesData.sites;
  const domainByVertical = new Map<string, string>();

  for (const site of verticalSites) {
    if (site.vertical_id) domainByVertical.set(site.vertical_id, site.domain);
  }

  const topics: Topic[] = allApps.map((app: Record<string, unknown>) => {
    const verticalId = app.vertical_id as string;
    const domain = domainByVertical.get(verticalId);
    return {
      id: app.id as number,
      slug: app.slug as string,
      displayName: app.displayName as string,
      vertical_id: verticalId,
      vertical_slug: app.vertical_slug as string,
      crossRefs: (app.crossRefs as string[]) ?? [],
      priority: (app.priority as string) ?? 'P3',
      status: 'draft',
      site_url: domain ? `https://${domain}` : undefined,
      topic_url: domain ? `https://${domain}/${app.slug}` : undefined,
    };
  });

  const topicsByVertical: Record<string, number> = {};
  for (const t of topics) {
    topicsByVertical[t.vertical_id] = (topicsByVertical[t.vertical_id] ?? 0) + 1;
  }

  return {
    topics,
    verticals: catalogIndex.verticals,
    verticalSites,
    stats: {
      total_topics: topics.length,
      total_verticals: catalogIndex.total_verticals,
      topics_by_vertical: topicsByVertical,
      vertical_domains: verticalSites.filter((s) => s.type === 'vertical').length,
    },
  };
}

export function getTopicsByVertical(topics: Topic[], verticalId: string): Topic[] {
  return topics.filter((t) => t.vertical_id === verticalId);
}

export function getTopicBySlug(topics: Topic[], slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getVerticalSite(sites: VerticalSite[], verticalId: string): VerticalSite | undefined {
  return sites.find((s) => s.vertical_id === verticalId);
}
