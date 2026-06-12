import Link from 'next/link';
import { PairingEngine } from '../../../components/bourbon/level-1/PairingEngine';

export const metadata = { title: 'Bourbon Pairings | Foundry' };

export default function BourbonPairingsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Pairing engine</h1>
      <PairingEngine />
    </section>
  );
}
