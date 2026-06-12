export type {
  IdentitySyncEventType,
  IdentitySyncEvent,
  CollectionUpdate,
  IdentitySignal,
  MemoryUpdate,
  PassportUpdate,
  WelcomeBackThread,
  CuriosityWeight,
  IdentitySyncResult,
  IdentitySyncContext,
} from './types';

export { propagateIdentityEvent, validateIdentitySyncEngine } from './propagate';

export {
  collectionUpdatesFromArtifact,
  collectionUpdatesFromGraphView,
  memoryFromEvent,
  welcomeThreadFromMemory,
  passportFromArtifact,
  passportFromCollection,
  curiosityFromGraph,
  curiosityFromComparison,
  identitySignalsFromUpdates,
} from './rules';
