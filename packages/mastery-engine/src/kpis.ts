export type MasteryKpiSnapshot = {
  mastery_assignments_total: number;
  community_recognitions_total: number;
  identity_mastery_strength: number;
};

export function getMasteryKpiSnapshot(live?: Partial<MasteryKpiSnapshot>): MasteryKpiSnapshot {
  const total = live?.mastery_assignments_total ?? 0;
  return {
    mastery_assignments_total: total,
    community_recognitions_total: live?.community_recognitions_total ?? 0,
    identity_mastery_strength: live?.identity_mastery_strength ?? (total > 0 ? 1 : 0),
  };
}
