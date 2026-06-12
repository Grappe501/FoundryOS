import type { BourbonIntelligenceInventory, InventoryRelationship } from '../types';
import {
  BOTTLE_CATALOG,
  BOTTLE_COMPARISON_SETS,
  COLLECTION_PATHS,
  PRODUCER_CATALOG,
} from '../registries/catalog-seeds';
import { LEADER_SLOT_REGISTRY } from '../registries/leader-slots';
import { MASH_BILL_REGISTRY, TERROIR_REGISTRY } from '../registries/mash-terroir';
import { PEOPLE_REGISTRY } from '../registries/people';
import { AMERICAN_WHISKEY_CATEGORIES } from '../categories/american-whiskey';
import { LEGAL_STANDARDS } from '../legal/standards-of-identity';

function rel(
  from_type: InventoryRelationship['from']['entity_type'],
  from_slug: string,
  relation: InventoryRelationship['relation'],
  to_type: InventoryRelationship['to']['entity_type'],
  to_slug: string,
  confidence: InventoryRelationship['confidence'] = 'commonly_reported',
  notes?: string,
): InventoryRelationship {
  return {
    id: `${from_type}:${from_slug}:${relation}:${to_type}:${to_slug}`,
    from: { entity_type: from_type, slug: from_slug },
    to: { entity_type: to_type, slug: to_slug },
    relation,
    confidence,
    notes,
  };
}

/** Build graph edges: Bottle → Producer → Person → Mash → Terroir → Comparables */
export function buildInventoryRelationships(): InventoryRelationship[] {
  const edges: InventoryRelationship[] = [];

  for (const bottle of BOTTLE_CATALOG) {
    edges.push(rel('bottle', bottle.slug, 'produced_by', 'producer', bottle.producer_slug));
    edges.push(rel('bottle', bottle.slug, 'category_member', 'whiskey_category', bottle.category, 'verified'));

    if (bottle.mash_bill_slug) {
      edges.push(rel('bottle', bottle.slug, 'uses_mash_bill', 'mash_bill', bottle.mash_bill_slug));
    }

    const producer = PRODUCER_CATALOG.find((p) => p.slug === bottle.producer_slug);
    if (producer?.terroir_slug) {
      edges.push(rel('bottle', bottle.slug, 'grain_from', 'terroir', producer.terroir_slug, 'unknown'));
    }

    for (const other of BOTTLE_COMPARISON_SETS[bottle.slug] ?? []) {
      edges.push(rel('bottle', bottle.slug, 'compares_with', 'bottle', other, 'editorial', 'Comparison set — not a quality ranking'));
    }

    for (const path of COLLECTION_PATHS[bottle.slug] ?? []) {
      edges.push(rel('bottle', bottle.slug, 'recommended_after', 'bottle', path, 'editorial', 'Collection path slug'));
    }
  }

  for (const producer of PRODUCER_CATALOG) {
    edges.push(rel('producer', producer.slug, 'category_member', 'whiskey_category', producer.category, 'verified'));

    for (const mash of producer.mash_bill_slugs) {
      edges.push(rel('producer', producer.slug, 'uses_mash_bill', 'mash_bill', mash));
    }

    if (producer.terroir_slug) {
      edges.push(rel('producer', producer.slug, 'grain_from', 'terroir', producer.terroir_slug, 'unknown'));
    }

    if (producer.leader_slot_id) {
      edges.push(rel('producer', producer.slug, 'references_person', 'leader_slot', producer.leader_slot_id));
    }
  }

  for (const person of PEOPLE_REGISTRY) {
    for (const role of person.roles) {
      if (role.producer_slug) {
        edges.push(rel('person', person.slug, 'works_for', 'producer', role.producer_slug, role.confidence));
      }
    }
    if (person.leader_slot_id) {
      edges.push(rel('person', person.slug, 'references_person', 'leader_slot', person.leader_slot_id, 'verified'));
    }
    for (const bottleSlug of person.related_bottle_slugs ?? []) {
      edges.push(rel('person', person.slug, 'related_to', 'bottle', bottleSlug, 'commonly_reported'));
    }
  }

  for (const mash of MASH_BILL_REGISTRY) {
    edges.push(rel('mash_bill', mash.slug, 'produced_by', 'producer', mash.producer_slug));
  }

  for (const std of LEGAL_STANDARDS) {
    edges.push(rel('whiskey_category', std.category, 'legal_standard', 'legal_standard', std.slug, 'verified'));
  }

  for (const slot of LEADER_SLOT_REGISTRY) {
    if (slot.linked_producer_slug) {
      edges.push(rel('leader_slot', slot.id, 'works_for', 'producer', slot.linked_producer_slug));
    }
    if (slot.person_slug) {
      edges.push(rel('leader_slot', slot.id, 'references_person', 'person', slot.person_slug, 'verified'));
    }
  }

  return edges;
}

export function bottleChain(slug: string): InventoryRelationship[] {
  return buildInventoryRelationships().filter((e) => e.from.slug === slug || e.to.slug === slug);
}
