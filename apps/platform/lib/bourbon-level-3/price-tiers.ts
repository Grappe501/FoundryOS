/** Level 3 — price tier map and bottle classification */

import { BOURBON_BOTTLES, type BourbonBottle } from '../bourbon-level-1/bottles';

export type PriceTierId = 'entry' | 'standard' | 'premium' | 'ultra';

export type PriceTier = {
  id: PriceTierId;
  label: string;
  range: string;
  payFor: string;
  dontPayFor: string;
};

export const PRICE_TIERS: PriceTier[] = [
  {
    id: 'entry',
    label: 'Entry',
    range: '$15–25',
    payFor: 'Consistent house style, young stock, repeatability',
    dontPayFor: 'Age rarity or allocation story',
  },
  {
    id: 'standard',
    label: 'Standard',
    range: '$25–40',
    payFor: 'Blending skill, brand identity, BiB options',
    dontPayFor: 'Guaranteed superiority over value tier',
  },
  {
    id: 'premium',
    label: 'Premium',
    range: '$40–70',
    payFor: 'Age options, small batch, proof experiments',
    dontPayFor: 'Automatic quality vs blind rank',
  },
  {
    id: 'ultra',
    label: 'Ultra / allocated',
    range: '$70+',
    payFor: 'Scarcity, age stocks, occasion pours',
    dontPayFor: 'Hype without palate defense',
  },
];

export function classifyPriceTier(bottle: BourbonBottle): PriceTierId {
  const p = bottle.priceUsd;
  if (p < 25) return 'entry';
  if (p < 40) return 'standard';
  if (p < 70) return 'premium';
  return 'ultra';
}

export function bottlesByTier(tierId: PriceTierId): BourbonBottle[] {
  return BOURBON_BOTTLES.filter((b) => classifyPriceTier(b) === tierId).sort((a, b) => a.priceUsd - b.priceUsd);
}

export const TIER_EXERCISES: { id: string; prompt: string; bottleSlugs: string[]; answer: PriceTierId[] }[] = [
  {
    id: 'match-four',
    prompt: 'Match each bottle to tier before reveal — price order vs preference order may differ.',
    bottleSlugs: ['evan-williams-black', 'buffalo-trace', 'eagle-rare', 'peerless-bourbon'],
    answer: ['entry', 'standard', 'premium', 'ultra'],
  },
  {
    id: 'value-trap',
    prompt: 'Which "premium" bottle is often beaten blind by WT101?',
    bottleSlugs: ['wild-turkey-101', 'woodford-reserve', 'knob-creek-9'],
    answer: ['standard', 'standard', 'premium'],
  },
  {
    id: 'splurge-check',
    prompt: 'Classify splurge candidates — justify ultra tier in one sentence each.',
    bottleSlugs: ['blue-run-8-year', 'eh-taylor-small-batch', 'old-forester-1920'],
    answer: ['premium', 'premium', 'premium'],
  },
];
