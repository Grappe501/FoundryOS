'use client';

import type { LivingJourneySnapshot, PortfolioMissionEntry, UserSegment } from '@foundry/mentor-engine';
import { ACTIVE_WORLDS } from './active-worlds';
import { enrichSnapshotWithIdentity } from './identity-storage';
import type { PortfolioEntry } from '../../components/world/WorldMissionRunner';
import type { LegendaryEntry } from '@foundry/mentor-engine';

const SEGMENT_KEY = 'foundry-user-segment';
const NAME_KEY = 'foundry-journey-display-name';

function readPortfolio(key: string): PortfolioEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as PortfolioEntry[];
  } catch {
    return [];
  }
}

function readLegendary(key: string): LegendaryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]') as LegendaryEntry[];
  } catch {
    return [];
  }
}

export function getStoredDisplayName(): string {
  if (typeof window === 'undefined') return 'You';
  return localStorage.getItem(NAME_KEY) ?? 'You';
}

export function setStoredDisplayName(name: string): void {
  localStorage.setItem(NAME_KEY, name.trim() || 'You');
}

export function getStoredUserSegment(): UserSegment {
  if (typeof window === 'undefined') return 'adult';
  const s = localStorage.getItem(SEGMENT_KEY);
  if (s === 'student' || s === 'teen' || s === 'parent' || s === 'adult' || s === 'caregiver') return s;
  return 'adult';
}

export function buildLivingJourneySnapshot(displayName?: string): LivingJourneySnapshot {
  const worlds = ACTIVE_WORLDS.map((w) => {
    const completed = readPortfolio(w.portfolioKey) as PortfolioMissionEntry[];
    const journal = w.legendaryStorageKey ? readLegendary(w.legendaryStorageKey) : [];
    return {
      world_slug: w.slug,
      world_name: w.name,
      identity_title: w.identityTitle,
      mentor_name: w.mentorName,
      portfolio_key: w.portfolioKey,
      mission_count: w.missionCount,
      completed_missions: completed,
      href: w.href,
      journal_items: journal.length,
    };
  });

  const active = worlds.filter((w) => w.completed_missions.length > 0 || (w.journal_items ?? 0) > 0).map((w) => w.world_slug);
  const recent = worlds
    .flatMap((w) =>
      w.completed_missions.map((m) => ({
        world_slug: w.world_slug,
        text: m.reflection,
        mission_title: m.missionTitle,
        at: m.completedAt,
      })),
    )
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 5);

  const allReflectionText = worlds.flatMap((w) => w.completed_missions.map((m) => m.reflection)).join(' ');

  const base: LivingJourneySnapshot = {
    display_name: displayName ?? getStoredDisplayName(),
    user_segment: getStoredUserSegment(),
    worlds,
    active_world_slugs: active.length > 0 ? active : ['ai-builder'],
    total_missions_completed: worlds.reduce((n, w) => n + w.completed_missions.length, 0),
    recent_reflections: recent,
    all_reflection_text: allReflectionText,
  };

  return enrichSnapshotWithIdentity(base);
}

export function countLegendaryEntries(storageKey: string): number {
  return readLegendary(storageKey).length;
}

export function saveLegendaryEntry(storageKey: string, entry: Omit<LegendaryEntry, 'id' | 'createdAt'>): LegendaryEntry {
  const list = readLegendary(storageKey);
  const full: LegendaryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  list.unshift(full);
  localStorage.setItem(storageKey, JSON.stringify(list.slice(0, 200)));
  return full;
}

export function listLegendaryEntries(storageKey: string, section?: string): LegendaryEntry[] {
  const list = readLegendary(storageKey);
  if (!section) return list;
  return list.filter((e) => e.section === section);
}
