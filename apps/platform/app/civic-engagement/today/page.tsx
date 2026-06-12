import Link from 'next/link';
import { WorldTodayFull } from '../../../components/lore/WorldLivingMedia';

export default function CivicTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/civic-engagement" style={{ color: '#6B6B70', fontSize: 13 }}>← Civic world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldTodayFull worldSlug="civic-engagement" accent="#7BA3C9" />
      </div>
    </section>
  );
}
