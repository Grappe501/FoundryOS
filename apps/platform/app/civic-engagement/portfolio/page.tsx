import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { CIVIC_ENGAGEMENT_PORTFOLIO_SECTIONS } from '../../../lib/civic-engagement-world-meta';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('civic-engagement');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/civic-engagement"
        portfolioKey="foundry-civic-portfolio"
        missionCount={getMissionCount('civic-engagement')}
        firstMissionSlug="research-ballot"
        sections={CIVIC_ENGAGEMENT_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
