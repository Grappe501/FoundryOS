#!/usr/bin/env node
/**
 * PASS PRECHECK — run before every pass
 * Usage: npm run preflight
 */
const fs = require('fs');
const path = require('path');
const { loadFoundryEnv } = require('./lib/load-env');

const ROOT = loadFoundryEnv();
const REQUIRED_ROOT = 'H:\\FoundryOS';
const MIN_H_FREE_GB = 2;

const checks = [];
let failed = 0;

function pass(name, detail) {
  checks.push({ name, ok: true, detail });
  console.log(`  ✓ ${name}: ${detail}`);
}

function fail(name, detail) {
  checks.push({ name, ok: false, detail });
  failed++;
  console.log(`  ✗ ${name}: ${detail}`);
}

function warn(name, detail) {
  checks.push({ name, ok: true, detail, warn: true });
  console.log(`  ⚠ ${name}: ${detail}`);
}

function checkLocation() {
  const cwd = path.resolve(process.cwd());
  if (!cwd.toUpperCase().startsWith('H:\\')) {
    fail('Location', `Must run from H: drive (current: ${cwd})`);
    return;
  }
  if (cwd.toUpperCase() !== path.resolve(REQUIRED_ROOT).toUpperCase()) {
    fail('Location', `Must be repo root ${REQUIRED_ROOT} (current: ${cwd})`);
    return;
  }
  pass('Location', REQUIRED_ROOT);
}

function checkDisk() {
  try {
    const drive = 'H';
    if (process.platform === 'win32') {
      const { execSync } = require('child_process');
      const out = execSync(
        `powershell -NoProfile -Command "(Get-PSDrive -Name ${drive}).Free"`,
        { encoding: 'utf8' }
      ).trim();
      const freeBytes = parseInt(out, 10);
      const freeGb = freeBytes / 1024 ** 3;
      if (freeGb < MIN_H_FREE_GB) {
        fail('Disk', `H: free ${freeGb.toFixed(1)} GB (need ${MIN_H_FREE_GB} GB)`);
      } else {
        pass('Disk', `H: ${freeGb.toFixed(1)} GB free`);
      }
    } else {
      warn('Disk', 'Skipped (non-Windows)');
    }
  } catch {
    warn('Disk', 'Could not read H: free space');
  }
}

function checkEnv() {
  const envLocal = path.join(ROOT, '.env.local');
  if (fs.existsSync(envLocal)) {
    pass('Environment', '.env.local exists');
  } else {
    warn('Environment', '.env.local missing — Supabase/Netlify checks will be limited');
  }
}

function checkGit() {
  try {
    const { execSync } = require('child_process');
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
    const status = execSync('git status --porcelain', { cwd: ROOT, encoding: 'utf8' }).trim();

    if (branch !== 'main') {
      warn('Git', `On branch "${branch}" (expected main)`);
    } else {
      pass('Git', 'On main');
    }

    if (status) {
      const lines = status.split('\n').length;
      warn('Git', `${lines} uncommitted change(s)`);
    } else {
      pass('Git', 'Clean working tree');
    }
  } catch (e) {
    fail('Git', e.message);
  }
}

async function checkDatabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const placeholders = ['your-project', 'your-anon-key'];

  if (!url || !key || placeholders.some((p) => url.includes(p) || key.includes(p))) {
    warn('Database', 'Supabase not configured — skip connectivity');
    return;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const client = createClient(url, key, { auth: { persistSession: false } });
    const start = Date.now();
    const { error } = await client.from('platform_metrics').select('metric_key').limit(1);
    if (error) {
      fail('Database', error.message);
    } else {
      pass('Database', `Connected (${Date.now() - start}ms)`);
    }
  } catch (e) {
    fail('Database', e.message);
  }
}

function checkNetlify() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_PLATFORM_NAME',
    'NEXT_PUBLIC_APP_URL',
  ];

  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    warn('Netlify', `Missing env: ${missing.join(', ')}`);
  } else {
    pass('Netlify', 'Required public env vars present');
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    warn('Netlify', 'SUPABASE_SERVICE_ROLE_KEY not set (server diagnostics only)');
  }
}

function checkProjectStorage() {
  const onH = [
    'node_modules',
    '.cache',
    'package.json',
  ].every((p) => {
    const full = path.join(ROOT, p);
    return fs.existsSync(full) || p === 'node_modules';
  });

  if (onH) {
    pass('Project Storage', 'Repo artifacts on H:\\FoundryOS');
  } else {
    fail('Project Storage', 'Expected project files on H:');
  }
}

async function main() {
  console.log('\nFoundryOS — PASS PRECHECK\n');

  checkLocation();
  checkDisk();
  checkProjectStorage();
  checkEnv();
  checkGit();
  await checkDatabase();
  checkNetlify();

  console.log('');
  if (failed > 0) {
    console.log(`PRECHECK FAILED — ${failed} blocking issue(s)\n`);
    process.exit(1);
  }
  console.log('PRECHECK PASSED\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
