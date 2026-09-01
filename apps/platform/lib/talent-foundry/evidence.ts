import { TALENT_FOUNDRY_SOURCE } from './constants';
import type { TalentFoundrySession } from './types';

export const JOURNEY_VERSION = 1;

export type TalentFoundryPayload = {
  v: 1;
  source: typeof TALENT_FOUNDRY_SOURCE;
  campaignId: string;
  phase: 'identify' | 'continue';
  journeyVersion: number;
  submissionId?: string;
  startWhen?: string;
  flags: Record<string, unknown>;
  evidence: unknown[];
  routing?: Record<string, unknown>;
};

function slimEvidence(session: TalentFoundrySession): unknown[] {
  return session.evidence.slice(0, 80).map((item) => ({
    stateId: item.stateId,
    kind: item.kind,
    label: String(item.label).slice(0, 160),
    value: item.value,
    dimensions: item.dimensions,
    at: item.at,
  }));
}

export function buildIdentifyPayload(session: TalentFoundrySession, startWhen: string): TalentFoundryPayload {
  return {
    v: 1,
    source: TALENT_FOUNDRY_SOURCE,
    campaignId: session.campaignId,
    phase: 'identify',
    journeyVersion: JOURNEY_VERSION,
    startWhen: startWhen.slice(0, 120),
    flags: {
      willingToAct: session.flags.willingToAct,
      volunteerCommitment: session.flags.volunteerCommitment,
      internPathwayEligible: session.flags.internPathwayEligible,
      requiredScenarioComplete: session.flags.requiredScenarioComplete,
      optionalDoorsCompleted: session.flags.optionalDoorsCompleted,
      keyOne: session.flags.keyOne,
      keyTwo: session.flags.keyTwo,
      layer2Enabled: session.flags.layer2Enabled,
      layer3Enabled: session.flags.layer3Enabled,
      visitIntent: session.flags.visitIntent,
      firstVisitComplete: session.flags.firstVisitComplete,
    },
    evidence: slimEvidence(session),
  };
}

export function buildContinuePayload(session: TalentFoundrySession): TalentFoundryPayload {
  return {
    ...buildIdentifyPayload(session, session.identity?.startWhen ?? ''),
    phase: 'continue',
    submissionId: session.identity?.submissionId,
    routing: {
      paidInterest: session.conversion.paidInterest,
      visitIntent: session.flags.visitIntent,
      weekly: session.conversion.weekly,
      times: session.conversion.times,
      littleRock: session.conversion.littleRock,
      driving: session.conversion.driving,
      travel: session.conversion.travel,
      remote: session.conversion.remote,
      campus: session.conversion.campus,
      student: session.conversion.student,
      leadership: session.conversion.leadership,
      areas: session.conversion.areas,
      pathwayId: session.pathwayId,
      missionId: session.missionId,
    },
  };
}
