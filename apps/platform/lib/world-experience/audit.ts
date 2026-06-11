/** PASS-032B — World experience audit (target 85%+ per world before beta) */

import { getWorldAssets } from '../world-assets';
import { getWorldExperienceConfig, PASS_032B_WORLDS } from './registry';
import type { WorldExperienceAuditRow } from './types';

function scoreWorld(slug: string): WorldExperienceAuditRow | null {
  const config = getWorldExperienceConfig(slug);
  if (!config) return null;
  const assets = getWorldAssets(slug);
  const e = config.emotionalScores;
  const m = config.modules;
  const c = config.community;
  const p = config.mission1Premium;

  const heroQuality = Math.round((e.emotionalPull + e.visualQuality + e.firstActionClarity) / 3);
  const firstMissionQuality =
    [p.aboutToDo, p.whyItMatters, p.quickVersion, p.fullVersion, p.submitArtifact, p.debriefPrompt, p.tomorrowStep].filter(
      (s) => s.length > 40,
    ).length >= 6
      ? 92
      : 75;
  const toolDepth = Math.min(100, 70 + m.length * 4 + (m.filter((x) => x.fields?.length).length > 0 ? 10 : 0));
  const visualRichness = assets.heroGradient ? 88 : 70;
  const communityAtmosphere =
    c.starterDiscussions.length >= 4 && c.workingOn.length >= 3 && c.firstContributionCta.length > 20 ? 90 : 75;
  const copyQuality = Math.round((e.craftAuthenticity + e.depthPerception) / 2);
  const internalLanguageRemoved = config.secretPathLine.includes('course') ? 80 : 92;
  const returnHookClarity = Math.round((e.returnDesire + e.firstActionClarity) / 2);

  const scores = [
    heroQuality,
    firstMissionQuality,
    toolDepth,
    visualRichness,
    communityAtmosphere,
    copyQuality,
    internalLanguageRemoved,
    returnHookClarity,
  ];
  const totalScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return {
    slug,
    displayName: config.displayName,
    heroQuality,
    firstMissionQuality,
    toolDepth,
    visualRichness,
    communityAtmosphere,
    copyQuality,
    internalLanguageRemoved,
    returnHookClarity,
    totalScore,
    status: totalScore >= 85 ? 'READY' : 'PARTIAL',
  };
}

export function auditWorldExperience(slug: string): WorldExperienceAuditRow | null {
  return scoreWorld(slug);
}

export function auditAllWorldExperiences(): WorldExperienceAuditRow[] {
  return PASS_032B_WORLDS.map((s) => scoreWorld(s)!).filter(Boolean);
}

export function getWorldExperienceSnapshot() {
  const rows = auditAllWorldExperiences();
  const avg = rows.length > 0 ? Math.round(rows.reduce((s, r) => s + r.totalScore, 0) / rows.length) : 0;
  const ready = rows.filter((r) => r.status === 'READY').length;
  return {
    pass: 'PASS-032B',
    worlds: rows.length,
    avg_experience_score: avg,
    worlds_ready: ready,
    target_score: 85,
    rows,
  };
}

export type WorldExperienceKpiSnapshot = {
  avg_experience_score: number;
  worlds_ready: number;
  worlds: number;
  target_score: number;
};

export function getWorldExperienceKpiSnapshot(): WorldExperienceKpiSnapshot {
  const s = getWorldExperienceSnapshot();
  return {
    avg_experience_score: s.avg_experience_score,
    worlds_ready: s.worlds_ready,
    worlds: s.worlds,
    target_score: s.target_score,
  };
}
