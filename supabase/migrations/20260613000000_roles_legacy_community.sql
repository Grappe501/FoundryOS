-- Roles, Legacy, Community OS — outcome over machinery

-- Roles — people think in roles (Enthusiast, Steward, Pitmaster, etc.)
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS roles JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS people_mentored INT NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS joined_year INT;

-- Legacy profile — Foundry remembers journeys
CREATE TABLE IF NOT EXISTS legacy_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_year INT NOT NULL,
  paths_completed INT NOT NULL DEFAULT 0,
  projects_completed INT NOT NULL DEFAULT 0,
  people_mentored INT NOT NULL DEFAULT 0,
  communities_built INT NOT NULL DEFAULT 0,
  knowledge_contributions INT NOT NULL DEFAULT 0,
  legacy_impact_score NUMERIC(10,2) NOT NULL DEFAULT 0,
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Community OS — full operating system for communities (not just clubs)
CREATE TABLE IF NOT EXISTS community_os (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  vertical_slug TEXT NOT NULL,
  host_user_id UUID REFERENCES auth.users(id),
  region TEXT,
  capabilities TEXT[] NOT NULL DEFAULT '{}',
  member_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Entity care reason — PASS-009: Why should someone care?
ALTER TABLE expert_factory_outputs DROP CONSTRAINT IF EXISTS expert_factory_outputs_output_type_check;
ALTER TABLE expert_factory_outputs ADD CONSTRAINT expert_factory_outputs_output_type_check
  CHECK (output_type IN (
    'care_reason', 'academy', 'comparison', 'trivia', 'collection', 'ranking',
    'community_challenge', 'community_use_case', 'beginner_journey', 'expert_journey',
    'search_context'
  ));

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('legacy_profiles', '{"count": 0}'::jsonb),
  ('communities_os_active', '{"count": 0}'::jsonb),
  ('people_mentored_total', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

INSERT INTO platform_config (key, value) VALUES
  ('foundry_outcome', '{"statement": "Help me become the person I want to be."}'::jsonb),
  ('entity_care_question', '{"question": "Why should someone care?"}'::jsonb),
  ('community_os', '{"tagline": "Community OS — not a club feature"}'::jsonb),
  ('legacy_engine', '{"tagline": "Foundry remembers."}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE legacy_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_os ENABLE ROW LEVEL SECURITY;

CREATE POLICY "legacy_profiles_own" ON legacy_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "legacy_profiles_public_read" ON legacy_profiles FOR SELECT USING (true);
CREATE POLICY "community_os_public" ON community_os FOR SELECT USING (status = 'active');

COMMENT ON TABLE legacy_profiles IS 'Foundry remembers — years of transformation';
COMMENT ON TABLE community_os IS 'Community OS: members, projects, tastings, rankings, challenges, academy, leadership';
