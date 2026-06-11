-- Outcome Engine + Purpose Engine — Human Potential Infrastructure

CREATE TABLE IF NOT EXISTS human_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  goal_statement TEXT NOT NULL,
  linked_domains TEXT[] NOT NULL DEFAULT '{}',
  linked_paths TEXT[] NOT NULL DEFAULT '{}',
  linked_projects TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN (
    'leadership', 'financial', 'craft', 'technical', 'health', 'creative', 'civic'
  )),
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS domain_purposes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain_slug TEXT UNIQUE NOT NULL,
  domain_display_name TEXT NOT NULL,
  wikipedia_answer TEXT,
  foundry_answer TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_outcome_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  outcome_slug TEXT NOT NULL REFERENCES human_outcomes(slug),
  progress_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  domains_completed TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'achieved', 'abandoned')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, outcome_slug)
);

INSERT INTO platform_config (key, value) VALUES
  ('human_potential_infrastructure', '{
    "does": "Lifelong Expert Development",
    "becomes": "Human Potential Infrastructure"
  }'::jsonb),
  ('purpose_engine', '{"question": "Why does this matter to me?"}'::jsonb),
  ('outcome_principle', '{
    "statement": "Humans pursue outcomes. Domains are paths traveled to reach them."
  }'::jsonb),
  ('ultimate_factory_ecosystem', '{
    "factories": ["entity","knowledge","academy","project","community","mentor","outcome"]
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('human_outcomes_defined', '{"count": 0}'::jsonb),
  ('users_pursuing_outcomes', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

ALTER TABLE human_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_purposes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_outcome_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "human_outcomes_public" ON human_outcomes FOR SELECT USING (status IN ('exemplar', 'active'));
CREATE POLICY "domain_purposes_public" ON domain_purposes FOR SELECT USING (true);
CREATE POLICY "user_outcome_progress_own" ON user_outcome_progress FOR ALL USING (auth.uid() = user_id);

COMMENT ON TABLE human_outcomes IS 'Human Outcomes Registry — goals, not subjects';
COMMENT ON TABLE domain_purposes IS 'Purpose Engine — why does this matter to me?';
