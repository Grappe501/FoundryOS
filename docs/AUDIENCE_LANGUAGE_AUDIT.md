# Audience Language Audit (PASS-033)

Generated: 2026-06-12T02:08:42.117Z

| Metric | Count |
|--------|-------|
| Files scanned | 842 |
| Total findings | 2686 |
| High severity | 1894 |
| Medium severity | 7 |
| Low severity | 785 |
| Student-safe context violations | 0 |

## Rules checked

- Adult substances (alcohol, tobacco, cannabis)
- Gambling-for-money framing
- Medical advice claims
- Investment guarantees
- Partisan persuasion
- Internal build language (PASS codes, team names)

## High severity (1894)

- `apps/platform/app/bourbon/academy/page.tsx:5` **adult_substance_alcohol** — redirect('/bourbon/level-1');
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:11` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:12` **adult_substance_alcohol** — return <WorldAcademyLesson bundle={bundle} basePath="/bourbon" lessonSlug={slug} />;
- `apps/platform/app/bourbon/beyond-the-bottle/page.tsx:2` **adult_substance_alcohol** — import { BeyondTheBottleHub } from '../../../components/bourbon/level-1/BeyondTheBottleHub';
- `apps/platform/app/bourbon/beyond-the-bottle/page.tsx:5` **adult_substance_alcohol** — title: 'Bourbon Beyond the Bottle | Foundry',
- `apps/platform/app/bourbon/beyond-the-bottle/page.tsx:6` **adult_substance_alcohol** — description: 'Origins, pop culture, connections — bourbon in the wild.',
- `apps/platform/app/bourbon/beyond-the-bottle/page.tsx:12` **adult_substance_alcohol** — <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
- `apps/platform/app/bourbon/bottles/page.tsx:2` **adult_substance_alcohol** — import { BottleProgressionHub } from '../../../components/bourbon/level-1/BottleProgressionHub';
- `apps/platform/app/bourbon/bottles/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Bottle Progression | Bourbon | Foundry', description: 'What each bottle teaches — who 
- `apps/platform/app/bourbon/bottles/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
- `apps/platform/app/bourbon/bottles/[slug]/page.tsx:1` **adult_substance_alcohol** — import { BottleProgressionView } from '../../../../components/bourbon/level-1/BottleProgressionHub';
- `apps/platform/app/bourbon/bottles/[slug]/page.tsx:2` **adult_substance_alcohol** — import { BOURBON_BOTTLES } from '../../../../lib/bourbon-level-1/bottles';
- `apps/platform/app/bourbon/campus/page.tsx:2` **adult_substance_alcohol** — import { DistilleryCampusMap } from '../../../components/bourbon/level-1/DistilleryCampusMap';
- `apps/platform/app/bourbon/campus/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Distillery Campus Maps | Bourbon | Foundry' };
- `apps/platform/app/bourbon/campus/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
- `apps/platform/app/bourbon/careers/page.tsx:1` **adult_substance_alcohol** — import { BOURBON_CAREERS } from '../../../lib/bourbon-world-meta';
- `apps/platform/app/bourbon/chains/page.tsx:2` **adult_substance_alcohol** — import { ProgressionChainsView } from '../../../components/bourbon/intelligence/ProgressionChainsView';
- `apps/platform/app/bourbon/chains/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Bottle Progression Chains | Bourbon | Foundry' };
- `apps/platform/app/bourbon/chains/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/bottles" style={{ color: '#6B6B70', fontSize: 13 }}>← Bottle progression</Link>
- `apps/platform/app/bourbon/collector/page.tsx:2` **adult_substance_alcohol** — import { CollectorTrackPicker } from '../../../components/bourbon/level-1/CollectorTrackPicker';
- `apps/platform/app/bourbon/collector/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Collector Track | Bourbon | Foundry' };
- `apps/platform/app/bourbon/collector/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
- `apps/platform/app/bourbon/community/page.tsx:4` **adult_substance_alcohol** — redirect('/community/bourbon');
- `apps/platform/app/bourbon/compare/page.tsx:2` **adult_substance_alcohol** — import { CompareFiveTool } from '../../../components/bourbon/level-1/CompareFiveTool';
- `apps/platform/app/bourbon/compare/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Compare 5 Bottles | Bourbon | Foundry' };
- `apps/platform/app/bourbon/compare/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
- `apps/platform/app/bourbon/connections/page.tsx:2` **adult_substance_alcohol** — import { BourbonConnectionsGraph } from '../../../components/bourbon/level-1/BourbonConnectionsGraph';
- `apps/platform/app/bourbon/connections/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Bourbon Connections | Foundry' };
- `apps/platform/app/bourbon/connections/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/beyond-the-bottle" style={{ color: '#6B6B70', fontSize: 13 }}>← Beyond the Bottle</Link>
- `apps/platform/app/bourbon/connections/page.tsx:10` **adult_substance_alcohol** — <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon connections</h1>
- `apps/platform/app/bourbon/daily/page.tsx:2` **adult_substance_alcohol** — import { getDailyBourbon } from '../../../lib/bourbon-level-1/daily-bourbon';
- `apps/platform/app/bourbon/daily/page.tsx:3` **adult_substance_alcohol** — import { DailyBourbonCard } from '../../../components/bourbon/level-1/DailyBourbonCard';
- `apps/platform/app/bourbon/daily/page.tsx:5` **adult_substance_alcohol** — export const metadata = { title: 'Daily Bourbon | Foundry' };
- `apps/platform/app/bourbon/daily/page.tsx:12` **adult_substance_alcohol** — <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
- `apps/platform/app/bourbon/daily/page.tsx:13` **adult_substance_alcohol** — <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Daily Bourbon</h1>
- `apps/platform/app/bourbon/daily/page.tsx:18` **adult_substance_alcohol** — <DailyRow label="Bottle spotlight" value={`${daily.bottle.name} — ${daily.bottle.hook}`} href="/bourbon/what-should-i-bu
- `apps/platform/app/bourbon/daily/page.tsx:19` **adult_substance_alcohol** — <DailyRow label="Compare" value={daily.comparison.question} href="/bourbon/wars" />
- `apps/platform/app/bourbon/detective/page.tsx:2` **adult_substance_alcohol** — import { BourbonDetectiveHub } from '../../../components/bourbon/level-1/BourbonDetectiveHub';
- `apps/platform/app/bourbon/detective/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Bourbon Detective | Foundry', description: 'Investigate pricing, allocation, DSP numbe
- `apps/platform/app/bourbon/detective/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
- `apps/platform/app/bourbon/detective/page.tsx:10` **adult_substance_alcohol** — <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon Detective</h1>
- `apps/platform/app/bourbon/detective/[slug]/page.tsx:1` **adult_substance_alcohol** — import { DetectiveCaseView } from '../../../../components/bourbon/level-1/BourbonDetectiveHub';
- `apps/platform/app/bourbon/detective/[slug]/page.tsx:2` **adult_substance_alcohol** — import { DETECTIVE_CASES } from '../../../../lib/bourbon-level-1/agency/detective-cases';
- `apps/platform/app/bourbon/detective/[slug]/page.tsx:11` **adult_substance_alcohol** — return { title: c ? `${c.title} | Bourbon Detective` : 'Case | Bourbon Detective' };
- `apps/platform/app/bourbon/dna/page.tsx:2` **adult_substance_alcohol** — import { BourbonDNAProfile } from '../../../components/bourbon/level-1/BourbonDNAProfile';
- `apps/platform/app/bourbon/dna/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Bourbon DNA | Foundry' };
- `apps/platform/app/bourbon/dna/page.tsx:9` **adult_substance_alcohol** — <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
- `apps/platform/app/bourbon/dna/page.tsx:10` **adult_substance_alcohol** — <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Your Bourbon DNA</h1>
- `apps/platform/app/bourbon/economy/page.tsx:2` **adult_substance_alcohol** — import { BourbonEconomy } from '../../../components/bourbon/level-1/BourbonEconomy';


_…and 1844 more (see JSON)._

## Student-safe worlds must be free of

Alcohol · cigars · marijuana · gambling-for-money · adult substances · medical advice · investment guarantees · partisan persuasion.

## Machine output

`data/audits/audience-language-audit.json`
