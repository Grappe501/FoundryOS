/** Central immersion counts — single source of truth (PASS-032) */

import { AI_BUILDER_IMMERSION } from './worlds/ai-builder';
import { FI_IMMERSION } from './worlds/financial-independence';
import { PS_IMMERSION } from './worlds/public-speaking';
import { CIVIC_IMMERSION } from './worlds/civic-engagement';
import { BOURBON_IMMERSION } from './worlds/bourbon';
import { BBQ_IMMERSION } from './worlds/bbq';
import { POKER_IMMERSION } from './worlds/poker';
import { CHESS_IMMERSION } from './worlds/chess';

export const IMMERSION_WORLDS = [
  AI_BUILDER_IMMERSION,
  FI_IMMERSION,
  PS_IMMERSION,
  CIVIC_IMMERSION,
  BOURBON_IMMERSION,
  BBQ_IMMERSION,
  POKER_IMMERSION,
  CHESS_IMMERSION,
] as const;

export function getImmersionMeta(slug: string) {
  return IMMERSION_WORLDS.find((w) => w.slug === slug);
}

export function getMissionCount(slug: string): number {
  return getImmersionMeta(slug)?.missionTarget ?? 5;
}

export const IMMERSION_MISSION_COUNTS: Record<string, number> = Object.fromEntries(
  IMMERSION_WORLDS.map((w) => [w.slug, w.missionTarget]),
);
