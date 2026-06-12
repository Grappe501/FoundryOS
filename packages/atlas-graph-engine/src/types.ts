/** PASS-040B — Graph nodes: destinations become hallways */

export type GraphEntityType =
  | 'bottle'
  | 'producer'
  | 'person'
  | 'place'
  | 'organization'
  | 'event'
  | 'atlas_term'
  | 'debate'
  | 'mystery'
  | 'collection'
  | 'artifact'
  | 'detective'
  | 'lore'
  | 'review'
  | 'recommendation'
  | 'technique'
  | 'tradition'
  | 'era'
  | 'innovation'
  | 'movement'
  | 'location'
  | 'journey'
  | 'experience'
  | 'question';

/** Multi-identity labels on one node — e.g. BiB = Law + History + Collecting Strategy */
export type GraphNodeIdentity =
  | 'law'
  | 'history'
  | 'government_reform'
  | 'quality_standard'
  | 'collecting_strategy'
  | 'buying_guide'
  | 'debate'
  | 'technique'
  | 'tradition'
  | 'era'
  | 'innovation'
  | 'movement'
  | string;

export type GraphRelationType =
  | 'created_by'
  | 'works_for'
  | 'competes_with'
  | 'related_to'
  | 'located_in'
  | 'influenced_by'
  | 'part_of'
  | 'controversy_about'
  | 'recommended_after'
  | 'explores'
  | 'unlocks'
  | 'hosts'
  | 'emerged_in_era'
  | 'enabled_by'
  | 'answers';

export type GraphConfidence =
  | 'verified'
  | 'producer_disclosed'
  | 'commonly_reported'
  | 'editorial'
  | 'unknown';

export type GraphConnection = {
  id: string;
  relation: GraphRelationType;
  entity_type: GraphEntityType;
  slug: string;
  title: string;
  href: string;
  teaser: string;
  group: string;
  confidence?: GraphConfidence;
  /** Citation or registry label — required when confidence is verified */
  source_label?: string;
};

/** Behaviors one node supports — Read · Investigate · Compare · Explore · Collect · Influence */
export type GraphNodeBehaviors = {
  read?: string;
  investigate?: string;
  compare?: string;
  explore?: string;
  collect?: string;
  influence?: string;
};

export type EntityGraphView = {
  world_slug: string;
  entity_type: GraphEntityType;
  slug: string;
  title: string;
  /** Primary engagement hook — always first in UI */
  why_should_i_care: string;
  /** @deprecated use why_should_i_care */
  why_it_matters: string;
  /** Multi-identity: one node, many hats */
  identities?: GraphNodeIdentity[];
  behaviors?: GraphNodeBehaviors;
  suggested_next?: GraphConnection;
  connections: GraphConnection[];
  connection_count: number;
};

export type GraphEntityRef = {
  world_slug: string;
  entity_type: GraphEntityType;
  slug: string;
};
