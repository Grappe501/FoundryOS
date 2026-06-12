#!/usr/bin/env npx tsx
/**
 * PASS-034L: World Events audit
 * Usage: npm run audit:events
 */
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import {
  LIVE_EVENT_WORLDS,
  WORLD_EVENT_TYPES,
  validateEventPools,
  getActiveWorldEvents,
} from '../packages/world-events-engine/src';

const ROOT = join(__dirname, '..');
const findings: { severity: 'error' | 'warn'; page: string; message: string }[] = [];

function err(page: string, message: string) {
  findings.push({ severity: 'error', page, message });
}

const validation = validateEventPools();
if (!validation.ok) {
  for (const e of validation.errors) err('pools', e);
}

for (const world of LIVE_EVENT_WORLDS) {
  const snap = getActiveWorldEvents(world);
  if (!snap) {
    err(world, 'getActiveWorldEvents returned null');
    continue;
  }
  for (const type of WORLD_EVENT_TYPES) {
    if (!snap.events.some((e) => e.event_type === type)) {
      err(world, `missing active ${type} in today's snapshot`);
    }
  }
}

for (const world of LIVE_EVENT_WORLDS) {
  const page = join(ROOT, 'apps/platform/app', world, 'today', 'page.tsx');
  if (!existsSync(page)) {
    err(`/${world}/today`, 'route missing');
    continue;
  }
  const src = readFileSync(page, 'utf8');
  if (!src.includes('WorldEventsToday')) {
    err(`/${world}/today`, 'must use WorldEventsToday');
  }
}

const operatorPage = join(ROOT, 'apps/platform/app/operator/events/page.tsx');
if (!existsSync(operatorPage)) err('/operator/events', 'route missing');

const clientState = join(ROOT, 'apps/platform/lib/world-events/client-state.ts');
if (!existsSync(clientState)) err('client-state', 'missing lib/world-events/client-state.ts');
else {
  const src = readFileSync(clientState, 'utf8');
  for (const fn of ['recordEventVote', 'recordEventComplete', 'recordEventSave', 'recordDebateChoice']) {
    if (!src.includes(fn)) err('client-state', `missing ${fn}`);
  }
}

const collectorRules = readFileSync(join(ROOT, 'packages/collector-engine/src/registry.ts'), 'utf8');
if (!collectorRules.includes('event_challenge_completed')) {
  err('collector', 'missing event_challenge_completed earn rules');
}

const clientSrc = existsSync(clientState) ? readFileSync(clientState, 'utf8') : '';
if (!clientSrc.includes('applyConsequences')) {
  err('client-state', 'event interactions must emit consequences');
}

console.log('\n=== PASS-034L World Events Audit ===\n');
console.log(`Worlds: ${LIVE_EVENT_WORLDS.length}`);
console.log(`Pool validation: ${validation.ok ? 'OK' : 'FAIL'}`);

const errors = findings.filter((f) => f.severity === 'error');
if (errors.length) {
  console.log('\nErrors:');
  for (const f of errors) console.log(`  [${f.page}] ${f.message}`);
  console.log(`\n✗ audit:events FAILED (${errors.length})\n`);
  process.exit(2);
}

console.log('\n✓ audit:events PASSED\n');
