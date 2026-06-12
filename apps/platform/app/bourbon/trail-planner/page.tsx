import Link from 'next/link';
import { TrailPlannerTool } from '../../../components/bourbon/level-1/TrailPlannerTool';

export const metadata = { title: 'Bourbon Trail Planner | Foundry' };

export default function TrailPlannerPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon Trail planner</h1>
      <TrailPlannerTool />
    </section>
  );
}
