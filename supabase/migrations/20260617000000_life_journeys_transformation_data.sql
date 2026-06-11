-- Life Journeys Registry + Transformation Data — above outcomes

CREATE TABLE IF NOT EXISTS life_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  journey_statement TEXT NOT NULL,
  linked_outcome_slugs TEXT[] NOT NULL DEFAULT '{}',
  equation_phase TEXT NOT NULL CHECK (equation_phase IN (
    'potential', 'capability', 'contribution', 'legacy'
  )),
  market TEXT NOT NULL CHECK (market IN (
    'education', 'career', 'hobby', 'community', 'life'
  )),
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS transformation_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path_slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  sample_size INTEGER NOT NULL DEFAULT 0,
  top_predictors JSONB NOT NULL DEFAULT '[]',
  average_time_to_mastery_years NUMERIC(4,1),
  completion_multiplier TEXT,
  status TEXT NOT NULL DEFAULT 'illustrative'
    CHECK (status IN ('illustrative', 'live', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO platform_config (key, value) VALUES
  ('foundry_equation', '{
    "flow": "Potential → Capability → Contribution → Legacy",
    "mission": "Foundry helps people become who they are capable of becoming."
  }'::jsonb),
  ('scope_doctrine', '{
    "opportunity": "Infrastructure that powers transformation",
    "risk": "Everything to everyone",
    "rule": "Build transformation systems — not isolated features"
  }'::jsonb),
  ('pass_009_guidance', '{
    "focus": "Transformation Systems — not entities alone"
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('life_journeys_defined', '{"count": 0}'::jsonb),
  ('transformation_insights_live', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

ALTER TABLE life_journeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformation_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "life_journeys_public" ON life_journeys FOR SELECT USING (status IN ('exemplar', 'active'));
CREATE POLICY "transformation_insights_public" ON transformation_insights FOR SELECT USING (status IN ('illustrative', 'live'));

COMMENT ON TABLE life_journeys IS 'Registry above outcomes — composed life journeys';
COMMENT ON TABLE transformation_insights IS 'Transformation Data — patterns of what predicts success on paths';
