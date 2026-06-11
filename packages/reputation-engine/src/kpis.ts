export type ReputationKpiSnapshot = {
  reputation_records_total: number;
  avg_trust_weight: number;
  identity_reputation_strength: number;
};

export function getReputationKpiSnapshot(live?: Partial<ReputationKpiSnapshot>): ReputationKpiSnapshot {
  const total = live?.reputation_records_total ?? 0;
  const avg = live?.avg_trust_weight ?? 0;
  return {
    reputation_records_total: total,
    avg_trust_weight: avg,
    identity_reputation_strength: live?.identity_reputation_strength ?? (total > 0 ? avg : 0),
  };
}
