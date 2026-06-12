import Link from 'next/link';
import { BourbonDetectiveHub } from '../../../components/bourbon/level-1/BourbonDetectiveHub';

export const metadata = { title: 'Bourbon Detective | Foundry', description: 'Investigate pricing, allocation, DSP numbers — close the case.' };

export default function DetectivePage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/investigate" style={{ color: '#6B6B70', fontSize: 13 }}>← Investigate HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon Detective</h1>
      <BourbonDetectiveHub />
    </section>
  );
}
