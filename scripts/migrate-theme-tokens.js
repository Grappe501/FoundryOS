#!/usr/bin/env node
/** One-shot: migrate hardcoded hex colors to CSS custom properties */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'apps', 'platform');

const REPLACEMENTS = [
  ['#08080A', 'var(--foundry-bg)'],
  ['#08080a', 'var(--foundry-bg)'],
  ['#0A0A0B', 'var(--foundry-bg-elevated)'],
  ['#0a0a0b', 'var(--foundry-bg-elevated)'],
  ['#0F0F12', 'var(--foundry-surface)'],
  ['#0f0f12', 'var(--foundry-surface)'],
  ['#111114', 'var(--foundry-surface-raised)'],
  ['#141416', 'var(--foundry-surface-raised)'],
  ['#E8E8EC', 'var(--foundry-text)'],
  ['#e8e8ec', 'var(--foundry-text)'],
  ['#F0F0F2', 'var(--foundry-text)'],
  ['#f0f0f2', 'var(--foundry-text)'],
  ['#8A8A8E', 'var(--foundry-text-muted)'],
  ['#8a8a8e', 'var(--foundry-text-muted)'],
  ['#6B6B70', 'var(--foundry-text-faint)'],
  ['#6b6b70', 'var(--foundry-text-faint)'],
  ['#4A4A4E', 'var(--foundry-text-dim)'],
  ['#4a4a4e', 'var(--foundry-text-dim)'],
  ['#1A1A1E', 'var(--foundry-border-subtle)'],
  ['#1a1a1e', 'var(--foundry-border-subtle)'],
  ['#1E1E22', 'var(--foundry-border-subtle)'],
  ['#1e1e22', 'var(--foundry-border-subtle)'],
  ['#2A2A2E', 'var(--foundry-border)'],
  ['#2a2a2e', 'var(--foundry-border)'],
  ['#2A2520', 'var(--foundry-border-warm)'],
  ['#2a2520', 'var(--foundry-border-warm)'],
  ['#6B9B6B', 'var(--foundry-success)'],
  ['#6b9b6b', 'var(--foundry-success)'],
  ['#2A4A2A', 'var(--foundry-success-bg)'],
  ['#2a4a2a', 'var(--foundry-success-bg)'],
  ['#1A2A1A', 'var(--foundry-success-bg-subtle)'],
  ['#1a2a1a', 'var(--foundry-success-bg-subtle)'],
  ['#1A160F', 'var(--foundry-primary-bg-subtle)'],
  ['#1a160f', 'var(--foundry-primary-bg-subtle)'],
  ['#4A4020', 'var(--foundry-primary-border-dim)'],
  ['#4a4020', 'var(--foundry-primary-border-dim)'],
  ['#3A2A20', 'var(--foundry-primary-border-dim)'],
  ['#3a2a20', 'var(--foundry-primary-border-dim)'],
];

function walk(dir, changed) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.next') continue;
      walk(full, changed);
    } else if (/\.(tsx?|css)$/.test(ent.name) && !ent.name.endsWith('.tsbuildinfo')) {
      let content = fs.readFileSync(full, 'utf8');
      let fileChanged = false;
      for (const [from, to] of REPLACEMENTS) {
        if (content.includes(from)) {
          content = content.split(from).join(to);
          fileChanged = true;
        }
      }
      if (fileChanged) {
        fs.writeFileSync(full, content, 'utf8');
        changed.push(full);
      }
    }
  }
}

const changed = [];
walk(ROOT, changed);
console.log(`migrate-theme-tokens: updated ${changed.length} files`);
