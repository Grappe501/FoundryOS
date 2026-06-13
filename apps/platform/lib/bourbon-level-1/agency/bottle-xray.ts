import { BOURBON_BOTTLES, getBottle, type BourbonBottle } from '../bottles';
import { getBourbonProducer } from '../../world-depth/bourbon-producers';
import { BOTTLE_XRAY_OVERRIDES } from './bottle-xray-overrides';

export type XRayLayer = {
  label: string;
  value: string;
  whyItMatters: string;
};

export type FlavorSource = {
  note: string;
  from: string;
};

export type BottleXRay = {
  bottleSlug: string;
  layers: XRayLayer[];
  flavorBreakdown: FlavorSource[];
  analystTake: string;
};

function mashbillDetail(b: BourbonBottle): string {
  const map: Record<BourbonBottle['mashbill'], string> = {
    'high-rye': '~15–35% rye — spice, fruit, backbone',
    wheated: 'Wheat replaces rye — soft, sweet, crowd-friendly',
    traditional: '~10–15% rye — corn-forward caramel baseline',
    'corn-heavy': '70%+ corn — sweet, mild spice',
  };
  return map[b.mashbill];
}

function buildXRay(b: BourbonBottle): BottleXRay {
  const producer = getBourbonProducer(b.producerSlug);
  const override = BOTTLE_XRAY_OVERRIDES[b.slug];
  const age = b.ageYears ? `${b.ageYears} years stated` : 'No age statement — typically 4–8 years in class';
  const dsp = producer?.dspNote ?? 'Check label DSP for distillation site';
  const entryProof = override?.entryProof ?? 'Barrel entry proof typically 110–125 — lower entry often yields softer aged whiskey.';
  const warehouse = override?.warehouse ?? 'Rickhouse aging — floor position affects extraction rate and angel\'s share.';

  const flavorBreakdown: FlavorSource[] = [
    { note: 'Caramel / vanilla', from: b.mashbill === 'wheated' ? 'Corn + wheat softness' : 'Corn + oak char extract' },
    { note: b.tags.includes('spicy') ? 'Rye spice' : 'Gentle spice', from: b.mashbill === 'high-rye' ? 'High rye mashbill' : 'Traditional rye percentage' },
    { note: b.tags.includes('oak') ? 'Oak / tannin' : 'Light oak', from: `${age} — barrel wood interaction` },
    { note: b.proof >= 100 ? 'Heat / intensity' : 'Approachable mouthfeel', from: `${b.proof} proof — ${b.proof >= 100 ? 'more ethanol carries volatiles' : 'lower burn, softer arrival'}` },
  ];
  if (b.tags.includes('fruity')) flavorBreakdown.push({ note: 'Fruit / floral', from: 'Yeast profile + rye esters' });
  if (b.tags.includes('sweet')) flavorBreakdown.push({ note: 'Honey / brown sugar', from: 'Corn sweetness + char caramelization' });
  if (b.category === 'rye_whiskey') flavorBreakdown.push({ note: 'Pepper / dry spice', from: '≥51% rye grain — legal rye whiskey category' });
  if (b.category === 'tennessee_whiskey') flavorBreakdown.push({ note: 'Charcoal softness', from: 'Lincoln County Process before barreling' });
  if (override?.extraFlavor) flavorBreakdown.push(...override.extraFlavor);

  return {
    bottleSlug: b.slug,
    layers: [
      { label: 'Category', value: b.category.replace(/_/g, ' '), whyItMatters: 'Legal identity — bourbon, rye whiskey, or Tennessee whiskey each carry different rules.' },
      { label: 'Mashbill', value: mashbillDetail(b), whyItMatters: 'The personality fork — rye spice vs wheat softness starts here.' },
      { label: 'Proof', value: `${b.proof} proof`, whyItMatters: b.proof >= 100 ? 'Higher proof = more flavor density; add water to open.' : 'Daily-sipper zone — flavor without fight.' },
      { label: 'Age', value: age, whyItMatters: 'Time in oak adds structure — but too long can go woody.' },
      { label: 'Distillery', value: `${b.producerName} (${b.producerSlug})`, whyItMatters: producer?.differentiator.slice(0, 120) ?? 'House style shapes blending choices.' },
      { label: 'Barrel entry proof', value: entryProof, whyItMatters: 'Entry proof sets aging trajectory — same mash, different entry, different outcome.' },
      { label: 'Warehouse', value: warehouse, whyItMatters: 'Top floors age faster and hotter; single barrels expose this variance.' },
      { label: 'DSP / sourcing', value: dsp, whyItMatters: 'Who actually distilled vs who bottled — transparency check.' },
      { label: 'Street price', value: `$${b.priceUsd} (Foundry catalog)`, whyItMatters: b.tags.includes('value') ? 'Value tier — learn here before splurging.' : 'Price reflects positioning, not always quality.' },
    ],
    flavorBreakdown,
    analystTake: override?.analystTake ?? `${b.name}: ${b.oneLiner} ${b.whyBuy}`,
  };
}

export function getBottleXRay(slug: string): BottleXRay | undefined {
  const b = getBottle(slug);
  if (!b) return undefined;
  return buildXRay(b);
}

export function listXRayBottles(): { slug: string; name: string }[] {
  return BOURBON_BOTTLES.map((b) => ({ slug: b.slug, name: b.name }));
}
