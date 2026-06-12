export type {
  SourceConfidence,
  ContentSource,
  SourceCitation,
  SourceType,
  SourcedValue,
  AmericanWhiskeyCategory,
  ProducerKind,
  PersonRoleKind,
  TerroirConfidence,
  GrainKind,
  MashbillStyle,
  GrainComposition,
  MashBillRecord,
  TerroirRecord,
  ProducerRecord,
  BottleRecord,
  PersonFact,
  PersonRole,
  PersonRecord,
  LeaderSlotRecord,
  InventoryRelationType,
  InventoryRelationship,
  InventoryEntityType,
  BourbonIntelligenceInventory,
  InventoryStats,
} from './types';

export { sv, unknownField, unknownGrain, ECFR_BOURBON_STANDARD, BUFFALO_TRACE_HARLEN, WILD_TURKEY_OFFICIAL } from './sources/citations';
export { LEGAL_STANDARDS, CANADIAN_WHISKY_COMPARISON } from './legal/standards-of-identity';
export type { LegalStandardRecord } from './legal/standards-of-identity';
export { AMERICAN_WHISKEY_CATEGORIES } from './categories/american-whiskey';
export type { WhiskeyCategoryRecord } from './categories/american-whiskey';

export { BOTTLE_CATALOG, PRODUCER_CATALOG, BOTTLE_COMPARISON_SETS, COLLECTION_PATHS } from './registries/catalog-seeds';
export { MASH_BILL_REGISTRY, TERROIR_REGISTRY } from './registries/mash-terroir';
export { PEOPLE_REGISTRY, getPerson, peopleForProducer } from './registries/people';
export { LEADER_SLOT_REGISTRY, leaderSlotExport } from './registries/leader-slots';

export { buildInventoryRelationships, bottleChain } from './graph/relationships';

export {
  getBourbonIntelligenceInventory,
  getBottleRecord,
  getProducerRecord,
  inventoryStats,
  validateBourbonIntelligence,
} from './inventory';
