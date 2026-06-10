-- PASS-003: Identity & Ownership Layer
-- The heart of Foundry: who owns what, loves what, has reviewed what

-- ═══════════════════════════════════════════════════════════
-- IDENTITY (extend profiles)
-- ═══════════════════════════════════════════════════════════

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT true;

-- Subscriptions: add vertical scope (optional beyond category)
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS vertical_id UUID REFERENCES verticals(id);

-- ═══════════════════════════════════════════════════════════
-- OWNERSHIP GRAPH — single table powers half the platform
-- ═══════════════════════════════════════════════════════════

CREATE TABLE user_entity_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN (
    'owns',       -- My Shelf / owned items
    'favorites',  -- Favorites / loves
    'reviewed',   -- Has reviewed (links to reviews table)
    'ranked',     -- Personal ranking position
    'wants',      -- Watchlist / wishlist
    'watched',    -- Films, events seen
    'read',       -- Books read
    'listened',   -- Albums, podcasts
    'visited',    -- Places, parks, venues
    'experienced' -- Tastings, games, events experienced
  )),
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  rank_position INT CHECK (rank_position IS NULL OR rank_position > 0),
  personal_rating NUMERIC(3,1) CHECK (personal_rating IS NULL OR (personal_rating >= 0 AND personal_rating <= 10)),
  personal_notes TEXT,
  review_id UUID REFERENCES reviews(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, entity_id, relationship_type)
);

-- ═══════════════════════════════════════════════════════════
-- ENTITY METRICS — denormalized platform intelligence
-- Powers: Most Collected Bourbons, Most Reviewed Movies, etc.
-- ═══════════════════════════════════════════════════════════

