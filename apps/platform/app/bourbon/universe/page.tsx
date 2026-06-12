import Link from 'next/link';
import { BourbonUniverseMap } from '../../../components/lore/BourbonUniverseMap';

export const metadata = { title: 'Bourbon Universe Map | Foundry' };

export default function BourbonUniversePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/lore" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mythology</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>The bourbon universe</h1>
      <BourbonUniverseMap />
    </section>
  );
}
