import Link from 'next/link';
import { BourbonConnectionsGraph } from '../../../components/bourbon/level-1/BourbonConnectionsGraph';

export const metadata = { title: 'Bourbon Connections | Foundry' };

export default function ConnectionsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/beyond-the-bottle" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Beyond the Bottle</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon connections</h1>
      <BourbonConnectionsGraph />
    </section>
  );
}
