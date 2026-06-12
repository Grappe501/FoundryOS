import Link from 'next/link';
import { WorldTodayFull } from '../../../components/lore/WorldLivingMedia';

export const metadata = { title: "What's Alive Today | AI Builder | Foundry" };

export default function AiBuilderTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/ai-builder" style={{ color: '#6B6B70', fontSize: 13 }}>← AI Builder world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldTodayFull worldSlug="ai-builder" accent="#6B9B6B" />
      </div>
    </section>
  );
}
