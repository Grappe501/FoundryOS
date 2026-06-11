#!/usr/bin/env node
/**
 * Sequential workspace typecheck — reliable on Windows (turbo child capture can fail).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { loadFoundryEnv } = require('./lib/load-env');

const ROOT = loadFoundryEnv();

function workspaceDirs() {
  const dirs = [];
  for (const scope of ['apps', 'packages']) {
    const base = path.join(ROOT, scope);
    if (!fs.existsSync(base)) continue;
    for (const name of fs.readdirSync(base)) {
      const dir = path.join(base, name);
      const pkgPath = path.join(dir, 'package.json');
      if (!fs.existsSync(pkgPath)) continue;
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg.scripts?.typecheck) dirs.push({ dir, name: pkg.name ?? name });
    }
  }
  return dirs.sort((a, b) => a.name.localeCompare(b.name));
}

let failed = 0;

for (const { dir, name } of workspaceDirs()) {
  process.stdout.write(`\n── ${name} ` + '─'.repeat(Math.max(0, 50 - name.length)));
  try {
    execSync('npm run typecheck', {
      cwd: dir,
      stdio: 'inherit',
      env: process.env,
    });
    console.log('\n  ✓ OK');
  } catch {
    failed++;
    console.log('\n  ✗ FAIL');
  }
}

console.log('');
if (failed > 0) {
  console.error(`TYPECHECK FAILED — ${failed} workspace(s).\n`);
  process.exit(1);
}
console.log('TYPECHECK PASSED — all workspaces.\n');
