/**
 * Platform bridge — intelligence registry is source of truth for catalog + graph.
 * Editorial depth layers (bourbon-depth, world-depth narratives) remain separate.
 */
export {
  getBourbonIntelligenceInventory,
  getBottleRecord,
  getProducerRecord,
  getPerson,
  peopleForProducer,
  bottleChain,
  inventoryStats,
  validateBourbonIntelligence,
  leaderSlotExport,
  LEGAL_STANDARDS,
  ECFR_BOURBON_STANDARD,
} from '@foundry/bourbon-intelligence';

export type { BottleRecord, ProducerRecord, PersonRecord, InventoryRelationship } from '@foundry/bourbon-intelligence';
