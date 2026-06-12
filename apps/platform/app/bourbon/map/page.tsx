import Link from 'next/link';
import { KentuckyMap } from '../../../components/bourbon/level-1/KentuckyMap';

export const metadata = { title: 'Kentucky Map & Trail | Bourbon | Foundry' };

export default function BourbonMapPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Kentucky map & Bourbon Trail</h1>
      <KentuckyMap />
    </section>
  );
}
