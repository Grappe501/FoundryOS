/** Level 2 v3 — build custom flights from catalog */

import { BOURBON_BOTTLES, type BourbonBottle, type BottleTag, type MashbillStyle, type WhiskeyBottleCategory } from '../bourbon-level-1/bottles';

export type FlightBuilderFilter = {
  mashbill?: MashbillStyle;
  category?: WhiskeyBottleCategory;
  tag?: BottleTag;
  maxPrice?: number;
  minProof?: number;
  maxProof?: number;
  craftOnly?: boolean;
  limit?: number;
};

export type CustomFlightTemplate = {
  id: string;
  title: string;
  description: string;
  filter: FlightBuilderFilter;
};

export const FLIGHT_BUILDER_TEMPLATES: CustomFlightTemplate[] = [
  { id: 'wheated-shelf', title: 'Wheated shelf builder', description: 'All wheated bottles in catalog — rank your wheat.', filter: { mashbill: 'wheated', limit: 6 } },
  { id: 'value-under-30', title: 'Under $30 flight', description: 'Value daily drinkers — blind-friendly.', filter: { maxPrice: 30, limit: 5 } },
  { id: 'craft-full', title: 'Full craft inventory', description: 'Every craft-tagged bottle — campus tour.', filter: { craftOnly: true, limit: 8 } },
  { id: 'high-proof-100', title: '100+ proof flight', description: 'Proof discipline — tiny pours.', filter: { minProof: 100, limit: 5 } },
  { id: 'rye-full', title: 'Full rye category', description: 'All rye whiskey in catalog.', filter: { category: 'rye_whiskey', limit: 8 } },
  { id: 'tennessee-duo-plus', title: 'Tennessee + bourbon baseline', description: 'TN category with BT anchor.', filter: { category: 'tennessee_whiskey', limit: 2 } },
  { id: 'high-rye-bourbon', title: 'High-rye bourbon only', description: 'Spice forward — not rye whiskey.', filter: { mashbill: 'high-rye', category: 'bourbon', limit: 6 } },
  { id: 'splurge-flight', title: 'Splurge tier', description: 'Tags splurge + collector — special occasion.', filter: { tag: 'splurge', limit: 5 } },
];

export function bottlesMatchingFilter(filter: FlightBuilderFilter): BourbonBottle[] {
  let list = [...BOURBON_BOTTLES];
  if (filter.mashbill) list = list.filter((b) => b.mashbill === filter.mashbill);
  if (filter.category) list = list.filter((b) => b.category === filter.category);
  if (filter.tag) list = list.filter((b) => b.tags.includes(filter.tag!));
  if (filter.maxPrice != null) list = list.filter((b) => b.priceUsd <= filter.maxPrice!);
  if (filter.minProof != null) list = list.filter((b) => b.proof >= filter.minProof!);
  if (filter.maxProof != null) list = list.filter((b) => b.proof <= filter.maxProof!);
  if (filter.craftOnly) list = list.filter((b) => b.tags.includes('craft'));
  list.sort((a, b) => a.priceUsd - b.priceUsd);
  const limit = filter.limit ?? 5;
  return list.slice(0, limit);
}

export function getFlightBuilderTemplate(id: string): CustomFlightTemplate | undefined {
  return FLIGHT_BUILDER_TEMPLATES.find((t) => t.id === id);
}
