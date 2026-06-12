import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { ShelfIntelligencePanel } from '../../../components/bourbon/intelligence/ShelfIntelligencePanel';

export const metadata = { title: 'Shelf Intelligence | Bourbon | Foundry' };

export default function ShelfIntelligencePage() {
  const content = getBourbonPageDepth('shelf-intelligence')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/investigate" backLabel="← Investigate HQ">
      <ShelfIntelligencePanel />
    </BourbonDeepPageShell>
  );
}
