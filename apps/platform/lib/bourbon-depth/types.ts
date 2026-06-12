/** PASS-034Q — Layer 1 depth upgrade: documentary profiles, not reference stubs */

export type PairingGuide = {
  occasion: string;
  why: string;
  serve?: string;
};

export type BourbonPerson = {
  slug: string;
  name: string;
  title: string;
  producerSlugs: string[];
  era: string;
  hook: string;
  originStory: string;
  careerHighlights: { year: string; event: string }[];
  philosophy: string;
  legacy: string;
  distinguishingFacts: string[];
  relatedBottleSlugs?: string[];
};

export type BottleDepth = {
  slug: string;
  history: string;
  howItsMade: string;
  distinguishingFacts: string[];
  pairings: PairingGuide[];
  whenBest: string;
  compareWith: string[];
  masterNote?: string;
};

export type ProducerDepthOverlay = {
  slug: string;
  foundingStory: string;
  survivalStory: string;
  distinguishingFacts: string[];
  pairings: PairingGuide[];
  whenBest: string;
  masterSlugs: string[];
  competitorView: string;
};

export type CompareDimension = {
  key: string;
  label: string;
  left: string | number;
  right: string | number;
  /** 0–100 for bar chart; higher = left wins visually */
  leftScore: number;
  rightScore: number;
  insight?: string;
};
