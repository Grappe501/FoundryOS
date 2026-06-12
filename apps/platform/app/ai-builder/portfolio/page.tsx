import { WorldCollectionsPanel } from '../../../components/collector/WorldCollectionsPanel';
import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { AI_BUILDER_PORTFOLIO_SECTIONS } from '../../../lib/ai-builder-world';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('ai-builder');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldCollectionsPanel worldSlug="ai-builder" accent={bundle.accentColor} />
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/ai-builder"
        portfolioKey="foundry-ai-portfolio"
        missionCount={getMissionCount('ai-builder')}
        firstMissionSlug="homework-assistant"
        sections={AI_BUILDER_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
