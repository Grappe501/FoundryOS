import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { WhereToBuyGuide } from '../../../components/bourbon/level-1/WhereToBuyGuide';

export const metadata = { title: 'Where to Buy Bourbon | Foundry' };

export default function WhereToBuyPage() {
  const content = getBourbonPageDepth('where-to-buy')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/beyond-the-bottle" backLabel="← Beyond the Bottle">
      <WhereToBuyGuide />
    </BourbonDeepPageShell>
  );
}
