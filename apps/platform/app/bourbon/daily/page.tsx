import Link from 'next/link';
import { getDailyBourbon } from '../../../lib/bourbon-level-1/daily-bourbon';
import { DailyBourbonCard } from '../../../components/bourbon/level-1/DailyBourbonCard';

export const metadata = { title: 'Daily Bourbon | Foundry' };

export default function DailyBourbonPage() {
  const daily = getDailyBourbon();

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/bourbon/level-1" style={{ color: '#6B6B70', fontSize: 13 }}>← Level 1 HQ</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 12 }}>Daily Bourbon</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>One fact · one bottle · one comparison · one challenge · one question.</p>
      <DailyBourbonCard />
      <section style={{ marginTop: 32, display: 'grid', gap: 16 }}>
        <DailyRow label="Fact" value={daily.fact.text} />
        <DailyRow label="Bottle spotlight" value={`${daily.bottle.name} — ${daily.bottle.hook}`} href="/bourbon/what-should-i-buy" />
        <DailyRow label="Compare" value={daily.comparison.question} href="/bourbon/wars" />
        <DailyRow label="Challenge" value={daily.challenge.text} href={daily.challenge.href} />
        <DailyRow label="Question" value={daily.question.text} href={daily.question.href} />
      </section>
    </section>
  );
}

function DailyRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div style={{ padding: 18, background: '#111114', borderRadius: 8 }}>
      <p style={{ color: '#C8A96E', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
      <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 8, lineHeight: 1.5 }}>{value}</p>
      {href && (
        <Link href={href} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, display: 'inline-block' }}>Go →</Link>
      )}
    </div>
  );
}
