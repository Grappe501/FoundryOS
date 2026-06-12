import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BourbonWatchtower } from '../../../components/bourbon/intelligence/BourbonWatchtower';

export const metadata = { title: 'Bourbon Watchtower | Signals | Foundry' };

export default function WatchtowerPage() {
  const content = getBourbonPageDepth('watchtower')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/investigate" backLabel="← Investigate HQ">
      <BourbonWatchtower />
    </BourbonDeepPageShell>
  );
}
