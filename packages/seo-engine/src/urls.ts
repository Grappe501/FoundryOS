export function buildTopicUrl(verticalDomain: string, topicSlug: string): string {
  return `https://${verticalDomain}/${topicSlug}`;
}

export function buildCanonicalUrl(verticalDomain: string, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `https://${verticalDomain}${clean}`;
}
