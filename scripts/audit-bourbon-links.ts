#!/usr/bin/env npx tsx
/**
 * Bourbon Level 1 link audit — progression chains, graph hallways, people registry.
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { validateGraphEngine } from '../packages/atlas-graph-engine/src';
import { BOURBON_BOTTLES } from '../apps/platform/lib/bourbon-level-1/bottles';
import { PROGRESSION_CHAINS } from '../apps/platform/lib/bourbon-level-1/intelligence/progression-chains';
import { listAtlasEntries } from '../apps/platform/lib/bourbon-atlas/registry';
import {
  inferGraphRef,
  resolveBourbonGraph,
  listAllBottleGraphs,
} from '../apps/platform/lib/bourbon-graph';
import { listAllPeopleSlugs, mastersForProducer } from '../apps/platform/lib/bourbon-people/unified';
import { BOURBON_PRODUCERS } from '../apps/platform/lib/world-depth/bourbon-producers';

const ROOT = join(__dirname, '..');
const errors: { check: string; message: string }[] = [];
const passes: string[] = [];

function fail(check: string, message: string) {
  errors.push({ check, message });
}

function pass(check: string) {
  passes.push(check);
}

const bottleSlugs = new Set(BOURBON_BOTTLES.map((b) => b.slug));
const atlasSlugs = new Set(listAtlasEntries().map((e) => e.slug));
const producerSlugs = new Set(BOURBON_PRODUCERS.map((p) => p.slug));
const debateSlugs = new Set(['best-value-bourbon', 'bib-still-matters', 'bib-vs-single-barrel', 'high-proof-entry']);

function resolveInternalHref(href: string): boolean {
  if (!href.startsWith('/bourbon/')) return true;
  const parts = href.replace(/^\//, '').split('/').filter(Boolean);
  if (parts[0] !== 'bourbon') return true;

  const segment = parts[1];
  const slug = parts[2];

  if (segment === 'bottles' && slug) return bottleSlugs.has(slug);
  if (segment === 'producers' && slug) return producerSlugs.has(slug);
  if (segment === 'atlas' && slug) return atlasSlugs.has(slug);
  if (segment === 'graph' && slug) return inferGraphRef(slug) !== null;
  if (segment === 'people' && slug) return listAllPeopleSlugs().includes(slug);
  if (segment === 'detective' && slug) return true;
  if (segment === 'store-picks' || segment === 'economy' || segment === 'lab' || segment === 'map' || segment === 'whiskey-map') return true;
  if (segment === 'experiences') return true;
  if (segment === 'compare' || segment === 'academy' || segment === 'trail-planner') return true;
  if (segment === 'x-ray') return true;

  return false;
}

for (const chain of PROGRESSION_CHAINS) {
  for (const step of chain.steps) {
    if (step.slug && !bottleSlugs.has(step.slug)) {
      fail('progression', `${chain.id}: unknown bottle slug "${step.slug}"`);
    }
    if (step.href && !resolveInternalHref(step.href)) {
      fail('progression', `${chain.id} step "${step.name}": dead href ${step.href}`);
    }
  }
}
if (!errors.some((e) => e.check === 'progression')) pass('progression chains hrefs');

const engine = validateGraphEngine();
if (!engine.ok) {
  for (const e of engine.errors) fail('atlas-engine', e);
} else pass('priority atlas seeds (15+ edges)');

const priorityTerms = ['bottled-in-bond', 'mash-bill', 'proof'];
for (const term of priorityTerms) {
  const ref = inferGraphRef(term);
  const graph = ref ? resolveBourbonGraph(ref) : null;
  if (!graph || graph.connection_count < 15) {
    fail('atlas-graph', `${term} resolved graph needs 15+ connections (got ${graph?.connection_count ?? 0})`);
  }
}
if (!errors.some((e) => e.check === 'atlas-graph')) pass('atlas term graph resolution');

for (const graph of listAllBottleGraphs()) {
  for (const c of graph.connections) {
    if (c.href && c.href.startsWith('/bourbon/bottles/')) {
      const bSlug = c.href.split('/').pop()!;
      if (!bottleSlugs.has(bSlug)) {
        fail('graph-edge', `${graph.slug} → unknown bottle ${bSlug}`);
      }
    }
  }
}
if (!errors.some((e) => e.check === 'graph-edge')) pass('bottle graph edge targets');

for (const p of BOURBON_PRODUCERS.slice(0, 8)) {
  const masters = mastersForProducer(p.slug);
  for (const m of masters) {
    if (!listAllPeopleSlugs().includes(m.slug)) {
      fail('people', `master ${m.slug} for ${p.slug} not in unified registry`);
    }
  }
}
if (!errors.some((e) => e.check === 'people')) pass('unified people registry');

const audit = {
  pass: 'bourbon-links',
  timestamp: new Date().toISOString(),
  ok: errors.length === 0,
  passes,
  errors,
};

mkdirSync(join(ROOT, 'data/audits'), { recursive: true });
writeFileSync(join(ROOT, 'data/audits/bourbon-links-audit.json'), JSON.stringify(audit, null, 2));

console.log('Bourbon Links Audit');
console.log('─'.repeat(48));
for (const p of passes) console.log(`  ✓ ${p}`);
if (errors.length) {
  console.error('\nFAIL');
  for (const e of errors) console.error(`  · [${e.check}] ${e.message}`);
  process.exit(1);
}
console.log('\nPASS — bourbon links verified');
