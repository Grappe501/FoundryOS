#!/usr/bin/env node
/** PASS-025 — Wire world depth pages for all 7 active worlds */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.join(ROOT, 'apps/platform/app');

const WORLDS = [
  { slug: 'ai-builder', firstMission: 'homework-assistant', portfolioKey: 'foundry-ai-portfolio', sectionsImport: 'AI_BUILDER_PORTFOLIO_SECTIONS', sectionsFrom: 'ai-builder-world' },
  { slug: 'financial-independence', firstMission: 'first-budget', portfolioKey: 'foundry-fi-portfolio', sectionsImport: 'FI_PORTFOLIO_SECTIONS', sectionsFrom: 'financial-independence-world' },
  { slug: 'public-speaking', firstMission: 'first-talk', portfolioKey: 'foundry-ps-portfolio', sectionsImport: 'PS_PORTFOLIO_SECTIONS', sectionsFrom: 'public-speaking-world' },
  { slug: 'bourbon', firstMission: 'first-tasting', portfolioKey: 'foundry-bourbon-portfolio', sectionsImport: 'BOURBON_PORTFOLIO_SECTIONS', sectionsFrom: 'bourbon-world-meta' },
  { slug: 'bbq', firstMission: 'first-pork-butt', portfolioKey: 'foundry-bbq-portfolio', sectionsImport: 'BBQ_PORTFOLIO_SECTIONS', sectionsFrom: 'bbq-world-meta' },
  { slug: 'poker', firstMission: 'track-bankroll', portfolioKey: 'foundry-poker-portfolio', sectionsImport: 'POKER_PORTFOLIO_SECTIONS', sectionsFrom: 'poker-world-meta' },
  { slug: 'civic-engagement', firstMission: 'research-ballot', portfolioKey: 'foundry-civic-portfolio', sectionsImport: 'CIVIC_ENGAGEMENT_PORTFOLIO_SECTIONS', sectionsFrom: 'civic-engagement-world-meta' },
];

function depthImportDepth(slug) {
  const depthFile =
    slug === 'ai-builder'
      ? 'ai-builder'
      : slug === 'financial-independence'
        ? 'financial-independence'
        : slug === 'public-speaking'
          ? 'public-speaking'
          : slug;
  return depthFile;
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('wrote', path.relative(ROOT, filePath));
}

for (const w of WORLDS) {
  const base = path.join(APP, w.slug);
  const basePath = `/${w.slug}`;
  const depthMod = depthImportDepth(w.slug);

  write(
    path.join(base, 'academy/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldAcademyDepth } from '../../../components/world-depth/WorldAcademyDepth';

export default function AcademyPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldAcademyDepth bundle={bundle} basePath="${basePath}" />;
}
`,
  );

  write(
    path.join(base, 'glossary/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldGlossaryDepth } from '../../../components/world-depth/WorldGlossaryDepth';

export default function GlossaryPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldGlossaryDepth bundle={bundle} basePath="${basePath}" />;
}
`,
  );

  write(
    path.join(base, 'parents/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldParentDepth } from '../../../components/world-depth/WorldParentDepth';

export default function ParentsPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldParentDepth bundle={bundle} />;
}
`,
  );

  write(
    path.join(base, 'community/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldCommunityDepth } from '../../../components/world-depth/WorldCommunityDepth';

export default function CommunityPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldCommunityDepth bundle={bundle} />;
}
`,
  );

  write(
    path.join(base, 'portfolio/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { ${w.sectionsImport} } from '../../../lib/${w.sectionsFrom}';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="${basePath}"
        portfolioKey="${w.portfolioKey}"
        missionCount={5}
        firstMissionSlug="${w.firstMission}"
        sections={${w.sectionsImport}}
      />
    </section>
  );
}
`,
  );

  write(
    path.join(base, 'learn/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldLearnIndex } from '../../../components/world-depth/WorldLearnGuide';

export default function LearnIndexPage() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldLearnIndex bundle={bundle} basePath="${basePath}" />;
}
`,
  );

  write(
    path.join(base, 'learn/[slug]/page.tsx'),
    `import { getWorldDepthOrThrow } from '../../../../lib/world-depth/registry';
import { WorldLearnGuide } from '../../../../components/world-depth/WorldLearnGuide';

export function generateStaticParams() {
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return bundle.seoGuides.map((g) => ({ slug: g.slug }));
}

export default async function LearnGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = getWorldDepthOrThrow('${w.slug}');
  return <WorldLearnGuide bundle={bundle} basePath="${basePath}" guideSlug={slug} />;
}
`,
  );
}

console.log('PASS-025 pages wired for', WORLDS.length, 'worlds');
