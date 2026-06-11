import type { AssemblyInput, RelationshipDraft } from '../types';

/**
 * AI #3 — Relationship Builder
 * Pairs With, Similar To, Related To, Referenced By — expands the graph.
 */
export async function buildRelationships(input: AssemblyInput): Promise<RelationshipDraft[]> {
  // v1: structural placeholders — AI enrichment in PASS-007/008
  const typeDefaults: Record<string, RelationshipDraft[]> = {
    spirit: [
      { relationship_type: 'part_of', target_slug: 'kentucky-bourbon-trail', target_display_name: 'Kentucky Bourbon Trail', strength: 0.6 },
      { relationship_type: 'related_to', target_slug: 'american-whiskey', target_display_name: 'American Whiskey', strength: 0.8 },
    ],
    film: [
      { relationship_type: 'related_to', target_slug: 'classic-cinema', target_display_name: 'Classic Cinema', strength: 0.7 },
    ],
    book: [
      { relationship_type: 'related_to', target_slug: 'literary-fiction', target_display_name: 'Literary Fiction', strength: 0.7 },
    ],
    album: [
      { relationship_type: 'related_to', target_slug: 'classic-rock', target_display_name: 'Classic Rock', strength: 0.7 },
    ],
  };

  return (
    typeDefaults[input.entity_type] ?? [
      { relationship_type: 'related_to', target_slug: 'foundry-platform', target_display_name: 'Foundry Platform', strength: 0.5 },
    ]
  ).map((r) => ({
    ...r,
    metadata: { factory_generated: true, source_entity: input.slug },
  }));
}
