#!/usr/bin/env npx tsx
/**
 * PASS-034D: Bourbon copy-depth audit
 * Usage: npm run audit:copy-depth
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { ALL_BOURBON_PAGE_DEPTH, BOURBON_TOOL_DEPTH, wordCount } from '../apps/platform/lib/bourbon-level-1/deep-copy';
import { LEVEL_1_TOOLS } from '../apps/platform/lib/bourbon-level-1/hub';

const ROOT = join(__dirname, '..');
const MIN_SECTION_WORDS = 100;
const MIN_OPENING_WORDS = 150;
const MIN_TOOL_PARAGRAPH_WORDS = 40;

type Finding = { severity: 'error' | 'warn'; page: string; message: string };

const findings: Finding[] = [];

function err(page: string, message: string) {
  findings.push({ severity: 'error', page, message });
}

function warn(page: string, message: string) {
  findings.push({ severity: 'warn', page, message });
}

// ─── Page depth registry ─────────────────────────────────────
for (const page of ALL_BOURBON_PAGE_DEPTH) {
  const id = page.id;

  if (wordCount(page.openingNarrative) < MIN_OPENING_WORDS) {
    err(id, `opening narrative ${wordCount(page.openingNarrative)} words (min ${MIN_OPENING_WORDS})`);
  }

  const sections: [string, string][] = [
    ['whyItMatters', page.whyItMatters],
    ['beginnerMisunderstanding', page.beginnerMisunderstanding],
    ['realWorldExample', page.realWorldExample],
    ['howToUse', page.howToUse],
    ['whatToNoticeNext', page.whatToNoticeNext],
  ];

  for (const [name, text] of sections) {
    if (!text?.trim()) err(id, `missing ${name}`);
    else if (wordCount(text) < MIN_SECTION_WORDS) err(id, `${name} ${wordCount(text)} words (min ${MIN_SECTION_WORDS})`);
  }

  if (!page.rabbitHoles?.length) err(id, 'missing rabbit-hole links');
}

// ─── Tool cards ──────────────────────────────────────────────
const toolBySlug = new Map(BOURBON_TOOL_DEPTH.map((t) => [t.slug, t]));

for (const tool of LEVEL_1_TOOLS) {
  const depth = toolBySlug.get(tool.slug);
  if (!depth) {
    err(`tool:${tool.slug}`, 'missing tool depth entry in deep-copy registry');
    continue;
  }
  if (!depth.hook?.trim()) err(`tool:${tool.slug}`, 'missing hook');
  if (wordCount(depth.explanation) < MIN_TOOL_PARAGRAPH_WORDS) {
    err(`tool:${tool.slug}`, `explanation ${wordCount(depth.explanation)} words (min ${MIN_TOOL_PARAGRAPH_WORDS})`);
  }
  if (!depth.practicalReason?.trim()) err(`tool:${tool.slug}`, 'missing practicalReason');
  if (depth.explanation.trim().split(/[.!?]/).filter(Boolean).length < 2) {
    warn(`tool:${tool.slug}`, 'explanation may be one-liner — needs full paragraph');
  }
}

// ─── Page wiring — must import BourbonDeepPageShell or BourbonWorldDepthIntro ─
const MAJOR_ROUTES = ALL_BOURBON_PAGE_DEPTH.filter((p) => p.id !== 'bourbon').map((p) => p.path);

for (const route of MAJOR_ROUTES) {
  const rel = route.replace(/^\/bourbon\/?/, 'bourbon/') || 'bourbon';
  const candidates = [
    join(ROOT, 'apps/platform/app', rel, 'page.tsx'),
    join(ROOT, 'apps/platform/app', `${rel}.tsx`),
  ];
  const pageFile = candidates.find((p) => existsSync(p));
  if (!pageFile) {
    warn(route, 'no page.tsx found — verify route exists');
    continue;
  }
  const src = readFileSync(pageFile, 'utf8');
  if (!src.includes('BourbonDeepPageShell') && !src.includes('getBourbonPageDepth')) {
    err(route, 'page not wired to BourbonDeepPageShell / getBourbonPageDepth');
  }
}

// bourbon home
const bourbonHome = join(ROOT, 'apps/platform/app/bourbon/page.tsx');
if (existsSync(bourbonHome)) {
  const src = readFileSync(bourbonHome, 'utf8');
  if (!src.includes('BourbonWorldDepthIntro')) {
    err('/bourbon', 'world home missing BourbonWorldDepthIntro');
  }
}

// ─── Report ──────────────────────────────────────────────────
console.log('\nBourbon Copy-Depth Audit (PASS-034D)\n');
console.log(`Pages in registry: ${ALL_BOURBON_PAGE_DEPTH.length}`);
console.log(`Tools in registry: ${BOURBON_TOOL_DEPTH.length} / ${LEVEL_1_TOOLS.length}`);
console.log(`Findings: ${findings.length} (${findings.filter((f) => f.severity === 'error').length} errors, ${findings.filter((f) => f.severity === 'warn').length} warnings)\n`);

if (findings.length > 0) {
  for (const f of findings) {
    const icon = f.severity === 'error' ? '✗' : '⚠';
    console.log(`${icon} [${f.page}] ${f.message}`);
  }
  console.log('');
}

const errors = findings.filter((f) => f.severity === 'error').length;
if (errors === 0) {
  console.log('COPY-DEPTH PASSED — Bourbon pages meet narrative minimums.\n');
  process.exit(0);
} else {
  console.log(`COPY-DEPTH FAILED — ${errors} error(s) to fix.\n`);
  process.exit(2);
}
