'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { trackValidationEvent } from '../../lib/validation-tracker';
import { UpgradeMoment } from '../billing/UpgradeMoment';
import { getUpgradeMoment } from '../../lib/upgrade-moments';
import {
  FOUNDRY_DEBRIEF_PLACEHOLDER,
  FOUNDRY_MISSION_LOOP_TEXT,
  normalizeMissionPhase,
  type MissionLoopPhase,
} from '../../lib/voice-loop';

export type WorldMissionStep = {
  phase: MissionLoopPhase;
  title: string;
  body: string;
  checklist?: string[];
};

export type WorldMission = {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  outcome: string;
  evidence: string;
  timeEstimate: string;
  requiredLevel: string;
  futureProof: string;
  toolsNeeded?: string;
  tomorrowHook: string;
  nextMissionSlug?: string;
  steps: WorldMissionStep[];
};

export type PortfolioEntry = {
  missionSlug: string;
  missionTitle: string;
  completedAt: string;
  reflection: string;
};

export function getWorldPortfolio(key: string): PortfolioEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as PortfolioEntry[];
  } catch {
    return [];
  }
}

function saveWorldPortfolio(key: string, entries: PortfolioEntry[]) {
  localStorage.setItem(key, JSON.stringify(entries));
}

const DEFAULT_LOOP = FOUNDRY_MISSION_LOOP_TEXT;

