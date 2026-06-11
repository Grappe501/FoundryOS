import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function getRepoRoot(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, '../../..');
}

export function platformRoot(root = getRepoRoot()): string {
  return path.join(root, 'apps/platform');
}

export function marketingRoot(root = getRepoRoot()): string {
  return path.join(root, 'marketing');
}

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function writeFileIfChanged(filePath: string, content: string): boolean {
  ensureDir(path.dirname(filePath));
  const normalized = content.replace(/\r\n/g, '\n');
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
    if (existing === normalized) return false;
  }
  fs.writeFileSync(filePath, normalized, 'utf8');
  return true;
}
