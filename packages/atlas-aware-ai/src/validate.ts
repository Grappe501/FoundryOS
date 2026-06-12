import { buildAtlasContext } from './atlas-context';
import { exampleProofUserContext } from './identity-context';
import { generateMentorAnswer } from './mentor';
import { UNKNOWN_SOURCE_MESSAGE } from './types';

export function validateAtlasAwareAI(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  const mockGraph = {
    world_slug: 'bourbon',
    entity_type: 'atlas_term' as const,
    slug: 'bottled-in-bond',
    title: 'Bottled-in-Bond',
    why_should_i_care: 'BiB is a government trust standard — not marketing fluff.',
    why_it_matters: 'BiB is a government trust standard — not marketing fluff.',
    identities: ['law', 'quality_standard'],
    connections: [
      {
        id: 'org-heaven-hill',
        relation: 'works_for' as const,
        entity_type: 'organization' as const,
        slug: 'heaven-hill',
        title: 'Heaven Hill',
        href: '/bourbon/graph/heaven-hill',
        teaser: 'Value BiB king on many shelves.',
        group: 'Organizations',
        confidence: 'commonly_reported' as const,
      },
      {
        id: 'terroir-unknown',
        relation: 'located_in' as const,
        entity_type: 'place' as const,
        slug: 'grain-source',
        title: 'Grain source',
        href: '/bourbon/graph/bottled-in-bond',
        teaser: 'Not publicly disclosed at field level.',
        group: 'Terroir disclosure',
        confidence: 'unknown' as const,
      },
    ],
    connection_count: 2,
  };

  const atlas = buildAtlasContext({
    graph: mockGraph,
    inventory_facts: [{ field: 'mash bill percentages', value: 'unknown', confidence: 'unknown' }],
  });

  if (atlas.edges.length === 0) errors.push('buildAtlasContext must include edges');
  if (atlas.unknown_fields.length === 0) errors.push('buildAtlasContext must detect unknown fields');
  if (atlas.confidence_warnings.length === 0) errors.push('buildConfidenceNotice must warn on unknown');

  const user = exampleProofUserContext();
  const answer = generateMentorAnswer('explore_next', atlas, user);

  if (!answer.grounded_in_foundry) errors.push('mentor answer must be grounded in Foundry');
  if (answer.citations.length === 0) errors.push('mentor answer must cite graph nodes');
  if (!answer.answer.includes('value bourbon')) errors.push('proof answer must mention value bourbon');
  if (!answer.answer.includes('government-trust')) errors.push('proof answer must mention government-trust');
  if (!answer.answer.includes('wheated')) errors.push('proof answer must mention wheated');
  if (!answer.answer.includes('Bottled-in-Bond')) errors.push('proof answer must include BiB path');
  if (!answer.answer.includes('Heaven Hill')) errors.push('proof answer must include Heaven Hill');

  const unknownAnswer = generateMentorAnswer('what_unknown', atlas, user);
  if (!unknownAnswer.answer.includes(UNKNOWN_SOURCE_MESSAGE)) {
    errors.push('what_unknown must include unknown source message');
  }

  return { ok: errors.length === 0, errors };
}
