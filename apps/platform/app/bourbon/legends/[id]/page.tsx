import { getWorldLore } from '@foundry/lore-engine';
import { LoreLegendView } from '../../../../components/lore/LoreStoryViews';

export function generateStaticParams() {
  const legends = getWorldLore('bourbon')?.legends ?? [];
  return legends.map((l) => ({ id: l.id }));
}

export default async function LegendPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section style={{ marginTop: 16 }}>
      <LoreLegendView worldSlug="bourbon" legendId={id} />
    </section>
  );
}
