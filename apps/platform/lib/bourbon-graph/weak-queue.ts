import type { EntityGraphView, GraphConnection } from '@foundry/atlas-graph-engine';
import { getBottleRecord } from '@foundry/bourbon-intelligence';
import { BOURBON_BOTTLES } from '../bourbon-level-1/bottles';
import { listAtlasEntries } from '../bourbon-atlas/registry';
import { buildBottleGraphFromInventory } from './build-bottle-graph';
import { inferGraphRef, resolveBourbonGraph, priorityGraphSlugs } from './resolve-graph';

export type WeakNodeIssue =
  | 'low_edges'
  | 'no_why_care'
  | 'no_atlas_term'
  | 'no_collection'
  | 'unknown_confidence'
  | 'shallow_teasers';

export type WeakNodeRow = {
  id: string;
  slug: string;
  entity_type: string;
  label: string;
  connections: number;
  issues: WeakNodeIssue[];
  target: number;
};

const MIN_TEASER_LENGTH = 80;

function graphIssues(graph: EntityGraphView | null, priority = false): WeakNodeIssue[] {
  if (!graph) return ['low_edges', 'no_why_care', 'no_atlas_term', 'no_collection'];

  const issues: WeakNodeIssue[] = [];
  if (graph.connection_count < 10) issues.push('low_edges');
  if (!graph.why_should_i_care?.trim()) issues.push('no_why_care');

  const hasAtlas = graph.connections.some((c) => c.entity_type === 'atlas_term');
  if (!hasAtlas) issues.push('no_atlas_term');

  const hasCollection = graph.connections.some((c) => c.entity_type === 'collection');
  if (!hasCollection) issues.push('no_collection');

  const unknownCount = graph.connections.filter((c) => c.confidence === 'unknown').length;
  if (graph.connections.length > 0 && unknownCount / graph.connections.length > 0.5) {
    issues.push('unknown_confidence');
  }

  if (priority) {
    const shallow = graph.connections.filter((c) => (c.teaser?.length ?? 0) < MIN_TEASER_LENGTH);
    if (shallow.length > 0) issues.push('shallow_teasers');
  }

  return issues;
}

export function getBourbonGraphWeakQueue(): WeakNodeRow[] {
  const rows: WeakNodeRow[] = [];
  const priority = new Set(priorityGraphSlugs());

  for (const bottle of BOURBON_BOTTLES) {
    const graph = buildBottleGraphFromInventory(bottle.slug);
    const issues = graphIssues(graph, priority.has(bottle.slug));
    if (issues.length === 0) continue;
    rows.push({
      id: `bottle:${bottle.slug}`,
      slug: bottle.slug,
      entity_type: 'bottle',
      label: bottle.name,
      connections: graph?.connection_count ?? 0,
      issues,
      target: 10,
    });
  }

  const bib = resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  const bibIssues = graphIssues(bib, true);
  if (bibIssues.length) {
    rows.push({
      id: 'atlas_term:bottled-in-bond',
      slug: 'bottled-in-bond',
      entity_type: 'atlas_term',
      label: 'Bottled in Bond',
      connections: bib?.connection_count ?? 0,
      issues: bibIssues,
      target: 15,
    });
  }

  for (const entry of listAtlasEntries().slice(0, 20)) {
    const ref = inferGraphRef(entry.slug);
    if (!ref || ref.entity_type !== 'atlas_term') continue;
    const graph = resolveBourbonGraph(ref);
    if (!graph || graph.connection_count >= 10) continue;
    rows.push({
      id: `atlas_term:${entry.slug}`,
      slug: entry.slug,
      entity_type: 'atlas_term',
      label: entry.title,
      connections: graph.connection_count,
      issues: graphIssues(graph),
      target: 10,
    });
  }

  return rows.sort((a, b) => a.connections - b.connections);
}

export function countConnectionsByGroup(connections: GraphConnection[]): Record<string, number> {
  return connections.reduce<Record<string, number>>((acc, c) => {
    acc[c.group] = (acc[c.group] ?? 0) + 1;
    return acc;
  }, {});
}

function auditEdgeIntegrity(graph: EntityGraphView, errors: string[], slug: string): void {
  for (const edge of graph.connections) {
    if (!edge.confidence) {
      errors.push(`${slug}: edge ${edge.id} missing confidence`);
    }
    if (edge.confidence === 'verified' && !edge.source_label?.trim()) {
      errors.push(`${slug}: verified edge ${edge.id} missing source_label`);
    }
  }
}

export function validateBourbonGraphExpansion(): { ok: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const priority = priorityGraphSlugs();

  for (const bottle of BOURBON_BOTTLES) {
    const graph = buildBottleGraphFromInventory(bottle.slug);
    if (!graph) {
      errors.push(`Missing graph for bottle ${bottle.slug}`);
      continue;
    }
    if (graph.connection_count < 3) {
      errors.push(`${bottle.slug}: ${graph.connection_count} edges (need 3+ minimum)`);
    }
    if (graph.connection_count < 10) {
      warnings.push(`${bottle.slug}: ${graph.connection_count} edges (target 10+)`);
    }
    if (!graph.why_should_i_care) {
      errors.push(`${bottle.slug}: missing why_should_i_care`);
    }
    auditEdgeIntegrity(graph, errors, bottle.slug);

    if (priority.includes(bottle.slug)) {
      const shallow = graph.connections.filter((c) => (c.teaser?.length ?? 0) < MIN_TEASER_LENGTH);
      if (shallow.length) {
        errors.push(`${bottle.slug}: ${shallow.length} edges with shallow teasers (<${MIN_TEASER_LENGTH} chars)`);
      }
    }
  }

  const bib = resolveBourbonGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  if (!bib || bib.connection_count < 15) {
    errors.push(`bottled-in-bond: need 15+ edges (has ${bib?.connection_count ?? 0})`);
  }
  if (!bib?.identities || bib.identities.length < 5) {
    errors.push('bottled-in-bond: need 5+ identity labels');
  }
  if (bib) {
    auditEdgeIntegrity(bib, errors, 'bottled-in-bond');
    const hasMission = bib.connections.some((c) => c.group === 'Missions' || c.title.toLowerCase().includes('mission'));
    if (!hasMission) errors.push('bottled-in-bond: missing suggested tasting mission');
  }

  for (const slug of priority) {
    const ref = inferGraphRef(slug);
    if (!ref) {
      errors.push(`Priority node ${slug}: cannot infer graph ref`);
      continue;
    }
    const graph = resolveBourbonGraph(ref);
    if (!graph) {
      errors.push(`Priority node ${slug}: graph does not resolve`);
    }
  }

  const weakQueue = getBourbonGraphWeakQueue();
  if (weakQueue.length === 0) {
    warnings.push('Weak queue empty — all nodes meet minimums');
  }

  return { ok: errors.length === 0, errors, warnings };
}
