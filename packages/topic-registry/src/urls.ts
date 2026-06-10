import type { Topic, TopicStatus } from './types';

export function topicUrl(verticalDomain: string, topicSlug: string): string {
  return `https://${verticalDomain}/${topicSlug}`;
}

export function topicStatusCounts(topics: Topic[]): Record<TopicStatus, number> {
  const counts: Record<TopicStatus, number> = {
    draft: 0,
    ready: 0,
    published: 0,
    archived: 0,
  };
  for (const t of topics) counts[t.status]++;
  return counts;
}
