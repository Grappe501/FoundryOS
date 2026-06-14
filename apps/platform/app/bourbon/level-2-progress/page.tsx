import Link from 'next/link';
import { Level2ProgressPanel } from '../../../components/bourbon/level-2/Level2ProgressPanel';

export const metadata = { title: 'Level 2 Progress | Bourbon | Foundry' };

export default function Level2ProgressPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-2" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 2 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Progress Dashboard</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, lineHeight: 1.7, maxWidth: 640, marginBottom: 20 }}>
        Flights, grids, journal, blind sessions, program weeks, and host nights — checkpoint readiness at a glance.
      </p>
      <Level2ProgressPanel />
    </section>
  );
}
