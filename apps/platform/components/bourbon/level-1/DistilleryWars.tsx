'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DISTILLERY_WARS, type DistilleryWar } from '../../../lib/bourbon-level-1/wars';
import { getWarVotes, recordWarVote } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function DistilleryWarsList() {
  return (
    <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
      {DISTILLERY_WARS.map((w) => (
        <Link
          key={w.slug}
          href={`/bourbon/wars/${w.slug}`}
          style={{ display: 'block', padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)', textDecoration: 'none', color: 'inherit' }}
        >
          <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: 0 }}>{w.title}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>{w.a.flagship} vs {w.b.flagship}</p>
        </Link>
      ))}
    </div>
  );
}

export function DistilleryWarCompare({ slug }: { slug: string }) {
  const war = DISTILLERY_WARS.find((w) => w.slug === slug);
  if (!war) return <p>War not found.</p>;
  return <WarClient war={war} />;
}

function WarClient({ war }: { war: DistilleryWar }) {
  const [vote, setVote] = useState<'a' | 'b' | null>(null);

  useEffect(() => {
    const v = getWarVotes().find((x) => x.warSlug === war.slug);
    if (v) setVote(v.choice);
  }, [war.slug]);

  function cast(choice: 'a' | 'b') {
    recordWarVote(war.slug, choice);
    setVote(choice);
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 8 }}>
        <Side label="A" data={war.a} active={vote === 'a'} onVote={() => cast('a')} />
        <Side label="B" data={war.b} active={vote === 'b'} onVote={() => cast('b')} />
      </div>
      <article style={{ marginTop: 28, padding: 22, background: '#0F1210', borderRadius: 10, border: `1px solid ${ACCENT}33` }}>
        <p style={{ color: ACCENT, fontSize: 12, margin: 0 }}>Foundry verdict</p>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 10, lineHeight: 1.7 }}>{war.verdict}</p>
      </article>
      <Link href="/bourbon/dna" style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
        Your vote shapes Bourbon DNA →
      </Link>
    </div>
  );
}

function Side({
  label,
  data,
  active,
  onVote,
}: {
  label: string;
  data: DistilleryWar['a'];
  active: boolean;
  onVote: () => void;
}) {
  return (
    <div style={{ padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, border: `1px solid ${active ? ACCENT : 'var(--foundry-border-subtle)'}` }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 17, marginTop: 8 }}>{data.name}</p>
      <dl style={{ marginTop: 16, fontSize: 12, color: 'var(--foundry-text-muted)' }}>
        <Row k="Flagship" v={data.flagship} />
        <Row k="Mashbill" v={data.mashbill} />
        <Row k="Proof" v={data.proof} />
        <Row k="Value" v={data.value} />
        <Row k="Best bargain" v={data.bargain} />
        <Row k="Best premium" v={data.premium} />
      </dl>
      <button type="button" onClick={onVote} style={{ marginTop: 16, padding: '10px 16px', width: '100%', background: active ? 'var(--foundry-primary-border-dim)' : 'var(--foundry-border-subtle)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer' }}>
        Vote {data.name.split(' ')[0]}
      </button>
      <Link href={`/bourbon/producers/${data.producerSlug}`} style={{ display: 'block', marginTop: 10, color: ACCENT, fontSize: 12, textAlign: 'center' }}>
        Deep dive →
      </Link>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <dt style={{ color: 'var(--foundry-text-faint)', display: 'inline' }}>{k}: </dt>
      <dd style={{ display: 'inline', margin: 0, color: 'var(--foundry-text-muted)' }}>{v}</dd>
    </div>
  );
}
