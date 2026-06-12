'use client';

/** PASS-040D — write-through to cloud when authenticated */

import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { PortableMemoryState } from '@foundry/personal-database';
import { createClient } from '../supabase/client';

const MIGRATE_PREFIX = 'foundry-identity-migrated-';
export const IDENTITY_HYDRATED_EVENT = 'foundry-identity-hydrated';

let memorySyncTimer: ReturnType<typeof setTimeout> | null = null;
let collectorSyncTimer: ReturnType<typeof setTimeout> | null = null;

async function hasSession(): Promise<boolean> {
  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    return Boolean(data.session?.user);
  } catch {
    return false;
  }
}

export async function persistArtifactToCloud(artifact: FoundryArtifact): Promise<void> {
  if (!(await hasSession())) return;
  try {
    await fetch('/api/identity/migrate', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'artifact', artifact }),
    });
  } catch {
    /* offline — local cache remains */
  }
}

export function scheduleMemoryStateSync(state: PortableMemoryState): void {
  if (typeof window === 'undefined') return;
  if (memorySyncTimer) clearTimeout(memorySyncTimer);
  memorySyncTimer = setTimeout(() => {
    void flushMemoryStateSync(state);
  }, 800);
}

async function flushMemoryStateSync(state: PortableMemoryState): Promise<void> {
  if (!(await hasSession())) return;
  try {
    await fetch('/api/identity/migrate', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'memory_state', memory_state: state }),
    });
  } catch {
    /* offline queue — v2 */
  }
}

export function scheduleCollectorStateSync(state: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (collectorSyncTimer) clearTimeout(collectorSyncTimer);
  collectorSyncTimer = setTimeout(() => {
    void flushCollectorStateSync(state);
  }, 800);
}

async function flushCollectorStateSync(state: Record<string, unknown>): Promise<void> {
  if (!(await hasSession())) return;
  try {
    await fetch('/api/identity/migrate', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'collector_state', collector_state: state }),
    });
  } catch {
    /* offline */
  }
}

export async function persistGraphTraversalToCloud(event: {
  world_slug: string;
  node_slug: string;
  node_title: string;
  node_type?: string;
  source?: 'atlas' | 'graph' | 'compare' | 'search';
  entered_at?: string;
}): Promise<void> {
  if (!(await hasSession())) return;
  try {
    await fetch('/api/identity/migrate', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'graph', event }),
    });
  } catch {
    /* offline */
  }
}

export function migrationKeyForUser(userId: string): string {
  return `${MIGRATE_PREFIX}${userId}`;
}

export function wasMigratedForUser(userId: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(migrationKeyForUser(userId)) === '1';
}

export function markMigratedForUser(userId: string): void {
  localStorage.setItem(migrationKeyForUser(userId), '1');
}

export async function migrateLocalIdentityToCloud(): Promise<boolean> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return false;

  if (wasMigratedForUser(user.id)) return true;

  const { getMemoryState } = await import('../world-memory/memory-store');
  const { listClientArtifacts } = await import('../artifacts/client-store');
  const { getCollectorStore } = await import('../collector/client-state');

  const body = {
    artifacts: listClientArtifacts(),
    memory_state: getMemoryState(),
    collector_state: getCollectorStore(),
  };

  try {
    const res = await fetch('/api/identity/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return false;
    markMigratedForUser(user.id);
    return true;
  } catch {
    return false;
  }
}

export async function hydrateIdentityFromCloud(): Promise<boolean> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) return false;

  try {
    const res = await fetch('/api/identity/hydrate');
    if (!res.ok) return false;
    const json = await res.json();
    if (!json.ok || !json.bundle) return false;

    const { replaceArtifactStore } = await import('../artifacts/client-store');
    const { replaceMemoryState } = await import('../world-memory/memory-store');
    const { replaceCollectorStore } = await import('../collector/client-state');

    replaceArtifactStore(json.bundle.artifacts ?? []);
    replaceMemoryState(json.bundle.memory_state);
    if (json.bundle.collector_state) {
      replaceCollectorStore(json.bundle.collector_state);
    }

    window.dispatchEvent(new Event(IDENTITY_HYDRATED_EVENT));
    window.dispatchEvent(new Event('foundry-artifacts-changed'));
    return true;
  } catch {
    return false;
  }
}

export async function syncPortableIdentityOnAuth(): Promise<void> {
  await migrateLocalIdentityToCloud();
  await hydrateIdentityFromCloud();
}
