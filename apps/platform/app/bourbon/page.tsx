import { WorldPremiumHub } from '../../components/world-experience/WorldPremiumHub';
import { BourbonWorldDepthIntro } from '../../components/bourbon/BourbonDeepPageShell';
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
      <BourbonWorldDepthIntro content={depth} />
      <WorldPremiumHub slug={slug} />
    </>
  );
}
