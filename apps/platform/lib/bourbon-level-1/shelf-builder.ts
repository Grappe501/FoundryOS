import { BOURBON_BOTTLES, type BourbonBottle } from './bottles';

export type ShelfTier = 'starter' | 'advanced' | 'collector';

export function buildShelf(budget: 100 | 200 | 300, tier: ShelfTier): { bottle: BourbonBottle; slot: string; why: string }[] {
  const maxPerBottle = tier === 'starter' ? budget / 3 : tier === 'advanced' ? budget / 4 : budget / 5;
  const minPrice = tier === 'starter' ? 15 : tier === 'advanced' ? 25 : 35;

  let pool = BOURBON_BOTTLES.filter((b) => b.priceUsd >= minPrice && b.priceUsd <= maxPerBottle);

  if (tier === 'starter') {
    pool = pool.filter((b) => b.tags.includes('beginner') || b.tags.includes('value'));
  } else if (tier === 'advanced') {
    pool = pool.filter((b) => !b.tags.includes('splurge') || b.priceUsd <= maxPerBottle);
  } else {
    pool = [...pool, ...BOURBON_BOTTLES.filter((b) => b.tags.includes('collector') && b.priceUsd <= maxPerBottle)];
  }

  const slots: { slot: string; pick: (b: BourbonBottle) => boolean }[] =
    tier === 'starter'
      ? [
          { slot: 'Daily drinker', pick: (b) => b.tags.includes('daily') || b.tags.includes('value') },
          { slot: 'Step-up bottle', pick: (b) => b.proof >= 90 && b.priceUsd > 25 },
          { slot: 'Conversation bottle', pick: (b) => b.tags.includes('host') || b.mashbill === 'wheated' },
        ]
      : tier === 'advanced'
        ? [
            { slot: 'High rye representative', pick: (b) => b.mashbill === 'high-rye' },
            { slot: 'Wheated representative', pick: (b) => b.mashbill === 'wheated' },
            { slot: 'Age statement', pick: (b) => !!b.ageYears },
            { slot: 'Proof experiment', pick: (b) => b.proof >= 100 },
          ]
        : [
            { slot: 'Heritage flagship', pick: (b) => b.tags.includes('collector') },
            { slot: 'Barrel proof', pick: (b) => b.proof >= 110 },
            { slot: 'Single barrel / craft', pick: (b) => b.producerSlug === 'new-riff' || b.slug.includes('single') },
            { slot: 'Allocated hunt target', pick: (b) => b.slug.includes('eagle') || b.slug.includes('weller') },
            { slot: 'Splurge night', pick: (b) => b.tags.includes('splurge') },
          ];

  const used = new Set<string>();
  const result: { bottle: BourbonBottle; slot: string; why: string }[] = [];

  for (const { slot, pick } of slots) {
    const candidate = pool.find((b) => pick(b) && !used.has(b.slug)) ?? pool.find((b) => !used.has(b.slug));
    if (!candidate) continue;
    used.add(candidate.slug);
    result.push({ bottle: candidate, slot, why: candidate.whyBuy });
  }

  const total = result.reduce((s, r) => s + r.bottle.priceUsd, 0);
  if (total > budget && result.length > 0) {
    result[result.length - 1] = {
      ...result[result.length - 1],
      why: `${result[result.length - 1].why} (Swap for a lower tier if over budget — target ~$${budget}.)`,
    };
  }

  return result;
}

export function bracketPairs(): { a: BourbonBottle; b: BourbonBottle }[] {
  const pairs: { a: BourbonBottle; b: BourbonBottle }[] = [];
  const shuffled = [...BOURBON_BOTTLES].sort(() => Math.random() - 0.5);
  for (let i = 0; i < shuffled.length - 1 && pairs.length < 8; i += 2) {
    if (shuffled[i].producerSlug !== shuffled[i + 1].producerSlug) {
      pairs.push({ a: shuffled[i], b: shuffled[i + 1] });
    }
  }
  return pairs;
}
