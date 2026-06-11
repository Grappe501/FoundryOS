-- PASS-010 prep: Project Engine — transform knowledge into action
-- Foundry Life Graph: knowledge + ownership + identity + project + community

CREATE TABLE IF NOT EXISTS foundry_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  vertical_slug TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'experience', 'build', 'explore', 'host', 'compete', 'organize', 'document'
  )),
  description TEXT,
  path_slug TEXT REFERENCES mastery_paths(slug),
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  estimated_days INT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_project_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_slug TEXT NOT NULL REFERENCES foundry_projects(slug),
  progress_pct NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  steps_completed TEXT[] NOT NULL DEFAULT '{}',
  steps_total INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, project_slug)
);

-- Journey memory — Foundry remembers journeys, not just answers
CREATE TABLE IF NOT EXISTS journey_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_year INT NOT NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'started', 'milestone', 'project', 'club', 'mentor', 'mastery'
  )),
  description TEXT,
  graph_source TEXT CHECK (graph_source IN (
    'knowledge_graph', 'ownership_graph', 'identity_graph', 'project_graph', 'community_graph'
  )),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_foundry_projects_vertical ON foundry_projects(vertical_slug);
CREATE INDEX idx_foundry_projects_path ON foundry_projects(path_slug);
CREATE INDEX idx_user_project_progress_user ON user_project_progress(user_id);
CREATE INDEX idx_journey_events_user ON journey_events(user_id);
CREATE INDEX idx_journey_events_year ON journey_events(event_year);

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('active_projects', '{"count": 0}'::jsonb),
  ('projects_completed', '{"count": 0}'::jsonb),
  ('journeys_recorded', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

INSERT INTO platform_config (key, value) VALUES
  ('life_graph', '{
    "graphs": ["knowledge_graph","ownership_graph","identity_graph","project_graph","community_graph"]
  }'::jsonb),
  ('mobile_home', '{
    "app_name": "Foundry",
    "home_question": "What are you becoming?",
    "sections": ["active_paths","current_projects","club_activity","new_knowledge","recommended_next"]
  }'::jsonb),
  ('pass_gate_question', '{
    "question": "Does this help someone become an expert, or does it merely help them consume information?"
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE foundry_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_project_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE journey_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "foundry_projects_public" ON foundry_projects FOR SELECT USING (status = 'active');
CREATE POLICY "user_project_progress_own" ON user_project_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "user_project_progress_public_read" ON user_project_progress FOR SELECT USING (true);
CREATE POLICY "journey_events_own" ON journey_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "journey_events_public_read" ON journey_events FOR SELECT USING (true);

COMMENT ON TABLE foundry_projects IS 'PASS-010: Projects transform knowledge into action';
COMMENT ON TABLE journey_events IS 'Foundry remembers journeys — the biggest future moat';
