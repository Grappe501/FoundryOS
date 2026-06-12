import Link from 'next/link';
import { BourbonEconomy } from '../../../components/bourbon/level-1/BourbonEconomy';

export const metadata = { title: 'Bourbon Economy | Foundry' };

export default function EconomyPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Why bourbon costs what it costs</h1>
      <BourbonEconomy />
    </section>
  );
}
