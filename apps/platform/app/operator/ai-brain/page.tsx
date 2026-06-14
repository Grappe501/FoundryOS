import Link from 'next/link';
import { FoundryOrchestrationPanel } from '../../../components/ai/FoundryOrchestrationPanel';
import { COPILOT_SAFETY_RULES, getOrchestrationEngineStats, validateOrchestrationEngine } from '@foundry/ai-orchestration';

export const metadata = {
  title: 'AI Orchestration Stack | Operator',
  description: 'PASS-049 — Unified copilot, atlas, mentor, review, and recommendation orchestration.',
};

export default function OperatorAiBrainPage() {
  const validation = validateOrchestrationEngine();
  const stats = getOrchestrationEngineStats();

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--foundry-bg)', color: 'var(--foundry-text)', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      <Link href="/operator" style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>← Mission Control</Link>
      <Link href="/operator/ai-context" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Atlas debugger</Link>
      <Link href="/operator/reviews" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Reviews</Link>
      <Link href="/operator/recommendations" style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginLeft: 16 }}>Recommendations</Link>

      <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 16 }}>
        PASS-049 · Full AI Orchestration
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>AI Brain</h1>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
        One pipeline — copilot personas, Atlas-Aware answers, mentor signals, reviews, and recommendations.
        Rule-based foundation; LLM slot reserved behind the same contract.
      </p>

      <p style={{ fontSize: 13, marginTop: 12, color: validation.ok ? 'var(--foundry-success)' : 'var(--foundry-accent)' }}>
        validateOrchestrationEngine: {validation.ok ? '✓ OK' : `✗ ${validation.errors.join('; ')}`}
      </p>
      <p style={{ fontSize: 12, color: 'var(--foundry-text-faint)', marginTop: 4 }}>
        {stats.orchestration_actions} actions · {stats.copilot_personas} personas · stack: {stats.stack.join(', ')}
      </p>

      <section style={{ marginTop: 24, padding: 20, background: '#0F1210', border: '1px solid #2A3A2A', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-success)', margin: 0 }}>Safety rules</h2>
        <ul style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 12, paddingLeft: 18, lineHeight: 1.8 }}>
          {COPILOT_SAFETY_RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <FoundryOrchestrationPanel />
    </main>
  );
}
