#!/usr/bin/env npx tsx
/** PASS-040B1: Bourbon Intelligence Inventory audit — npm run audit:bourbon-intelligence */
import {
  getBourbonIntelligenceInventory,
  inventoryStats,
  validateBourbonIntelligence,
  LEGAL_STANDARDS,
} from '../packages/bourbon-intelligence/src';

const inv = getBourbonIntelligenceInventory();
const stats = inventoryStats();
const validation = validateBourbonIntelligence();

console.log('PASS-040B1 Bourbon Intelligence Inventory Audit');
console.log('─'.repeat(48));
console.log(`Version: ${inv.version}`);
console.log(`Legal standards: ${LEGAL_STANDARDS.length}`);
console.log(`Producers: ${stats.producers}`);
console.log(`Bottles: ${stats.bottles}`);
console.log(`People: ${stats.people} (${stats.people_publishable} publishable)`);
console.log(`Mash bills: ${stats.mash_bills}`);
console.log(`Terroir records: ${stats.terroir_records}`);
console.log(`Leader slots: ${stats.leader_slots} (${stats.leader_slots_verified} verified)`);
console.log(`Graph edges: ${stats.relationships}`);
console.log(`Unknown mash % fields: ${stats.unknown_mash_pct_fields} (expected — honesty layer)`);

if (validation.warnings.length) {
  console.log('\nWarnings:');
  for (const w of validation.warnings) console.log(`  · ${w}`);
}

if (!validation.ok) {
  console.error('\nFAIL');
  for (const e of validation.errors) console.error(`  · ${e}`);
  process.exit(1);
}

console.log('\nPASS — source-attributed bourbon inventory ready');
