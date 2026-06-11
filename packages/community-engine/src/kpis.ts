export type CommunityKpiSnapshot = {
  communities_active: number;
  community_members_total: number;
  community_evidence_shares: number;
};

export const COMMUNITY_KPI_KEYS = {
  active: 'communities_active',
  members: 'community_members_total',
  evidence_shares: 'community_evidence_shares',
} as const;

export function getCommunityKpiSnapshot(live?: Partial<CommunityKpiSnapshot>): CommunityKpiSnapshot {
  return {
    communities_active: live?.communities_active ?? 0,
    community_members_total: live?.community_members_total ?? 0,
    community_evidence_shares: live?.community_evidence_shares ?? 0,
  };
}
