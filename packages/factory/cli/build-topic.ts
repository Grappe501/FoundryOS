import fs from 'fs';
import path from 'path';
import { assembleEntity, buildStorePlan } from '../src';

function parseArgs() {
  const args = process.argv.slice(2);
  const fileIdx = args.indexOf('--file');
  if (fileIdx !== -1) {
    const file = args[fileIdx + 1];
    return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
  }

  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : null;
  };

  const topic = get('--topic');
  const slug = get('--slug') || (topic ? topic.toLowerCase().replace(/\s+/g, '-') : null);
  const entity_type = get('--type') || 'spirit';
  const vertical_domain = get('--domain') || 'bourbon.foundryos.com';

  if (!topic || !slug) {
    console.error('Usage: npm run build:topic -- --topic "Buffalo Trace" --slug buffalo-trace --type spirit');
    process.exit(1);
  }

  return { topic, slug, entity_type, vertical_domain };
}

async function main() {
  const input = parseArgs();

  console.log('\nFoundry Factory — Self-Assembly Engine v1\n');
  console.log('Input:', JSON.stringify(input, null, 2));

  const output = await assembleEntity(input);
  const plan = buildStorePlan(output);

  const root = process.cwd();
  const outDir = path.join(root, '.cache', 'factory');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${input.slug}.json`);
  fs.writeFileSync(outFile, JSON.stringify({ output, plan }, null, 2));

  console.log('\n── Generated ──────────────────────────────');
  console.log(`  Entity:        ${output.entity.display_name}`);
  console.log(`  Content pages: ${output.content_pages.length}`);
  console.log(`  Encyclopedia:  ${output.encyclopedia.sections.length} sections`);
  console.log(`  Recipes:       ${output.recipes.items.length}`);
  console.log(`  Relationships: ${output.relationships.length}`);
  console.log(`  Care reason:   ${output.expert.care_reason.slice(0, 60)}...`);
  console.log(`  Expert paths:  ${output.expert.beginner_path.slug}, ${output.expert.expert_path.slug}`);
  console.log(`  Journeys:      ${output.expert.beginner_journey.year_span}, ${output.expert.expert_journey.year_span}`);
  console.log(`  Expert assets: academy, ${output.expert.comparisons.length} comparisons, ${output.expert.community_challenges.length} challenges`);
  console.log(`  Score:         ${output.overall_score}/100`);
  console.log(`  Publish:       ${output.publish_decision}`);
  console.log(`  Output:        ${outFile}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
