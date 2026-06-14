import Link from 'next/link';
import { DspScavengerTool } from '../../../components/bourbon/level-4/DspScavengerTool';

export const metadata = { title: 'DSP Scavenger Hunt | Bourbon Level 4 | Foundry' };

export default function DspScavengerPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-4" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Level 4 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>DSP Scavenger Hunt</h1>
      <DspScavengerTool />
    </section>
  );
}
