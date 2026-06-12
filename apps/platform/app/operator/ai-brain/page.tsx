import Link from 'next/link';
import { WorldCopilotPanel } from '../../../components/ai/WorldCopilotPanel';
import { COPILOT_SAFETY_RULES } from '@foundry/ai-orchestration';

export const metadata = {
  title: 'AI Brain | Operator',
  description: 'Global AI copilot orchestration — personas, safety, and world-aware recommendations.',
};

export default function OperatorAiBrainPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/business" style={{ color: '#6B6B70', fontSize: 13, marginLeft: 16 }}>Business</Link>
      <Link href="/search" style={{ color: '#6B9B6B', fontSize: 13, marginLeft: 16 }}>Search →</Link>

      <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-033 · AI Orchestration
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>AI Brain</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        World copilots with audience-aware safety. Foundation layer — wire to live LLM in a future pass.
      </p>

      <section style={{ marginTop: 24, padding: 20, background: '#0F1210', border: '1px solid #2A3A2A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Safety rules</h2>
        <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12, paddingLeft: 18, lineHeight: 1.8 }}>
          {COPILOT_SAFETY_RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <WorldCopilotPanel />
    </main>
  );
}
