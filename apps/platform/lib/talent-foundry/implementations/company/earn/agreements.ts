import type { HumanGateKind } from '../spine/envelope';
import type { WorkshopSession } from '../types';

export type EarnGateKind = Extract<HumanGateKind, 'paid_project' | 'internship' | 'employment'>;

export type EarnAgreement = {
  id: string;
  gate: EarnGateKind;
  label: string;
  bound: string;
};

/** Classification only. No rate. No public-door bait. */
export const EARN_AGREEMENTS: EarnAgreement[] = [
  {
    id: 'E-paid_project',
    gate: 'paid_project',
    label: 'Paid project',
    bound: 'A classified project. Not a job. Not equity. Not a cohort seat.',
  },
  {
    id: 'E-classified-term',
    gate: 'internship',
    label: 'Classified term',
    bound: 'A classified term. Finishing the Foundry did not create it.',
  },
  {
    id: 'E-employment',
    gate: 'employment',
    label: 'Employment',
    bound: 'A classified job. The software did not hire them.',
  },
];

const EARN_GATES = new Set<HumanGateKind>(['paid_project', 'internship', 'employment']);

export function earnGateOn(session: WorkshopSession): EarnGateKind | null {
  const found = [...session.envelope.gates].reverse().find((g) => EARN_GATES.has(g.kind));
  return found ? (found.kind as EarnGateKind) : null;
}

export function earnAgreementFor(gate: EarnGateKind | null): EarnAgreement {
  return EARN_AGREEMENTS.find((a) => a.gate === gate) ?? EARN_AGREEMENTS[0]!;
}
