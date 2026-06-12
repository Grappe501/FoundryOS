import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BeyondTheBottleHub } from '../../../components/bourbon/level-1/BeyondTheBottleHub';

export const metadata = { title: 'Beyond the Bottle | Bourbon | Foundry' };

export default function BeyondTheBottlePage() {
  const content = getBourbonPageDepth('beyond-the-bottle')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <BeyondTheBottleHub />
    </BourbonDeepPageShell>
  );
}
