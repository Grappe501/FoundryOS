/** PASS-034U — Universe Command Center types */

export const HEATMAP_LAYERS = [
  'Atlas',
  'Academy',
  'Missions',
  'Experiences',
  'Community',
  'Collections',
  'Events',
  'Identity',
  'Memory',
  'Marketing',
  'Revenue',
] as const;

export type HeatmapLayer = (typeof HEATMAP_LAYERS)[number];

export type KnowledgeKind =
  | 'worlds'
  | 'atlas_entries'
  | 'bottles'
  | 'producers'
  | 'leader_slots'
  | 'verified_profiles'
  | 'places'
  | 'organizations'
  | 'debates'
  | 'mysteries'
  | 'collections'
  | 'artifacts'
  | 'reviews';

export type KnowledgeInventory = Record<KnowledgeKind, number>;

export type GraphNodeCoverage = {
  id: string;
  label: string;
  entity_type: string;
  connections: number;
  weak: boolean;
};

export type WorldLayerScores = {
  slug: string;
  displayName: string;
  overallScore: number;
  layers: Record<HeatmapLayer, number>;
};

export type BuildQueueItem = {
  rank: number;
  target: string;
  target_type: 'world' | 'graph_node' | 'atlas_gap' | 'layer';
  world_slug?: string;
  score: number;
  reasons: string[];
  estimated_hours?: number;
};

export type AtlasHealthRow = {
  slug: string;
  title: string;
  connections: number;
  missing_why_care: boolean;
  missing_geography: boolean;
  missing_debate: boolean;
  missing_mystery: boolean;
  missing_collection: boolean;
  missing_artifact: boolean;
};

export type KnowledgeGravityNode = {
  slug: string;
  title: string;
  connections: number;
  world_slug: string;
};

export type UniverseSnapshot = {
  generated_at: string;
  knowledge: KnowledgeInventory;
  graph_density_avg: number;
  graph_weak_nodes: GraphNodeCoverage[];
  world_scores: WorldLayerScores[];
  build_queue: BuildQueueItem[];
  atlas_health_summary: {
    entries: number;
    avg_connections: number;
    missing_why_care: number;
    missing_geography: number;
    missing_debate: number;
    missing_mystery: number;
    missing_collection: number;
    missing_artifact: number;
  };
  knowledge_gravity: KnowledgeGravityNode[];
  highest_roi_world: BuildQueueItem | null;
};
