export type TierLevel = 1 | 2 | 3;

export interface TierConfig {
  tier1: { features: string[]; limits: Record<string, number> };
  tier2: { features: string[]; price_monthly: number };
  tier3: { features: string[]; price_monthly: number };
}

export interface ThemeConfig {
  primary_color: string;
  accent_color: string;
  logo_url?: string;
}

export interface AIConfig {
  catalog_enrichment?: string;
  pairing_suggestion?: string;
  expert_review?: string;
}

export interface Category {
  id: string;
  slug: string;
  display_name: string;
  description: string;
  parent_category_id?: string;
  status: 'draft' | 'active' | 'archived';
  tier_config: TierConfig;
  theme_config: ThemeConfig;
  ai_config: AIConfig;
  created_at: string;
  updated_at: string;
}

export interface CatalogItem {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  metadata: Record<string, unknown>;
  image_url?: string;
  sort_order: number;
  status: 'draft' | 'published';
  created_at: string;
}

export interface UserProfile {
  id: string;
  display_name: string;
  avatar_url?: string;
  tier_level: TierLevel;
  created_at: string;
}

export interface UserCollection {
  id: string;
  user_id: string;
  category_id: string;
  catalog_item_id: string;
  collection_type: 'owned' | 'wishlist' | 'tried';
  personal_rating?: number;
  personal_notes?: string;
  created_at: string;
}

export interface CrossReference {
  id: string;
  source_category_id: string;
  target_category_id: string;
  reference_type: 'pairing' | 'complement' | 'alternative';
  metadata: Record<string, unknown>;
}
