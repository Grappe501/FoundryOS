/** PASS-032B — World experience depth types */

export type ImmersionModule = {
  slug: string;
  title: string;
  description: string;
  category: 'lab' | 'journal' | 'tracker' | 'worksheet' | 'explorer' | 'calculator';
  estimatedMinutes: number;
  fields?: { key: string; label: string; type: 'text' | 'textarea' | 'number' | 'select'; options?: string[] }[];
};

export type Mission1Premium = {
  aboutToDo: string;
  whyItMatters: string;
  toolsNeeded: string[];
  quickVersion: string;
  fullVersion: string;
  submitArtifact: string;
  debriefPrompt: string;
  portfolioArtifact: string;
  tomorrowStep: string;
  enterCta: string;
};

export type CommunityAtmosphere = {
  mentorIntro: string;
  weeklyChallenge: string;
  starterDiscussions: string[];
  workingOn: string[];
  showcasePreview: string[];
  firstContributionCta: string;
};

export type WorldExperienceConfig = {
  slug: string;
  displayName: string;
  frame: string;
  tierLabel: string;
  identityPromise: string;
  emotionalHook: string;
  secretPathLine: string;
  startHereCta: string;
  mission1Slug: string;
  mission1Href: string;
  communityHref: string;
  portfolioLabel: string;
  collectProof: string[];
  exploreCraft: { title: string; href: string; description: string }[];
  mission1Premium: Mission1Premium;
  modules: ImmersionModule[];
  community: CommunityAtmosphere;
  /** Emotional audit scores (0–100) — operator baseline */
  emotionalScores: {
    emotionalPull: number;
    visualQuality: number;
    firstActionClarity: number;
    craftAuthenticity: number;
    depthPerception: number;
    returnDesire: number;
  };
};

export type WorldExperienceAuditRow = {
  slug: string;
  displayName: string;
  heroQuality: number;
  firstMissionQuality: number;
  toolDepth: number;
  visualRichness: number;
  communityAtmosphere: number;
  copyQuality: number;
  internalLanguageRemoved: number;
  returnHookClarity: number;
  totalScore: number;
  status: 'READY' | 'PARTIAL';
};
