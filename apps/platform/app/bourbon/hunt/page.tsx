import Link from 'next/link';
import { BourbonHuntEngine } from '../../../components/bourbon/intelligence/BourbonHuntEngine';

export const metadata = { title: 'Bourbon Hunt | Monthly Missions | Foundry' };

export default function HuntPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>This month&apos;s hunt</h1>
      <BourbonHuntEngine />
    </section>
  );
}
