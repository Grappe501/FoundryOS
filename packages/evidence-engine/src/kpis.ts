export type EvidenceKpiSnapshot = {
  evidence_submissions_total: number;
  evidence_verified_count: number;
  evidence_trust_weight_avg: number;
  identity_evidence_strength: number;
};

export const EVIDENCE_KPI_KEYS = {
  submissions: 'evidence_submissions_total',
  verified: 'evidence_verified_count',
  trust_avg: 'evidence_trust_weight_avg',
  identity_strength: 'identity_evidence_strength',
} as const;

export function getEvidenceKpiSnapshot(live?: Partial<EvidenceKpiSnapshot>): EvidenceKpiSnapshot {
  const total = live?.evidence_submissions_total ?? 0;
  const verified = live?.evidence_verified_count ?? 0;
  return {
    evidence_submissions_total: total,
    evidence_verified_count: verified,
    evidence_trust_weight_avg: live?.evidence_trust_weight_avg ?? 0,
    identity_evidence_strength: live?.identity_evidence_strength ?? 0,
  };
}
