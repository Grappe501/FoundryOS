import Link from 'next/link';
import { BourbonOriginsMap } from '../../../components/bourbon/level-1/BourbonOriginsMap';

export const metadata = { title: 'Bourbon Origins Map | Foundry' };

export default function OriginsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon origins map</h1>
      <BourbonOriginsMap />
    </section>
  );
}
