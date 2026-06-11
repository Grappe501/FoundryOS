#!/usr/bin/env node
/**
 * Netlify sandbox — run EVERY pass before commit/push
 * Simulates what Netlify will do; fail fast on deploy blockers.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadFoundryEnv } = require('./lib/load-env');

const ROOT = loadFoundryEnv();
let failed = 0;

function step(name, fn) {
  process.stdout.write(`\n── ${name} ` + '─'.repeat(Math.max(0, 44 - name.length)));
  try {
    fn();
    console.log('\n  ✓ OK');
  } catch (e) {
    failed++;
    console.log(`\n  ✗ FAIL: ${e.message || e}`);
    if (e.stdout) console.log(e.stdout.toString());
    if (e.stderr) console.log(e.stderr.toString());
  }
}

function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: 'pipe', env: process.env });
}

console.log('\nFoundryOS — Netlify Sandbox\n');

step('H: drive gate', () => {
  require('./enforce-h-drive.js');
});

step('netlify.toml valid', () => {
  const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
  if (!toml.includes('build:platform')) {
    throw new Error('netlify.toml must use npm run build:platform from repo root');
  }
  if (!toml.includes('--include=dev')) {
    throw new Error('netlify.toml must use npm ci --include=dev (TypeScript/next.config.ts)');
  }
  const edgeMatch = toml.match(/\[\[edge_functions\]\]/);
  if (edgeMatch) {
    throw new Error('Remove edge_functions from netlify.toml until functions exist');
  }
});

step('platform next.config', () => {
  const cfg = path.join(ROOT, 'apps/platform/next.config.ts');
  if (!fs.existsSync(cfg)) {
    throw new Error('apps/platform/next.config.ts missing — workspace packages need transpilePackages');
  }
});

step('npm run typecheck', () => {
  run('npm run typecheck');
});

step('npm run build:platform (Netlify build)', () => {
  run('npm run build:platform');
});

step('build output exists', () => {
  const nextDir = path.join(ROOT, 'apps/platform/.next');
  if (!fs.existsSync(nextDir)) {
    throw new Error('apps/platform/.next not created');
  }
});

step('no .env.local in git', () => {
  const status = execSync('git status --porcelain .env.local', { cwd: ROOT, encoding: 'utf8' });
  if (status.trim()) {
    throw new Error('.env.local has git changes — never commit secrets');
  }
});

console.log('');
if (failed > 0) {
  console.log(`SANDBOX FAILED — ${failed} blocker(s). Fix before commit/push.\n`);
  process.exit(1);
}
console.log('SANDBOX PASSED — safe to commit, push, and deploy to Netlify.\n');
