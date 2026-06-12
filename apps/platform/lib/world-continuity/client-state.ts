/** Re-exports memory-store v1 — continuity client state lives here now */

export {
  getMemoryState,
  getMemorySignalsForWorld,
  getAllMemorySignals,
  recordWorldVisit,
  recordAtlasView,
  recordContextNote,
  recordIntentNote,
  recordGraphView,
  recordSavedRabbitHole,
  recordComparison,
  syncMemoryObjects,
  getMemoryObjectIds,
  getLastVisit,
  getAtlasViewsForWorld,
  getLatestContext,
  getLatestIntent,
  getContinuityState,
  type WorldMemoryV1,
  type ContinuityClientState,
} from '../world-memory/memory-store';
