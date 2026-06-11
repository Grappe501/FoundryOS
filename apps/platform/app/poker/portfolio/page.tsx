import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { POKER_PORTFOLIO_SECTIONS } from '../../../lib/poker-world-meta';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('poker');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/poker"
        portfolioKey="foundry-poker-portfolio"
        missionCount={getMissionCount('poker')}
        firstMissionSlug="track-bankroll"
        sections={POKER_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
