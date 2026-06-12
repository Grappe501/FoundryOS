import { BOURBON_BOTTLES, getBottle } from '../bourbon-level-1/bottles';
import { getBourbonProducer, listBourbonProducers } from '../world-depth/bourbon-producers';
import type { CompareDimension } from './types';

function mashbillScore(m: string): number {
  if (m === 'high-rye') return 85;
  if (m === 'wheated') return 40;
  if (m === 'corn-heavy') return 30;
  return 55;
}

function styleScore(tags: string[]): number {
  if (tags.includes('heritage')) return 90;
  if (tags.includes('craft')) return 70;
  if (tags.includes('value')) return 50;
  return 60;
}

export function compareBottlesAny(aSlug: string, bSlug: string): CompareDimension[] | null {
  const a = getBottle(aSlug);
  const b = getBottle(bSlug);
  if (!a || !b) return null;

  const maxPrice = Math.max(a.priceUsd, b.priceUsd, 1);
  const maxProof = Math.max(a.proof, b.proof, 1);

  return [
    {
      key: 'price',
      label: 'Price (USD)',
      left: a.priceUsd,
      right: b.priceUsd,
      leftScore: Math.round((1 - a.priceUsd / maxPrice) * 100),
      rightScore: Math.round((1 - b.priceUsd / maxPrice) * 100),
      insight: a.priceUsd < b.priceUsd ? `${a.name} saves $${b.priceUsd - a.priceUsd} — value hunt.` : b.priceUsd < a.priceUsd ? `${b.name} is the value pick.` : 'Same price tier.',
    },
    {
      key: 'proof',
      label: 'Proof',
      left: a.proof,
      right: b.proof,
      leftScore: Math.round((a.proof / maxProof) * 100),
      rightScore: Math.round((b.proof / maxProof) * 100),
      insight: a.proof > b.proof ? `${a.name} brings more heat — add water if needed.` : b.proof > a.proof ? `${b.name} is bolder on proof.` : 'Same proof — compare mash bills instead.',
    },
    {
      key: 'mashbill',
      label: 'Mashbill spice',
      left: a.mashbill,
      right: b.mashbill,
      leftScore: mashbillScore(a.mashbill),
      rightScore: mashbillScore(b.mashbill),
      insight: a.mashbill !== b.mashbill ? 'Different mash bills — rye vs wheat vs traditional changes the entire profile.' : 'Same mash style — barrel and age drive differences.',
    },
    {
      key: 'age',
      label: 'Age',
      left: a.ageYears ? `${a.ageYears} yr` : 'NAS',
      right: b.ageYears ? `${b.ageYears} yr` : 'NAS',
      leftScore: a.ageYears ? Math.min(100, a.ageYears * 8) : 35,
      rightScore: b.ageYears ? Math.min(100, b.ageYears * 8) : 35,
      insight: (a.ageYears ?? 0) > (b.ageYears ?? 0) ? `${a.name} states age — oak integration likely deeper.` : (b.ageYears ?? 0) > (a.ageYears ?? 0) ? `${b.name} carries age statement.` : 'Neither states age — taste blind if curious.',
    },
    {
      key: 'house',
      label: 'Distillery',
      left: a.producerName,
      right: b.producerName,
      leftScore: 50,
      rightScore: 50,
      insight: a.producerSlug === b.producerSlug ? 'Same house — compare proof and age within one system.' : 'Different houses — culture and stock philosophy differ.',
    },
  ];
}

export function compareProducersAny(aSlug: string, bSlug: string): CompareDimension[] | null {
  const a = getBourbonProducer(aSlug);
  const b = getBourbonProducer(bSlug);
  if (!a || !b) return null;

  const aRye = a.styleTags.includes('high-rye') ? 90 : a.styleTags.includes('wheated') ? 25 : 55;
  const bRye = b.styleTags.includes('high-rye') ? 90 : b.styleTags.includes('wheated') ? 25 : 55;
  const aHeritage = styleScore(a.styleTags);
  const bHeritage = styleScore(b.styleTags);
  const aEntry = parseInt(a.priceLadder.range.split('$')[1] ?? '30', 10) || 30;
  const bEntry = parseInt(b.priceLadder.range.split('$')[1] ?? '30', 10) || 30;

  return [
    {
      key: 'heritage',
      label: 'Heritage depth',
      left: a.founded,
      right: b.founded,
      leftScore: aHeritage,
      rightScore: bHeritage,
      insight: 'Founded dates tell survival stories — who kept rickhouses full when bourbon was unfashionable.',
    },
    {
      key: 'rye',
      label: 'Rye intensity',
      left: a.styleTags.includes('wheated') ? 'Wheated' : a.styleTags.includes('high-rye') ? 'High rye' : 'Balanced',
      right: b.styleTags.includes('wheated') ? 'Wheated' : b.styleTags.includes('high-rye') ? 'High rye' : 'Balanced',
      leftScore: aRye,
      rightScore: bRye,
      insight: aRye > bRye ? `${a.name} leans spice — cocktail and BBQ ally.` : bRye > aRye ? `${b.name} brings more rye tick.` : 'Different spice philosophies — blind pour both entry bottles.',
    },
    {
      key: 'entry',
      label: 'Entry price',
      left: a.priceLadder.range,
      right: b.priceLadder.range,
      leftScore: Math.round((1 - aEntry / Math.max(aEntry, bEntry)) * 100),
      rightScore: Math.round((1 - bEntry / Math.max(aEntry, bEntry)) * 100),
      insight: 'Entry shelf price — where beginners should start before crown jewels.',
    },
    {
      key: 'style',
      label: 'House identity',
      left: a.differentiator.slice(0, 80) + '…',
      right: b.differentiator.slice(0, 80) + '…',
      leftScore: 50,
      rightScore: 50,
      insight: 'Read full profiles — houses are systems, not single flavors.',
    },
    {
      key: 'allocation',
      label: 'Hype pressure',
      left: a.styleTags.includes('heritage') && a.slug === 'buffalo-trace' ? 'High' : 'Moderate',
      right: b.styleTags.includes('heritage') && b.slug === 'buffalo-trace' ? 'High' : 'Moderate',
      leftScore: a.slug === 'buffalo-trace' ? 95 : 40,
      rightScore: b.slug === 'buffalo-trace' ? 95 : 40,
      insight: 'Allocation hype ≠ quality — start on entry bottles both houses actually sell.',
    },
  ];
}

export function allProducerCompareOptions(): { slug: string; name: string }[] {
  return listBourbonProducers().map((p) => ({ slug: p.slug, name: p.name }));
}

export function allBottleCompareOptions(): { slug: string; name: string }[] {
  return BOURBON_BOTTLES.map((b) => ({ slug: b.slug, name: b.name }));
}
