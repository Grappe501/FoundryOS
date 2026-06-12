#!/usr/bin/env npx tsx
/**
 * PASS-034E: Bourbon Atlas audit
 * Usage: npm run audit:atlas
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import {
  listAtlasEntries,
  atlasNarrativeWords,
  atlasStats,
} from '../apps/platform/lib/bourbon-atlas/registry';
import { ALL_BOURBON_PAGE_DEPTH } from '../apps/platform/lib/bourbon-level-1/deep-copy';
import { atlasMatchTerms } from '../apps/platform/lib/bourbon-atlas/registry';

const ROOT = join(__dirname, '..');
const MIN_TERMS = 100;
const MIN_NARRATIVE_WORDS = 250;
const MIN_FORWARD_LINKS = 3;

const PRIORITY_PAGES = [
  '/bourbon',
  '/bourbon/level-1',
  '/bourbon/lab',
  '/bourbon/detective',
  '/bourbon/producers',
  '/bourbon/beyond-the-bottle',
  '/bourbon/lore',
  '/bourbon/pour-guide',
  '/bourbon/economy',
  '/bourbon/shelf-builder',
  '/bourbon/watchtower',
  '/bourbon/chains',
  '/bourbon/stories',
  '/bourbon/myths',
  '/bourbon/investigate',
  '/bourbon/atlas',
];

type Finding = { severity: 'error' | 'warn'; page: string; message: string };
const findings: Finding[] = [];

function err(page: string, message: string) {
  findings.push({ severity: 'error', page, message });
}

function warn(page: string, message: string) {
  findings.push({ severity: 'warn', page, message });
}

// ─── Term count & quality ─────────────────────────────────────
const entries = listAtlasEntries();
const stats = atlasStats();

if (entries.length < MIN_TERMS) {
  err('registry', `${entries.length} terms (min ${MIN_TERMS})`);
}

for (const e of entries) {
  if (!e.shortDefinition?.trim()) err(e.slug, 'missing shortDefinition');
  if (!e.plainEnglish?.trim()) err(e.slug, 'missing plainEnglish');
  const words = atlasNarrativeWords(e);
  if (words < MIN_NARRATIVE_WORDS) {
    err(e.slug, `narrative ${words} words (min ${MIN_NARRATIVE_WORDS})`);
  }
  if (e.relatedTerms.length === 0) err(e.slug, 'missing relatedTerms');
  if (e.forwardLinks.length < MIN_FORWARD_LINKS) {
    err(e.slug, `${e.forwardLinks.length} forward links (min ${MIN_FORWARD_LINKS})`);
  }
}

// ─── Routes exist ─────────────────────────────────────────────
const atlasIndex = join(ROOT, 'apps/platform/app/bourbon/atlas/page.tsx');
const atlasTerm = join(ROOT, 'apps/platform/app/bourbon/atlas/[term]/page.tsx');
if (!existsSync(atlasIndex)) err('routes', 'missing /bourbon/atlas/page.tsx');
if (!existsSync(atlasTerm)) err('routes', 'missing /bourbon/atlas/[term]/page.tsx');

// ─── Components ───────────────────────────────────────────────
const atlasTermComponent = join(ROOT, 'apps/platform/components/bourbon/AtlasTerm.tsx');
const rabbitHoles = join(ROOT, 'apps/platform/lib/bourbon-atlas/rabbit-holes.ts');
if (!existsSync(atlasTermComponent)) err('components', 'missing AtlasTerm.tsx');
if (!existsSync(rabbitHoles)) err('graph', 'missing rabbit-holes.ts');

// ─── Major pages: Atlas integration via BourbonDeepPageShell ──
const shellPath = join(ROOT, 'apps/platform/components/bourbon/BourbonDeepPageShell.tsx');
const shellSrc = existsSync(shellPath) ? readFileSync(shellPath, 'utf8') : '';
if (!shellSrc.includes('BourbonAtlasParagraph') && !shellSrc.includes('AtlasRichText')) {
  err('integration', 'BourbonDeepPageShell must use AtlasRichText/BourbonAtlasParagraph');
}

for (const route of PRIORITY_PAGES) {
  const rel = route.replace(/^\/bourbon\/?/, 'bourbon/') || 'bourbon';
  const pageFile = join(ROOT, 'apps/platform/app', rel, 'page.tsx');
  if (!existsSync(pageFile)) {
    warn(route, 'page file not found for atlas integration check');
    continue;
  }
  const src = readFileSync(pageFile, 'utf8');
  const usesAtlas =
    src.includes('BourbonDeepPageShell') ||
    src.includes('AtlasTerm') ||
    src.includes('AtlasRichText') ||
    src.includes('BourbonAtlasParagraph');
  if (!usesAtlas) {
    err(route, 'major page missing Atlas integration (shell or AtlasTerm)');
  }
}

// ─── Sample unexplained terms check on deep copy ──────────────
const matchTerms = atlasMatchTerms();
const sampleTerms = ['rickhouse', 'mash-bill', 'proof', 'allocation', 'wheated-bourbon'];
for (const slug of sampleTerms) {
  if (!entries.find((e) => e.slug === slug)) err('priority', `missing priority term ${slug}`);
}

// ─── Report ───────────────────────────────────────────────────
console.log('\n=== PASS-034E Atlas Audit ===\n');
console.log(`Terms: ${entries.length} (min ${MIN_TERMS})`);
console.log(`Under ${MIN_NARRATIVE_WORDS} words: ${stats.under250}`);
console.log(`Missing related: ${stats.missingRelated}`);
console.log(`Missing forward links: ${stats.missingLinks}`);

const errors = findings.filter((f) => f.severity === 'error');
const warnings = findings.filter((f) => f.severity === 'warn');

if (errors.length) {
  console.log('\nErrors:');
  for (const f of errors) console.log(`  [${f.page}] ${f.message}`);
}
if (warnings.length) {
  console.log('\nWarnings:');
  for (const f of warnings) console.log(`  [${f.page}] ${f.message}`);
}

if (errors.length === 0) {
  console.log('\n✓ audit:atlas PASSED\n');
  process.exit(0);
} else {
  console.log(`\n✗ audit:atlas FAILED (${errors.length} errors)\n`);
  process.exit(2);
}
