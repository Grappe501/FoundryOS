-- Course Correction: Vertical domains + Topics + Knowledge Graph
-- Replaces per-topic site model with vertical domains + topic paths

-- ─── Vertical Sites (public domains) ──────────────────────
CREATE TABLE IF NOT EXISTS vertical_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  vertical_id UUID REFERENCES verticals(id),
  site_type TEXT NOT NULL DEFAULT 'vertical'
    CHECK (site_type IN ('headquarters', 'vertical')),
  flagship_topic_slug TEXT,
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'building', 'live', 'archived')),
  launch_pass TEXT,
  seo_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Topics (registry entries — pages not sites) ──────────
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  vertical_id UUID NOT NULL REFERENCES verticals(id),
  category_group TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'ready', 'published', 'archived')),
  build_priority TEXT DEFAULT 'P3',
  cross_refs TEXT[] DEFAULT '{}',
  catalog_index INT,
  seo_title TEXT,
  seo_description TEXT,
  ai_expert_persona JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Knowledge Graph Entities ─────────────────────────────
CREATE TABLE IF NOT EXISTS kg_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  entity_type TEXT NOT NULL
    CHECK (entity_type IN ('topic', 'product', 'person', 'place', 'event', 'concept')),
  vertical_id UUID REFERENCES verticals(id),
  topic_id UUID REFERENCES topics(id),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(slug, vertical_id)
);

-- ─── Knowledge Graph Relationships ────────────────────────
CREATE TABLE IF NOT EXISTS kg_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_entity_id UUID NOT NULL REFERENCES kg_entities(id) ON DELETE CASCADE,
  target_entity_id UUID NOT NULL REFERENCES kg_entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL
    CHECK (relationship_type IN (
      'pairs_with', 'featured_in', 'related_to', 'alternative_to',
      'part_of', 'created_by', 'inspired_by', 'complements', 'cross_vertical'
    )),
  strength NUMERIC(3,2) NOT NULL DEFAULT 1.0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(source_entity_id, target_entity_id, relationship_type)
);

-- ─── SEO Pages (programmatic) ─────────────────────────────
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL
    CHECK (page_type IN (
      'topic', 'collection', 'ranking', 'review', 'best-of',
      'beginners-guide', 'comparison', 'history'
    )),
  path TEXT NOT NULL,
  title TEXT NOT NULL,
  structured_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(topic_id, page_type)
);

-- ─── Build Passes (institutional memory) ────────────────────
CREATE TABLE IF NOT EXISTS build_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pass_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  author TEXT DEFAULT 'Burt',
  commit_hash TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('in_progress', 'completed', 'planned')),
  deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Platform Metrics (mission control) ───────────────────
CREATE TABLE IF NOT EXISTS platform_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key TEXT UNIQUE NOT NULL,
  metric_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_topics_vertical ON topics(vertical_id);
CREATE INDEX IF NOT EXISTS idx_topics_status ON topics(status);
CREATE INDEX IF NOT EXISTS idx_kg_entities_vertical ON kg_entities(vertical_id);
CREATE INDEX IF NOT EXISTS idx_kg_entities_topic ON kg_entities(topic_id);
CREATE INDEX IF NOT EXISTS idx_kg_rel_source ON kg_relationships(source_entity_id);
CREATE INDEX IF NOT EXISTS idx_kg_rel_target ON kg_relationships(target_entity_id);
CREATE INDEX IF NOT EXISTS idx_seo_pages_topic ON seo_pages(topic_id);
CREATE INDEX IF NOT EXISTS idx_vertical_sites_domain ON vertical_sites(domain);

-- ─── RLS ──────────────────────────────────────────────────
ALTER TABLE vertical_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE kg_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE kg_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vertical_sites_public" ON vertical_sites FOR SELECT USING (status = 'live' OR site_type = 'headquarters');
CREATE POLICY "topics_published" ON topics FOR SELECT USING (status = 'published');
CREATE POLICY "kg_entities_public" ON kg_entities FOR SELECT USING (true);
CREATE POLICY "kg_relationships_public" ON kg_relationships FOR SELECT USING (true);
CREATE POLICY "seo_pages_published" ON seo_pages FOR SELECT USING (status = 'published');
CREATE POLICY "build_passes_public" ON build_passes FOR SELECT USING (true);
CREATE POLICY "platform_metrics_public" ON platform_metrics FOR SELECT USING (true);

-- Deprecate per-topic app_sites (keep table, mark deprecated in docs)
COMMENT ON TABLE app_sites IS 'DEPRECATED: Use vertical_sites + topics. See docs/COURSE_CORRECTION.md';
