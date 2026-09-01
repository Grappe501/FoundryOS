import type { EvidenceItem, JourneyStateId } from '../types';
import type { LeaderEvidenceSeed, LeaderRunState } from './types';

export function layer3Evidence(run: LeaderRunState, completed: boolean): Omit<EvidenceItem, 'id' | 'at'>[] {
  const items: LeaderEvidenceSeed[] = [
    {
      label: 'Layer 3 started',
      value: run.missionId,
      dimensions: ['people_development', 'leadership_desire'],
      kind: 'mission',
    },
  ];
  if (run.placements.length) {
    items.push({
      label: 'People placements',
      value: run.placements,
      dimensions: ['delegation', 'people_development', 'logic_judgment'],
      kind: 'decision',
    });
  }
  if (run.coachWho && run.coachHow) {
    items.push({
      label: 'First coaching decision',
      value: { who: run.coachWho, how: run.coachHow, note: run.coachNote.trim() || undefined },
      dimensions: ['people_development', 'interpersonal'],
      kind: 'decision',
    });
  }
  if (run.correctAct) {
    items.push({
      label: 'Correction of overstep',
      value: { act: run.correctAct, note: run.correctNote.trim() || undefined },
      dimensions: ['people_development', 'trust_discretion', 'interpersonal'],
      kind: 'decision',
    });
  }
  if (run.protectHow) {
    items.push({
      label: 'Protection without shrinking',
      value: { who: run.protectWho, how: run.protectHow },
      dimensions: ['people_development', 'logic_judgment'],
      kind: 'decision',
    });
  }
  if (run.investWho && run.investHow) {
    items.push({
      label: 'Development investment',
      value: { who: run.investWho, how: run.investHow, plan: run.investPlan.trim() || undefined },
      dimensions: ['people_development', 'follow_through', 'big_picture'],
      kind: 'decision',
    });
  }
  if (run.paidNeed) {
    items.push({
      label: 'Paid-role work needed',
      value: run.paidNeed,
      dimensions: ['big_picture', 'logic_judgment'],
      kind: 'choice',
    });
  }
  if (run.paidWho) {
    items.push({
      label: 'Paid-role recommendation',
      value: { who: run.paidWho, why: run.paidWhy.trim() || undefined },
      dimensions: ['people_development', 'leadership_readiness', 'written_communication'],
      kind: 'decision',
    });
  }
  if (run.leftoverNote.trim()) {
    items.push({
      label: 'Plan for people not chosen',
      value: run.leftoverNote.trim(),
      dimensions: ['people_development', 'interpersonal', 'written_communication'],
      kind: 'text',
    });
  }
  if (run.selfCoach.trim()) {
    items.push({
      label: 'Self-coaching',
      value: run.selfCoach.trim(),
      dimensions: ['follow_through', 'logic_judgment', 'leadership_desire'],
      kind: 'revision',
    });
  }
  if (completed) {
    items.push({
      label: 'Layer 3 completed',
      value: 'complete',
      dimensions: ['follow_through', 'people_development'],
      kind: 'mission',
    });
  }

  return items.map((item) => ({
    stateId: 'layer3_leader' as JourneyStateId,
    kind: item.kind ?? 'decision',
    label: item.label,
    value: item.value,
    dimensions: item.dimensions,
  }));
}

export function alreadyHasLayer3Evidence(evidence: EvidenceItem[], label: string): boolean {
  return evidence.some((item) => item.stateId === 'layer3_leader' && item.label === label);
}
