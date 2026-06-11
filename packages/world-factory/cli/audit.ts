#!/usr/bin/env npx tsx
import { auditAllWorlds } from '../src/index.js';

const results = auditAllWorlds();
const avg = Math.round(results.reduce((s, r) => s + r.automationPct, 0) / results.length);

console.log('\nFoundry Domain Factory Audit (PASS-020A)\n');
console.log(`Average automation: ${avg}% · Target: 80% via npm run build:world (PASS-024)\n`);

console.log('| World | Trinity | Automation | Status |');
console.log('|-------|---------|------------|--------|');
for (const r of results) {
  const status = r.automationPct >= 80 ? 'READY' : r.automationPct >= 50 ? 'PARTIAL' : 'FOUNDATION';
  console.log(`| ${r.displayName} | ${r.trinity} | ${r.automationPct}% | ${status} |`);
}

console.log('\nExisting factory commands:');
console.log('  npm run build:topic   — entity + encyclopedia (not full world)');
console.log('  npm run launch:domain — marketing + blueprint scaffold');
console.log('  npm run build:world   — PASS-024: full consumer world (~100 files per domain)\n');

process.exit(avg >= 80 ? 0 : 2);
