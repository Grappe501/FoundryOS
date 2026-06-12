import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BourbonLab } from '../../../components/bourbon/level-1/BourbonLab';

export const metadata = { title: 'Bourbon Lab | Foundry' };

export default function BourbonLabPage() {
  const content = getBourbonPageDepth('lab')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <BourbonLab />
    </BourbonDeepPageShell>
  );
}
