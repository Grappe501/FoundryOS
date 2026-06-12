import Link from 'next/link';
import { MythsQuiz } from '../../../components/bourbon/level-1/MythsQuiz';

export const metadata = { title: 'Bourbon Myths | Foundry' };

export default function BourbonMythsPage() {
  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Bourbon myths</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>True or false — the surprises keep you reading.</p>
      <MythsQuiz />
    </section>
  );
}
