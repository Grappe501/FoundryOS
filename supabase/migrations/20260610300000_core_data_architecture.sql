-- PASS-002: Core Data Architecture
-- Universal entity system — NO niche tables (bourbons, movies, albums, books, teams)
-- Designed for 2,000+ niches, 3-year horizon

-- ═══════════════════════════════════════════════════════════
-- ENTITY SYSTEM (universal)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE entity_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  vertical_id UUID REFERENCES verticals(id),
  schema_definition JSONB NOT NULL DEFAULT '{}'::jsonb,
  icon TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_id UUID NOT NULL REFERENCES entity_types(id),
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(entity_type_id, slug)
);

CREATE TABLE entity_attributes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  attribute_key TEXT NOT NULL,
  attribute_value JSONB NOT NULL,
  value_type TEXT NOT NULL DEFAULT 'string'
    CHECK (value_type IN ('string', 'number', 'boolean', 'date', 'json', 'array')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(entity_id, attribute_key)
);

CREATE TABLE entity_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  target_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL
    CHECK (relationship_type IN (
      'pairs_with', 'featured_in', 'related_to', 'alternative_to',
      'part_of', 'created_by', 'inspired_by', 'complements', 'cross_vertical',
      'directed_by', 'performed_by', 'authored_by', 'member_of', 'competes_with'
    )),
  strength NUMERIC(3,2) NOT NULL DEFAULT 1.0 CHECK (strength >= 0 AND strength <= 1),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(source_entity_id, target_entity_id, relationship_type)
);

-- ═══════════════════════════════════════════════════════════
-- CONTENT ENGINE (CMS + SEO factory)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE content_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  path_segment TEXT NOT NULL,
  auto_generate BOOLEAN NOT NULL DEFAULT true,
  schema_types TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type_id UUID NOT NULL REFERENCES content_types(id),
  target_type TEXT NOT NULL CHECK (target_type IN ('topic', 'entity')),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  seo_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  structured_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT content_target_check CHECK (
    (target_type = 'topic' AND topic_id IS NOT NULL AND entity_id IS NULL) OR
    (target_type = 'entity' AND entity_id IS NOT NULL AND topic_id IS NULL)
  )
);

-- ═══════════════════════════════════════════════════════════
-- COLLECTIONS (crown jewel — User → Collection → Entities)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  collection_type TEXT NOT NULL DEFAULT 'personal'
    CHECK (collection_type IN ('personal', 'wishlist', 'ranked', 'shared', 'club')),
  is_public BOOLEAN NOT NULL DEFAULT false,
  cover_image_url TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  entity_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, slug)
);

CREATE TABLE collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  sort_order INT NOT NULL DEFAULT 0,
  personal_rating NUMERIC(3,1) CHECK (personal_rating >= 0 AND personal_rating <= 10),
  personal_notes TEXT,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(collection_id, entity_id)
);

-- ═══════════════════════════════════════════════════════════
-- REVIEWS & RANKINGS
-- ═══════════════════════════════════════════════════════════

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  title TEXT,
  body TEXT NOT NULL,
  rating NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10),
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'published', 'hidden', 'flagged')),
  helpful_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, entity_id)
);

CREATE TABLE rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  rank_position INT NOT NULL CHECK (rank_position > 0),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- REPUTATION (authority — not gamification)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE user_reputation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  trust_score NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (trust_score >= 0 AND trust_score <= 100),
  collections_count INT NOT NULL DEFAULT 0,
  reviews_count INT NOT NULL DEFAULT 0,
  rankings_count INT NOT NULL DEFAULT 0,
  contributions_count INT NOT NULL DEFAULT 0,
  region TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, vertical_id, topic_id)
);

CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  display_name TEXT NOT NULL,
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE(user_id, badge_type, vertical_id, topic_id)
);

CREATE TABLE user_expertise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  region TEXT,
  level INT NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 5),
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE user_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contribution_type TEXT NOT NULL
    CHECK (contribution_type IN ('review', 'ranking', 'collection', 'guide', 'correction', 'relationship')),
  entity_id UUID REFERENCES entities(id),
  review_id UUID REFERENCES reviews(id),
  collection_id UUID REFERENCES collections(id),
  vertical_id UUID REFERENCES verticals(id),
  impact_score NUMERIC(5,2) NOT NULL DEFAULT 1.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- SEED: Universal content types
-- ═══════════════════════════════════════════════════════════

INSERT INTO content_types (slug, display_name, path_segment, auto_generate, schema_types) VALUES
  ('overview', 'Overview', 'overview', true, ARRAY['Article', 'WebPage']),
  ('history', 'History', 'history', true, ARRAY['Article']),
  ('faq', 'FAQ', 'faq', true, ARRAY['FAQPage', 'Article']),
  ('guides', 'Guides', 'guides', true, ARRAY['Article', 'HowTo']),
  ('best_of', 'Best Of', 'best-of', true, ARRAY['ItemList', 'Article']),
  ('comparisons', 'Comparisons', 'comparisons', true, ARRAY['Article', 'ItemList']),
  ('reviews', 'Reviews', 'reviews', true, ARRAY['Review', 'ItemList']),
  ('collections', 'Collections', 'collections', true, ARRAY['Collection', 'ItemList']),
  ('rankings', 'Rankings', 'rankings', true, ARRAY['ItemList']),
  ('news', 'News', 'news', true, ARRAY['Article', 'NewsArticle']),
  ('events', 'Events', 'events', true, ARRAY['Event', 'ItemList'])
