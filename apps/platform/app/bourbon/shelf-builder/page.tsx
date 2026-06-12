import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { ShelfBuilder } from '../../../components/bourbon/level-1/ShelfBuilder';

export const metadata = { title: 'Shelf Builder | Bourbon | Foundry' };

export default function ShelfBuilderPage() {
  const content = getBourbonPageDepth('shelf-builder')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <ShelfBuilder />
    </BourbonDeepPageShell>
  );
}
