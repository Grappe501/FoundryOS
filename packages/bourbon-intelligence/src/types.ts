/** PASS-040B1 — Bourbon Intelligence Inventory schema */

/** Primary-source confirmed */
export type SourceConfidence =
  | 'verified'
  | 'producer_disclosed'
  | 'commonly_reported'
  | 'editorial'
  | 'unknown';

export type ContentSource = 'generated' | 'community' | 'editorial' | 'verified';

export type SourceType =
  | 'legal'
  | 'official'
  | 'trade'
  | 'book'
  | 'archive'
  | 'editorial'
  | 'internal';

export type SourceCitation = {
  label: string;
  url?: string;
  publication?: string;
  accessed_at?: string;
  type: SourceType;
};

export type SourcedValue<T> = {
  value: T;
  confidence: SourceConfidence;
  content_source: ContentSource;
  citations?: SourceCitation[];
  notes?: string;
};

export type AmericanWhiskeyCategory =
  | 'bourbon'
  | 'rye_whiskey'
  | 'tennessee_whiskey'
  | 'american_single_malt'
  | 'wheat_whiskey'
  | 'corn_whiskey'
  | 'blended_american_whiskey'
  | 'canadian_whisky';

export type ProducerKind =
  | 'distiller'
  | 'craft_distiller'
  | 'sourced_label'
  | 'ndp'
  | 'legacy_brand'
  | 'ownership_group';

export type PersonRoleKind =
  | 'master_distiller'
  | 'blender'
  | 'founder'
  | 'family_operator'
  | 'cooper'
  | 'historian'
  | 'brand_builder';

export type TerroirConfidence = 'high' | 'medium' | 'low' | 'not_disclosed';

export type GrainKind = 'corn' | 'rye' | 'wheat' | 'barley' | 'malted_barley' | 'other';

export type MashbillStyle =
  | 'high-rye'
  | 'wheated'
  | 'traditional'
  | 'corn-heavy'
  | 'rye_whiskey'
  | 'unknown';

/** Percentages only when producer-disclosed or legally required minimums */
export type GrainComposition = {
  corn_pct?: SourcedValue<number | 'unknown'>;
  rye_pct?: SourcedValue<number | 'unknown'>;
  wheat_pct?: SourcedValue<number | 'unknown'>;
  barley_pct?: SourcedValue<number | 'unknown'>;
  other_grains?: SourcedValue<string>;
};

export type MashBillRecord = {
  slug: string;
  producer_slug: string;
  label: string;
  style: SourcedValue<MashbillStyle>;
  composition: GrainComposition;
  yeast?: SourcedValue<string>;
  water_source?: SourcedValue<string>;
  barrel?: SourcedValue<string>;
  warehouse?: SourcedValue<string>;
  flavor_family?: SourcedValue<string[]>;
};

export type TerroirRecord = {
  slug: string;
  producer_slug: string;
  grain_source: SourcedValue<string>;
  growing_region?: SourcedValue<string>;
  soil_influence: SourcedValue<string>;
  terroir_confidence: TerroirConfidence;
  notes?: string;
};

export type ProducerRecord = {
  slug: string;
  name: SourcedValue<string>;
  kind: ProducerKind;
  category: AmericanWhiskeyCategory;
  headquarters?: SourcedValue<string>;
  parent_company?: SourcedValue<string>;
  dsp_code?: SourcedValue<string>;
  founded?: SourcedValue<string>;
  ownership_notes?: SourcedValue<string>;
  mash_bill_slugs: string[];
  terroir_slug?: string;
  leader_slot_id?: string;
  bottle_slugs: string[];
  editorial_ref?: string;
};

export type BottleRecord = {
  slug: string;
  name: SourcedValue<string>;
  producer_slug: string;
  category: AmericanWhiskeyCategory;
  proof: SourcedValue<number>;
  age_years?: SourcedValue<number>;
  price_usd_est?: SourcedValue<number>;
  mash_bill_slug?: string;
  mashbill_style: SourcedValue<MashbillStyle>;
  comparable_bottle_slugs: string[];
  collection_path_slugs: string[];
  editorial_ref?: string;
};

export type PersonFact = {
  claim: string;
  confidence: SourceConfidence;
  content_source: ContentSource;
  citations: SourceCitation[];
};

export type PersonRole = {
  role: PersonRoleKind;
  producer_slug?: string;
  confidence: SourceConfidence;
  citations?: SourceCitation[];
};

export type PersonRecord = {
  slug: string;
  name: SourcedValue<string>;
  roles: PersonRole[];
  facts: PersonFact[];
  leader_slot_id?: string;
  /** Only true when every publishable field is verified or producer_disclosed */
  profile_publishable: boolean;
  related_bottle_slugs?: string[];
  related_producer_slugs?: string[];
};

export type LeaderSlotRecord = {
  id: string;
  label: string;
  role: PersonRoleKind | 'review_host' | 'club_host';
  linked_producer_slug?: string;
  person_slug?: string;
  status: 'empty' | 'community' | 'editorial' | 'verified';
};

export type InventoryRelationType =
  | 'produced_by'
  | 'distilled_by'
  | 'works_for'
  | 'uses_mash_bill'
  | 'sourced_from'
  | 'located_in'
  | 'compares_with'
  | 'recommended_after'
  | 'references_person'
  | 'grain_from'
  | 'aged_in'
  | 'stored_in'
  | 'flavor_family'
  | 'category_member'
  | 'legal_standard'
  | 'related_to';

export type InventoryRelationship = {
  id: string;
  from: { entity_type: InventoryEntityType; slug: string };
  to: { entity_type: InventoryEntityType; slug: string };
  relation: InventoryRelationType;
  confidence: SourceConfidence;
  notes?: string;
};

export type InventoryEntityType =
  | 'bottle'
  | 'producer'
  | 'person'
  | 'mash_bill'
  | 'terroir'
  | 'leader_slot'
  | 'whiskey_category'
  | 'legal_standard';

export type BourbonIntelligenceInventory = {
  version: string;
  legal_standards: string[];
  categories: AmericanWhiskeyCategory[];
  producers: ProducerRecord[];
  bottles: BottleRecord[];
  people: PersonRecord[];
  mash_bills: MashBillRecord[];
  terroir: TerroirRecord[];
  leader_slots: LeaderSlotRecord[];
  relationships: InventoryRelationship[];
};

export type InventoryStats = {
  producers: number;
  bottles: number;
  people: number;
  people_publishable: number;
  mash_bills: number;
  terroir_records: number;
  leader_slots: number;
  leader_slots_verified: number;
  relationships: number;
  unknown_mash_pct_fields: number;
  unsourced_verified_claims: number;
};