ON CONFLICT (slug) DO NOTHING;

-- SEED: Example entity types (universal — not niche tables)
INSERT INTO entity_types (slug, display_name, description, schema_definition) VALUES
  ('spirit', 'Spirit', 'Bourbon, whisky, rum, etc.', '{"attributes":["distillery","proof","mash_bill","age"]}'),
  ('film', 'Film', 'Movies and cinema', '{"attributes":["director","year","genre","runtime"]}'),
  ('album', 'Album', 'Music albums', '{"attributes":["artist","year","label","genre"]}'),
  ('book', 'Book', 'Books and literature', '{"attributes":["author","isbn","publisher","year"]}'),
  ('team', 'Team', 'Sports teams', '{"attributes":["league","conference","mascot","stadium"]}'),
  ('person', 'Person', 'Authors, directors, musicians', '{"attributes":["birth_year","nationality","bio"]}'),
  ('place', 'Place', 'Distilleries, venues, regions', '{"attributes":["location","country","coordinates"]}'),
  ('recipe', 'Recipe', 'Food and BBQ recipes', '{"attributes":["cuisine","prep_time","difficulty"]}'),
  ('event', 'Event', 'Festivals, games, releases', '{"attributes":["date","venue","type"]}')
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════

CREATE INDEX idx_entities_type ON entities(entity_type_id);
CREATE INDEX idx_entities_vertical ON entities(vertical_id);
CREATE INDEX idx_entities_topic ON entities(topic_id);
CREATE INDEX idx_entities_status ON entities(status);
CREATE INDEX idx_entity_attrs_entity ON entity_attributes(entity_id);
CREATE INDEX idx_entity_rel_source ON entity_relationships(source_entity_id);
CREATE INDEX idx_entity_rel_target ON entity_relationships(target_entity_id);
CREATE INDEX idx_content_pages_topic ON content_pages(topic_id);
CREATE INDEX idx_content_pages_entity ON content_pages(entity_id);
CREATE INDEX idx_content_pages_path ON content_pages(path);
CREATE INDEX idx_collections_user ON collections(user_id);
CREATE INDEX idx_collections_vertical ON collections(vertical_id);
CREATE INDEX idx_collection_items_collection ON collection_items(collection_id);
CREATE INDEX idx_collection_items_entity ON collection_items(entity_id);
CREATE INDEX idx_reviews_entity ON reviews(entity_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_rankings_user ON rankings(user_id);
CREATE INDEX idx_rankings_collection ON rankings(collection_id);
CREATE INDEX idx_user_reputation_user ON user_reputation(user_id);
CREATE INDEX idx_user_expertise_user ON user_expertise(user_id);
CREATE INDEX idx_user_contributions_user ON user_contributions(user_id);

-- ═══════════════════════════════════════════════════════════
-- RLS
-- ═══════════════════════════════════════════════════════════

ALTER TABLE entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reputation ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_contributions ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "entity_types_public" ON entity_types FOR SELECT USING (status = 'active');
CREATE POLICY "entities_published" ON entities FOR SELECT USING (status = 'published');
CREATE POLICY "entity_attrs_public" ON entity_attributes FOR SELECT USING (
  entity_id IN (SELECT id FROM entities WHERE status = 'published')
);
CREATE POLICY "entity_rel_public" ON entity_relationships FOR SELECT USING (true);
CREATE POLICY "content_types_public" ON content_types FOR SELECT USING (true);
CREATE POLICY "content_pages_published" ON content_pages FOR SELECT USING (status = 'published');

-- Collections: owner or public
CREATE POLICY "collections_own" ON collections FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "collections_public_read" ON collections FOR SELECT USING (is_public = true);

CREATE POLICY "collection_items_own" ON collection_items FOR ALL USING (
  collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid())
);
CREATE POLICY "collection_items_public_read" ON collection_items FOR SELECT USING (
  collection_id IN (SELECT id FROM collections WHERE is_public = true)
);

-- Reviews: public read published, own write
CREATE POLICY "reviews_public" ON reviews FOR SELECT USING (status = 'published');
CREATE POLICY "reviews_own" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Rankings: own
CREATE POLICY "rankings_own" ON rankings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "rankings_public_read" ON rankings FOR SELECT USING (
  collection_id IN (SELECT id FROM collections WHERE is_public = true)
);

-- Reputation: public read (authority is visible), own write via triggers/service
CREATE POLICY "reputation_public" ON user_reputation FOR SELECT USING (true);
CREATE POLICY "badges_public" ON user_badges FOR SELECT USING (true);
CREATE POLICY "expertise_public" ON user_expertise FOR SELECT USING (true);
CREATE POLICY "contributions_public" ON user_contributions FOR SELECT USING (true);
CREATE POLICY "contributions_own" ON user_contributions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Deprecate old kg_* tables in favor of universal entities
COMMENT ON TABLE kg_entities IS 'DEPRECATED: Use entities + entity_types. See docs/ENTITY_MODEL.md';
COMMENT ON TABLE kg_relationships IS 'DEPRECATED: Use entity_relationships. See docs/ENTITY_MODEL.md';
