import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runVisitorWalks } from './visitor-walk';

const runs = Number(process.env.WALKS ?? 100_000);
const seed = Number(process.env.WALK_SEED ?? 20260902);
const summary = runVisitorWalks(runs, seed);

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../../../../../docs/talent-foundry/software-company/research/workshop-100k-visitor-study.json',
);
writeFileSync(out, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
console.log(out);
