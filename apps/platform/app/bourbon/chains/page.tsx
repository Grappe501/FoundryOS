import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { ProgressionChainsView } from '../../../components/bourbon/intelligence/ProgressionChainsView';

export const metadata = { title: 'Progression Chains | Bourbon | Foundry' };

export default function ChainsPage() {
  const content = getBourbonPageDepth('chains')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/investigate" backLabel="← Investigate HQ">
      <ProgressionChainsView />
    </BourbonDeepPageShell>
  );
}
