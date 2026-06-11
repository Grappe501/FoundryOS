import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { FI_PORTFOLIO_SECTIONS } from '../../../lib/financial-independence-world';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('financial-independence');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/financial-independence"
        portfolioKey="foundry-fi-portfolio"
        missionCount={getMissionCount('financial-independence')}
        firstMissionSlug="first-budget"
        sections={FI_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
