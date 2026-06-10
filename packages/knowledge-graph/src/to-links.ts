import type { GraphTraversal } from './types';

export function toInternalLinks(
  traversals: GraphTraversal[],
  verticalDomain: string
): Array<{ href: string; text: string; relationship: string }> {
  return traversals.map((t) => ({
    href: `https://${verticalDomain}/${t.entity.slug}`,
    text: t.entity.display_name,
    relationship: t.relationship.relationship_type,
  }));
}
