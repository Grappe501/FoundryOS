import Link from 'next/link';
import { COLLECTION_DEFINITIONS, COLLECTION_EARN_RULES, LIVE_COLLECTOR_WORLDS } from '@foundry/collector-engine';
import { OperatorCollectionsViewer } from '../../../components/operator/OperatorCollectionsViewer';

export const metadata = {
  title: 'Collector Engine | Operator',
  description: 'Themed identity collections — definitions and earn rules across all worlds.',
};

export default function OperatorCollectionsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/discovery" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Discovery Graph</Link>
      <Link href="/collections" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>PASS-012 Assets</Link>

      <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-034K · Collector Engine
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Identity Collections</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Collections are identity objects, not badges. Each world has themed collections earned through action —
        consequence chains update progress automatically.
      </p>

      <section style={{ marginTop: 20, padding: 16, background: '#0F1218', border: '1px solid #2A2A3A', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: 0 }}>Loop</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 14, marginTop: 8, fontFamily: 'monospace', lineHeight: 1.8 }}>
          Action → world changed → collection progress → portfolio → becoming
        </p>
      </section>

      <section style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Stat label="Collections" value={COLLECTION_DEFINITIONS.length} />
        <Stat label="Worlds" value={LIVE_COLLECTOR_WORLDS.length} />
        <Stat label="Earn rules" value={COLLECTION_EARN_RULES.length} />
      </section>

      <OperatorCollectionsViewer />
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ padding: 14, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ color: 'var(--foundry-text)', fontSize: 22, marginTop: 6, fontWeight: 300 }}>{value}</p>
    </div>
  );
}
