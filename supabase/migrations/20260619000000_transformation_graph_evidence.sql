-- PASS-010 Transformation Graph + PASS-011 Evidence Registry (schema prep)

CREATE TABLE IF NOT EXISTS graph_relationship_weights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_slug TEXT NOT NULL,
  target_slug TEXT NOT NULL,
  relationship_type TEXT NOT NULL,
  weight INTEGER NOT NULL CHECK (weight >= 0 AND weight <= 100),
  rationale TEXT,
  status TEXT NOT NULL DEFAULT 'illustrative'
    CHECK (status IN ('illustrative', 'live', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (source_slug, target_slug, relationship_type)
);

CREATE TABLE IF NOT EXISTS evidence_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  domain_slug TEXT NOT NULL,
  role_slug TEXT,
  evidence_items JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO platform_config (key, value) VALUES
  ('transformation_graph', '{
    "name": "Transformation Graph",
    "not": ["Information Graph", "Social Graph", "Professional Graph"],
    "flow": "Goals → Outcomes → Domains → Paths → Projects → Communities → Mentors → Results"
  }'::jsonb),
  ('pass_010', '{"title": "Transformation Graph Engine"}'::jsonb),
  ('pass_011', '{"title": "Evidence Engine"}'::jsonb),
  ('transformation_pass_gate', '{"question": "Can Foundry observe, support, measure, and remember the transformation?"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('active_transformations', '{"count": 0}'::jsonb),
  ('completed_transformations', '{"count": 0}'::jsonb),
  ('mentorship_connections', '{"count": 0}'::jsonb),
  ('projects_completed', '{"count": 0}'::jsonb),
  ('path_completion_rate', '{"rate": 0}'::jsonb),
  ('evidence_profiles_defined', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

ALTER TABLE graph_relationship_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "graph_weights_public" ON graph_relationship_weights FOR SELECT USING (status IN ('illustrative', 'live'));
CREATE POLICY "evidence_profiles_public" ON evidence_profiles FOR SELECT USING (status IN ('exemplar', 'active'));

COMMENT ON TABLE graph_relationship_weights IS 'Transformation Graph — weighted edges, not equal relationships';
COMMENT ON TABLE evidence_profiles IS 'Evidence Registry — identity requires evidence';
