import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { PourImpactGuide } from '../../../components/bourbon/level-1/PourImpactGuide';

export const metadata = { title: 'Pour Impact Guide | Bourbon | Foundry' };

export default function PourGuidePage() {
  const content = getBourbonPageDepth('pour-guide')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/beyond-the-bottle" backLabel="← Beyond the Bottle">
      <PourImpactGuide />
    </BourbonDeepPageShell>
  );
}
