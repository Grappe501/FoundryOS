import Link from 'next/link';
import { InvestigateHub } from '../../../components/bourbon/level-1/InvestigateHub';

export const metadata = { title: 'Investigate | Bourbon Level 1 | Foundry', description: 'Detective, X-Ray, Compare — agency not curriculum.' };

export default function InvestigatePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <div style={{ marginTop: 12 }}>
        <InvestigateHub />
      </div>
    </section>
  );
}
