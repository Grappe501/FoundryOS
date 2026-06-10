export type TemplateType = 'catalog-app' | 'social-app' | 'collector-app';

export interface TierFeatures {
  tier1: string[];
  tier2: string[];
  tier3: string[];
}

export interface AIConfig {
  catalogEnrichment?: string;
  pairingSuggestion?: string;
  expertReview?: string;
}

export interface AppManifest {
  template: TemplateType;
  slug: string;
  displayName: string;
  category: string;
  description: string;
  tiers: TierFeatures;
  aiConfig?: AIConfig;
  crossRefs?: string[];
  theme?: {
    primaryColor?: string;
    accentColor?: string;
  };
}

export interface GenerateResult {
  success: boolean;
  slug: string;
  filesCreated: string[];
  errors: string[];
}
