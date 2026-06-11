import Link from 'next/link';
import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { NextRecommendedWorld } from '../../components/trinity/NextRecommendedWorld';
import { TrinityJourneyProgress } from '../../components/trinity/TrinityJourneyProgress';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

const slug = 'public-speaking' as const;
const config = getWorldExperienceConfig(slug)!;

export const metadata = {
  title: `${config.displayName} World | Foundry`,
  description: config.identityPromise,
};

export default function PublicSpeakingWorldPage() {
  return (
    <>
      <WorldPremiumHub slug={slug} />
      <TrinityJourneyProgress compact />
      <NextRecommendedWorld currentSlug={slug} />
      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        <Link href="/future-proof" style={{ color: '#6B6B70' }}>Future-Proof Assessment</Link>
      </p>
    </>
  );
}
