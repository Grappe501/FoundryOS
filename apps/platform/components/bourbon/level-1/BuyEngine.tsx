'use client';

import { useState } from 'react';
import Link from 'next/link';
import { recommendBottles, type BuyQuizAnswers } from '../../../lib/bourbon-level-1/buy-engine';

const ACCENT = 'var(--foundry-primary)';

export function BuyEngine() {
  const [answers, setAnswers] = useState<BuyQuizAnswers>({
    budget: 40,
    sweet: true,
    spicy: false,
    beginner: true,
    collector: false,
    hosting: false,
  });
  const [result, setResult] = useState<ReturnType<typeof recommendBottles> | null>(null);

  function submit() {
    setResult(recommendBottles(answers));
  }

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Standing in the liquor store aisle? Answer five questions. Get three bottles with reasons — not a random list.
      </p>

      <div style={{ marginTop: 24, display: 'grid', gap: 20 }}>
        <Question label="Budget per bottle">
          {([20, 40, 60, 100] as const).map((b) => (
            <Chip key={b} active={answers.budget === b} onClick={() => setAnswers({ ...answers, budget: b })}>
              ${b}
            </Chip>
          ))}
        </Question>

        <Question label="Taste lean">
          <Chip active={answers.sweet && !answers.spicy} onClick={() => setAnswers({ ...answers, sweet: true, spicy: false })}>Sweet</Chip>
          <Chip active={answers.spicy && !answers.sweet} onClick={() => setAnswers({ ...answers, spicy: true, sweet: false })}>Spicy</Chip>
          <Chip active={answers.sweet && answers.spicy} onClick={() => setAnswers({ ...answers, sweet: true, spicy: true })}>Both</Chip>
        </Question>

        <Question label="You are…">
          <Chip active={answers.beginner} onClick={() => setAnswers({ ...answers, beginner: !answers.beginner, collector: answers.beginner ? answers.collector : false })}>New drinker</Chip>
          <Chip active={answers.collector} onClick={() => setAnswers({ ...answers, collector: !answers.collector, beginner: false })}>Collector</Chip>
          <Chip active={answers.hosting} onClick={() => setAnswers({ ...answers, hosting: !answers.hosting })}>Hosting friends</Chip>
        </Question>

        <button
          type="button"
          onClick={submit}
          style={{ padding: '14px 24px', background: '#4A4020', border: 'none', borderRadius: 8, color: '#E8E8EC', fontSize: 15, cursor: 'pointer', width: 'fit-content' }}
        >
          Show me three bottles →
        </button>
      </div>

      {result && (
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, color: ACCENT, fontWeight: 400 }}>Your picks</h2>
          <div style={{ marginTop: 16, display: 'grid', gap: 14 }}>
            {result.map(({ bottle, reason }, i) => (
              <article key={bottle.slug} style={{ padding: 20, background: '#0F0F12', borderRadius: 10, border: '1px solid #2A2520' }}>
                <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>#{i + 1} · ~${bottle.priceUsd} · {bottle.proof} proof</p>
                <p style={{ color: '#E8E8EC', fontSize: 17, marginTop: 8 }}>{bottle.name}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 4 }}>{bottle.producerName} · {bottle.mashbill.replace('-', ' ')}</p>
                <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.65 }}>{reason}</p>
                <Link href={`/bourbon/producers/${bottle.producerSlug}`} style={{ color: ACCENT, fontSize: 12, marginTop: 12, display: 'inline-block' }}>
                  Explore {bottle.producerName} →
                </Link>
              </article>
            ))}
          </div>
          <Link href="/bourbon/dna" style={{ display: 'inline-block', marginTop: 20, color: ACCENT, fontSize: 14 }}>
            Build your Bourbon DNA from games →
          </Link>
        </section>
      )}
    </div>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ color: '#E8E8EC', fontSize: 14, marginBottom: 10 }}>{label}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 16px',
        borderRadius: 999,
        border: `1px solid ${active ? 'var(--foundry-primary)' : '#2A2A2E'}`,
        background: active ? '#4A4020' : 'transparent',
        color: active ? '#E8E8EC' : '#8A8A8E',
        fontSize: 13,
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
