import Link from 'next/link';
import { WorldTodayFull } from '../../../components/lore/WorldLivingMedia';
import { RabbitHoleOfDay } from '../../../components/bourbon/intelligence/RabbitHoleOfDay';

export const metadata = { title: "What's Alive Today | Bourbon | Foundry" };

export default function BourbonTodayPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon" style={{ color: '#6B6B70', fontSize: 13 }}>← Bourbon world</Link>
      <div style={{ marginTop: 12 }}>
        <RabbitHoleOfDay compact />
        <div style={{ marginTop: 28 }}>
          <WorldTodayFull worldSlug="bourbon" accent="#C8A96E" />
        </div>
      </div>
    </section>
  );
}