#!/usr/bin/env npx tsx
/** PASS-040B2: Bourbon graph expansion audit — npm run audit:bourbon-graph */
import { validateGraphEngine } from '../packages/atlas-graph-engine/src';
import { validateBourbonGraphExpansion, listAllBottleGraphs } from '../apps/platform/lib/bourbon-graph';

const engine = validateGraphEngine();
const expansion = validateBourbonGraphExpansion();
const graphs = listAllBottleGraphs();

console.log('PASS-040B2 Bourbon Graph Expansion Audit');
console.log('─'.repeat(48));
console.log(`Bottle graphs: ${graphs.length}`);
console.log(
  `Edge range: ${Math.min(...graphs.map((g) => g.connection_count))}–${Math.max(...graphs.map((g) => g.connection_count))}`,
);
console.log(`Avg edges: ${Math.round(graphs.reduce((s, g) => s + g.connection_count, 0) / graphs.length)}`);

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

console.log('\nPASS — inventory hallways ready');
