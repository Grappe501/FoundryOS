import fs from 'fs';
import path from 'path';

export function repoRoot(): string {
  return path.resolve(import.meta.dirname, '../../..');
}

export function marketingRoot(): string {
  return path.join(repoRoot(), 'marketing');
}

export function worldMarketingDir(slug: string): string {
  return path.join(marketingRoot(), 'worlds', slug);
}

export function channelsRoot(): string {
  return path.join(marketingRoot(), 'channels');
}

export function milestonesPath(): string {
  return path.join(marketingRoot(), 'milestones', 'revenue-milestones.json');
}

export function writeFileTracked(filePath: string, content: string, written: string[], skipped: string[]): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath)) {
    skipped.push(path.relative(repoRoot(), filePath));
    return;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  written.push(path.relative(repoRoot(), filePath));
}

export function writeFileForce(filePath: string, content: string, written: string[]): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  written.push(path.relative(repoRoot(), filePath));
}
