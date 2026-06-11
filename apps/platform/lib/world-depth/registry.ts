/** PASS-025 — World depth registry */

import { AI_BUILDER_DEPTH } from './bundles/ai-builder';
import { BOURBON_DEPTH } from './bundles/bourbon';
import { BBQ_DEPTH } from './bundles/bbq';
import { CIVIC_DEPTH } from './bundles/civic-engagement';
import { FI_DEPTH } from './bundles/financial-independence';
import { POKER_DEPTH } from './bundles/poker';
import { PS_DEPTH } from './bundles/public-speaking';
import type { WorldDepthBundle } from './types';

export const WORLD_DEPTH_BUNDLES: WorldDepthBundle[] = [
  AI_BUILDER_DEPTH,
  FI_DEPTH,
  PS_DEPTH,
  BOURBON_DEPTH,
  BBQ_DEPTH,
  POKER_DEPTH,
  CIVIC_DEPTH,
];

export const ACTIVE_WORLD_SLUGS = WORLD_DEPTH_BUNDLES.map((b) => b.slug);

export function getWorldDepth(slug: string): WorldDepthBundle | undefined {
  return WORLD_DEPTH_BUNDLES.find((b) => b.slug === slug);
}

export function getWorldDepthOrThrow(slug: string): WorldDepthBundle {
  const bundle = getWorldDepth(slug);
  if (!bundle) throw new Error(`Unknown world depth slug: ${slug}`);
  return bundle;
}
