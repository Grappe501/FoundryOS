# Audience Language Audit (PASS-033)

Generated: 2026-06-12T00:29:16.480Z

| Metric | Count |
|--------|-------|
| Files scanned | 680 |
| Total findings | 1724 |
| High severity | 950 |
| Medium severity | 7 |
| Low severity | 767 |
| Student-safe context violations | 0 |

## Rules checked

- Adult substances (alcohol, tobacco, cannabis)
- Gambling-for-money framing
- Medical advice claims
- Investment guarantees
- Partisan persuasion
- Internal build language (PASS codes, team names)

## High severity (950)

- `apps/platform/app/bourbon/academy/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/academy/page.tsx:6` **adult_substance_alcohol** — return <WorldAcademyDepth bundle={bundle} basePath="/bourbon" />;
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:11` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/academy/[slug]/page.tsx:12` **adult_substance_alcohol** — return <WorldAcademyLesson bundle={bundle} basePath="/bourbon" lessonSlug={slug} />;
- `apps/platform/app/bourbon/careers/page.tsx:1` **adult_substance_alcohol** — import { BOURBON_CAREERS } from '../../../lib/bourbon-world-meta';
- `apps/platform/app/bourbon/community/page.tsx:4` **adult_substance_alcohol** — redirect('/community/bourbon');
- `apps/platform/app/bourbon/experiences/page.tsx:4` **adult_substance_alcohol** — return <WorldExperiencesIndex slug="bourbon" />;
- `apps/platform/app/bourbon/experiences/[module]/page.tsx:7` **adult_substance_alcohol** — return (getWorldExperienceConfig('bourbon')?.modules ?? []).map((m) => ({ module: m.slug }));
- `apps/platform/app/bourbon/experiences/[module]/page.tsx:12` **adult_substance_alcohol** — return <WorldExperienceModulePage slug="bourbon" moduleSlug={module} />;
- `apps/platform/app/bourbon/glossary/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/glossary/page.tsx:6` **adult_substance_alcohol** — return <WorldGlossaryDepth bundle={bundle} basePath="/bourbon" />;
- `apps/platform/app/bourbon/layout.tsx:2` **adult_substance_alcohol** — import { BourbonSubNav } from '../../components/bourbon-world/BourbonSubNav';
- `apps/platform/app/bourbon/layout.tsx:8` **adult_substance_alcohol** — <ValidationPageTracker page="/bourbon" />
- `apps/platform/app/bourbon/learn/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/learn/page.tsx:6` **adult_substance_alcohol** — return <WorldLearnIndex bundle={bundle} basePath="/bourbon" />;
- `apps/platform/app/bourbon/learn/[slug]/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/learn/[slug]/page.tsx:11` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/learn/[slug]/page.tsx:12` **adult_substance_alcohol** — return <WorldLearnGuide bundle={bundle} basePath="/bourbon" guideSlug={slug} />;
- `apps/platform/app/bourbon/missions/page.tsx:1` **adult_substance_alcohol** — import { BOURBON_MISSIONS } from '../../../lib/bourbon-world';
- `apps/platform/app/bourbon/missions/page.tsx:4` **adult_substance_alcohol** — export const metadata = { title: 'Missions | Bourbon' };
- `apps/platform/app/bourbon/missions/page.tsx:7` **adult_substance_alcohol** — return <WorldMissionTracks missions={BOURBON_MISSIONS} basePath="/bourbon" accent="#C8A96E" subtitle="10 steward experie
- `apps/platform/app/bourbon/missions/[slug]/page.tsx:3` **adult_substance_alcohol** — import { BOURBON_MISSIONS, BOURBON_PORTFOLIO_KEY, BOURBON_PORTFOLIO_LABEL, getBourbonMission } from '../../../../lib/bou
- `apps/platform/app/bourbon/missions/[slug]/page.tsx:18` **adult_substance_alcohol** — worldSlug="bourbon"
- `apps/platform/app/bourbon/missions/[slug]/page.tsx:21` **adult_substance_alcohol** — basePath="/bourbon"
- `apps/platform/app/bourbon/page.tsx:5` **adult_substance_alcohol** — const slug = 'bourbon' as const;
- `apps/platform/app/bourbon/page.tsx:18` **adult_substance_alcohol** — <Link href="/explore/bourbon" style={{ color: '#6B6B70' }}>Explore path</Link>
- `apps/platform/app/bourbon/parents/page.tsx:5` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/playground/page.tsx:1` **adult_substance_alcohol** — import { BOURBON_PLAYGROUND_LABS } from '../../../lib/bourbon-world-meta';
- `apps/platform/app/bourbon/portfolio/page.tsx:3` **adult_substance_alcohol** — import { BOURBON_PORTFOLIO_SECTIONS } from '../../../lib/bourbon-world-meta';
- `apps/platform/app/bourbon/portfolio/page.tsx:7` **adult_substance_alcohol** — const bundle = getWorldDepthOrThrow('bourbon');
- `apps/platform/app/bourbon/portfolio/page.tsx:13` **adult_substance_alcohol** — basePath="/bourbon"
- `apps/platform/app/bourbon/portfolio/page.tsx:14` **adult_substance_alcohol** — portfolioKey="foundry-bourbon-portfolio"
- `apps/platform/app/bourbon/portfolio/page.tsx:15` **adult_substance_alcohol** — missionCount={getMissionCount('bourbon')}
- `apps/platform/app/domains/page.tsx:17` **adult_substance_alcohol** — Not 1,961 apps. Lifelong identity domains — Poker, Bourbon, Public Speaking, Magic, and beyond.
- `apps/platform/app/explore/page.tsx:10` **adult_substance_alcohol** — description: 'Explore what you can become. Every path Foundry is building — from Future-Proof to Bourbon to Financial In
- `apps/platform/app/investors/page.tsx:21` **adult_substance_alcohol** — { title: 'Roadmap', body: 'Transformation Operating System. Agency over consumption. PASS-010 Transformation Intelligenc
- `apps/platform/app/knowledge/page.tsx:35` **adult_substance_alcohol** — <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Bourbon Academy — {BOURBON_ACADEMY.levels.length} Levels</h2>
- `apps/platform/app/knowledge/page.tsx:42` **adult_substance_alcohol** — Routed at bourbon.foundryos.com/academy — same engine, every vertical.
- `apps/platform/app/loop/page.tsx:107` **adult_substance_alcohol** — <p style={{ marginTop: 8 }}>Do not start PASS-011 · Collections · Clubs · Bourbon until this loop is deployed and verifi
- `apps/platform/app/operations/page.tsx:50` **adult_substance_alcohol** — Target: full cockpit before PASS-014 (Bourbon launch). Reviews, rankings, AI costs, and deploy tracking wire in progress
- `apps/platform/app/operator/learning/page.tsx:95` **adult_substance_alcohol** — <WorldAssignmentGuard worldSlug="bourbon" targetSegment="student" />
- `apps/platform/app/operator/learning/page.tsx:96` **adult_substance_cannabis** — <WorldAssignmentGuard worldSlug="medical-cannabis-literacy" targetSegment="teen" />
- `apps/platform/app/operator/page.tsx:243` **adult_substance_alcohol** — <Link href="/operator/bourbon" style={{ color: '#C8A96E', fontSize: 14, fontWeight: 600 }}>Domain Proof (PASS-014) →</Li
- `apps/platform/app/operator/page.tsx:247` **adult_substance_alcohol** — <Link href="/operator/verticals/bourbon" style={{ color: '#C8A96E', fontSize: 14 }}>Bourbon Vertical →</Link>
- `apps/platform/app/paths/page.tsx:12` **adult_substance_alcohol** — const bourbonPaths = getPathsForVertical('bourbon');
- `apps/platform/app/paths/page.tsx:46` **adult_substance_alcohol** — <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Bourbon Paths ({bourbonPaths.length})</h2>
- `apps/platform/app/paths/page.tsx:61` **adult_substance_alcohol** — Movies, BBQ, Books paths reserved in catalog. No Bourbon UI until PASS-014.
- `apps/platform/app/projects/page.tsx:15` **adult_substance_alcohol** — const bourbonProjects = getProjectsForVertical('bourbon');
- `apps/platform/app/projects/page.tsx:65` **adult_substance_alcohol** — <h2 style={{ fontSize: 14, color: '#C8A96E' }}>Bourbon Projects ({bourbonProjects.length})</h2>


_…and 900 more (see JSON)._

## Student-safe worlds must be free of

Alcohol · cigars · marijuana · gambling-for-money · adult substances · medical advice · investment guarantees · partisan persuasion.

## Machine output

`data/audits/audience-language-audit.json`
