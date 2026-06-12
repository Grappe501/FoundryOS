#!/usr/bin/env npx tsx
/** PASS-040B3: Graph enrichment + inline atlas links — npm run audit:graph-enrichment */
import { validateGraphEngine } from '../packages/atlas-graph-engine/src';
import { validateBourbonGraphExpansion, validateGraphEnrichment, priorityGraphSlugs, inferGraphRef, resolveBourbonGraph, listAllBottleGraphs, narrativeInlineLinkCount, enrichGraphNarrative, buildWanderFooter } from '../apps/platform/lib/bourbon-graph';

const engine = validateGraphEngine();
const base = validateBourbonGraphExpansion();
const enrichment = validateGraphEnrichment();
const bottles = listAllBottleGraphs();

console.log('PASS-040B3 Graph Enrichment Audit');
console.log('─'.repeat(48));
console.log(`Bottle graphs: ${bottles.length}`);

let totalInline = 0;
for (const g of bottles) {
  totalInline += narrativeInlineLinkCount(enrichGraphNarrative(g));
}
console.log(`Avg inline links per bottle narrative: ${Math.round(totalInline / bottles.length)}`);

for (const slug of priorityGraphSlugs()) {
  const ref = inferGraphRef(slug);
  const graph = ref ? resolveBourbonGraph(ref) : null;
  if (graph) {
    const wander = buildWanderFooter(graph);
    const items = Object.values(wander).reduce((s, b) => s + b.items.length, 0);
    console.log(`  ✓ ${slug}: ${narrativeInlineLinkCount(enrichGraphNarrative(graph))} inline · ${items} wander items`);
  }
}

if (enrichment.warnings.length) {
  console.log('\nWarnings:');
  for (const w of enrichment.warnings) console.log(`  · ${w}`);
}

if (!engine.ok) {
  console.error('\nAtlas graph engine FAIL');
  for (const e of engine.errors) console.error(`  · ${e}`);
}

if (!base.ok) {
  console.error('\n040B2 regression FAIL');
  for (const e of base.errors) console.error(`  · ${e}`);
}

if (!enrichment.ok) {
  console.error('\nGraph enrichment FAIL');
  for (const e of enrichment.errors) console.error(`  · ${e}`);
  process.exit(1);
}

if (!engine.ok || !base.ok) process.exit(1);

console.log('\nPASS — inline links + wander footers ready');
