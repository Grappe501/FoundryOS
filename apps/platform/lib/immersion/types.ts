/** PASS-032 — World Immersion Expansion types */

export type ImmersionTrack = {
  slug: string;
  label: string;
  description: string;
  estimatedHours: string;
};

export type ImmersionMissionBlueprint = {
  slug: string;
  number: number;
  track: string;
  title: string;
  subtitle: string;
  outcome: string;
  evidence: string;
  timeEstimate: string;
  requiredLevel: string;
  futureProof: string;
  toolsNeeded?: string;
  tomorrowHook: string;
  missionFocus: string;
  buildChecklist: string[];
  showArtifact: string;
  reflectPrompt: string;
  improveAction: string;
  mentorAction: string;
};

export type WorldExperience = {
  slug: string;
  title: string;
  description: string;
  category: 'tracker' | 'journal' | 'explorer' | 'tool' | 'pathway';
  portfolioSection?: string;
  estimatedMinutes?: number;
  href?: string;
};

export type WorldImmersionMeta = {
  slug: string;
  displayName: string;
  missionTarget: number;
  estimatedHours: string;
  tracks: ImmersionTrack[];
  experiences: WorldExperience[];
};
