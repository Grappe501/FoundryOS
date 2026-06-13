import type { FoundryRecommendation, RecommendationGraphEdge } from './types';

export function recommendationToGraphEdges(
  rec: FoundryRecommendation,
  entityTitle?: string,
): RecommendationGraphEdge[] {
  const edges: RecommendationGraphEdge[] = [
    {
      from: { kind: 'user_recommendation', recommendation_id: rec.id, user_id: rec.user_id },
      to: {
        world_slug: rec.world_slug,
        entity_type: rec.entity_type,
        slug: rec.entity_slug,
        title: entityTitle,
      },
      relation: 'recommended',
      label: rec.title,
    },
  ];

  for (const node of rec.related_graph_nodes) {
    edges.push({
      from: { kind: 'user_recommendation', recommendation_id: rec.id, user_id: rec.user_id },
      to: { world_slug: rec.world_slug, entity_type: 'atlas_term', slug: node },
      relation: 'recommended',
      label: `connects to ${node}`,
    });
  }

  return edges;
}

export function recommendationGraphSignalChain(rec: FoundryRecommendation): string[] {
  const chain = [rec.entity_slug];
  if (rec.world_slug === 'bourbon') {
    if (rec.entity_slug.includes('wild-turkey')) chain.push('wild-turkey', 'kentucky-classics');
    if (rec.bourbon_context === 'value hunt' || rec.who_this_is_for.toLowerCase().includes('value')) {
      chain.push('value-bourbon');
    }
    chain.push(...rec.related_graph_nodes);
    if (rec.best_next_action) chain.push('suggested-next-bottle');
  }
  return [...new Set(chain)];
}
