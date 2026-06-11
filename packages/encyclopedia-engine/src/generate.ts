import { ENCYCLOPEDIA_SECTIONS } from './sections';
import type {
  EncyclopediaEntry,
  EncyclopediaInput,
  EncyclopediaSectionContent,
  GeographicPerspective,
} from './types';

function defaultGeographicPerspectives(name: string, entityType: string): GeographicPerspective[] {
  if (entityType === 'spirit') {
    return [
      { region: 'Kentucky, USA', perspective: `${name} is deeply tied to Kentucky bourbon heritage and local distillery culture.` },
      { region: 'United States', perspective: `American collectors and enthusiasts track ${name} across national release calendars and state allocations.` },
      { region: 'Europe', perspective: `European markets often view ${name} through premium whisky import and cocktail culture lenses.` },
      { region: 'Japan', perspective: `Japanese enthusiasts value ${name} for rarity, craftsmanship, and highball pairing traditions.` },
      { region: 'Australia', perspective: `Australian bourbon interest has grown through craft cocktail bars and allocated bottle culture.` },
    ];
  }
  return [
    { region: 'Global', perspective: `${name} holds significance across multiple cultural contexts.` },
    { region: 'United States', perspective: `US audiences engage with ${name} through community and collector networks.` },
  ];
}

function buildSection(
  input: EncyclopediaInput,
  section: (typeof ENCYCLOPEDIA_SECTIONS)[number]
): EncyclopediaSectionContent {
  const { entity_display_name: name, entity_type: type } = input;
  const base = {
    section: section.slug,
    title: `${section.display_name} — ${name}`,
    sources: [{ label: 'Foundry Encyclopedia Engine', type: 'generated' as const }],
    content_score: 0,
    status: 'draft' as const,
  };

  switch (section.slug) {
    case 'definition':
      return {
        ...base,
        body: `${name} is a ${type} entity in the Foundry Knowledge Universe. Encyclopedia content is generated, scored, and stored — not published until qualified.`,
        metadata: { entity_type: type },
      };
    case 'history':
      return {
        ...base,
        body: `Origins and evolution of ${name}. Timeline slots reserved for verified historical enrichment.`,
        metadata: { timeline: [], eras: ['origins', 'development', 'present'] },
      };
    case 'cultural_significance':
      return {
        ...base,
        body: `Why ${name} matters to enthusiasts, collectors, and communities. Cultural context enriches in PASS-007+.`,
        metadata: { why_it_matters: [], who_values_it: [] },
      };
    case 'geographic_significance':
      return {
        ...base,
        body: `Regional perspectives on ${name} vary by geography — each lens adds depth.`,
        metadata: { perspectives: defaultGeographicPerspectives(name, type) },
      };
    case 'trivia':
      return {
        ...base,
        body: `Did you know? Trivia about ${name} — high-engagement "did you know" content.`,
        metadata: { facts: [`${name} is tracked in the Foundry Knowledge Universe.`] },
      };
    case 'related_concepts':
      return {
        ...base,
        body: `Concepts related to ${name} — powered by the knowledge graph.`,
        metadata: { graph_driven: true, relationship_types: ['related_to', 'pairs_with', 'part_of'] },
      };
    case 'common_misconceptions':
      return {
        ...base,
        body: `Common myths about ${name} — corrected with verified sources.`,
        metadata: { myths: [], corrections: [] },
      };
    case 'beginner_explanation':
      return {
        ...base,
        body: `${name} explained for newcomers — plain language, no jargon.`,
        metadata: { reading_level: 'beginner' },
      };
    case 'expert_explanation':
      return {
        ...base,
        body: `${name} for experts — advanced nuance, production detail, collector context.`,
        metadata: { reading_level: 'expert' },
      };
    case 'sources':
      return {
        ...base,
        body: `Verified references for ${name}. Community and editorial sources layer on over time.`,
        metadata: { verified_count: 0 },
        sources: [{ label: 'Foundry Encyclopedia Engine', type: 'generated' }],
      };
    default:
      return { ...base, body: '', metadata: {} };
  }
}

/**
 * Generate full encyclopedia for an entity — 10 living knowledge sections.
 * Generated → scored → stored. Not published by default.
 */
export function generateEncyclopedia(input: EncyclopediaInput): EncyclopediaEntry {
  const sections = ENCYCLOPEDIA_SECTIONS.map((s) => buildSection(input, s));

  return {
    entity_slug: input.entity_slug,
    entity_display_name: input.entity_display_name,
    entity_type: input.entity_type,
    vertical_id: input.vertical_id,
    sections,
    generated_at: new Date().toISOString(),
  };
}

export function encyclopediaPath(entitySlug: string, sectionPathSegment: string): string {
  return `/entities/${entitySlug}/encyclopedia/${sectionPathSegment}`;
}
