import { getWorldLore } from '@foundry/lore-engine';
import { LoreObjectView } from '../../../../components/lore/LoreStoryViews';

export function generateStaticParams() {
  const objects = getWorldLore('bourbon')?.legendaryObjects ?? [];
  return objects.map((o) => ({ id: o.id }));
}

export default async function ObjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section style={{ marginTop: 16 }}>
      <LoreObjectView worldSlug="bourbon" objectId={id} />
    </section>
  );
}
