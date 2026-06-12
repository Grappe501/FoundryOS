import type { LeaderSlotRecord } from '../types';
import { PEOPLE_REGISTRY } from './people';

/** Leader slots — linked to people registry when verified */
export const LEADER_SLOT_REGISTRY: LeaderSlotRecord[] = [
  {
    id: 'wild-turkey-master',
    label: 'Wild Turkey — master distiller',
    role: 'master_distiller',
    linked_producer_slug: 'wild-turkey',
    person_slug: 'eddie-russell',
    status: 'verified',
  },
  {
    id: 'buffalo-trace-master',
    label: 'Buffalo Trace — master distiller',
    role: 'master_distiller',
    linked_producer_slug: 'buffalo-trace',
    person_slug: 'harlen-wheatley',
    status: 'verified',
  },
  {
    id: 'heaven-hill-master',
    label: 'Heaven Hill — master distiller',
    role: 'master_distiller',
    linked_producer_slug: 'heaven-hill',
    status: 'empty',
  },
  {
    id: 'four-roses-master',
    label: 'Four Roses — master distiller',
    role: 'master_distiller',
    linked_producer_slug: 'four-roses',
    status: 'empty',
  },
  {
    id: 'makers-mark-master',
    label: "Maker's Mark — master distiller",
    role: 'master_distiller',
    linked_producer_slug: 'makers-mark',
    status: 'empty',
  },
  {
    id: 'jim-beam-master',
    label: 'Jim Beam — master distiller',
    role: 'master_distiller',
    linked_producer_slug: 'jim-beam',
    status: 'empty',
  },
  { id: 'review-host', label: 'Community review host', role: 'review_host', status: 'empty' },
  { id: 'tasting-club-lead', label: 'Tasting club leader', role: 'club_host', status: 'empty' },
];

/** Sync platform leader slots from intelligence registry */
export function leaderSlotExport() {
  return LEADER_SLOT_REGISTRY.map((slot) => ({
    id: slot.id,
    world_slug: 'bourbon' as const,
    label: slot.label,
    role: slot.role,
    linked_producer_slug: slot.linked_producer_slug,
    status: slot.status,
    graph_reference_count: PEOPLE_REGISTRY.filter((p) => p.leader_slot_id === slot.id).length,
  }));
}
