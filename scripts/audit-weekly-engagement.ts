#!/usr/bin/env npx tsx
import { validateWeeklyEngagementEngine } from '../packages/weekly-engagement-engine/src';

const result = validateWeeklyEngagementEngine();
console.log('Weekly Engagement Engine Audit');
console.log('─'.repeat(40));
if (!result.ok) {
  for (const e of result.errors) console.error(`  · ${e}`);
  process.exit(1);
}
console.log('PASS — schedule variance + message factory');
