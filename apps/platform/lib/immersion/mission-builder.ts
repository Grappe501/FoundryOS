import type { WorldMission } from '../../components/world/WorldMissionRunner';
import type { ImmersionMissionBlueprint } from './types';

export function buildImmersionMission(
  bp: ImmersionMissionBlueprint,
  nextMissionSlug?: string,
): WorldMission & { track: string; trackLabel: string } {
  return {
    slug: bp.slug,
    number: bp.number,
    track: bp.track,
    trackLabel: bp.track,
    title: bp.title,
    subtitle: bp.subtitle,
    outcome: bp.outcome,
    evidence: bp.evidence,
    timeEstimate: bp.timeEstimate,
    requiredLevel: bp.requiredLevel,
    futureProof: bp.futureProof,
    toolsNeeded: bp.toolsNeeded,
    tomorrowHook: bp.tomorrowHook,
    nextMissionSlug,
    steps: [
      { phase: 'Mission', title: 'Define your goal', body: bp.missionFocus },
      {
        phase: 'Build',
        title: 'Build the experience',
        body: `Work through each item. This is an experience you will remember — not a lesson to skim.`,
        checklist: bp.buildChecklist,
      },
      { phase: 'Show', title: 'Capture evidence', body: bp.showArtifact },
      { phase: 'Debrief', title: 'Debrief', body: bp.reflectPrompt },
      { phase: 'Refine', title: 'Refine once', body: bp.improveAction },
      { phase: 'Teach', title: 'Teach it', body: bp.mentorAction },
    ],
  };
}

export function chainMissions(
  missions: (WorldMission & { track?: string; trackLabel?: string })[],
): (WorldMission & { track?: string; trackLabel?: string })[] {
  return missions.map((m, i) => ({
    ...m,
    nextMissionSlug: i < missions.length - 1 ? missions[i + 1]!.slug : undefined,
  }));
}

export function withTrackLabels(
  missions: (WorldMission & { track?: string })[],
  trackLabels: Record<string, string>,
): (WorldMission & { track: string; trackLabel: string })[] {
  return missions.map((m) => ({
    ...m,
    track: m.track ?? 'foundation',
    trackLabel: trackLabels[m.track ?? 'foundation'] ?? m.track ?? 'Foundation',
  }));
}
