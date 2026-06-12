'use client';

/** PASS-040D.5 — apply compound loop results to client stores + cloud sync */

import type { IdentitySyncEvent } from '@foundry/identity-sync-engine';
import { propagateIdentityEvent } from '@foundry/identity-sync-engine';
import { applyCollectorFromAction } from '../collector/client-state';
import { applySyncMemoryUpdates, bumpCuriosityWeights } from '../world-memory/memory-store';
import { IDENTITY_HYDRATED_EVENT } from '../personal-database/sync-client';

export const IDENTITY_SYNC_EVENT = 'foundry-identity-sync';

function dispatchSync() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(IDENTITY_SYNC_EVENT));
  window.dispatchEvent(new Event(IDENTITY_HYDRATED_EVENT));
}

/** Propagate event through compound loop and apply all side effects */
export function propagateAndApplyIdentityEvent(event: IdentitySyncEvent): void {
  const result = propagateIdentityEvent(event);

  for (const u of result.collection_updates) {
    applyCollectorFromAction(u.world_slug, u.action_type, u.action_id);
  }

  if (result.memory_updates.length > 0) {
    applySyncMemoryUpdates(result.memory_updates, result.welcome_back_threads);
  }

  if (result.curiosity_weights.length > 0) {
    bumpCuriosityWeights(result.curiosity_weights);
  }

  dispatchSync();
}
