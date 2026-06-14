import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { Level4Hub } from '../../../components/bourbon/level-4/Level4Hub';

export const metadata = {
  title: 'Bourbon Level 4 — Connoisseur | Foundry',
  description: 'Label decoder, Compare Five lab, DSP scavenger, single barrel and store pick labs.',
};

export default function BourbonLevel4Page() {
  const content = getBourbonPageDepth('level-4')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon" backLabel="← Bourbon world">
      <Level4Hub toolsOnly />
    </BourbonDeepPageShell>
  );
}
