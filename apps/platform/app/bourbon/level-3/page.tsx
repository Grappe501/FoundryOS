import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { Level3Hub } from '../../../components/bourbon/level-3/Level3Hub';

export const metadata = {
  title: 'Bourbon Level 3 — Shelf Builder | Foundry',
  description: 'Themed shelves, price ladder, gap analysis — curate bottles with defensible themes.',
};

export default function BourbonLevel3Page() {
  const content = getBourbonPageDepth('level-3')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon" backLabel="← Bourbon world">
      <Level3Hub toolsOnly />
    </BourbonDeepPageShell>
  );
}
