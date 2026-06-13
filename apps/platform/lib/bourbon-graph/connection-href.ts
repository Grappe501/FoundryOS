import type { GraphConnection } from '@foundry/atlas-graph-engine';

/** Preserve tool/detective/compare hrefs; graph-first only for bottles and resolvable nodes */
export function resolveConnectionHref(c: GraphConnection): string {
  const href = c.href ?? '';

  if (href.includes('compare') || href.includes('?')) return href;
  if (href.startsWith('/bourbon/detective/')) return href;
  if (href.startsWith('/bourbon/experiences/')) return href;
  if (href.startsWith('/bourbon/academy/')) return href;
  if (href.startsWith('/bourbon/portfolio')) return href;
  if (href.startsWith('/bourbon/map')) return href;
  if (href.startsWith('/bourbon/store-picks')) return href;
  if (href.startsWith('/bourbon/economy')) return href;
  if (href.startsWith('/bourbon/lore')) return href;
  if (href.startsWith('/bourbon/stories')) return href;
  if (href.startsWith('/bourbon/legends/')) return href;
  if (href.startsWith('/bourbon/producers/') && c.entity_type !== 'bottle') return href;
  if (href.startsWith('/bourbon/bottles/') && c.entity_type !== 'bottle') return href;
  if (href.startsWith('/bourbon/atlas/') && c.entity_type === 'atlas_term') return href;

  if (c.entity_type === 'bottle') return `/bourbon/graph/${c.slug}`;
  if (href.startsWith('/bourbon/graph/')) return href;

  if (c.entity_type === 'producer' || c.entity_type === 'person' || c.entity_type === 'debate') {
    return `/bourbon/graph/${c.slug}`;
  }

  if (c.entity_type === 'atlas_term') {
    return `/bourbon/graph/${c.slug}`;
  }

  return href || `/bourbon/level-1`;
}
