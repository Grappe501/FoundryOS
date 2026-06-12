#!/usr/bin/env npx tsx
/**
 * PASS-034U: Universe Command Center audit
 * Usage: npm run audit:universe
 */
import { getUniverseSnapshot } from '../apps/platform/lib/universe-registry';

const snap = getUniverseSnapshot();
const errors: string[] = [];

if (snap.knowledge.worlds < 7) errors.push(`Expected 7+ live worlds, got ${snap.knowledge.worlds}`);
if (snap.knowledge.atlas_entries < 100) errors.push(`Expected 100+ atlas entries, got ${snap.knowledge.atlas_entries}`);
if (snap.build_queue.length < 3) errors.push('Build queue should have 3+ computed items');
if (snap.knowledge_gravity.length < 5) errors.push('Knowledge gravity should list 5+ nodes');
if (snap.world_scores.length < 7) errors.push('World scores should cover 7 live worlds');
if (snap.knowledge.verified_profiles > 0) {
  errors.push('verified_profiles must be 0 until editorial pipeline exists');
}

console.log('PASS-034U Universe Audit');
console.log('─'.repeat(48));
console.log(`Worlds: ${snap.knowledge.worlds} · Atlas: ${snap.knowledge.atlas_entries} · Weak nodes: ${snap.graph_weak_nodes.length}`);
console.log(`Build queue: ${snap.build_queue.length} items · Gravity top: ${snap.knowledge_gravity[0]?.title ?? '—'}`);
console.log(`Highest ROI: ${snap.highest_roi_world?.target ?? '—'}`);

if (errors.length) {
  console.error('\nFAIL');
  for (const e of errors) console.error(`  · ${e}`);
  process.exit(1);
}

console.log('\nPASS — universe snapshot healthy');
