import Link from 'next/link';
import { ALL_CONSEQUENCE_CHAINS, LIVE_WORLDS_WITH_CONSEQUENCES } from '@foundry/consequence-engine';
import { DiscoveryGraphViewer } from '../../../components/operator/DiscoveryGraphViewer';

export const metadata = {
  title: 'Discovery Graph | Operator',
  description: 'Consequence chains — the map for building reactive worlds.',
};

export default function OperatorDiscoveryPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/ai-brain" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>AI Brain</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business</Link>

      <p style={{ color: '#8E6BBD', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-034J/N · Consequence Engine
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>Discovery Graph</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        Every action must have consequences. This graph is the source of truth for unlock chains across worlds —
        not spaghetti in UI code.
      </p>

      <section style={{ marginTop: 20, padding: 16, background: '#0F1218', border: '1px solid #2A2A3A', borderRadius: 8 }}>
        <p style={{ color: '#6B6B70', fontSize: 12, margin: 0 }}>Formula</p>
        <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8, fontFamily: 'monospace', lineHeight: 1.8 }}>
          User action → World changes → Identity changes → New opportunities
        </p>
      </section>

      <section style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <Stat label="Chains" value={ALL_CONSEQUENCE_CHAINS.length} />
        <Stat label="Worlds" value={LIVE_WORLDS_WITH_CONSEQUENCES.length} />
        <Stat label="Package" value="@foundry/consequence-engine" small />
      </section>

      <DiscoveryGraphViewer />
    </main>
  );
}

function Stat({ label, value, small }: { label: string; value: string | number; small?: boolean }) {
  return (
    <div style={{ padding: 14, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
      <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>{label}</p>
      <p style={{ color: '#E8E8EC', fontSize: small ? 11 : 22, marginTop: 6, fontWeight: 300 }}>{value}</p>
    </div>
  );
}
