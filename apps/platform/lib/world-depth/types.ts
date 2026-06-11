/** PASS-025 — World depth content types */

export type AcademyLesson = {
  level: number;
  slug: string;
  title: string;
  description: string;
  outcome: string;
  recommendedMission?: string;
};

export type DeepGlossaryTerm = {
  term: string;
  definition: string;
  whyItMatters: string;
  example: string;
  relatedTerms: string[];
};

export type CommunityDepth = {
  name: string;
  memberRoles: { role: string; description: string }[];
  weeklyChallenge: string;
  showcaseFormat: string;
  peerFeedbackLoop: string;
  mentorRole: string;
};

export type ParentDepth = {
  headline: string;
  oneLiner: string;
  whyItMatters: string;
  whatTheyBuild: string;
  skillsDemonstrated: string[];
  howProgressMeasured: string;
  successAfter30Days: string;
  sections: { title: string; body: string }[];
};

export type SeoGuide = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
};

export type WorldDepthBundle = {
  slug: string;
  displayName: string;
  accentColor: string;
  portfolioLabel: string;
  academyLessons: AcademyLesson[];
  glossary: DeepGlossaryTerm[];
  community: CommunityDepth;
  parent: ParentDepth;
  seoGuides: SeoGuide[];
};

export type WorldDepthAudit = {
  slug: string;
  displayName: string;
  academyLevels: number;
  academyLessons: number;
  missions: number;
  glossaryTerms: number;
  hasPortfolio: boolean;
  hasParentPage: boolean;
  hasCommunity: boolean;
  seoGuides: number;
  consumerReadinessPct: number;
  depthScore: number;
};
