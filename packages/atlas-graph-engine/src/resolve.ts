import type { EntityGraphView, GraphConnection, GraphEntityRef } from './types';
import { BOURBON_BOTTLE_GRAPHS, bourbonBottleGraphFallback } from './worlds/bourbon/bottle-graph';
import { BOURBON_ATLAS_TERM_GRAPHS } from './worlds/bourbon/atlas-term-graph';

function withCareFields(view: EntityGraphView): EntityGraphView {
  const care = view.why_should_i_care ?? view.why_it_matters;
  return { ...view, why_should_i_care: care, why_it_matters: care };
}

const RESOLVERS: Record<string, Partial<Record<string, (slug: string) => EntityGraphView | null>>> = {
  bourbon: {
    bottle: (slug) => {
      const seeded = BOURBON_BOTTLE_GRAPHS[slug];
      if (seeded) return withCareFields(seeded);
      return bourbonBottleGraphFallback(slug);
    },
    atlas_term: (slug) => {
      const seeded = BOURBON_ATLAS_TERM_GRAPHS[slug];
      return seeded ? withCareFields(seeded) : null;
    },
  },
};

export function resolveEntityGraph(ref: GraphEntityRef): EntityGraphView | null {
  const resolver = RESOLVERS[ref.world_slug]?.[ref.entity_type];
  if (!resolver) return null;
  return resolver(ref.slug);
}

export function groupConnections(connections: GraphConnection[]): Record<string, GraphConnection[]> {
  return connections.reduce<Record<string, GraphConnection[]>>((acc, c) => {
    (acc[c.group] ??= []).push(c);
    return acc;
  }, {});
}

export function validateGraphEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const wt101 = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'bottle', slug: 'wild-turkey-101' });
  if (!wt101 || wt101.connection_count < 10) {
    errors.push('wild-turkey-101 exemplar needs 10+ connections');
  }
  if (!wt101?.why_should_i_care) {
    errors.push('wild-turkey-101 must have why_should_i_care');
  }
  const bib = resolveEntityGraph({ world_slug: 'bourbon', entity_type: 'atlas_term', slug: 'bottled-in-bond' });
  if (!bib || bib.connection_count < 10) {
    errors.push('bottled-in-bond exemplar needs 10+ connections');
  }
  if (!bib?.identities || bib.identities.length < 5) {
    errors.push('bottled-in-bond must have 5+ multi-identity labels');
  }
  return { ok: errors.length === 0, errors };
}
