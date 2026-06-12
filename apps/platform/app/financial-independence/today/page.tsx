import Link from 'next/link';
import { WorldTodayFull } from '../../../components/lore/WorldLivingMedia';

export default function FiTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/financial-independence" style={{ color: '#6B6B70', fontSize: 13 }}>← FI world</Link>
      <div style={{ marginTop: 12 }}>
        <WorldTodayFull worldSlug="financial-independence" accent="#6B9B6B" />
      </div>
    </section>
  );
}
