import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { NextRecommendedWorld } from '../../components/trinity/NextRecommendedWorld';
import { TrinityJourneyProgress } from '../../components/trinity/TrinityJourneyProgress';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

export const metadata = {
  title: 'AI Builder World | Foundry',
  description: getWorldExperienceConfig('ai-builder')?.identityPromise ?? 'Build real things with AI.',
};

export default function AiBuilderWorldPage() {
  return (
    <>
      <WorldPremiumHub slug="ai-builder" />
      <TrinityJourneyProgress compact />
      <NextRecommendedWorld currentSlug="ai-builder" />
    </>
  );
}
