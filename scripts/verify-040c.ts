#!/usr/bin/env npx tsx
/**
 * PASS-040C — Atlas-Aware AI verification
 */
import {
  buildAtlasContext,
  buildUserIdentityContext,
  exampleProofUserContext,
  generateMentorAnswer,
  validateAtlasAwareAI,
  UNKNOWN_SOURCE_MESSAGE,
} from '../packages/atlas-aware-ai/src';
import { emptyPortableMemoryState } from '../packages/personal-database/src';

const errors: string[] = [];

function check(name: string, pass: boolean) {
  console.log(`${pass ? '✓' : '✗'} ${name}`);
  if (!pass) errors.push(name);
}

const validation = validateAtlasAwareAI();
check('validateAtlasAwareAI', validation.ok);

const user = exampleProofUserContext();
check('proof user has WT101 artifact', user.artifacts.some((a) => a.title.includes('Wild Turkey 101')));
check('proof user has BiB graph view', user.graph_views.some((g) => g.slug.includes('bottled-in-bond')));
check('proof user has wheated collection', user.collections.some((c) => c.id === 'wheated-explorer'));

const atlas = buildAtlasContext({
  graph: {
    world_slug: 'bourbon',
    entity_type: 'atlas_term',
    slug: 'bottled-in-bond',
    title: 'Bottled-in-Bond',
    why_should_i_care: 'Government trust standard for American whiskey.',
    why_it_matters: 'Government trust standard for American whiskey.',
    connections: [
      {
        id: 'hh',
        relation: 'works_for',
        entity_type: 'organization',
        slug: 'heaven-hill',
        title: 'Heaven Hill',
        href: '/bourbon/graph/heaven-hill',
        teaser: 'Value BiB producer',
        group: 'Organizations',
        confidence: 'commonly_reported',
      },
    ],
    connection_count: 1,
  },
  inventory_facts: [{ field: 'grain source', value: 'unknown', confidence: 'unknown' }],
});

check('atlas context has confidence warnings', atlas.confidence_warnings.length > 0);
check('atlas context detects unknown fields', atlas.unknown_fields.length > 0);

const explore = generateMentorAnswer('explore_next', atlas, user);
check('explore_next is personalized', explore.personalized);
check('explore_next cites Foundry nodes', explore.citations.every((c) => c.href.startsWith('/bourbon/')));
check('explore_next mentions value bourbon', explore.answer.toLowerCase().includes('value bourbon'));
check('explore_next mentions Heaven Hill', explore.answer.includes('Heaven Hill'));
check('explore_next mentions store pick', explore.answer.toLowerCase().includes('store pick'));

const unknown = generateMentorAnswer('what_unknown', atlas, user);
check('what_unknown respects unknowns', unknown.answer.includes(UNKNOWN_SOURCE_MESSAGE));

const identity = buildUserIdentityContext({
  world_slug: 'bourbon',
  memory_state: {
    ...emptyPortableMemoryState(),
    curiosity_weights: { 'bourbon:value-bourbon': 3, 'bourbon:bottled-in-bond': 2 },
    graph_views: [{ world_slug: 'bourbon', slug: 'bottled-in-bond', title: 'BiB', at: new Date().toISOString() }],
  },
  collections: [{ id: 'wheated-explorer', title: 'Wheated Explorer', unlocked: 1, total: 5 }],
});
check('identity context builds curiosity summary', identity.curiosity_summary.length > 10);

console.log('\n=== PASS-040C Atlas-Aware AI ===\n');

if (errors.length) {
  console.log(`✗ verify:040c FAILED (${errors.length})\n`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(2);
}

console.log('✓ verify:040c PASSED\n');
