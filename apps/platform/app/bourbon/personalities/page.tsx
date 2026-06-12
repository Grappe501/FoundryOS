import Link from 'next/link';
import { BourbonPersonalitiesTool } from '../../../components/bourbon/level-1/BourbonPersonalitiesTool';

export const metadata = { title: 'Bourbon Personalities | Foundry' };

export default function PersonalitiesPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon personalities</h1>
      <BourbonPersonalitiesTool />
    </section>
  );
}
