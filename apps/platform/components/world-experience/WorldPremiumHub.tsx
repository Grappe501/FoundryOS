import { WorldExperienceLayers } from './WorldExperienceLayers';
import { WorldHeroExperience } from './WorldHeroExperience';
import { WorldMentorPanel } from '../living-worlds/LivingWorldPanels';
import { WorldObsessionSection } from '../living-worlds/WorldObsessionSection';
import { WorldLoreTeaser } from '../lore/WorldLoreTeaser';
import { WorldLivingMedia } from '../lore/WorldLivingMedia';
import { getWorldAssets } from '../../lib/world-assets';

export function WorldPremiumHub({ slug }: { slug: string }) {
  const assets = getWorldAssets(slug);
  return (
    <>
      <WorldHeroExperience slug={slug} />
      <WorldLivingMedia worldSlug={slug} accent={assets.accent} />
      <WorldObsessionSection worldSlug={slug} accent={assets.accent} />
      <WorldLoreTeaser worldSlug={slug} accent={assets.accent} />
      <WorldMentorPanel worldSlug={slug} />
      <WorldExperienceLayers slug={slug} />
    </>
  );
}
