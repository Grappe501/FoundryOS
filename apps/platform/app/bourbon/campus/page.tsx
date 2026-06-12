import Link from 'next/link';
import { DistilleryCampusMap } from '../../../components/bourbon/level-1/DistilleryCampusMap';

export const metadata = { title: 'Distillery Campus Maps | Bourbon | Foundry' };

export default function CampusPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Distillery campus maps</h1>
      <DistilleryCampusMap />
    </section>
  );
}
