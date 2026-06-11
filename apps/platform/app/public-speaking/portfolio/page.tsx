import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { PS_PORTFOLIO_SECTIONS } from '../../../lib/public-speaking-world';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('public-speaking');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/public-speaking"
        portfolioKey="foundry-ps-portfolio"
        missionCount={getMissionCount('public-speaking')}
        firstMissionSlug="first-talk"
        sections={PS_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
