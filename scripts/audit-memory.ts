#!/usr/bin/env npx tsx
/**
 * PASS-034P+ — World Memory audit
 * Usage: npm run audit:memory
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { validateWorldMemoryEngine } from '../packages/world-memory-engine/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const validation = validateWorldMemoryEngine();
if (!validation.ok) {
  for (const e of validation.errors) err('world-memory-engine', e);
}

const memoryStore = join(ROOT, 'apps/platform/lib/world-memory/memory-store.ts');
if (!existsSync(memoryStore)) err('memory-store', 'missing localStorage v1');
else {
  const src = readFileSync(memoryStore, 'utf8');
  if (!src.includes('foundry-world-memory-v1')) err('memory-store', 'missing v1 key');
  if (!src.includes('recordGraphView')) err('memory-store', 'missing recordGraphView');
  if (!src.includes('recordSavedRabbitHole')) err('memory-store', 'missing recordSavedRabbitHole');
  if (!src.includes('recordComparison')) err('memory-store', 'missing recordComparison');
}

const panel = join(ROOT, 'apps/platform/components/world-continuity/ContinuityPanels.tsx');
const panelSrc = readFileSync(panel, 'utf8');
if (!panelSrc.includes('@foundry/world-memory-engine')) err('ContinuityPanels', 'must use world-memory-engine');
if (panelSrc.includes('Recent activity') || panelSrc.includes('Continue lesson') || panelSrc.includes('Unfinished business')) {
  err('ContinuityPanels', 'forbidden copy or old labels');
}
if (!panelSrc.includes('Last time you were here')) err('ContinuityPanels', 'missing welcome-back headline');
if (!panelSrc.includes('Pick the thread back up')) err('ContinuityPanels', 'missing pick-up CTA');

const graphExplorer = join(ROOT, 'apps/platform/components/bourbon/BourbonGraphExplorer.tsx');
if (!readFileSync(graphExplorer, 'utf8').includes('recordGraphView')) {
  err('BourbonGraphExplorer', 'missing graph view recorder');
}

const compareTool = join(ROOT, 'apps/platform/components/bourbon/level-1/CompareAnyTwoTool.tsx');
if (!readFileSync(compareTool, 'utf8').includes('recordComparison')) {
  err('CompareAnyTwoTool', 'missing comparison recorder');
}

const timelinePage = join(ROOT, 'apps/platform/app/passport/timeline/page.tsx');
if (!existsSync(timelinePage)) err('/passport/timeline', 'missing page');

const pkg = join(ROOT, 'packages/world-memory-engine/package.json');
if (!existsSync(pkg)) err('@foundry/world-memory-engine', 'missing package');

console.log('\n=== PASS-034P+ World Memory Audit ===\n');

if (errors.length) {
  console.log('Errors:');
  for (const e of errors) console.log(`  [${e.page}] ${e.message}`);
  console.log(`\n✗ audit:memory FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('✓ validateWorldMemoryEngine');
console.log('✓ localStorage v1 memory-store');
console.log('✓ continuity panels + recorders');
console.log('\n✓ audit:memory PASSED\n');
