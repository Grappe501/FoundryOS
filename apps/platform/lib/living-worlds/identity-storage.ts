/** PASS-034A — Client identity & ambition storage */

import {
  AMBITION_IDENTITIES,
  DREAM_WANTS,
  discoverSecretPaths,
  getAmbition,
  getDream,
  getLegendaryObject,
  type UnlockedLegendaryObject,
  type IdentityContext,
} from '@foundry/mentor-engine';

const KEYS = {
  ambitions: 'foundry-identity-ambitions',
  dreams: 'foundry-identity-dreams',
  statedGoals: 'foundry-identity-stated-goals',
  secretPaths: 'foundry-secret-paths-discovered',
  legendaryObjects: 'foundry-legendary-objects',
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getAmbitionSlugs(): string[] {
  return read(KEYS.ambitions, [] as string[]);
}

export function setAmbitionSlugs(slugs: string[]) {
  write(KEYS.ambitions, slugs.slice(0, 5));
}

export function getDreamSlugs(): string[] {
  return read(KEYS.dreams, [] as string[]);
}

export function setDreamSlugs(slugs: string[]) {
  write(KEYS.dreams, slugs.slice(0, 8));
}

export function getStatedGoals(): { text: string; world_slug?: string; at: string }[] {
  return read(KEYS.statedGoals, []);
}

export function addStatedGoal(text: string, world_slug?: string) {
  const goals = getStatedGoals();
  goals.unshift({ text, world_slug, at: new Date().toISOString() });
  write(KEYS.statedGoals, goals.slice(0, 20));
}

export function getDiscoveredSecretPathIds(): string[] {
  return read(KEYS.secretPaths, [] as string[]);
}

export function markSecretPathsDiscovered(ids: string[]) {
  const existing = new Set(getDiscoveredSecretPathIds());
  for (const id of ids) existing.add(id);
  write(KEYS.secretPaths, [...existing]);
}

export function getUnlockedLegendaryObjects(): UnlockedLegendaryObject[] {
  return read(KEYS.legendaryObjects, [] as UnlockedLegendaryObject[]);
}

export function unlockLegendaryObject(objectId: string, note?: string) {
  const list = getUnlockedLegendaryObjects();
  if (list.some((o) => o.object_id === objectId)) return;
  list.unshift({ object_id: objectId, unlocked_at: new Date().toISOString(), note });
  write(KEYS.legendaryObjects, list.slice(0, 100));
}

export function buildIdentityContext(): IdentityContext {
  return {
    ambitions: getAmbitionSlugs()
      .map((slug) => getAmbition(slug))
      .filter(Boolean)
      .map((a) => ({ slug: a!.slug, label: a!.label, tagline: a!.tagline })),
    dreams: getDreamSlugs()
      .map((slug) => getDream(slug))
      .filter(Boolean)
      .map((d) => ({ slug: d!.slug, label: d!.label })),
    stated_goals: getStatedGoals(),
  };
}

/** Auto-unlock legendary objects from client activity signals */
export function syncLegendaryUnlocks(snapshot: import('@foundry/mentor-engine').LivingJourneySnapshot) {
  const ai = snapshot.worlds.find((w) => w.world_slug === 'ai-builder');
  if (ai && ai.completed_missions.length >= 1) {
    unlockLegendaryObject('first-automation');
  }
  if (ai && ai.completed_missions.length >= 3) {
    unlockLegendaryObject('first-product');
  }

  const ps = snapshot.worlds.find((w) => w.world_slug === 'public-speaking');
  if (ps && ps.completed_missions.some((m) => /talk|first-talk/i.test(m.missionSlug))) {
    unlockLegendaryObject('first-recorded-talk');
  }

  const bourbon = snapshot.worlds.find((w) => w.world_slug === 'bourbon');
  if (bourbon && bourbon.completed_missions.length >= 1) {
    unlockLegendaryObject('first-blind-win');
  }

  try {
    const bracketVotes = JSON.parse(localStorage.getItem('foundry-bourbon-brackets') ?? '[]');
    if (Array.isArray(bracketVotes) && bracketVotes.length > 0) {
      unlockLegendaryObject('first-bracket');
    }
    const collection = JSON.parse(localStorage.getItem('foundry-bourbon-collection-v2') ?? '[]');
    if (Array.isArray(collection)) {
      if (collection.some((c: { status?: string }) => c.status === 'gifted')) {
        unlockLegendaryObject('first-gift-bottle');
      }
      if (collection.some((c: { bottleSlug?: string }) => String(c.bottleSlug).includes('makers') || String(c.bottleSlug).includes('larceny') || String(c.bottleSlug).includes('weller'))) {
        unlockLegendaryObject('first-wheated');
      }
    }
    const legendary = JSON.parse(localStorage.getItem('foundry-bourbon-legendary') ?? '[]');
    if (Array.isArray(legendary) && legendary.some((e: { section?: string }) => e.section === 'visits')) {
      unlockLegendaryObject('first-distillery');
    }
  } catch {
    /* ignore parse errors */
  }
}

export function enrichSnapshotWithIdentity(
  snapshot: import('@foundry/mentor-engine').LivingJourneySnapshot,
): import('@foundry/mentor-engine').LivingJourneySnapshot {
  syncLegendaryUnlocks(snapshot);
  const discovered = getDiscoveredSecretPathIds();
  const paths = discoverSecretPaths(snapshot, discovered);
  const newIds = paths.filter((p) => p.newly_discovered).map((p) => p.id);
  if (newIds.length > 0) markSecretPathsDiscovered(newIds);

  return {
    ...snapshot,
    identity: buildIdentityContext(),
    secret_paths: paths,
    unlocked_legendary: getUnlockedLegendaryObjects(),
  };
}

export { AMBITION_IDENTITIES, DREAM_WANTS, getLegendaryObject };
