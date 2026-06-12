import Link from 'next/link';
import { BourbonWatchtower } from '../../../components/bourbon/intelligence/BourbonWatchtower';

export const metadata = { title: 'Bourbon Watchtower | Signals | Foundry' };

export default function WatchtowerPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon Watchtower</h1>
      <BourbonWatchtower />
    </section>
  );
}
