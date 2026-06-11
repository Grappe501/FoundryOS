/** PASS-032B — World experience config registry */

import { WORLD_EXPERIENCE_CONFIGS } from './configs';
import type { WorldExperienceConfig } from './types';

export const PASS_032B_WORLDS = [
  'ai-builder',
  'financial-independence',
  'public-speaking',
  'bourbon',
  'bbq',
  'poker',
  'civic-engagement',
] as const;

export type Pass032BWorldSlug = (typeof PASS_032B_WORLDS)[number];

export { WORLD_EXPERIENCE_CONFIGS };

export function getWorldExperienceConfig(slug: string): WorldExperienceConfig | undefined {
  return WORLD_EXPERIENCE_CONFIGS[slug];
}

export function listPass032BWorlds(): readonly Pass032BWorldSlug[] {
  return PASS_032B_WORLDS;
}
