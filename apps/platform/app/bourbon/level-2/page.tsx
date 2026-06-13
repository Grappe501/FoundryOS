import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { Level2Hub } from '../../../components/bourbon/level-2/Level2Hub';

export const metadata = {
  title: 'Bourbon Level 2 — Confident Taster | Foundry',
  description: 'Tasting Lab, comparison grids, mash bill flights — structured palate training.',
};

export default function BourbonLevel2Page() {
  const content = getBourbonPageDepth('level-2')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon" backLabel="← Bourbon world">
      <Level2Hub toolsOnly />
    </BourbonDeepPageShell>
  );
}
