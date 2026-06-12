import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { InvestigateHub } from '../../../components/bourbon/level-1/InvestigateHub';

export const metadata = { title: 'Investigate | Bourbon | Foundry', description: 'Agency not curriculum — worth reading before you click.' };

export default function InvestigatePage() {
  const content = getBourbonPageDepth('investigate')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <InvestigateHub toolsOnly />
    </BourbonDeepPageShell>
  );
}