export function WorldMissionRunner({
  mission,
  portfolioKey,
  basePath,
  pathSlug,
  portfolioLabel = 'your portfolio',
  loopDescription = DEFAULT_LOOP,
  reflectionPlaceholder = FOUNDRY_DEBRIEF_PLACEHOLDER,
}: {
  mission: WorldMission;
  portfolioKey: string;
  basePath: string;
  pathSlug: string;
  portfolioLabel?: string;
  loopDescription?: string;
  reflectionPlaceholder?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const startedAtRef = useRef<string | null>(null);

  useEffect(() => {
    const existing = getWorldPortfolio(portfolioKey).find((e) => e.missionSlug === mission.slug);
    if (existing) {
      setDone(true);
      setReflection(existing.reflection);
    }
  }, [mission.slug, portfolioKey]);

  useEffect(() => {
    if (!started || done) return;
    const step = mission.steps[stepIndex];
    if (!step) return;
    void trackValidationEvent({
      event_type: 'mission_step_viewed',
      landing_page: `${basePath}/missions/${mission.slug}`,
      path_slug: pathSlug,
      metadata: {
        mission: mission.slug,
        title: mission.title,
        step_index: stepIndex,
        step_phase: normalizeMissionPhase(step.phase),
      },
    });
  }, [started, done, stepIndex, mission, basePath, pathSlug]);

  const step = mission.steps[stepIndex];
  const isLast = stepIndex === mission.steps.length - 1;

  function startMission() {
    setStarted(true);
    startedAtRef.current = new Date().toISOString();
    void trackValidationEvent({
      event_type: 'mission_started',
      landing_page: basePath,
      path_slug: pathSlug,
      metadata: { mission: mission.slug, title: mission.title, started_at: startedAtRef.current },
    });
  }

  function completeMission() {
    const completedAt = new Date().toISOString();
    const startedAt = startedAtRef.current ?? completedAt;
    const durationMinutes = Math.max(
      1,
      Math.round((new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 60000),
    );
    const entry: PortfolioEntry = {
      missionSlug: mission.slug,
      missionTitle: mission.title,
      completedAt: new Date().toISOString(),
      reflection: reflection.trim() || 'Mission completed.',
    };
    const entries = getWorldPortfolio(portfolioKey).filter((e) => e.missionSlug !== mission.slug);
    entries.push(entry);
    saveWorldPortfolio(portfolioKey, entries);
    setDone(true);
    void fetch('/api/progress/mission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        world_slug: pathSlug,
        mission_slug: mission.slug,
        mission_title: mission.title,
        portfolio_key: portfolioKey,
        reflection: entry.reflection,
      }),
    }).catch(() => undefined);
    void trackValidationEvent({
      event_type: 'mission_completed',
      landing_page: `${basePath}/missions/${mission.slug}`,
      path_slug: pathSlug,
      metadata: {
        mission: mission.slug,
        mission_title: mission.title,
        completed: true,
        duration_minutes: durationMinutes,
      },
    });
    void trackValidationEvent({
      event_type: 'portfolio_created',
      landing_page: `${basePath}/portfolio`,
      path_slug: pathSlug,
      metadata: { mission: mission.slug, mission_title: mission.title },
    });
  }

  if (done) {
    const upgrade = getUpgradeMoment(pathSlug, 'mission_complete', mission.slug);
    return (
      <section style={{ marginTop: 24, padding: 28, background: 'var(--foundry-success-bg-subtle)', borderRadius: 8, border: '1px solid var(--foundry-success-bg)' }}>
        <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Mission complete
        </p>
        <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 12, color: 'var(--foundry-text)' }}>{mission.title}</h2>
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>
          Your reflection is saved to <strong style={{ fontWeight: 400, color: 'var(--foundry-text)' }}>{portfolioLabel}</strong>.
        </p>
        {reflection && (
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 12, fontStyle: 'italic', lineHeight: 1.6 }}>
            &ldquo;{reflection}&rdquo;
          </p>
        )}
        <div style={{ marginTop: 24, padding: 16, background: 'var(--foundry-surface)', borderRadius: 6, border: '1px solid var(--foundry-success-bg)' }}>
          <p style={{ color: 'var(--foundry-primary)', fontSize: 13, margin: 0 }}>
            <strong style={{ fontWeight: 400, color: 'var(--foundry-text)' }}>Tomorrow: </strong>
            {mission.tomorrowHook.replace(/^Tomorrow:\s*/i, '')}
          </p>
        </div>
        {upgrade && (
          <UpgradeMoment
            tier={upgrade.tier}
            headline={upgrade.headline}
            body={upgrade.body}
            premiumNext={upgrade.premiumNext}
            worldSlug={pathSlug}
            missionSlug={mission.slug}
            context={`mission_complete:${mission.slug}`}
          />
        )}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href={`${basePath}/portfolio`} style={{ padding: '12px 20px', background: 'var(--foundry-success-bg)', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 14, textDecoration: 'none' }}>
            View portfolio →
          </Link>
          {mission.nextMissionSlug && (
            <Link href={`${basePath}/missions/${mission.nextMissionSlug}`} style={{ padding: '12px 20px', border: '1px solid var(--foundry-success-bg)', borderRadius: 6, color: 'var(--foundry-success)', fontSize: 14, textDecoration: 'none' }}>
              Start next mission →
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (!started) {
    return (
      <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8 }}>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12 }}>About {mission.timeEstimate} · {mission.requiredLevel}</p>
        <p style={{ color: 'var(--foundry-text)', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>{mission.outcome}</p>
        {mission.toolsNeeded && (
          <div style={{ marginTop: 20, padding: 16, background: 'var(--foundry-surface-raised)', borderRadius: 6, border: '1px solid var(--foundry-border-subtle)' }}>
            <p style={{ color: 'var(--foundry-success)', fontSize: 12, margin: '0 0 8px' }}>What you need to start</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{mission.toolsNeeded}</p>
          </div>
        )}
        <p style={{ color: 'var(--foundry-success)', fontSize: 13, marginTop: 16 }}>
          <strong style={{ fontWeight: 400, color: 'var(--foundry-text)' }}>What you will submit: </strong>
          {mission.evidence}
        </p>
        <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12 }}>
          Six steps: {loopDescription}. Click Accept, then follow each step.
        </p>
        <button type="button" onClick={startMission} style={{ marginTop: 24, padding: '14px 24px', background: 'var(--foundry-success-bg)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 14, cursor: 'pointer' }}>
          Accept Mission →
        </button>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 24, padding: 24, background: 'var(--foundry-surface)', borderRadius: 8, border: '1px solid var(--foundry-success-bg)' }}>
      <p style={{ color: 'var(--foundry-text-faint)', fontSize: 11, margin: '0 0 12px' }}>Step {stepIndex + 1} of {mission.steps.length}</p>
      <p style={{ color: 'var(--foundry-success)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '16px 0 0' }}>{step ? normalizeMissionPhase(step.phase) : ''}</p>
      <h2 style={{ fontSize: 18, fontWeight: 400, marginTop: 8, color: 'var(--foundry-text)' }}>{step?.title}</h2>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 14, marginTop: 12, lineHeight: 1.7 }}>{step?.body}</p>
      {step?.checklist && (
        <ul style={{ margin: '16px 0 0', paddingLeft: 20, color: 'var(--foundry-text-muted)', fontSize: 13, lineHeight: 1.9 }}>
          {step.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {isLast && (
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={reflectionPlaceholder}
          rows={4}
          style={{ width: '100%', marginTop: 20, padding: 12, background: 'var(--foundry-surface-raised)', border: '1px solid var(--foundry-border)', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit' }}
        />
      )}
      <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {stepIndex > 0 && (
          <button type="button" onClick={() => setStepIndex((i) => i - 1)} style={{ padding: '10px 18px', background: 'transparent', border: '1px solid var(--foundry-border-subtle)', borderRadius: 6, color: 'var(--foundry-text-muted)', fontSize: 13, cursor: 'pointer' }}>
            ← Back
          </button>
        )}
        {!isLast ? (
          <button type="button" onClick={() => setStepIndex((i) => i + 1)} style={{ padding: '10px 18px', background: 'var(--foundry-success-bg)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 13, cursor: 'pointer' }}>
            Next: {mission.steps[stepIndex + 1] ? normalizeMissionPhase(mission.steps[stepIndex + 1]!.phase) : ''} →
          </button>
        ) : (
          <button type="button" onClick={completeMission} style={{ padding: '10px 18px', background: 'var(--foundry-success-bg)', border: 'none', borderRadius: 6, color: 'var(--foundry-text)', fontSize: 13, cursor: 'pointer' }}>
            Complete Mission →
          </button>
        )}
      </div>
    </section>
  );
}
