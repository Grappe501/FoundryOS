import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BourbonEconomy } from '../../../components/bourbon/level-1/BourbonEconomy';

export const metadata = { title: 'Bourbon Economy | Foundry' };

export default function EconomyPage() {
  const content = getBourbonPageDepth('economy')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/investigate" backLabel="← Investigate HQ">
      <BourbonEconomy />
    </BourbonDeepPageShell>
  );
}
