-- Foundry Encyclopedia Engine — Knowledge Universe schema
-- Before PASS-007 (Entity Factory). Turns entities into living knowledge nodes.

-- ═══════════════════════════════════════════════════════════
-- ENCYCLOPEDIA (10 sections per entity)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS encyclopedia_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
  entity_slug TEXT NOT NULL,
  section_slug TEXT NOT NULL CHECK (section_slug IN (
    'definition', 'history', 'cultural_significance', 'geographic_significance',
    'trivia', 'related_concepts', 'common_misconceptions',
    'beginner_explanation', 'expert_explanation', 'sources'
  )),
  title TEXT NOT NULL,
  body TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb,
  content_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(entity_slug, section_slug)
);

-- ═══════════════════════════════════════════════════════════
-- ACADEMY (vertical.foundryos.com/academy)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS academy_curricula (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  academy_path TEXT NOT NULL DEFAULT '/academy',
  levels JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vertical_id, slug)
);

CREATE TABLE IF NOT EXISTS academy_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  curriculum_id UUID NOT NULL REFERENCES academy_curricula(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  level INT NOT NULL CHECK (level >= 1 AND level <= 7),
  title TEXT NOT NULL,
  description TEXT,
  entity_slugs TEXT[] DEFAULT '{}',
  path TEXT NOT NULL,
  estimated_minutes INT DEFAULT 30,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(curriculum_id, slug)
);

-- ═══════════════════════════════════════════════════════════
-- RECIPE ENGINE (unified: cocktails, brisket, top 100, reading paths)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS recipe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID REFERENCES verticals(id),
  entity_id UUID REFERENCES entities(id) ON DELETE SET NULL,
  slug TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN (
    'recipe', 'cocktail', 'guide', 'list', 'reading_path', 'comparison', 'learning_path'
  )),
  title TEXT NOT NULL,
  description TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  items JSONB DEFAULT '[]'::jsonb,
  entity_slugs TEXT[] DEFAULT '{}',
  path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vertical_id, slug)
);

-- ═══════════════════════════════════════════════════════════
-- USER KNOWLEDGE PROFILES (progress — not gamified)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS user_knowledge_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  progress_pct NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  lessons_completed INT NOT NULL DEFAULT 0,
  lessons_total INT NOT NULL DEFAULT 0,
  entities_engaged INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, vertical_id)
);

-- RLS
ALTER TABLE encyclopedia_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_curricula ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_knowledge_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "encyclopedia_published" ON encyclopedia_entries
  FOR SELECT USING (status = 'published' AND content_score >= 70);
CREATE POLICY "academy_public" ON academy_curricula FOR SELECT USING (status = 'published');
CREATE POLICY "academy_lessons_public" ON academy_lessons FOR SELECT USING (status = 'published');
CREATE POLICY "recipe_items_public" ON recipe_items FOR SELECT USING (status = 'published');
CREATE POLICY "knowledge_profile_own" ON user_knowledge_profiles
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "knowledge_profile_public_read" ON user_knowledge_profiles
  FOR SELECT USING (true);

INSERT INTO platform_config (key, value) VALUES
  ('knowledge_universe', '{"encyclopedia_sections":10,"academy_levels":7,"semantic_search":"reserved"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

COMMENT ON TABLE encyclopedia_entries IS 'Foundry Knowledge Universe — 10 sections per entity';
COMMENT ON TABLE academy_curricula IS 'Vertical academy — bourbon.foundryos.com/academy';
COMMENT ON TABLE recipe_items IS 'Unified recipe engine — cocktails, lists, reading paths';
COMMENT ON TABLE user_knowledge_profiles IS 'Knowledge progress per vertical — not gamified';
