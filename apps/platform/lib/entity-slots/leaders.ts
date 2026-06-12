/**
 * Leader slots — spaces for community/editorial content.
 * NOT fabricated biographies. See docs/CONTENT_INTEGRITY.md
 * Status synced from @foundry/bourbon-intelligence (PASS-040B1).
 */

import { leaderSlotExport } from '@foundry/bourbon-intelligence';

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

/** Bourbon leader slots — verified only when people registry has sourced facts */
export const BOURBON_LEADER_SLOTS: LeaderSlot[] = leaderSlotExport();

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
