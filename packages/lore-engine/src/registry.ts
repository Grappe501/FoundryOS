import type { WorldLoreBundle } from './types';
import { BOURBON_LORE } from './worlds/bourbon';
import { AI_BUILDER_LORE } from './worlds/ai-builder';
import { PUBLIC_SPEAKING_LORE } from './worlds/public-speaking';
import { BBQ_LORE, POKER_LORE, FI_LORE, CIVIC_LORE } from './worlds/stubs';

const REGISTRY: Record<string, WorldLoreBundle> = {
  bourbon: BOURBON_LORE,
  'ai-builder': AI_BUILDER_LORE,
  'public-speaking': PUBLIC_SPEAKING_LORE,
  bbq: BBQ_LORE,
  poker: POKER_LORE,
  'financial-independence': FI_LORE,
  'civic-engagement': CIVIC_LORE,
};

export function getWorldLore(worldSlug: string): WorldLoreBundle | undefined {
  return REGISTRY[worldSlug];
}

export function listLoreWorlds(): { slug: string; name: string; tagline: string }[] {
  return Object.values(REGISTRY).map((b) => ({
    slug: b.world_slug,
    name: b.world_name,
    tagline: b.tagline,
  }));
}

export function hasWorldLore(worldSlug: string): boolean {
  return worldSlug in REGISTRY;
}
