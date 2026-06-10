#!/usr/bin/env node
/**
 * FoundryOS Self-Build CLI
 * Usage: npm run generate:app -- --manifest path/to/manifest.json
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const manifestIndex = args.indexOf('--manifest');

if (manifestIndex === -1 || !args[manifestIndex + 1]) {
  console.error('Usage: npm run generate:app -- --manifest <path-to-manifest.json>');
  process.exit(1);
}

const manifestPath = path.resolve(args[manifestIndex + 1]);

if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

console.log('');
console.log('╔══════════════════════════════════════════╗');
console.log('║     FoundryOS Self-Build Generator      ║');
console.log('╚══════════════════════════════════════════╝');
console.log('');
console.log(`  App:      ${manifest.displayName}`);
console.log(`  Slug:     ${manifest.slug}`);
console.log(`  Template: ${manifest.template}`);
console.log(`  Category: ${manifest.category}`);
console.log('');
console.log('  Status: Skeleton ready — full generation in Pass 4');
console.log('  See: packages/self-build/templates/catalog-app/');
console.log('');
