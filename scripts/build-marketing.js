#!/usr/bin/env node
/** Wrapper — run from repo root: npm run build:marketing -- ai-builder */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

const result = spawnSync(
  'npx',
  ['tsx', path.join(root, 'packages/marketing-factory/cli/build-marketing.ts'), ...args],
  { stdio: 'inherit', cwd: root, shell: true },
);

process.exit(result.status ?? 1);
