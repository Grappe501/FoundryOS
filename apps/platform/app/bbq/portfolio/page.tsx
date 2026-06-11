import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldPortfolioDepth } from '../../../components/world-depth/WorldPortfolioDepth';
import { BBQ_PORTFOLIO_SECTIONS } from '../../../lib/bbq-world-meta';
import { getMissionCount } from '../../../lib/immersion/registry';

export default function PortfolioPage() {
  const bundle = getWorldDepthOrThrow('bbq');
  return (
    <section style={{ marginTop: 16 }}>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', margin: 0 }}>{bundle.portfolioLabel}</h1>
      <WorldPortfolioDepth
        bundle={bundle}
        basePath="/bbq"
        portfolioKey="foundry-bbq-portfolio"
        missionCount={getMissionCount('bbq')}
        firstMissionSlug="first-pork-butt"
        sections={BBQ_PORTFOLIO_SECTIONS}
      />
    </section>
  );
}
