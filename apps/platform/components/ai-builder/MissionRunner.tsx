'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackValidationEvent } from '../../lib/validation-tracker';
import type { AiBuilderMission } from '../../lib/ai-builder-world';

const PORTFOLIO_KEY = 'foundry-ai-portfolio';

export type PortfolioEntry = {
  missionSlug: string;
  missionTitle: string;
  completedAt: string;
  reflection: string;
};

export function getPortfolio(): PortfolioEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(PORTFOLIO_KEY) ?? '[]') as PortfolioEntry[];
  } catch {
    return [];
  }
}

function savePortfolio(entries: PortfolioEntry[]) {
  localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(entries));
}

export function MissionRunner({ mission }: { mission: AiBuilderMission }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const existing = getPortfolio().find((e) => e.missionSlug === mission.slug);
    if (existing) {
      setDone(true);
      setReflection(existing.reflection);
    }
  }, [mission.slug]);

  const step = mission.steps[stepIndex];
  const isLast = stepIndex === mission.steps.length - 1;

  function startMission() {
    setStarted(true);
    void trackValidationEvent({
      event_type: 'project_started',
      landing_page: '/ai-builder',
      path_slug: 'ai-builder',
      metadata: { mission: mission.slug, title: mission.title },
    });
    void trackValidationEvent({
      event_type: 'assessment_started',
      landing_page: `/ai-builder/missions/${mission.slug}`,
      path_slug: 'ai-builder',
      metadata: { mission: mission.slug },
    });
  }

  function completeMission() {
    const entry: PortfolioEntry = {
      missionSlug: mission.slug,
      missionTitle: mission.title,
      completedAt: new Date().toISOString(),
      reflection: reflection.trim() || 'Mission completed.',
    };
    const entries = getPortfolio().filter((e) => e.missionSlug !== mission.slug);
    entries.push(entry);
    savePortfolio(entries);
    setDone(true);
    void trackValidationEvent({
      event_type: 'assessment_completed',
      landing_page: `/ai-builder/missions/${mission.slug}`,
      path_slug: 'ai-builder',
      metadata: { mission: mission.slug, completed: true },
    });
  }

  if (done) {
    return (
      <section style={{ marginTop: 24, padding: 28, background: '#1A2A1A', borderRadius: 8, border: '1px solid #2A4A2A' }}>
        <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Mission complete
        </p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 12, color: '#E8E8EC' }}>{mission.title}</h2>
        <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Your reflection and evidence are saved to <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>My AI Portfolio</strong>.
        </p>
        {reflection && (
          <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 12, fontStyle: 'italic', lineHeight: 1.6 }}>
            &ldquo;{reflection}&rdquo;
          </p>
        )}
        <div style={{ marginTop: 24, padding: 16, background: '#0F0F12', borderRadius: 6, border: '1px solid #2A4A2A' }}>
          <p style={{ color: '#C8A96E', fontSize: 13, margin: 0 }}>
            <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>Tomorrow: </strong>
            {mission.tomorrowHook.replace(/^Tomorrow:\s*/i, '')}
          </p>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/ai-builder/portfolio"
            style={{
              padding: '12px 20px',
              background: '#2A4A2A',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            View portfolio →
          </Link>
          {mission.nextMissionSlug && (
            <Link
              href={`/ai-builder/missions/${mission.nextMissionSlug}`}
              style={{
                padding: '12px 20px',
                border: '1px solid #2A4A2A',
                borderRadius: 6,
                color: '#6B9B6B',
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              Start next mission →
            </Link>
          )}
          <Link
            href="/ai-builder/playground"
            style={{ padding: '12px 20px', border: '1px solid #1A1A1E', borderRadius: 6, color: '#8A8A8E', fontSize: 14, textDecoration: 'none' }}
          >
            Playground
          </Link>
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <p style={{ color: '#6B6B70', fontSize: 12 }}>About {mission.timeEstimate} · {mission.requiredLevel}</p>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>{mission.outcome}</p>
        {mission.toolsNeeded && (
          <div style={{ marginTop: 20, padding: 16, background: '#111114', borderRadius: 6, border: '1px solid #1A1A1E' }}>
            <p style={{ color: '#6B9B6B', fontSize: 12, margin: '0 0 8px' }}>What you need to start</p>
            <p style={{ color: '#8A8A8E', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{mission.toolsNeeded}</p>
          </div>
        )}
        <p style={{ color: '#6B9B6B', fontSize: 13, marginTop: 16 }}>
          <strong style={{ fontWeight: 400, color: '#E8E8EC' }}>What you will submit: </strong>
          {mission.evidence}
        </p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>
          Six steps: Mission → Build → Show → Reflect → Improve → Mentor. Click Accept, then follow each step.
        </p>
        <button
          type="button"
          onClick={startMission}
          style={{
            marginTop: 24,
            padding: '14px 24px',
            background: '#2A4A2A',
            border: 'none',
            borderRadius: 6,
            color: '#E8E8EC',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          Accept Mission →
        </button>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8, border: '1px solid #2A4A2A' }}>
      <p style={{ color: '#6B6B70', fontSize: 11, margin: '0 0 12px' }}>
        Step {stepIndex + 1} of {mission.steps.length}
      </p>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 20 }}>
        {mission.steps.map((s, i) => (
          <span
            key={`${s.phase}-${i}`}
            style={{
              fontSize: 11,
              padding: '4px 8px',
              borderRadius: 4,
              background: i === stepIndex ? '#1A2A1A' : i < stepIndex ? '#111114' : 'transparent',
              color: i <= stepIndex ? '#6B9B6B' : '#4A4A4E',
              border: `1px solid ${i === stepIndex ? '#2A4A2A' : '#1A1A1E'}`,
            }}
          >
            {s.phase}
          </span>
        ))}
      </div>
      <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        {step?.phase}
      </p>
      <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: '#E8E8EC' }}>{step?.title}</h2>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{step?.body}</p>
      {step?.checklist && (
        <ul style={{ margin: '16px 0 0', paddingLeft: 20, color: '#8A8A8E', fontSize: 13, lineHeight: 1.9 }}>
          {step.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {isLast && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#6B6B70', fontSize: 12, margin: '0 0 8px' }}>Your reflection (saved to portfolio as your mission artifact)</p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Example: I built a math helper that quizzed me on fractions. It worked best when I asked it to explain step-by-step."
            rows={4}
            style={{
              width: '100%',
              padding: 12,
              background: '#111114',
              border: '1px solid #2A2A2E',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 14,
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
      )}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={() => setStepIndex((i) => i - 1)}
            style={{
              padding: '10px 18px',
              background: 'transparent',
              border: '1px solid #1A1A1E',
              borderRadius: 6,
              color: '#8A8A8E',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            onClick={() => setStepIndex((i) => i + 1)}
            style={{
              padding: '10px 18px',
              background: '#2A4A2A',
              border: 'none',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Done with {step?.phase} — Next: {mission.steps[stepIndex + 1]?.phase} →
          </button>
        ) : (
          <button
            type="button"
            onClick={completeMission}
            style={{
              padding: '10px 18px',
              background: '#2A4A2A',
              border: 'none',
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Complete Mission →
          </button>
        )}
      </div>
    </section>
  );
}
