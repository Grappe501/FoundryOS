-- FoundryOS Initial Schema
-- Single database, category-branched architecture
-- RLS enabled on all tables

-- ─── Categories (Apps) ────────────────────────────────────
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  parent_category_id UUID REFERENCES categories(id),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  tier_config JSONB NOT NULL DEFAULT '{
    "tier1": {"features": ["catalog", "search", "browse"], "limits": {}},
    "tier2": {"features": ["collections", "rankings", "notes"], "price_monthly": 4},
    "tier3": {"features": ["clubs", "sharing", "ai-pairing"], "price_monthly": 18}
  }'::jsonb,
  theme_config JSONB NOT NULL DEFAULT '{
    "primary_color": "#C8A96E",
    "accent_color": "#E8D5B0"
  }'::jsonb,
  ai_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Catalog Items (Tier 1) ─────────────────────────────
CREATE TABLE catalog_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

-- ─── User Profiles ──────────────────────────────────────
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  tier_level INT NOT NULL DEFAULT 1 CHECK (tier_level IN (1, 2, 3)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── User Collections (Tier 2) ────────────────────────────
CREATE TABLE user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  catalog_item_id UUID NOT NULL REFERENCES catalog_items(id) ON DELETE CASCADE,
  collection_type TEXT NOT NULL CHECK (collection_type IN ('owned', 'wishlist', 'tried')),
  personal_rating NUMERIC(3,1) CHECK (personal_rating >= 0 AND personal_rating <= 10),
  personal_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, category_id, catalog_item_id, collection_type)
);

-- ─── User Rankings (Tier 2) ───────────────────────────────
CREATE TABLE user_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  catalog_item_id UUID NOT NULL REFERENCES catalog_items(id) ON DELETE CASCADE,
  rank_position INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, category_id, catalog_item_id)
);

-- ─── Social Groups (Tier 3) ──────────────────────────────
CREATE TABLE social_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(category_id, slug)
);

CREATE TABLE social_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES social_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- ─── Cross References (Cross-App) ────────────────────────
CREATE TABLE cross_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  target_category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  reference_type TEXT NOT NULL CHECK (reference_type IN ('pairing', 'complement', 'alternative')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Subscriptions ───────────────────────────────────────
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  tier_level INT NOT NULL CHECK (tier_level IN (2, 3)),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  stripe_subscription_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ─────────────────────────────────────────────
CREATE INDEX idx_catalog_items_category ON catalog_items(category_id);
CREATE INDEX idx_catalog_items_status ON catalog_items(status);
CREATE INDEX idx_user_collections_user ON user_collections(user_id);
CREATE INDEX idx_user_collections_category ON user_collections(category_id);
CREATE INDEX idx_social_groups_category ON social_groups(category_id);
CREATE INDEX idx_cross_refs_source ON cross_references(source_category_id);
CREATE INDEX idx_cross_refs_target ON cross_references(target_category_id);

-- ─── RLS ─────────────────────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Public read for active categories and published catalog
CREATE POLICY "categories_public_read" ON categories
  FOR SELECT USING (status = 'active');

CREATE POLICY "catalog_public_read" ON catalog_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "cross_refs_public_read" ON cross_references
  FOR SELECT USING (true);

-- User owns their profile
CREATE POLICY "profiles_own" ON user_profiles
  FOR ALL USING (auth.uid() = id);

-- User owns their collections
CREATE POLICY "collections_own" ON user_collections
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "rankings_own" ON user_rankings
  FOR ALL USING (auth.uid() = user_id);

-- Social groups: public groups readable, members can see private
CREATE POLICY "groups_public_read" ON social_groups
  FOR SELECT USING (is_public = true OR owner_id = auth.uid());

CREATE POLICY "group_members_read" ON social_group_members
  FOR SELECT USING (
    user_id = auth.uid() OR
    group_id IN (SELECT id FROM social_groups WHERE is_public = true)
  );

-- Subscriptions: user sees own
CREATE POLICY "subscriptions_own" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
