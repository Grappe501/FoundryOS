#!/usr/bin/env npx tsx
/**
 * PASS-040C — Atlas-Aware AI audit
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { validateAtlasAwareAI } from '../packages/atlas-aware-ai/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const validation = validateAtlasAwareAI();
if (!validation.ok) {
  for (const e of validation.errors) err('atlas-aware-ai', e);
}

if (!existsSync(join(ROOT, 'packages/atlas-aware-ai/package.json'))) {
  err('package', 'missing @foundry/atlas-aware-ai');
}

const assemble = join(ROOT, 'apps/platform/lib/atlas-aware-ai/assemble.ts');
if (!existsSync(assemble)) err('assemble', 'missing platform assemble layer');
else {
  const src = readFileSync(assemble, 'utf8');
  if (!src.includes('resolveAtlasContextForSlug')) err('assemble', 'missing resolveAtlasContextForSlug');
  if (!src.includes('inventoryFactsForGraph')) err('assemble', 'missing inventoryFactsForGraph');
}

const panel = join(ROOT, 'apps/platform/components/bourbon/AskTheAtlasPanel.tsx');
if (!existsSync(panel)) err('panel', 'missing AskTheAtlasPanel');
else {
  const src = readFileSync(panel, 'utf8');
  if (!src.includes('Ask the Atlas')) err('panel', 'missing Ask the Atlas title');
}

const operator = join(ROOT, 'apps/platform/app/operator/ai-context/page.tsx');
if (!existsSync(operator)) err('operator', 'missing /operator/ai-context');

const explorer = readFileSync(join(ROOT, 'apps/platform/components/bourbon/BourbonGraphExplorer.tsx'), 'utf8');
if (!explorer.includes('AskTheAtlasPanel')) err('explorer', 'graph page not wired to AskTheAtlasPanel');

console.log('\n=== PASS-040C Atlas-Aware AI Audit ===\n');

if (errors.length) {
  for (const e of errors) console.log(`  [${e.page}] ${e.message}`);
  console.log(`\n✗ audit:atlas-aware-ai FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('✓ validateAtlasAwareAI');
console.log('✓ package + platform wiring');
console.log('\n✓ audit:atlas-aware-ai PASSED\n');
