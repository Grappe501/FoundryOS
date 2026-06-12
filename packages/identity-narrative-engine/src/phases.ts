import type { IdentitySignalBundle, InternalPhase } from './types';

/** Score internal phase from evidence — never expose to UI */
export function scoreInternalPhase(signals: IdentitySignalBundle): InternalPhase {
  let score = 0;
  score += Math.min(signals.missions_completed * 2, 8);
  score += signals.consequence_node_ids.length * 2;
  score += signals.completed_collection_ids.length * 4;
  score += signals.active_collections.filter((c) => c.unlocked > 0).length;
  score += signals.events_completed.length * 2;
  score += signals.events_voted.length;
  score += signals.events_saved.length;
  score += signals.debate_topics.length;
  score += Math.min(signals.journal_entries, 5);
  if (signals.reflections.some((r) => r.length > 40)) score += 2;

  if (score <= 2) return 'curious';
  if (score <= 8) return 'practicing';
  if (score <= 16) return 'shaping';
  return 'guiding';
}
