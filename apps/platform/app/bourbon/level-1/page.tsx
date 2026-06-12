import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { Level1Hub } from '../../../components/bourbon/level-1/Level1Hub';

export const metadata = {
  title: 'Bourbon Level 1 | Hobby HQ | Foundry',
  description: 'Tools, games, and decisions — authoritative bourbon writing worth reading before you click.',
};

export default function BourbonLevel1Page() {
  const content = getBourbonPageDepth('level-1')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon" backLabel="← Bourbon world">
      <Level1Hub toolsOnly />
    </BourbonDeepPageShell>
  );
}
