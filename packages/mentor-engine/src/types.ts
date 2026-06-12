export type UserSegment = 'student' | 'teen' | 'parent' | 'adult' | 'caregiver' | 'operator';

export type PyramidLayer = 'definitions' | 'concepts' | 'execution' | 'projects' | 'mastery';

export type MasteryRoad = {
  slug: string;
  display_name: string;
  domain_slug: string;
  pyramid_layers: PyramidLayer[];
  status: 'exemplar' | 'planned' | 'live';
  levels: {
    level: number;
    name: string;
    layer: PyramidLayer;
    milestones: { slug: string; title: string; description: string; requirement: string; sort_order: number }[];
  }[];
};

export type PortfolioMissionEntry = {
  missionSlug: string;
  missionTitle: string;
  completedAt: string;
  reflection: string;
};

export type WorldJourneySlice = {
  world_slug: string;
  world_name: string;
  identity_title: string;
  mentor_name: string;
  portfolio_key: string;
  mission_count: number;
  completed_missions: PortfolioMissionEntry[];
  href: string;
  /** Optional legendary journal item count */
  journal_items?: number;
};

export type LivingJourneySnapshot = {
  display_name: string;
  user_segment: UserSegment;
  worlds: WorldJourneySlice[];
  active_world_slugs: string[];
  total_missions_completed: number;
  recent_reflections: { world_slug: string; text: string; mission_title: string; at: string }[];
  all_reflection_text: string;
  /** PASS-034A — optional identity layer from client storage */
  identity?: IdentityContext;
  secret_paths?: SecretPath[];
  unlocked_legendary?: UnlockedLegendaryObject[];
};

export type AmbitionRef = { slug: string; label: string; tagline: string };
export type DreamRef = { slug: string; label: string };

export type IdentityContext = {
  ambitions: AmbitionRef[];
  dreams: DreamRef[];
  stated_goals?: { text: string; world_slug?: string; at: string }[];
};

export type SecretPath = {
  id: string;
  title: string;
  tagline: string;
  source_world: string;
  links_to: { world: string; label: string }[];
  newly_discovered: boolean;
  href: string;
};

export type UnlockedLegendaryObject = {
  object_id: string;
  unlocked_at: string;
  note?: string;
};

export type MentorChallenge = {
  id: string;
  world_slug: string;
  mentor_name: string;
  title: string;
  body: string;
  href: string;
  expires_hint: string;
};

export type SomeoneLikeMePattern = {
  message: string;
  href: string;
  next_label: string;
};

export type MentorInsight = {
  world_slug: string;
  mentor_name: string;
  headline: string;
  body: string;
  tone: 'encouraging' | 'direct' | 'challenge' | 'celebrate';
  actions: { label: string; href: string }[];
  /** PASS-034A — identity-forward headline when ambitions set */
  becoming?: string;
};

export type CrossWorldDiscovery = {
  world_slug: string;
  world_name: string;
  reason: string;
  href: string;
  because: string[];
  score: number;
};

export type AdaptiveRecommendation = {
  type: 'lesson' | 'glossary' | 'mission' | 'practice' | 'mentor_chat';
  title: string;
  href: string;
  reason: string;
};

export type DailyObsessionHook = {
  id: string;
  headline: string;
  body: string;
  href: string;
  world_slug?: string;
  kind: 'mentor' | 'challenge' | 'discovery' | 'community' | 'collection';
};

export type LegendaryCollectionSchema = {
  world_slug: string;
  label: string;
  storage_key: string;
  sections: { id: string; title: string; description: string; icon: string }[];
};
