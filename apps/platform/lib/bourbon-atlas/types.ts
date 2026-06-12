/** PASS-034E — The Atlas: deep rabbit-hole research layer for Bourbon */

export type AtlasForwardLink = {
  kind: 'lesson' | 'tool' | 'game' | 'producer' | 'detective' | 'lore' | 'collection' | 'story' | 'history' | 'geography' | 'page';
  href: string;
  label: string;
};

export type AtlasRabbitHole = {
  relatedTerms: string[];
  cousinIdeas: string[];
  producerLinks: AtlasForwardLink[];
  toolLinks: AtlasForwardLink[];
  lessonLinks: AtlasForwardLink[];
  storyLinks: AtlasForwardLink[];
  detectiveLinks: AtlasForwardLink[];
  historyLinks: AtlasForwardLink[];
  geographyLinks: AtlasForwardLink[];
};

export type AtlasEntry = {
  slug: string;
  title: string;
  shortDefinition: string;
  plainEnglish: string;
  whyItMatters: string;
  history: string;
  tasteBuyingCollecting: string;
  beginnerMisunderstanding: string;
  examples: string[];
  relatedTerms: string[];
  cousinIdeas: string[];
  geography?: string;
  forwardLinks: AtlasForwardLink[];
};

export type AtlasSeed = {
  slug: string;
  title: string;
  shortDefinition: string;
  category: 'production' | 'barrel' | 'legal' | 'tasting' | 'market' | 'culture' | 'grain' | 'chemistry';
  examples: string[];
  relatedSlugs: string[];
  cousinIdeas: string[];
  geography?: string;
  extra?: Partial<Pick<AtlasEntry, 'plainEnglish' | 'whyItMatters' | 'history' | 'tasteBuyingCollecting' | 'beginnerMisunderstanding'>>;
};
