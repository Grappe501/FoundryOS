'use client';

import { useState, useEffect } from 'react';
import { getMonthlyChallenge } from '../../../lib/bourbon-level-1/agency/blind-league';
import { getLeagueScores, recordLeagueScore } from '../../../lib/bourbon-level-1/storage';
import { RabbitHoleFooter } from './RabbitHoleFooter';

const ACCENT = '#C8A96E';

export function BlindTastingLeague() {
  const challenge = getMonthlyChallenge();
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [past, setPast] = useState<ReturnType<typeof getLeagueScores>>([]);

  useEffect(() => {
    setPast(getLeagueScores());
    const existing = getLeagueScores().find((s) => s.monthKey === challenge.monthKey);
    if (existing) setSubmitted(true);
  }, [challenge.monthKey]);

  function pick(qIdx: number, optIdx: number) {
    if (submitted) return;
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
  }

  function submit() {
    let score = 0;
    challenge.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    recordLeagueScore({
      monthKey: challenge.monthKey,
      challengeId: challenge.id,
      score,
      total: challenge.questions.length,
      at: new Date().toISOString(),
    });
    setSubmitted(true);
    setPast(getLeagueScores());
  }

  const allAnswered = answers.length === challenge.questions.length && answers.every((a) => a !== undefined);
  const thisMonth = past.find((s) => s.monthKey === challenge.monthKey);

  return (
    <div>
      <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7 }}>
        Monthly blind league — guess mashbill, proof, age. Return every month. Track performance.
      </p>
      <p style={{ color: ACCENT, fontSize: 12, marginTop: 8 }}>{challenge.monthKey} · {challenge.title}</p>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 4 }}>{challenge.description}</p>

      {challenge.questions.map((q, qi) => (
        <article key={qi} style={{ marginTop: 20, padding: 18, background: '#111114', borderRadius: 10 }}>
          <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{q.prompt}</p>
          <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const showResult = submitted;
              const correct = q.answer === oi;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => pick(qi, oi)}
                  style={{
                    padding: '8px 14px',
                    fontSize: 12,
                    borderRadius: 6,
                    border: `1px solid ${showResult && correct ? '#6B9B6B' : selected ? ACCENT : '#2A2A2E'}`,
                    background: selected ? '#2A2520' : 'transparent',
                    color: '#E8E8EC',
                    cursor: submitted ? 'default' : 'pointer',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </article>
      ))}

      {!submitted && (
        <button type="button" disabled={!allAnswered} onClick={submit} style={{ marginTop: 24, padding: '12px 20px', borderRadius: 8, border: `1px solid ${ACCENT}`, background: allAnswered ? '#2A2520' : 'transparent', color: ACCENT, cursor: allAnswered ? 'pointer' : 'not-allowed', fontSize: 14 }}>
          Submit league score
        </button>
      )}

      {thisMonth && (
        <p style={{ color: ACCENT, marginTop: 20, fontSize: 15 }}>
          This month: {thisMonth.score}/{thisMonth.total}
        </p>
      )}

      {past.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: 13, color: '#6B6B70', fontWeight: 400 }}>League history</h2>
          {past.map((s) => (
            <p key={s.monthKey} style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>
              {s.monthKey}: {s.score}/{s.total}
            </p>
          ))}
        </section>
      )}
      <RabbitHoleFooter seed="league" />
    </div>
  );
}
