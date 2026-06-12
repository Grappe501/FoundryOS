/** PASS-034J/N — Consequence Engine types */

export type ConsequenceActionType =
  | 'detective_case_closed'
  | 'mission_completed'
  | 'collection_item_added'
  | 'event_voted'
  | 'hunt_mission_completed'
  | 'portfolio_artifact_created';

export type ConsequenceEffectKind =
  | 'action'
  | 'unlock_debate'
  | 'unlock_legendary_object'
  | 'unlock_collector_progress'
  | 'unlock_rabbit_hole'
  | 'mentor_memory'
  | 'unlock_path'
  | 'unlock_collection'
  | 'identity_signal'
  | 'world_event_unlock';

export type ConsequenceTrigger = {
  world_slug: string;
  action_type: ConsequenceActionType;
  action_id: string;
};

export type ConsequenceNode = {
  id: string;
  world_slug: string;
  label: string;
  kind: ConsequenceEffectKind;
  description?: string;
  href?: string;
  /** Target slug for collector, debate, object, etc. */
  target_id?: string;
  metadata?: Record<string, string | number | boolean>;
};

export type ConsequenceEdge = {
  from: string;
  to: string;
  label?: string;
};

/** One trigger → directed graph of consequences */
export type ConsequenceChain = {
  id: string;
  trigger: ConsequenceTrigger;
  title: string;
  nodes: ConsequenceNode[];
  edges: ConsequenceEdge[];
};

export type ConsequenceBundle = {
  chain: ConsequenceChain;
  /** Nodes unlocked by this trigger (excluding the action node itself) */
  effects: ConsequenceNode[];
  mentor_line?: string;
};

export type DiscoveryGraph = {
  world_slug: string;
  chains: ConsequenceChain[];
  nodes: ConsequenceNode[];
  edges: ConsequenceEdge[];
};
