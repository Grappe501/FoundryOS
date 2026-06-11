import { WorldExperienceLayers } from './WorldExperienceLayers';
import { WorldHeroExperience } from './WorldHeroExperience';

export function WorldPremiumHub({ slug }: { slug: string }) {
  return (
    <>
      <WorldHeroExperience slug={slug} />
      <WorldExperienceLayers slug={slug} />
    </>
  );
}
