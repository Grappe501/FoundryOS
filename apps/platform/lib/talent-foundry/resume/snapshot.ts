import type { JourneyStateId, TalentFoundrySession } from '../types';

export function resumeLandingState(session: TalentFoundrySession): JourneyStateId {
  if (session.stateId === 'layer2_operator' || session.stateId === 'layer3_leader') {
    return session.stateId;
  }
  if (session.stateId === 'layer2_offer' || session.stateId === 'layer3_offer') {
    return session.stateId;
  }
  if (session.flags.layer3Deferred && session.flags.keyTwo) return 'layer3_offer';
  if (session.flags.layer2Deferred && session.flags.keyOne && !session.flags.keyTwo) {
    return 'layer2_offer';
  }
  return session.stateId;
}

/** Persist only what the journey needs. No extra PII beyond the existing identity record. */
export function buildResumeSnapshot(session: TalentFoundrySession): TalentFoundrySession {
  if (!session.identity) {
    throw new Error('not_identified');
  }
  return {
    v: 1,
    campaignId: session.campaignId,
    stateId: resumeLandingState(session),
    startedAt: session.startedAt,
    evidence: session.evidence,
    flags: { ...session.flags },
    runs: session.runs ?? {},
    identity: {
      firstName: session.identity.firstName,
      lastName: session.identity.lastName,
      phone: session.identity.phone,
      email: session.identity.email,
      zip: session.identity.zip,
      startWhen: session.identity.startWhen,
      submissionId: session.identity.submissionId,
      userId: session.identity.userId,
      workflowIntakeId: session.identity.workflowIntakeId,
    },
    conversion: { ...session.conversion, times: [...session.conversion.times], areas: [...session.conversion.areas] },
    pathwayId: session.pathwayId,
    missionId: session.missionId,
    operator: session.operator ?? null,
    leader: session.leader ?? null,
  };
}

export function isResumeSnapshot(value: unknown): value is TalentFoundrySession {
  if (!value || typeof value !== 'object') return false;
  const s = value as TalentFoundrySession;
  return s.v === 1 && typeof s.campaignId === 'string' && typeof s.stateId === 'string' && Boolean(s.identity);
}
