import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { BourbonCinematicLanding } from '../../components/bourbon-world/BourbonCinematicLanding';
import { BourbonLandingDoors } from '../../components/bourbon-world/BourbonLandingDoors';
import { getBourbonPageDepth } from '../../lib/bourbon-level-1/deep-copy';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';

const slug = 'bourbon' as const;
const config = getWorldExperienceConfig(slug)!;

export const metadata = {
  title: `${config.displayName} World | Foundry`,
  description: config.identityPromise,
};

export default function BourbonWorldPage() {
  const depth = getBourbonPageDepth('bourbon')!;

  return (
    <>
      <BourbonCinematicLanding
        title="Bourbon World"
        tagline="A country inside a glass — enter on curiosity, not homework."
        ctaHref={config.mission1Href}
        ctaLabel={config.startHereCta}
      />
      <BourbonLandingDoors content={depth} />
      <WorldPremiumHub slug={slug} skipHero />
    </>
  );
}
