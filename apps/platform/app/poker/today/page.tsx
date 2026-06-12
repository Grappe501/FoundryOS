import Link from 'next/link';
import { WorldTodayFull } from '../../../components/lore/WorldLivingMedia';

export default function PokerTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/poker" style={{ color: '#6B6B70', fontSize: 13 }}>← Poker world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldTodayFull worldSlug="poker" accent="#7B8FD4" />
      </div>
    </section>
  );
}
