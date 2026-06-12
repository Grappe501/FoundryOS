import { WorldLoreHub } from '../../../components/lore/WorldLoreHub';

export const metadata = {
  title: 'AI Builder Lore | Origin Stories | Foundry',
  description: 'Builders, rivalries, mysteries — the mythology of making things.',
};

export default function AiBuilderLorePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <WorldLoreHub worldSlug="ai-builder" accent="var(--foundry-success)" backHref="/ai-builder" backLabel="AI Builder world" />
    </section>
  );
}
