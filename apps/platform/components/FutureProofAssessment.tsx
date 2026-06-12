'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CUSTOMER_SEGMENTS,
  FUTURE_PROOF_HEADLINE,
  FUTURE_PROOF_SUBHEAD,
  TRINITY_PATHS,
  scoreFutureProofAssessment,
  type AssessmentAnswers,
  type AssessmentResult,
  type CustomerSegment,
  type TrinityPath,
} from '../lib/future-proof-assessment';
import { trackPathClicked, trackValidationEvent } from '../lib/validation-tracker';

const PATH_HREFS: Record<string, string> = {
  'ai-builder': '/ai-builder',
  'financial-independence': '/financial-independence',
  'public-speaking': '/public-speaking',
};

function LevelPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: 0 | 1 | 2;
  onChange: (v: 0 | 1 | 2) => void;
}) {
  const options: { v: 0 | 1 | 2; text: string }[] = [
    { v: 0, text: 'Just starting' },
    { v: 1, text: 'Some experience' },
    { v: 2, text: 'Fairly strong' },
  ];
  return (
    <div style={{ marginTop: 16 }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, margin: '0 0 8px' }}>{label}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            style={{
              textAlign: 'left',
              padding: '12px 14px',
              background: value === o.v ? 'var(--foundry-success-bg-subtle)' : 'var(--foundry-surface-raised)',
              border: `1px solid ${value === o.v ? 'var(--foundry-success-bg)' : 'var(--foundry-border-subtle)'}`,
              borderRadius: 6,
              color: value === o.v ? 'var(--foundry-text)' : 'var(--foundry-text-muted)',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultPanel({ result }: { result: AssessmentResult }) {
  const href = PATH_HREFS[result.recommendedPath] ?? '/ai-builder';
  return (
    <section
      style={{
        marginTop: 28,
        padding: 24,
        background: 'var(--foundry-surface)',
        border: '1px solid var(--foundry-success-bg)',
        borderRadius: 8,
      }}
    >
      <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
        Your Future-Proof read
      </p>
      <h2 style={{ fontWeight: 300, fontSize: '1.5rem', marginTop: 12, color: 'var(--foundry-text)' }}>
        Start with {result.recommendedLabel}
      </h2>
      <div style={{ marginTop: 20, fontSize: 14, lineHeight: 1.8, color: 'var(--foundry-text-muted)' }}>
        <p>
          <span style={{ color: 'var(--foundry-text-faint)' }}>Where you are: </span>
          {result.whereYouAre}
        </p>
        <p>
          <span style={{ color: 'var(--foundry-text-faint)' }}>What you&apos;re missing: </span>
          {result.whatYouAreMissing}
        </p>
        <p>
          <span style={{ color: 'var(--foundry-text-faint)' }}>Path to start: </span>
          <span style={{ color: 'var(--foundry-text)' }}>{result.startPath}</span>
        </p>
        <p style={{ color: 'var(--foundry-success)', marginTop: 16 }}>{result.tomorrowHook}</p>
      </div>
      <Link
        href={href}
        onClick={() =>
          trackPathClicked(result.recommendedPath, '/future-proof', href)
        }
        style={{
          display: 'inline-block',
          marginTop: 24,
          padding: '14px 24px',
          background: 'var(--foundry-success-bg)',
          color: 'var(--foundry-text)',
          borderRadius: 6,
          fontSize: 14,
          textDecoration: 'none',
        }}
      >
        Start {result.recommendedLabel} →
      </Link>
    </section>
  );
}

export function FutureProofAssessment({ choosePath }: { choosePath?: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    segment: 'young-professional',
    aiLevel: 0,
    moneyLevel: 0,
    speakingLevel: 0,
    primaryWorry: 'job-security',
  });
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const chooseMeta = choosePath && choosePath in TRINITY_PATHS ? TRINITY_PATHS[choosePath as TrinityPath] : null;

  useEffect(() => {
    if (!choosePath) return;
    try {
      const saved = localStorage.getItem('foundry-future-proof-result');
      if (saved) {
        const parsed = JSON.parse(saved) as AssessmentResult;
        if (parsed.recommendedPath === choosePath) {
          setResult(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, [choosePath]);

  const trinityCards = useMemo(
    () =>
      (Object.keys(TRINITY_PATHS) as (keyof typeof TRINITY_PATHS)[]).map((key) => ({
        key,
        ...TRINITY_PATHS[key],
      })),
    []
  );

  function submit() {
    const scored = scoreFutureProofAssessment(answers);
    setResult(scored);
    void trackValidationEvent({
      event_type: 'assessment_completed',
      landing_page: '/future-proof',
      path_slug: scored.recommendedPath,
      metadata: { segment: answers.segment, recommended: scored.recommendedLabel },
    });
    void trackValidationEvent({
      event_type: 'path_started',
      landing_page: '/future-proof',
      path_slug: scored.recommendedPath,
      metadata: { source: 'assessment' },
    });
    try {
      localStorage.setItem('foundry-future-proof-result', JSON.stringify(scored));
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      {chooseMeta && !result && (
        <section
          style={{
            marginTop: 24,
            padding: 20,
            background: 'var(--foundry-primary-bg-subtle)',
            border: '1px solid var(--foundry-primary-border-dim)',
            borderRadius: 8,
          }}
        >
          <p style={{ color: 'var(--foundry-primary)', fontSize: 14, margin: 0 }}>
            Confirm {chooseMeta.label} is your path — take the 2-minute assessment below.
          </p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
            Or{' '}
            <Link href={`/explore/${choosePath}`} style={{ color: 'var(--foundry-success)' }}>
              learn more about {chooseMeta.label}
            </Link>
          </p>
        </section>
      )}

      <section style={{ marginTop: 32, padding: 28, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', margin: 0, color: 'var(--foundry-text)' }}>
          {FUTURE_PROOF_HEADLINE}
        </h1>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 12, lineHeight: 1.6 }}>{FUTURE_PROOF_SUBHEAD}</p>
      </section>

      <section style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {trinityCards.map((card) => (
          <div
            key={card.key}
            style={{ padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 8, border: '1px solid var(--foundry-border-subtle)' }}
          >
            <p style={{ color: 'var(--foundry-success)', fontSize: 11, margin: 0 }}>{card.question}</p>
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, marginTop: 8 }}>{card.label}</p>
            <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 6 }}>{card.outcome}</p>
          </div>
        ))}
      </section>

      {!result ? (
        <section style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <h2 style={{ fontSize: 16, fontWeight: 400, color: 'var(--foundry-text)', margin: 0 }}>
            Future-Proof Starter Assessment
          </h2>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}>
            For parents, students, young professionals, and career changers.
          </p>

          {step === 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Who are you?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginTop: 12 }}>
                {CUSTOMER_SEGMENTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setAnswers((a) => ({ ...a, segment: s.id as CustomerSegment }));
                      void trackValidationEvent({
                        event_type: 'assessment_started',
                        landing_page: '/future-proof',
                        metadata: { segment: s.id },
                      });
                      setStep(1);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: 14,
                      background: answers.segment === s.id ? 'var(--foundry-success-bg-subtle)' : 'var(--foundry-surface)',
                      border: '1px solid var(--foundry-border-subtle)',
                      borderRadius: 6,
                      color: 'var(--foundry-text)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontSize: 14 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--foundry-text-faint)', marginTop: 4 }}>{s.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <>
              <LevelPicker
                label="AI — creating value with tools"
                value={answers.aiLevel}
                onChange={(v) => setAnswers((a) => ({ ...a, aiLevel: v }))}
              />
              <LevelPicker
                label="Money — keeping and growing value"
                value={answers.moneyLevel}
                onChange={(v) => setAnswers((a) => ({ ...a, moneyLevel: v }))}
              />
              <LevelPicker
                label="Speaking — communicating value"
                value={answers.speakingLevel}
                onChange={(v) => setAnswers((a) => ({ ...a, speakingLevel: v }))}
              />
              <div style={{ marginTop: 20 }}>
                <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>Biggest worry right now?</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                  {(
                    [
                      ['job-security', 'Job / AI disruption'],
                      ['money', 'Money / stability'],
                      ['communication', 'Communication / visibility'],
                      ['community', 'Belonging / community'],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setAnswers((a) => ({ ...a, primaryWorry: id }))}
                      style={{
                        padding: '10px 14px',
                        background: answers.primaryWorry === id ? 'var(--foundry-success-bg-subtle)' : 'var(--foundry-surface)',
                        border: '1px solid var(--foundry-border-subtle)',
                        borderRadius: 6,
                        color: 'var(--foundry-text)',
                        fontSize: 13,
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={submit}
                style={{
                  marginTop: 24,
                  padding: '14px 24px',
                  background: 'var(--foundry-success-bg)',
                  border: 'none',
                  borderRadius: 6,
                  color: 'var(--foundry-text)',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                Get my path →
              </button>
            </>
          )}
        </section>
      ) : (
        <>
          <ResultPanel result={result} />
          <p style={{ marginTop: 16, fontSize: 13 }}>
            <button
              type="button"
              onClick={() => {
                setResult(null);
                setStep(0);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--foundry-text-faint)',
                cursor: 'pointer',
                fontSize: 13,
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Retake assessment
            </button>
          </p>
        </>
      )}
    </div>
  );
}
