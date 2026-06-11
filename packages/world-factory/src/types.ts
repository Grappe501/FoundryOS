/** PASS-024 — World factory blueprint types */

export type DomainBlueprintKind = 'life-leverage' | 'passion' | 'academic' | 'career';

export type BlueprintMission = {
  slug: string;
  number: number;
  title: string;
};

export type FullWorldBlueprint = {
  slug: string;
  displayName: string;
  kind: DomainBlueprintKind;
  frame: string;
  outcomeStatement: string;
  portfolioLabel: string;
  portfolioKey: string;
  communityName: string;
  parentOneLiner: string;
  parentHeadline: string;
  accentColor: string;
  borderColor: string;
  mission1Slug: string;
  missions: BlueprintMission[];
  exploreSectionId: string;
  exploreTier: 'Life Leverage' | 'Hobby' | 'Civic' | 'Career' | 'Academic';
  exploreCategories: string[];
  exploreBecome: string;
  exploreLaunchRank: number;
  plannedProjects: string[];
  glossaryTerms: { term: string; definition: string }[];
  careerPaths: { title: string; description: string }[];
  playgroundLabs: { slug: string; title: string; unlockLevel: number }[];
  portfolioSections: { slug: string; title: string; description: string }[];
  corePromise: string;
  nextWorldSlug?: string;
};

export type WorldLayer =
  | 'world_hub'
  | 'academy'
  | 'missions'
  | 'portfolio'
  | 'parents'
  | 'careers'
  | 'glossary'
  | 'community'
  | 'playground'
  | 'operator_proof'
  | 'marketing_launch'
  | 'seo_assets'
  | 'explore_registration';

export type WorldFactoryManifest = {
  generated_at: string;
  domains: string[];
};
