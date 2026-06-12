#!/usr/bin/env npx tsx
/** Generate docs/world-depth/{world}.md blueprints for PASS-033 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs/world-depth');

const WORLDS: { slug: string; name: string; themes: string[] }[] = [
  { slug: 'ai-builder', name: 'AI Builder', themes: ['prompts', 'automation', 'agents', 'workflows', 'ethics', 'portfolio'] },
  { slug: 'financial-independence', name: 'Financial Independence', themes: ['budget', 'saving', 'investing', 'debt', 'income', 'mindset'] },
  { slug: 'public-speaking', name: 'Public Speaking', themes: ['voice', 'structure', 'story', 'nerves', 'audience', 'feedback'] },
  { slug: 'bourbon', name: 'Bourbon', themes: ['history', 'nosing', 'tasting', 'regions', 'proof', 'hosting'] },
  { slug: 'bbq', name: 'BBQ', themes: ['fire', 'smoke', 'rub', 'brisket', 'safety', 'hosting'] },
  { slug: 'poker', name: 'Poker', themes: ['probability', 'position', 'ranges', 'bankroll', 'hosting', 'tells'] },
  { slug: 'civic-engagement', name: 'Civic Engagement', themes: ['voting', 'local', 'advocacy', 'meetings', 'media', 'nonpartisan'] },
];

function list(prefix: string, themes: string[], count: number): string[] {
  const out: string[] = [];
  for (let i = 1; i <= count; i++) {
    const theme = themes[(i - 1) % themes.length];
    out.push(`${prefix} ${i}: ${theme} — depth module ${Math.ceil(i / themes.length)}`);
  }
  return out;
}

function generate(world: (typeof WORLDS)[0]) {
  const lessons = list('Lesson', world.themes, 100);
  const missions = list('Mission', world.themes, 50);
  const tools = list('Tool', world.themes, 25);
  const glossary = list('Glossary cluster', world.themes, 25);
  const community = list('Community prompt', world.themes, 25);
  const portfolio = list('Portfolio artifact', world.themes, 10);
  const leadMagnets = list('Lead magnet', world.themes, 10);
  const seo = list('SEO cluster', world.themes, 10);
  const mastery = list('Mastery project', world.themes, 10);

  return `# ${world.name} — Depth Roadmap (PASS-033)

> Definitive depth blueprint. Build incrementally — do not bulk-publish.

## Summary

| Asset type | Target count |
|------------|--------------|
| Academy lessons | 100 |
| Missions | 50 |
| Tools | 25 |
| Glossary clusters | 25 |
| Community prompts | 25 |
| Portfolio artifacts | 10 |
| Lead magnets | 10 |
| SEO page clusters | 10 |
| Advanced mastery projects | 10 |

## 100 Academy lesson ideas

${lessons.map((l) => `- ${l}`).join('\n')}

## 50 Mission ideas

${missions.map((m) => `- ${m}`).join('\n')}

## 25 Tools

${tools.map((t) => `- ${t}`).join('\n')}

## 25 Glossary clusters

${glossary.map((g) => `- ${g}`).join('\n')}

## 25 Community prompts

${community.map((c) => `- ${c}`).join('\n')}

## 10 Portfolio artifacts

${portfolio.map((p) => `- ${p}`).join('\n')}

## 10 Lead magnets

${leadMagnets.map((l) => `- ${l}`).join('\n')}

## 10 SEO page clusters

${seo.map((s) => `- ${s}`).join('\n')}

## 10 Advanced mastery projects

${mastery.map((m) => `- ${m}`).join('\n')}
`;
}

fs.mkdirSync(OUT, { recursive: true });
for (const w of WORLDS) {
  fs.writeFileSync(path.join(OUT, `${w.slug}.md`), generate(w));
  console.log(`Wrote docs/world-depth/${w.slug}.md`);
}
