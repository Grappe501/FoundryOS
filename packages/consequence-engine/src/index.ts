export type {
  ConsequenceActionType,
  ConsequenceEffectKind,
  ConsequenceTrigger,
  ConsequenceNode,
  ConsequenceEdge,
  ConsequenceChain,
  ConsequenceBundle,
  DiscoveryGraph,
} from './types';

export {
  ALL_CONSEQUENCE_CHAINS,
  getConsequenceChain,
  findChainForTrigger,
  chainsForWorld,
  buildDiscoveryGraph,
  LIVE_WORLDS_WITH_CONSEQUENCES,
} from './registry';

export { resolveConsequences, downstreamOf, effectKindLabel } from './resolve';

export { BOURBON_WELLER_CHAIN, BOURBON_DETECTIVE_CHAINS } from './worlds/bourbon';
export { AI_BUILDER_HOMEWORK_CHAIN, AI_BUILDER_CHAINS } from './worlds/ai-builder';
export { PUBLIC_SPEAKING_FIRST_TALK_CHAIN, PUBLIC_SPEAKING_CHAINS } from './worlds/public-speaking';
export { CIVIC_VOTER_GUIDE_CHAIN, CIVIC_CHAINS } from './worlds/civic-engagement';
