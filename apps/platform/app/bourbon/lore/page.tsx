import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = {
  title: 'Bourbon Lore | Mythology & Stories | Foundry',
  description: 'Heroes, rivalries, mysteries, pilgrimages — the mythology that makes bourbon alive.',
};

export default function BourbonLorePage() {
  const content = getBourbonPageDepth('lore')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <WorldLoreHub worldSlug="bourbon" accent="var(--foundry-primary)" hideHeader />
    </BourbonDeepPageShell>
  );
}
