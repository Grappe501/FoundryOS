import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { LegendaryJournal } from '../../../components/living-worlds/LegendaryJournal';
import { WorldCollectionsPanel } from '../../../components/collector/WorldCollectionsPanel';
import { BourbonShelfTracker } from '../../../components/bourbon/level-1/BourbonShelfTracker';
import { ShelfIntelligencePanel } from '../../../components/bourbon/intelligence/ShelfIntelligencePanel';
import { BOURBON_PORTFOLIO_SECTIONS } from '../../../lib/bourbon-world-meta';
import { getMissionCount } from '../../../lib/immersion/registry';
import Link from 'next/link';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('bourbon');
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: '12px 0 0' }}>{bundle.portfolioLabel}</h1>
      <BourbonShelfTracker />
      <WorldCollectionsPanel
        worldSlug="bourbon"
        title="Your Bourbon Collections"
        subtitle="Themed shelves earned through investigation, pours, and pilgrimages — not stickers."
        accent="#C8A96E"
      />
      <ShelfIntelligencePanel />
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/bourbon"
        portfolioKey="foundry-bourbon-portfolio"
        missionCount={getMissionCount('bourbon')}
        firstMissionSlug="first-tasting"
        sections={BOURBON_PORTFOLIO_SECTIONS}
      />
      <LegendaryJournal worldSlug="bourbon" accent={bundle.accentColor} />
    </section>
  );
}
