import Link from 'next/link';
import { RabbitHoleOfDay } from '../../../components/bourbon/intelligence/RabbitHoleOfDay';

export const metadata = { title: 'Rabbit Hole of the Day | Bourbon | Foundry' };

export default function RabbitHolePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/today" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Today</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Rabbit hole of the day</h1>
      <RabbitHoleOfDay />
    </section>
  );
}
