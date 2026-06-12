#!/usr/bin/env npx tsx
/** PASS-040B2: Layer 1 graph audit — npm run audit:graph */
import { validateGraphEngine } from '../packages/atlas-graph-engine/src';
import {
  validateBourbonGraphExpansion,
  listAllBottleGraphs,
  getBourbonGraphWeakQueue,
  computeGraphHealthStats,
  priorityGraphSlugs,
  inferGraphRef,
  resolveBourbonGraph,
} from '../apps/platform/lib/bourbon-graph';

const engine = validateGraphEngine();
const expansion = validateBourbonGraphExpansion();
const graphs = listAllBottleGraphs();
const stats = computeGraphHealthStats();
const weakQueue = getBourbonGraphWeakQueue();

console.log('PASS-040B2 Layer 1 Graph Audit (audit:graph)');
console.log('─'.repeat(48));
console.log(`Bottle graphs: ${graphs.length}`);
console.log(`Total nodes (inventory + BiB + priority producers): ${stats.total_nodes}`);
console.log(`Total edges: ${stats.total_edges}`);
console.log(`Avg edges per node: ${stats.average_edge_count}`);
console.log(`BiB exemplar edges: ${stats.bib_edge_count}`);
console.log(`Weak queue rows: ${weakQueue.length}`);

if (expansion.warnings.length) {
  console.log('\nWarnings:');
  for (const w of expansion.warnings) console.log(`  · ${w}`);
}

if (!engine.ok) {
  console.error('\nAtlas graph engine FAIL');
  for (const e of engine.errors) console.error(`  · ${e}`);
}

if (!expansion.ok) {
  console.error('\nGraph expansion FAIL');
  for (const e of expansion.errors) console.error(`  · ${e}`);
  process.exit(1);
}

if (!engine.ok) process.exit(1);

for (const slug of priorityGraphSlugs()) {
  const ref = inferGraphRef(slug);
  const graph = ref ? resolveBourbonGraph(ref) : null;
  if (!graph) {
    console.error(`Priority route FAIL: /bourbon/graph/${slug}`);
    process.exit(1);
  }
  console.log(`  ✓ /bourbon/graph/${slug} (${graph.connection_count} edges)`);
}

console.log('\nPASS — Layer 1 graph hallways ready');
