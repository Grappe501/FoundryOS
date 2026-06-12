import Link from 'next/link';
import {
  AGENCY_METRIC_EXAMPLES,
  AGENCY_PRINCIPLE,
  BURT_PASS_010_FOCUS,
  COMPANION_HOME_SCREEN,
  COMPANION_PRINCIPLE,
  COMPOUNDING_DATASETS,
  DAILY_LOOP,
  DEFENSIBILITY_PRINCIPLE,
  EXAMPLE_MOMENTUM,
  EXAMPLE_NEXT_ACTIONS,
  EXAMPLE_TRANSFORMATION_CYCLE,
  EXAMPLE_TRANSFORMATION_VELOCITY,
  EXAMPLE_WEIGHTED_RELATIONSHIPS,
  FOUNDRY_COMPASS,
  FOUNDRY_HOME_VISION,
  FOUNDRY_ORGANIZATIONS_VISION,
  GRAPH_COMPARISON,
  HUMAN_DEVELOPMENT_LOOP_FLOW,
  HUMAN_DEVELOPMENT_LOOP_PRINCIPLE,
  JOURNEY_DATASET_PRINCIPLE,
  KNOWLEDGE_NOT_TRANSFORMATION,
  LONG_TERM_TEST,
  MENTOR_INTELLIGENCE,
  MOMENTUM_ENGINE_TRACKS,
  MOMENTUM_QUESTION,
  MOMENTUM_SIGNALS,
  NEXT_ACTION_ENGINE_LABEL,
  PASS_010_DELIVERABLES,
  PASS_010_DEMONSTRATION_GOAL,
  PASS_010_PASS_GATE,
  PASS_010_PASS_GATE_RULE,
  PASS_010_SUCCESS_CRITERIA,
  PASS_010_TITLE,
  PLATFORM_COMPARISON,
  COMPASS_DIRECTION_TYPES,
  TRANSFORMATION_ANALYTICS_METRICS,
  TRANSFORMATION_FEEDBACK_LOOP,
  TRANSFORMATION_GRAPH_FLOW,
  TRANSFORMATION_GRAPH_QUERIES,
  TRANSFORMATION_INTELLIGENCE,
  TRANSFORMATION_MOMENTUM_LABEL,
  TRANSFORMATION_PASS_GATE,
  TRANSFORMATION_PASS_GATE_RULE,
  TRANSFORMATION_VELOCITY_LABEL,
  WEIGHTING_EVOLUTION,
  WHY_NEXT_BEST_STEP_QUESTION,
  WHY_TRANSPARENCY_PRINCIPLE,
  WISDOM_DATASET_PRINCIPLE,
} from '@foundry/transformation-graph-engine';
import {
  EVIDENCE_PRINCIPLE,
  EVIDENCE_REGISTRY,
  EVIDENCE_TIERS,
  EVIDENCE_TIERS_PRINCIPLE,
  PASS_011_TITLE,
} from '@foundry/evidence-engine';
import {
  EXAMPLE_GRAPH_INSIGHTS,
  EXAMPLE_TRANSFORMATION_STORY,
  HUMAN_GROWTH_LOOP_FLOW,
  PASS_010_REFLECTION_ENGINE,
  PROJECT_COMPLETION_REFLECTION,
  REFLECTION_PRINCIPLE,
  REFLECTION_TEMPLATES,
  TRANSFORMATION_INTELLIGENCE_LOOP_FLOW,
  TRANSFORMATION_PATTERNS_PRINCIPLE,
  TRANSFORMATION_PATTERNS_REGISTRY,
  TRANSFORMATION_STORIES_PRINCIPLE,
} from '@foundry/reflection-engine';

