import type { EvidenceItem, JourneyStateId } from '../types';
import type { OperatorEvidenceSeed, OperatorRunState } from './types';

export function layer2Evidence(run: OperatorRunState, completed: boolean): Omit<EvidenceItem, 'id' | 'at'>[] {
  const items: OperatorEvidenceSeed[] = [
    { label: 'Layer 2 started', value: run.missionId, dimensions: ['follow_through', 'leadership_desire'], kind: 'mission' },
  ];
  if (run.firstPriority) {
    items.push({
      label: 'Initial priority',
      value: { choiceId: run.firstPriority, reasoning: run.firstReasoning || undefined },
      dimensions: ['logic_judgment', 'leadership_readiness'],
      kind: 'decision',
    });
  }
  if (run.assignments.length) {
    items.push({
      label: 'Delegation assignments',
      value: run.assignments,
      dimensions: ['delegation', 'people_development'],
      kind: 'decision',
    });
  }
  if (run.clarification) {
    items.push({
      label: 'Clarification behavior',
      value: run.clarification,
      dimensions: ['trust_discretion', 'logic_judgment', 'interpersonal'],
      kind: 'decision',
    });
  }
  if (run.organizerMessage.trim()) {
    items.push({
      label: 'Organizer communication',
      value: run.organizerMessage.trim(),
      dimensions: ['written_communication', 'interpersonal'],
      kind: 'text',
    });
  }
  if (run.interruption) {
    items.push({
      label: 'Interruption response',
      value: run.interruption,
      dimensions: ['logic_judgment', 'big_picture'],
      kind: 'decision',
    });
  }
  if (run.peopleFirst) {
    items.push({
      label: 'Response to volunteer mistake',
      value: run.peopleFirst,
      dimensions: ['people_development', 'interpersonal'],
      kind: 'decision',
    });
  }
  if (run.unknown) {
    items.push({
      label: 'Unknown-problem strategy',
      value: { first: run.unknown, follow: run.unknownAct, usedAi: run.usedAi },
      dimensions: ['logic_judgment', 'follow_through'],
      kind: 'decision',
    });
  }
  if (run.critical.length) {
    items.push({
      label: 'Critical outcomes before Kelly leaves',
      value: run.critical,
      dimensions: ['big_picture', 'logic_judgment'],
      kind: 'choice',
    });
  }
  if (run.handoffNote.trim()) {
    items.push({
      label: 'Shift handoff',
      value: run.handoffNote.trim(),
      dimensions: ['written_communication', 'follow_through', 'big_picture'],
      kind: 'text',
    });
  }
  if (run.reflectSelf.trim()) {
    items.push({
      label: 'Self-reflection',
      value: run.reflectSelf.trim(),
      dimensions: ['follow_through', 'logic_judgment'],
      kind: 'revision',
    });
  }
  if (run.reflectTeam.trim()) {
    items.push({
      label: 'Team-credit response',
      value: run.reflectTeam.trim(),
      dimensions: ['people_development', 'interpersonal'],
      kind: 'revision',
    });
  }
  if (completed) {
    items.push({
      label: 'Layer 2 completed',
      value: 'complete',
      dimensions: ['follow_through', 'leadership_readiness'],
      kind: 'mission',
    });
    items.push({
      label: 'KEY 02 ACQUIRED',
      value: 'acquired',
      dimensions: ['follow_through', 'leadership_desire'],
      kind: 'choice',
    });
  }

  return items.map((item) => ({
    stateId: 'layer2_operator' as JourneyStateId,
    kind: item.kind ?? 'decision',
    label: item.label,
    value: item.value,
    dimensions: item.dimensions,
  }));
}

export function alreadyHasLayer2Evidence(evidence: EvidenceItem[], label: string): boolean {
  return evidence.some((item) => item.stateId === 'layer2_operator' && item.label === label);
}
