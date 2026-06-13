export { buildBottleGraphFromInventory, mergeGraphConnections } from './build-bottle-graph';
export { buildAtlasTermGraph } from './build-atlas-term-graph';
export { resolveConnectionHref } from './connection-href';
export {
  resolveBourbonGraph,
  inferGraphRef,
  listAllBottleGraphs,
  groupConnections,
  priorityGraphSlugs,
  type BourbonGraphRef,
} from './resolve-graph';
export {
  getBourbonGraphWeakQueue,
  validateBourbonGraphExpansion,
  countConnectionsByGroup,
  type WeakNodeRow,
  type WeakNodeIssue,
} from './weak-queue';
export { computeGraphHealthStats, collectAllGraphNodes, type GraphHealthStats } from './graph-stats';
export {
  linkifyParagraph,
  buildInlineLinkPatterns,
  bottlesForAtlasTerm,
  resolveInlineHref,
  countInlineLinksInText,
  type InlineLinkTarget,
  type TextSegment,
} from './inline-links';
export { buildWanderFooter, validateWanderFooter, type WanderBlock } from './wander-blocks';
export {
  enrichGraphNarrative,
  enrichBottleIntro,
  enrichAtlasParagraph,
  narrativeInlineLinkCount,
} from './enrich-narrative';

import { inferGraphRef, listAllBottleGraphs, resolveBourbonGraph } from './resolve-graph';
import { priorityGraphSlugs } from './resolve-graph';
import { buildWanderFooter, validateWanderFooter } from './wander-blocks';
import {
  enrichGraphNarrative,
  enrichBottleIntro,
  enrichAtlasParagraph,
  narrativeInlineLinkCount,
} from './enrich-narrative';

export function validateGraphEnrichment(): { ok: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const priority = priorityGraphSlugs();

  for (const graph of listAllBottleGraphs()) {
    const wander = validateWanderFooter(graph);
    if (!wander.ok) errors.push(...wander.errors);

    const links = narrativeInlineLinkCount(enrichGraphNarrative(graph));
    if (links < 2) errors.push(`${graph.slug}: narrative needs ≥2 inline links (has ${links})`);

    const intro = enrichBottleIntro(graph.slug);
    if (narrativeInlineLinkCount(intro) < 3) {
      errors.push(`${graph.slug}: bottle intro needs ≥3 inline links`);
    }
  }

  for (const slug of priority) {
    const ref = inferGraphRef(slug);
    if (!ref) {
      errors.push(`Priority ${slug}: no graph ref`);
      continue;
    }
    const graph = resolveBourbonGraph(ref);
    if (!graph) {
      errors.push(`Priority ${slug}: graph missing`);
      continue;
    }
    const wander = validateWanderFooter(graph);
    if (!wander.ok) errors.push(...wander.errors);
    if (narrativeInlineLinkCount(enrichGraphNarrative(graph)) < 2) {
      errors.push(`Priority ${slug}: insufficient inline links in narrative`);
    }
  }

  const bibAtlas = enrichAtlasParagraph(
    'Bottled-in-Bond is the government trust standard for American whiskey.',
    'bottled-in-bond',
  );
  if (narrativeInlineLinkCount(bibAtlas) < 2) {
    errors.push('bottled-in-bond atlas enrichment needs ≥2 inline links');
  }

  const bibGraph = resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  if (bibGraph) {
    const footer = buildWanderFooter(bibGraph);
    const totalWanderItems = Object.values(footer).reduce((s, b) => s + b.items.length, 0);
    if (totalWanderItems < 8) errors.push(`BiB wander footer needs depth (has ${totalWanderItems} items)`);
  }

  return { ok: errors.length === 0, errors, warnings };
}
