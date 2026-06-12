'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DISTILLERY_MATCH, MYSTERY_CHALLENGES } from '../../../lib/bourbon-level-1/blind-games';
import { bracketPairs } from '../../../lib/bourbon-level-1/shelf-builder';
import { recordBlindScore, recordBracketVote } from '../../../lib/bourbon-level-1/storage';

const ACCENT = 'var(--foundry-primary)';

export function BlindTastingGames() {
  return (
    <div>
      <MysteryGame />
      <DistilleryMatchGame />
      <BracketGame />
    </div>
  );
}

function MysteryGame() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const c = MYSTERY_CHALLENGES[idx];

  function guess(i: number) {
    setPicked(i);
    const correct = c.options[i].correct;
    recordBlindScore('mystery', correct ? 1 : 0, 1);
  }

  function next() {
    setPicked(null);
    setIdx((i) => (i + 1) % MYSTERY_CHALLENGES.length);
  }

  return (
    <GameBlock title="Mystery Bottle Challenge" subtitle="Color, nose, finish — guess proof, mashbill, or age">
      <p style={{ color: 'var(--foundry-primary)', fontSize: 13 }}>Color: {c.color}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8 }}><strong>Nose:</strong> {c.nose.join(' · ')}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}><strong>Palate:</strong> {c.palate.join(' · ')}</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}><strong>Finish:</strong> {c.finish}</p>
      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        {c.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            disabled={picked !== null}
            onClick={() => guess(i)}
            style={{
              padding: 12,
              textAlign: 'left',
              background: picked === null ? 'var(--foundry-surface)' : o.correct ? '#2A4020' : picked === i ? '#402020' : 'var(--foundry-surface)',
              border: '1px solid var(--foundry-border)',
              borderRadius: 6,
              color: 'var(--foundry-text)',
              cursor: picked === null ? 'pointer' : 'default',
              fontSize: 13,
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div style={{ marginTop: 16, padding: 16, background: 'var(--foundry-surface-raised)', borderRadius: 8 }}>
          <p style={{ color: ACCENT, fontSize: 14, margin: 0 }}>{c.reveal.name}</p>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{c.reveal.teach}</p>
          <button type="button" onClick={next} style={{ marginTop: 12, padding: '8px 16px', background: 'var(--foundry-primary-border-dim)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer' }}>
            Next mystery →
          </button>
        </div>
      )}
    </GameBlock>
  );
}

function DistilleryMatchGame() {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const q = DISTILLERY_MATCH[idx];

  function choose(slug: string, correct: boolean) {
    setPicked(slug);
    recordBlindScore('distillery-match', correct ? 1 : 0, 1);
  }

  return (
    <GameBlock title="Distillery Match" subtitle="Match flavor clues to the house">
      <p style={{ color: 'var(--foundry-text)', fontSize: 14, lineHeight: 1.65 }}>{q.description}</p>
      <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
        {q.options.map((o) => (
          <button
            key={o.producerSlug}
            type="button"
            disabled={picked !== null}
            onClick={() => choose(o.producerSlug, o.correct)}
            style={{
              padding: 12,
              background: picked === null ? 'var(--foundry-surface)' : o.correct ? '#2A4020' : picked === o.producerSlug ? '#402020' : 'var(--foundry-surface)',
              border: '1px solid var(--foundry-border)',
              borderRadius: 6,
              color: 'var(--foundry-text)',
              cursor: picked === null ? 'pointer' : 'default',
            }}
          >
            {o.name}
          </button>
        ))}
      </div>
      {picked && (
        <div style={{ marginTop: 16 }}>
          <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.6 }}>{q.explain}</p>
          <Link href={`/bourbon/producers/${q.options.find((o) => o.correct)?.producerSlug}`} style={{ color: ACCENT, fontSize: 13, marginTop: 8, display: 'inline-block' }}>
            Deep dive producer →
          </Link>
          <button
            type="button"
            onClick={() => { setPicked(null); setIdx((i) => (i + 1) % DISTILLERY_MATCH.length); }}
            style={{ display: 'block', marginTop: 12, padding: '8px 16px', background: 'var(--foundry-primary-border-dim)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', cursor: 'pointer' }}
          >
            Next match →
          </button>
        </div>
      )}
    </GameBlock>
  );
}

function BracketGame() {
  const [round, setRound] = useState(0);
  const [pairs, setPairs] = useState<{ a: { slug: string; name: string; priceUsd: number; proof: number; oneLiner: string }; b: { slug: string; name: string; priceUsd: number; proof: number; oneLiner: string } }[]>([]);

  useEffect(() => {
    setPairs(bracketPairs());
  }, []);

  const pair = pairs[round % Math.max(pairs.length, 1)];

  if (!pair) return null;

  function vote(winner: typeof pair.a) {
    const loser = winner.slug === pair.a.slug ? pair.b : pair.a;
    recordBracketVote(winner.slug, loser.slug);
    setRound((r) => r + 1);
  }

  return (
    <GameBlock title="Bourbon Brackets" subtitle="Which would you buy? Your picks feed Bourbon DNA">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <BottleCard bottle={pair.a} onPick={() => vote(pair.a)} />
        <span style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>vs</span>
        <BottleCard bottle={pair.b} onPick={() => vote(pair.b)} />
      </div>
      <Link href="/bourbon/dna" style={{ color: ACCENT, fontSize: 13, marginTop: 16, display: 'inline-block' }}>
        See your Bourbon DNA →
      </Link>
    </GameBlock>
  );
}

function BottleCard({ bottle, onPick }: { bottle: { name: string; priceUsd: number; proof: number; oneLiner: string }; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      style={{ padding: 16, background: 'var(--foundry-surface)', border: '1px solid var(--foundry-border-warm)', borderRadius: 8, cursor: 'pointer', textAlign: 'left', color: 'inherit' }}
    >
      <p style={{ color: 'var(--foundry-text)', fontSize: 14, margin: 0 }}>{bottle.name}</p>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, marginTop: 4 }}>${bottle.priceUsd} · {bottle.proof} pf</p>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 12, marginTop: 8, lineHeight: 1.4 }}>{bottle.oneLiner}</p>
    </button>
  );
}

function GameBlock({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <article style={{ marginTop: 32, padding: 24, background: 'var(--foundry-surface-raised)', borderRadius: 12, border: '1px solid var(--foundry-border-subtle)' }}>
      <h2 style={{ fontSize: 17, fontWeight: 400, margin: 0, color: 'var(--foundry-text)' }}>{title}</h2>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 6 }}>{subtitle}</p>
      {children}
    </article>
  );
}
