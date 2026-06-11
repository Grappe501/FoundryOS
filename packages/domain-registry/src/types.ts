import type { IdentityDomainCategory } from './categories';

/** A lifelong identity domain — not an app */
export type IdentityDomain = {
  slug: string;
  display_name: string;
  tagline: string;
  category: IdentityDomainCategory;
  /** Why this domain matters — outcome, not machinery */
  care_reason: string;
  paths: string[];
  projects: string[];
  community_types: string[];
  legacy_signals: string[];
  collection_types?: string[];
  status: 'exemplar' | 'active' | 'planned';
};
