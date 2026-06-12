/**
 * Leader slots — spaces for community/editorial content.
 * NOT fabricated biographies. See docs/CONTENT_INTEGRITY.md
 */

export type LeaderSlotStatus = 'empty' | 'community' | 'editorial' | 'verified';

export type LeaderSlot = {
  id: string;
  world_slug: string;
  /** Display label only — no invented bio */
  label: string;
  role: string;
  linked_producer_slug?: string;
  status: LeaderSlotStatus;
  /** Graph references this slot — not a profile count */
  graph_reference_count: number;
};

/** Bourbon leader slots — one per major producer house, empty until verified content */
export const BOURBON_LEADER_SLOTS: LeaderSlot[] = [
  { id: 'wild-turkey-master', world_slug: 'bourbon', label: 'Wild Turkey — master distiller', role: 'master_distiller', linked_producer_slug: 'wild-turkey', status: 'empty', graph_reference_count: 2 },
  { id: 'buffalo-trace-master', world_slug: 'bourbon', label: 'Buffalo Trace — master distiller', role: 'master_distiller', linked_producer_slug: 'buffalo-trace', status: 'empty', graph_reference_count: 3 },
  { id: 'heaven-hill-master', world_slug: 'bourbon', label: 'Heaven Hill — master distiller', role: 'master_distiller', linked_producer_slug: 'heaven-hill', status: 'empty', graph_reference_count: 1 },
  { id: 'four-roses-master', world_slug: 'bourbon', label: 'Four Roses — master distiller', role: 'master_distiller', linked_producer_slug: 'four-roses', status: 'empty', graph_reference_count: 2 },
  { id: 'makers-mark-master', world_slug: 'bourbon', label: "Maker's Mark — master distiller", role: 'master_distiller', linked_producer_slug: 'makers-mark', status: 'empty', graph_reference_count: 1 },
  { id: 'jim-beam-master', world_slug: 'bourbon', label: 'Jim Beam — master distiller', role: 'master_distiller', linked_producer_slug: 'jim-beam', status: 'empty', graph_reference_count: 1 },
  { id: 'review-host', world_slug: 'bourbon', label: 'Community review host', role: 'review_host', status: 'empty', graph_reference_count: 0 },
  { id: 'tasting-club-lead', world_slug: 'bourbon', label: 'Tasting club leader', role: 'club_host', status: 'empty', graph_reference_count: 0 },
];

export function leaderSlotsForWorld(worldSlug: string): LeaderSlot[] {
  return BOURBON_LEADER_SLOTS.filter((s) => s.world_slug === worldSlug);
}

export function countLeaderSlots(worldSlug?: string): { slots: number; verified: number; referenced_in_graph: number } {
  const list = worldSlug ? leaderSlotsForWorld(worldSlug) : BOURBON_LEADER_SLOTS;
  return {
    slots: list.length,
    verified: list.filter((s) => s.status === 'verified' || s.status === 'editorial').length,
    referenced_in_graph: list.reduce((s, l) => s + l.graph_reference_count, 0),
  };
}
