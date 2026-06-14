#!/usr/bin/env npx tsx
/**
 * PASS-049 — Full AI orchestration stack audit
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { validateOrchestrationEngine, getOrchestrationEngineStats } from '../packages/ai-orchestration/src';

const ROOT = join(__dirname, '..');
const errors: { page: string; message: string }[] = [];

function err(page: string, message: string) {
  errors.push({ page, message });
}

const validation = validateOrchestrationEngine();
if (!validation.ok) {
  for (const e of validation.errors) err('orchestration-engine', e);
}

const stats = getOrchestrationEngineStats();
if (stats.orchestration_actions < 13) err('stats', 'expected 13+ orchestration actions');

const required = [
  'packages/ai-orchestration/src/foundry-orchestrate.ts',
  'packages/ai-orchestration/src/validate-engine.ts',
  'apps/platform/lib/ai-orchestration/assemble.ts',
  'apps/platform/app/api/ai/orchestrate/route.ts',
  'apps/platform/components/ai/FoundryOrchestrationPanel.tsx',
  'apps/platform/app/operator/ai-brain/page.tsx',
];

for (const rel of required) {
  if (!existsSync(join(ROOT, rel))) err('files', `missing ${rel}`);
}

const assemble = join(ROOT, 'apps/platform/lib/ai-orchestration/assemble.ts');
if (existsSync(assemble)) {
  const src = readFileSync(assemble, 'utf8');
  if (!src.includes('orchestrateFoundryAI')) err('assemble', 'must call orchestrateFoundryAI');
  if (!src.includes('reviewsFromArtifacts')) err('assemble', 'must wire review-engine');
}

const api = join(ROOT, 'apps/platform/app/api/ai/orchestrate/route.ts');
if (existsSync(api)) {
  const src = readFileSync(api, 'utf8');
  if (!src.includes('validateOrchestrationEngine')) err('api', 'GET must expose validation');
}

console.log(JSON.stringify({ ok: errors.length === 0, errors, stats }, null, 2));
process.exit(errors.length === 0 ? 0 : 1);