export default function TransformationGraphPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#08080A', color: '#E8E8EC', padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/" style={{ color: '#6B6B70', fontSize: 13 }}>← Mission Control</Link>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>Transformation Graph</h1>
      <p style={{ color: 'var(--foundry-primary)', fontSize: 15, marginTop: 8 }}>{COMPANION_PRINCIPLE.headline}</p>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{COMPANION_PRINCIPLE.is}</p>
      <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{DEFENSIBILITY_PRINCIPLE.is}</p>

      <section style={{ marginTop: 24, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>PASS-010 Success</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12, lineHeight: 1.5 }}>{PASS_010_SUCCESS_CRITERIA}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>{BURT_PASS_010_FOCUS}</p>
      </section>

      <section style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {PLATFORM_COMPARISON.map((p) => (
          <div key={p.platform} style={{ padding: 14, background: '#0F0F12', borderRadius: 8, border: p.platform === 'Foundry' ? '1px solid #2A2520' : '1px solid #1A1A1E' }}>
            <div style={{ color: p.platform === 'Foundry' ? 'var(--foundry-primary)' : '#8A8A8E', fontSize: 12 }}>{p.platform}</div>
            <div style={{ color: '#E8E8EC', fontSize: 13, marginTop: 6 }}>{p.behavior}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {Object.values(GRAPH_COMPARISON).map((g) => (
          <div key={g.name} style={{ padding: 16, background: '#0F0F12', borderRadius: 8, border: g.name === 'Foundry' ? '1px solid #2A2520' : '1px solid #1A1A1E' }}>
            <div style={{ color: g.name === 'Foundry' ? 'var(--foundry-primary)' : '#8A8A8E', fontSize: 13 }}>{g.name}</div>
            <div style={{ color: '#E8E8EC', fontSize: 14, marginTop: 6 }}>{g.graph}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Human Development Loop</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{HUMAN_DEVELOPMENT_LOOP_FLOW}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{HUMAN_DEVELOPMENT_LOOP_PRINCIPLE}</p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>PASS-010 Demonstration Goal</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{PASS_010_DEMONSTRATION_GOAL}</p>
        {EXAMPLE_TRANSFORMATION_CYCLE.map((s) => (
          <div key={s.slug} style={{ padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{s.step}</span>
            <span style={{ color: '#6B6B70' }}> — {s.output}</span>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Three Compounding Datasets</h2>
        {COMPOUNDING_DATASETS.map((d) => (
          <div key={d.key} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{d.name}</span>
            <span style={{ color: '#6B6B70' }}> — {d.question}</span>
          </div>
        ))}
        <p style={{ color: 'var(--foundry-primary)', fontSize: 11, marginTop: 12 }}>{JOURNEY_DATASET_PRINCIPLE}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Daily Loop</h2>
        {DAILY_LOOP.map((d) => (
          <div key={d.rhythm} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{d.rhythm}</span>
            <span style={{ color: 'var(--foundry-primary)' }}> — {d.question}</span>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          {COMPANION_HOME_SCREEN.map((line) => (
            <div key={line} style={{ color: '#8A8A8E', fontSize: 12, padding: '2px 0' }}>{line}</div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{FOUNDRY_COMPASS.headline}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 12 }}>{FOUNDRY_COMPASS.evolves_from} → {FOUNDRY_COMPASS.evolves_to}</p>
        {COMPASS_DIRECTION_TYPES.map((d) => (
          <div key={d.type} style={{ padding: '8px 0', fontSize: 12, color: '#6B6B70' }}>
            <span style={{ color: '#E8E8EC' }}>{d.label}</span> — {d.when}
          </div>
        ))}
        <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 12 }}>{MENTOR_INTELLIGENCE.headline} ({MENTOR_INTELLIGENCE.timing})</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4 }}>{MENTOR_INTELLIGENCE.example}</p>
      </section>

      <section style={{ marginTop: 32, padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Long-Term Test</h2>
        <p style={{ color: '#8B4545', fontSize: 12, marginTop: 12, textDecoration: 'line-through' }}>{LONG_TERM_TEST.not}</p>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>{LONG_TERM_TEST.is}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Graph Flow</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8 }}>{TRANSFORMATION_GRAPH_FLOW}</p>
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Agency Principle</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{AGENCY_PRINCIPLE.question}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>Optimizes for {AGENCY_PRINCIPLE.optimizes_for} — not {AGENCY_PRINCIPLE.not.join(', ')}</p>
        <p style={{ color: '#8A8A8E', fontSize: 12, marginTop: 12 }}>{KNOWLEDGE_NOT_TRANSFORMATION}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 6 }}>{WEIGHTING_EVOLUTION}</p>
        {AGENCY_METRIC_EXAMPLES.map((e) => (
          <div key={e.domain} style={{ padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{e.domain}</span>
            <div style={{ color: '#8B4545', marginTop: 4 }}>✗ {e.bad_metric}</div>
            <div style={{ color: 'var(--foundry-primary)', marginTop: 2 }}>✓ {e.good_metric}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Pass Gate (PASS-009)</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{TRANSFORMATION_PASS_GATE}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{TRANSFORMATION_PASS_GATE_RULE}</p>
      </section>

      <section style={{ marginTop: 16, padding: 20, background: '#0F0F12', border: '1px solid #2A2520', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', margin: 0 }}>Pass Gate (PASS-010)</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 12 }}>{PASS_010_PASS_GATE}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{PASS_010_PASS_GATE_RULE}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{PASS_010_TITLE}</h2>
        {PASS_010_DELIVERABLES.map((d) => (
          <div key={d} style={{ fontSize: 13, color: '#8A8A8E', padding: '6px 0' }}>{d}</div>
        ))}
        <h3 style={{ fontSize: 13, color: '#E8E8EC', marginTop: 20, fontWeight: 400 }}>Graph Queries</h3>
        {TRANSFORMATION_GRAPH_QUERIES.map((q) => (
          <div key={q.slug} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 13, color: '#8A8A8E' }}>
            {q.question}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Relationship Weighting</h2>
        {EXAMPLE_WEIGHTED_RELATIONSHIPS.map((r) => (
          <div key={`${r.source}-${r.target}`} style={{ padding: '10px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{r.source}</span>
            <span style={{ color: '#4A4A4E' }}> → </span>
            <span style={{ color: '#E8E8EC' }}>{r.target}</span>
            <span style={{ color: 'var(--foundry-primary)', marginLeft: 8 }}>weight {r.weight}</span>
            <div style={{ color: '#6B6B70', marginTop: 4 }}>{r.rationale}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Transformation Analytics</h2>
        {TRANSFORMATION_ANALYTICS_METRICS.map((m) => (
          <div key={m.key} style={{ fontSize: 13, color: '#8A8A8E', padding: '4px 0' }}>{m.label}</div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{TRANSFORMATION_VELOCITY_LABEL}</h2>
        {EXAMPLE_TRANSFORMATION_VELOCITY.map((v) => (
          <div key={v.path_slug} style={{ marginTop: 16, padding: 12, background: '#0F0F12', borderRadius: 8 }}>
            <div style={{ color: '#E8E8EC', fontSize: 13 }}>{v.path_display_name}</div>
            <div style={{ color: '#6B6B70', fontSize: 12, marginTop: 6 }}>
              Avg {v.average_completion_months} mo · Fastest {v.fastest_completion_months} mo
              {v.completion_rate_pct > 0 ? ` · ${v.completion_rate_pct}% completion` : ''}
            </div>
            {v.most_predictive_projects.map((p) => (
              <div key={p.slug} style={{ color: '#8A8A8E', fontSize: 12, padding: '2px 0' }}>
                {p.display_name} (weight {p.predictive_weight})
              </div>
            ))}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{TRANSFORMATION_MOMENTUM_LABEL}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13 }}>{MOMENTUM_QUESTION}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {MOMENTUM_ENGINE_TRACKS.map((t) => (
            <span key={t} style={{ padding: '6px 12px', background: '#111114', borderRadius: 4, fontSize: 12, color: '#8A8A8E' }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 12, background: '#0F0F12', borderRadius: 8 }}>
          <div style={{ color: '#E8E8EC', fontSize: 13 }}>Momentum Score: {EXAMPLE_MOMENTUM.momentum_score} ({EXAMPLE_MOMENTUM.state})</div>
          {MOMENTUM_SIGNALS.map((s) => (
            <div key={s.key} style={{ color: '#6B6B70', fontSize: 12, padding: '2px 0' }}>
              {s.label}: {EXAMPLE_MOMENTUM.signals[s.key] ?? 0}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{PASS_010_REFLECTION_ENGINE}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13 }}>{REFLECTION_PRINCIPLE.missing_without_reflection}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{HUMAN_GROWTH_LOOP_FLOW}</p>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 12, marginTop: 12 }}>{TRANSFORMATION_INTELLIGENCE_LOOP_FLOW}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12 }}>{PROJECT_COMPLETION_REFLECTION.join(' · ')}</p>
        {REFLECTION_TEMPLATES.map((t) => (
          <div key={t.slug} style={{ marginTop: 16, padding: 12, background: '#0F0F12', borderRadius: 8 }}>
            <div style={{ color: '#E8E8EC', fontSize: 13 }}>{t.display_name}</div>
            {t.completion_prompts.map((p) => (
              <div key={p.slug} style={{ color: '#6B6B70', fontSize: 12, padding: '2px 0' }}>{p.question}</div>
            ))}
          </div>
        ))}
        <h3 style={{ fontSize: 13, color: '#E8E8EC', marginTop: 20, fontWeight: 400 }}>Graph-Learned Insights</h3>
        {EXAMPLE_GRAPH_INSIGHTS.map((i) => (
          <div key={i.slug} style={{ marginTop: 12, padding: 12, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A2520' }}>
            <p style={{ color: '#8A8A8E', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{i.insight}</p>
            {i.sample_size && (
              <p style={{ color: '#4A4A4E', fontSize: 11, marginTop: 8 }}>n={i.sample_size.toLocaleString()} — not AI guessed</p>
            )}
          </div>
        ))}
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12 }}>{REFLECTION_PRINCIPLE.moat}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{NEXT_ACTION_ENGINE_LABEL}</h2>
        <p style={{ color: '#6B6B70', fontSize: 11 }}>Home: {FOUNDRY_HOME_VISION.is} — not {FOUNDRY_HOME_VISION.not.join(' · ')}</p>
        {EXAMPLE_NEXT_ACTIONS.map((a) => (
          <div key={a.path_slug} style={{ marginTop: 12, padding: 16, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A2520' }}>
            <div style={{ color: '#E8E8EC', fontSize: 13 }}>{a.path_display_name}</div>
            <div style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}>{a.aspiration}</div>
            <div style={{ color: 'var(--foundry-primary)', fontSize: 14, marginTop: 8 }}>Next Highest-Value Action: {a.recommended_action}</div>
            <div style={{ color: '#E8E8EC', fontSize: 12, marginTop: 8 }}>Impact Score: {a.impact_score}</div>
            <div style={{ color: '#8A8A8E', fontSize: 12, marginTop: 4 }}>Why: {a.why}</div>
            <div style={{ color: '#6B6B70', fontSize: 11, marginTop: 6 }}>{a.why_detail}</div>
          </div>
        ))}
        <p style={{ color: 'var(--foundry-primary)', fontSize: 12, marginTop: 16 }}>{WHY_NEXT_BEST_STEP_QUESTION}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 4 }}>{WHY_TRANSPARENCY_PRINCIPLE}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12 }}>
          Feedback loop: {TRANSFORMATION_FEEDBACK_LOOP.join(' → ')}
        </p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>Transformation Stories</h2>
        <p style={{ color: '#4A4A4E', fontSize: 11 }}>{TRANSFORMATION_STORIES_PRINCIPLE.timing}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{EXAMPLE_TRANSFORMATION_STORY.aspiration}</p>
        {EXAMPLE_TRANSFORMATION_STORY.beats.map((b) => (
          <div key={b.year} style={{ padding: '6px 0', fontSize: 12, color: '#8A8A8E' }}>
            <span style={{ color: 'var(--foundry-primary)' }}>{b.year}</span> — {b.event}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{TRANSFORMATION_PATTERNS_PRINCIPLE.headline}</h2>
        <p style={{ color: '#6B6B70', fontSize: 11 }}>{TRANSFORMATION_PATTERNS_PRINCIPLE.rule} · {TRANSFORMATION_PATTERNS_PRINCIPLE.timing}</p>
        {TRANSFORMATION_PATTERNS_REGISTRY.map((p) => (
          <div key={p.slug} style={{ marginTop: 12, padding: 12, background: '#0F0F12', borderRadius: 8, fontSize: 12 }}>
            <div style={{ color: '#E8E8EC' }}>{p.display_name}</div>
            <div style={{ color: '#8A8A8E', marginTop: 4 }}>{p.pattern}</div>
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{TRANSFORMATION_INTELLIGENCE.headline}</h2>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 14 }}>{TRANSFORMATION_INTELLIGENCE.definition}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 8 }}>{TRANSFORMATION_INTELLIGENCE.dataset}</p>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{PASS_011_TITLE}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13 }}>{EVIDENCE_PRINCIPLE.chain}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>{EVIDENCE_PRINCIPLE.with}</p>
        <p style={{ color: '#6B6B70', fontSize: 11, marginTop: 12 }}>{EVIDENCE_TIERS_PRINCIPLE}</p>
        {EVIDENCE_TIERS.map((t) => (
          <div key={t.tier} style={{ padding: '8px 0', borderBottom: '1px solid #1A1A1E', fontSize: 12 }}>
            <span style={{ color: '#E8E8EC' }}>{t.label}</span>
            <span style={{ color: '#6B6B70' }}> — {t.example}</span>
          </div>
        ))}
        {EVIDENCE_REGISTRY.map((p) => (
          <div key={p.slug} style={{ marginTop: 16, padding: 12, background: '#0F0F12', borderRadius: 8 }}>
            <div style={{ color: '#E8E8EC', fontSize: 13 }}>{p.display_name}</div>
            {p.evidence_items.map((e) => (
              <div key={e.slug} style={{ color: '#6B6B70', fontSize: 12, padding: '2px 0' }}>{e.display_name}</div>
            ))}
          </div>
        ))}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)' }}>{FOUNDRY_ORGANIZATIONS_VISION.headline}</h2>
        <p style={{ color: '#4A4A4E', fontSize: 11 }}>{FOUNDRY_ORGANIZATIONS_VISION.timing}</p>
        {FOUNDRY_ORGANIZATIONS_VISION.segments.map((s) => (
          <div key={s.type} style={{ padding: '8px 0', fontSize: 12, color: '#8A8A8E' }}>
            <span style={{ color: '#E8E8EC' }}>{s.type}</span> — {s.tracks.join(' · ')}
          </div>
        ))}
      </section>
    </main>
  );
}
