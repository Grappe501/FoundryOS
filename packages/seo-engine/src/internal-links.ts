export interface GraphLink {
  source_slug: string;
  target_slug: string;
  relationship: string;
  vertical_domain: string;
  anchor_text?: string;
}

/**
 * Injects internal links from Knowledge Graph relationships into page content.
 * Example: Buffalo Trace → Pairs With → Brisket → Tailgate Guide → Arkansas Razorbacks
 */
export function injectInternalLinks(
  content: string,
  links: GraphLink[],
  verticalDomain: string
): { content: string; links: Array<{ href: string; text: string; rel: string }> } {
  const injected: Array<{ href: string; text: string; rel: string }> = [];

  for (const link of links) {
    const href = `https://${verticalDomain}/${link.target_slug}`;
    const text = link.anchor_text ?? `${link.relationship}: ${link.target_slug.replace(/-/g, ' ')}`;
    injected.push({ href, text, rel: link.relationship });
  }

  return { content, links: injected };
}
