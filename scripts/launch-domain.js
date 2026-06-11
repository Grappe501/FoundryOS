#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const { loadFoundryEnv } = require('./lib/load-env');

loadFoundryEnv();
const root = process.cwd();
const cli = path.join(root, 'packages/launch-factory/cli/launch.ts');
const args = process.argv.slice(2).map((a) => `"${a.replace(/"/g, '\\"')}"`).join(' ');

try {
  execSync(`npx tsx "${cli}" ${args}`, { cwd: root, stdio: 'inherit', env: process.env });
} catch {
  process.exit(1);
}
