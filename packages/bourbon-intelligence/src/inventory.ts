import type { BottleRecord, BourbonIntelligenceInventory, InventoryStats, SourcedValue } from './types';
import {
  BOTTLE_CATALOG,
  BOTTLE_COMPARISON_SETS,
  COLLECTION_PATHS,
  PRODUCER_CATALOG,
} from './registries/catalog-seeds';
import { LEADER_SLOT_REGISTRY } from './registries/leader-slots';
import { MASH_BILL_REGISTRY, TERROIR_REGISTRY } from './registries/mash-terroir';
import { PEOPLE_REGISTRY } from './registries/people';
import { AMERICAN_WHISKEY_CATEGORIES } from './categories/american-whiskey';
import { LEGAL_STANDARDS } from './legal/standards-of-identity';
import { buildInventoryRelationships } from './graph/relationships';

const VERSION = '040B1.0';

function buildBottles(): BottleRecord[] {
  return BOTTLE_CATALOG.map((b) => ({
    ...b,
    comparable_bottle_slugs: BOTTLE_COMPARISON_SETS[b.slug] ?? [],
    collection_path_slugs: COLLECTION_PATHS[b.slug] ?? [],
  }));
}

function attachBottleSlugsToProducers() {
  const bottles = buildBottles();
  return PRODUCER_CATALOG.map((p) => ({
    ...p,
    bottle_slugs: bottles.filter((b) => b.producer_slug === p.slug).map((b) => b.slug),
  }));
}

let cached: BourbonIntelligenceInventory | null = null;

export function getBourbonIntelligenceInventory(): BourbonIntelligenceInventory {
  if (cached) return cached;

  const bottles = buildBottles();
  cached = {
    version: VERSION,
    legal_standards: LEGAL_STANDARDS.map((s) => s.slug),
    categories: AMERICAN_WHISKEY_CATEGORIES.map((c) => c.slug),
    producers: attachBottleSlugsToProducers(),
    bottles,
    people: PEOPLE_REGISTRY,
    mash_bills: MASH_BILL_REGISTRY,
    terroir: TERROIR_REGISTRY,
    leader_slots: LEADER_SLOT_REGISTRY,
    relationships: buildInventoryRelationships(),
  };
  return cached;
}

export function getBottleRecord(slug: string): BottleRecord | undefined {
  return getBourbonIntelligenceInventory().bottles.find((b) => b.slug === slug);
}

export function getProducerRecord(slug: string) {
  return getBourbonIntelligenceInventory().producers.find((p) => p.slug === slug);
}

export function inventoryStats(): InventoryStats {
  const inv = getBourbonIntelligenceInventory();
  const validation = validateBourbonIntelligence();

  return {
    producers: inv.producers.length,
    bottles: inv.bottles.length,
    people: inv.people.length,
    people_publishable: inv.people.filter((p) => p.profile_publishable).length,
    mash_bills: inv.mash_bills.length,
    terroir_records: inv.terroir.length,
    leader_slots: inv.leader_slots.length,
    leader_slots_verified: inv.leader_slots.filter((s) => s.status === 'verified').length,
    relationships: inv.relationships.length,
    unknown_mash_pct_fields: countUnknownMashFields(inv),
    unsourced_verified_claims: validation.errors.filter((e) => e.includes('verified')).length,
  };
}

function countUnknownMashFields(inv: BourbonIntelligenceInventory): number {
  let n = 0;
  for (const mash of inv.mash_bills) {
    for (const field of Object.values(mash.composition) as (SourcedValue<number | 'unknown'> | undefined)[]) {
      if (field && field.confidence === 'unknown') n++;
    }
  }
  return n;
}

export function validateBourbonIntelligence(): { ok: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const inv = getBourbonIntelligenceInventory();

  for (const person of inv.people) {
    if (person.profile_publishable) {
      for (const fact of person.facts) {
        if (fact.confidence === 'verified' && fact.citations.length === 0) {
          errors.push(`Person ${person.slug}: verified fact without citation — "${fact.claim}"`);
        }
      }
    } else if (person.facts.some((f) => f.confidence === 'verified' && f.citations.length === 0)) {
      warnings.push(`Person ${person.slug}: non-publishable but has unsourced verified facts`);
    }
  }

  for (const mash of inv.mash_bills) {
    for (const [key, field] of Object.entries(mash.composition) as [string, SourcedValue<number | 'unknown'> | undefined][]) {
      if (!field) continue;
      if (typeof field.value === 'number' && field.confidence !== 'producer_disclosed' && field.confidence !== 'verified') {
        errors.push(`Mash ${mash.slug}: invented percentage on ${key} without producer_disclosed confidence`);
      }
    }
  }

  for (const bottle of inv.bottles) {
    if (!inv.producers.some((p) => p.slug === bottle.producer_slug)) {
      errors.push(`Bottle ${bottle.slug}: missing producer ${bottle.producer_slug}`);
    }
  }

  if (inv.bottles.length < 20) {
    warnings.push(`Bottle registry has ${inv.bottles.length} entries — expand via factory, not hand-written pages`);
  }

  if (inv.relationships.length < 50) {
    warnings.push(`Graph has ${inv.relationships.length} edges — 040B will scale per-bottle graph seeds`);
  }

  return { ok: errors.length === 0, errors, warnings };
}
