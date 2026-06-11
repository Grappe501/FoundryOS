import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { BOURBON_PORTFOLIO_SECTIONS } from '../../../lib/bourbon-world-meta';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('bourbon');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/bourbon"
        portfolioKey="foundry-bourbon-portfolio"
        missionCount={5}
        firstMissionSlug="first-tasting"
        sections={BOURBON_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
