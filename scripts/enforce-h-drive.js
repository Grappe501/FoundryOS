#!/usr/bin/env node
/**
 * HARD GATE — FoundryOS refuses to run from C: or any path outside H:\FoundryOS
 * Skipped in CI (Netlify, GitHub Actions) — H: enforcement is local Windows only.
 */
const path = require('path');
const fs = require('fs');

function isCiBuild() {
  return Boolean(
    process.env.CI ||
    process.env.NETLIFY ||
    process.env.NETLIFY_DEV ||
    process.env.GITHUB_ACTIONS
  );
}

if (isCiBuild()) {
  process.exit(0);
}

const REQUIRED_ROOT = 'H:\\FoundryOS';
const cwd = process.cwd();
const normalized = path.resolve(cwd);
const required = path.resolve(REQUIRED_ROOT);

if (!normalized.toUpperCase().startsWith('H:\\')) {
  console.error('');
  console.error('FATAL: FoundryOS only runs on H: drive.');
  console.error(`  Current:  ${normalized}`);
  console.error(`  Required: ${required}`);
  console.error('');
  console.error('  cd H:\\FoundryOS');
  console.error('  .\\scripts\\setup-h-drive.ps1');
  console.error('');
  process.exit(1);
}

if (normalized.toUpperCase() !== required.toUpperCase()) {
  console.error('');
  console.error('FATAL: Working directory must be H:\\FoundryOS (repo root).');
  console.error(`  Current: ${normalized}`);
  console.error('');
  process.exit(1);
}

// Ensure cache dirs exist on H:
const cacheDirs = [
  '.cache/npm',
  '.cache/npm-store',
  '.cache/temp',
  '.cache/build',
  '.cache/turbo',
  '.cache/supabase',
  '.cache/netlify',
  '.cache/cursor-mirror',
];

for (const dir of cacheDirs) {
  const full = path.join(required, dir);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
}

// Block accidental C: temp/cache usage
const hTemp = path.join(required, '.cache', 'temp');
const badEnv = [];
if (process.env.TMP && !path.resolve(process.env.TMP).toUpperCase().startsWith('H:\\')) {
  badEnv.push(`TMP=${process.env.TMP}`);
}
if (process.env.TEMP && !path.resolve(process.env.TEMP).toUpperCase().startsWith('H:\\')) {
  badEnv.push(`TEMP=${process.env.TEMP}`);
}
if (process.env.npm_config_cache && !path.resolve(process.env.npm_config_cache).toUpperCase().startsWith('H:\\')) {
  badEnv.push(`npm_config_cache=${process.env.npm_config_cache}`);
}
if (process.env.TURBO_CACHE_DIR && !path.resolve(process.env.TURBO_CACHE_DIR).toUpperCase().startsWith('H:\\')) {
  badEnv.push(`TURBO_CACHE_DIR=${process.env.TURBO_CACHE_DIR}`);
}
if (process.env.NEXT_CACHE_DIR && !path.resolve(process.env.NEXT_CACHE_DIR).toUpperCase().startsWith('H:\\')) {
  badEnv.push(`NEXT_CACHE_DIR=${process.env.NEXT_CACHE_DIR}`);
}

if (badEnv.length > 0) {
  console.error('');
  console.error('FATAL: Environment points to C: drive. Run setup-h-drive.ps1 first.');
  badEnv.forEach((e) => console.error(`  ${e}`));
  console.error(`  Required TMP/TEMP: ${hTemp}`);
  console.error('');
  process.exit(1);
}

// Redirect process temp to H: for this Node session
process.env.TMP = hTemp;
process.env.TEMP = hTemp;
process.env.TMPDIR = hTemp;
