import type { EntityGraphView } from '@foundry/atlas-graph-engine';
import { buildConfidenceNotice, collectUnknownFields } from './confidence';
import type { AtlasContext, BuildAtlasContextInput, InventoryFact } from './types';

export function buildAtlasContext(input: BuildAtlasContextInput): AtlasContext {
  const { graph, inventory_facts = [] } = input;

  const edges = graph.connections.map((c) => ({
    title: c.title,
    href: c.href,
    relation: c.relation,
    confidence: c.confidence ?? 'commonly_reported',
    teaser: c.teaser,
    source_label: c.source_label,
  }));

  const suggested_hops: AtlasContext['suggested_hops'] = [];

  if (graph.suggested_next) {
    const n = graph.suggested_next;
    suggested_hops.push({
      title: n.title,
      href: n.href,
      reason: 'Suggested next on this graph node',
      confidence: n.confidence ?? 'commonly_reported',
    });
  }

  for (const c of graph.connections.filter((x) => x.relation === 'explores' || x.relation === 'enabled_by').slice(0, 4)) {
    suggested_hops.push({
      title: c.title,
      href: c.href,
      reason: `Connected via ${c.relation.replace(/_/g, ' ')}`,
      confidence: c.confidence ?? 'commonly_reported',
    });
  }

  const confidence_warnings = buildConfidenceNotice(edges, inventory_facts);
  const unknown_fields = collectUnknownFields(
    graph.connections.map((c) => ({ title: c.title, confidence: c.confidence, group: c.group })),
    inventory_facts,
  );

  return {
    anchor: {
      world_slug: graph.world_slug,
      entity_type: graph.entity_type,
      slug: graph.slug,
      title: graph.title,
    },
    why_should_i_care: graph.why_should_i_care || graph.why_it_matters,
    identities: graph.identities ?? [],
    edges,
    inventory_facts,
    unknown_fields,
    confidence_warnings,
    suggested_hops,
  };
}

export function inventoryFactsFromRecord(
  fields: { field: string; value: unknown; confidence?: string; source_label?: string }[],
): InventoryFact[] {
  return fields
    .filter((f) => f.value != null && String(f.value).length > 0)
    .map((f) => ({
      field: f.field,
      value: String(f.value),
      confidence: (f.confidence as InventoryFact['confidence']) ?? 'unknown',
      source_label: f.source_label,
    }));
}
