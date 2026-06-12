import Link from 'next/link';
import { BlindTastingLeague } from '../../../components/bourbon/level-1/BlindTastingLeague';

export const metadata = { title: 'Blind Tasting League | Bourbon | Foundry' };

export default function LeaguePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Blind tasting league</h1>
      <BlindTastingLeague />
    </section>
  );
}
