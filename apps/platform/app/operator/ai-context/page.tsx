import Link from 'next/link';
import {
  buildAtlasContext,
  exampleProofUserContext,
  generateMentorAnswer,
  validateAtlasAwareAI,
} from '@foundry/atlas-aware-ai';
import { buildAtlasDebugBundle, inventoryFactsForGraph } from '../../../lib/atlas-aware-ai/assemble';
import { inferGraphRef, resolveBourbonGraph } from '../../../lib/bourbon-graph';

export const metadata = {
  title: 'Atlas AI Context Debugger | Mission Control',
  description: 'PASS-040C — inspect what Atlas-Aware AI sees before it answers.',
};

const DEMO_SLUG = 'bottled-in-bond';

export default function AtlasAiContextPage() {
  const validation = validateAtlasAwareAI();
  const ref = inferGraphRef(DEMO_SLUG);
  const graph = ref ? resolveBourbonGraph(ref) : null;
  const proofUser = exampleProofUserContext();
  const debug = buildAtlasDebugBundle(DEMO_SLUG, proofUser);

  const atlas = graph
    ? buildAtlasContext({ graph, inventory_facts: inventoryFactsForGraph(graph) })
    : null;

  return (
    <main className="foundry-page foundry-page--wide foundry-page--fluid" style={{ padding: '2rem' }}>
      <Link href="/operator" className="foundry-link-accent" style={{ fontSize: 13 }}>
        ← Mission Control
      </Link>

      <header style={{ marginTop: 16, marginBottom: 32 }}>
        <p className="foundry-eyebrow">PASS-040C · Atlas-Aware AI</p>
        <h1 className="foundry-mc-title">AI Context Debugger</h1>
        <p className="foundry-muted" style={{ marginTop: 8, maxWidth: 640 }}>
          What the brain sees before it speaks — graph nodes, portable identity, confidence warnings,
          and unknown fields. Not generic ChatGPT. Foundry universe first.
        </p>
        <p style={{ fontSize: 13, marginTop: 12, color: validation.ok ? 'var(--foundry-success)' : 'var(--foundry-accent)' }}>
          validateAtlasAwareAI: {validation.ok ? '✓ OK' : `✗ ${validation.errors.join('; ')}`}
        </p>
      </header>

      {debug && (
        <>
          <Section title="Proof scenario — explore next">
            <AnswerBlock answer={debug.sample_answers.explore_next} />
          </Section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginTop: 28 }}>
            <Section title="User artifacts">
              <List items={debug.user.artifacts.map((a) => `${a.title} (${a.type})`)} empty="No artifacts in context" />
            </Section>
            <Section title="Graph history (memory)">
              <List items={debug.user.graph_views.map((g) => `${g.title} · ${g.slug}`)} empty="No graph views" />
            </Section>
            <Section title="Curiosity weights">
              <List
                items={debug.user.curiosity_topics.map((t) => `${t.label}: ${t.weight}`)}
                empty="No curiosity weights"
              />
            </Section>
            <Section title="Collection progress">
              <List
                items={debug.user.collections.map((c) => `${c.title}: ${c.unlocked}/${c.total}`)}
                empty="No collections"
              />
            </Section>
            <Section title="Sync threads">
              <List items={debug.user.sync_threads.map((t) => t.text)} empty="No sync threads" />
            </Section>
            <Section title="Saved rabbit holes">
              <List items={debug.user.saved_rabbit_holes.map((h) => h.title)} empty="None saved" />
            </Section>
          </div>

          <Section title="Identity narrative">
            <p style={{ color: 'var(--foundry-text)', fontSize: 14, lineHeight: 1.7 }}>
              {debug.user.curiosity_summary}
            </p>
            {debug.user.narrative && (
              <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
                {debug.user.narrative.recent_pattern}
              </p>
            )}
          </Section>

          <Section title={`Relevant Atlas nodes · ${DEMO_SLUG}`}>
            <List
              items={debug.atlas.edges.slice(0, 12).map((e) => `${e.title} → ${e.href} [${e.confidence}]`)}
              empty="No edges"
            />
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
              Anchor: {debug.atlas.anchor.title} — {debug.atlas.why_should_i_care}
            </p>
          </Section>

          <Section title="Confidence warnings">
            <List items={debug.atlas.confidence_warnings} empty="No warnings on this node" tone="warn" />
          </Section>

          <Section title="Unknown fields">
            <List items={debug.atlas.unknown_fields} empty="No unknown fields flagged" tone="muted" />
          </Section>

          <Section title="Inventory facts (Bourbon Intelligence)">
            <List
              items={debug.atlas.inventory_facts.map((f) => `${f.field}: ${f.value} [${f.confidence}]`)}
              empty="No inventory facts attached"
            />
          </Section>

          <Section title="All sample prompts">
            {(['why_care', 'explore_next', 'connect_shelf', 'what_unknown'] as const).map((p) => (
              <div key={p} style={{ marginBottom: 20 }}>
                <p style={{ color: 'var(--foundry-primary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {p.replace(/_/g, ' ')}
                </p>
                <AnswerBlock answer={debug.sample_answers[p]} />
              </div>
            ))}
          </Section>
        </>
      )}

      {!debug && atlas && (
        <Section title="Atlas context only (no debug bundle)">
          <p>{atlas.why_should_i_care}</p>
        </Section>
      )}

      {!graph && (
        <p style={{ color: 'var(--foundry-accent)' }}>Could not resolve graph for {DEMO_SLUG}</p>
      )}
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="foundry-card" style={{ padding: 20, marginTop: 20 }}>
      <h2 className="foundry-section-label">{title}</h2>
      {children}
    </section>
  );
}

function List({ items, empty, tone }: { items: string[]; empty: string; tone?: 'warn' | 'muted' }) {
  if (items.length === 0) {
    return <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>{empty}</p>;
  }
  const color =
    tone === 'warn' ? 'var(--foundry-accent)' : tone === 'muted' ? 'var(--foundry-text-muted)' : 'var(--foundry-text)';
  return (
    <ul style={{ margin: '8px 0 0', paddingLeft: 18, color, fontSize: 13, lineHeight: 1.7 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function AnswerBlock({ answer }: { answer: ReturnType<typeof generateMentorAnswer> }) {
  return (
    <div style={{ marginTop: 10 }}>
      <p style={{ color: 'var(--foundry-text)', fontSize: 14, lineHeight: 1.7 }}>{answer.answer}</p>
      {answer.confidence_notice && (
        <p style={{ color: 'var(--foundry-accent)', fontSize: 12, marginTop: 8 }}>⚠ {answer.confidence_notice}</p>
      )}
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 8 }}>
        Citations: {answer.citations.map((c) => c.label).join(' · ')}
      </p>
    </div>
  );
}