CREATE TABLE entity_metrics (
  entity_id UUID PRIMARY KEY REFERENCES entities(id) ON DELETE CASCADE,
  reviews_count INT NOT NULL DEFAULT 0,
  collections_count INT NOT NULL DEFAULT 0,
  favorites_count INT NOT NULL DEFAULT 0,
  ownership_count INT NOT NULL DEFAULT 0,
  ranking_count INT NOT NULL DEFAULT 0,
  wants_count INT NOT NULL DEFAULT 0,
  visited_count INT NOT NULL DEFAULT 0,
  trust_score NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (trust_score >= 0 AND trust_score <= 100),
  total_engagement INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- CONTENT SOURCE + PUBLISH GATE (reserve concept, enforce later)
-- Sources: generated | community | editorial | verified
-- Pages publish ONLY when content_score >= threshold
-- ═══════════════════════════════════════════════════════════

ALTER TABLE content_pages ADD COLUMN IF NOT EXISTS content_source TEXT NOT NULL DEFAULT 'generated'
  CHECK (content_source IN ('generated', 'community', 'editorial', 'verified'));

ALTER TABLE content_pages ADD COLUMN IF NOT EXISTS content_score NUMERIC(5,2) NOT NULL DEFAULT 0
  CHECK (content_score >= 0 AND content_score <= 100);

ALTER TABLE content_pages ADD COLUMN IF NOT EXISTS minimum_publish_score NUMERIC(5,2) NOT NULL DEFAULT 70
  CHECK (minimum_publish_score >= 0 AND minimum_publish_score <= 100);

-- Platform-wide publish threshold config
CREATE TABLE IF NOT EXISTS platform_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO platform_config (key, value) VALUES
  ('seo_publish_threshold', '{"minimum_content_score": 70, "enforce": true}'::jsonb),
  ('content_sources', '{"types": ["generated", "community", "editorial", "verified"]}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- PLATFORM METRICS SNAPSHOT (mission control)
-- ═══════════════════════════════════════════════════════════

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('total_entities', '{"count": 0}'::jsonb),
  ('total_collections', '{"count": 0}'::jsonb),
  ('total_relationships', '{"count": 0}'::jsonb),
  ('total_user_entity_relationships', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════

CREATE INDEX idx_uer_user ON user_entity_relationships(user_id);
CREATE INDEX idx_uer_entity ON user_entity_relationships(entity_id);
CREATE INDEX idx_uer_type ON user_entity_relationships(relationship_type);
CREATE INDEX idx_uer_collection ON user_entity_relationships(collection_id);
CREATE INDEX idx_uer_public ON user_entity_relationships(is_public) WHERE is_public = true;
CREATE INDEX idx_entity_metrics_engagement ON entity_metrics(total_engagement DESC);
CREATE INDEX idx_entity_metrics_ownership ON entity_metrics(ownership_count DESC);
CREATE INDEX idx_entity_metrics_reviews ON entity_metrics(reviews_count DESC);
CREATE INDEX idx_content_pages_score ON content_pages(content_score);
CREATE INDEX idx_content_pages_source ON content_pages(content_source);

-- ═══════════════════════════════════════════════════════════
-- RLS
-- ═══════════════════════════════════════════════════════════

ALTER TABLE user_entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_config ENABLE ROW LEVEL SECURITY;

-- Ownership graph: user owns their rows, public rows readable
CREATE POLICY "uer_own" ON user_entity_relationships
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "uer_public_read" ON user_entity_relationships
  FOR SELECT USING (is_public = true);

-- Entity metrics: public read (powers leaderboards)
CREATE POLICY "entity_metrics_public" ON entity_metrics FOR SELECT USING (true);

-- Platform config: public read for non-secret keys
CREATE POLICY "platform_config_public" ON platform_config
  FOR SELECT USING (key IN ('seo_publish_threshold', 'content_sources'));

-- Content pages: only publish when score meets threshold
DROP POLICY IF EXISTS "content_pages_published" ON content_pages;
CREATE POLICY "content_pages_published" ON content_pages
  FOR SELECT USING (
    status = 'published' AND content_score >= minimum_publish_score
  );

-- ═══════════════════════════════════════════════════════════
-- METRIC UPDATE FUNCTION (entity_metrics sync)
-- ═══════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION refresh_entity_metrics(p_entity_id UUID)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO entity_metrics (entity_id, reviews_count, collections_count, favorites_count,
    ownership_count, ranking_count, wants_count, visited_count, total_engagement, updated_at)
  SELECT
    p_entity_id,
    (SELECT COUNT(*) FROM reviews WHERE entity_id = p_entity_id AND status = 'published'),
    (SELECT COUNT(*) FROM collection_items WHERE entity_id = p_entity_id),
    (SELECT COUNT(*) FROM user_entity_relationships WHERE entity_id = p_entity_id AND relationship_type = 'favorites'),
    (SELECT COUNT(*) FROM user_entity_relationships WHERE entity_id = p_entity_id AND relationship_type = 'owns'),
    (SELECT COUNT(*) FROM user_entity_relationships WHERE entity_id = p_entity_id AND relationship_type = 'ranked'),
    (SELECT COUNT(*) FROM user_entity_relationships WHERE entity_id = p_entity_id AND relationship_type = 'wants'),
    (SELECT COUNT(*) FROM user_entity_relationships WHERE entity_id = p_entity_id AND relationship_type = 'visited'),
    0,
    now()
  ON CONFLICT (entity_id) DO UPDATE SET
    reviews_count = EXCLUDED.reviews_count,
    collections_count = EXCLUDED.collections_count,
    favorites_count = EXCLUDED.favorites_count,
    ownership_count = EXCLUDED.ownership_count,
    ranking_count = EXCLUDED.ranking_count,
    wants_count = EXCLUDED.wants_count,
    visited_count = EXCLUDED.visited_count,
    total_engagement = EXCLUDED.reviews_count + EXCLUDED.collections_count +
      EXCLUDED.favorites_count + EXCLUDED.ownership_count + EXCLUDED.ranking_count,
    updated_at = now();
END;
$$;

COMMENT ON TABLE user_entity_relationships IS 'Ownership Graph — powers My Shelf, Favorites, Rankings, Watchlist without separate systems';
COMMENT ON TABLE entity_metrics IS 'Denormalized entity engagement — powers Most Collected, Most Reviewed leaderboards';
