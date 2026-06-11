-- PASS-009: Transformation System Factory — templates, DNA blueprints, north star metric

CREATE TABLE IF NOT EXISTS transformation_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL,
  layers TEXT[] NOT NULL DEFAULT '{}',
  hierarchy_levels TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS domain_dna_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  template_slug TEXT NOT NULL REFERENCES transformation_templates(slug),
  blueprint JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'exemplar' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO platform_config (key, value) VALUES
  ('pass_009', '{
    "title": "Transformation System Factory",
    "not": "Entity Factory",
    "mission": "Manufacture transformation systems, not content systems"
  }'::jsonb),
  ('foundry_object_hierarchy', '{
    "flow": "Life Journey → Outcome → Domain → Role → Path → Project → Entity → Knowledge → Community → Mentorship → Legacy"
  }'::jsonb),
  ('primary_dashboard_question', '{"question": "How many transformations are in progress?"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('transformations_in_progress', '{"count": 0}'::jsonb),
  ('domain_dna_records_defined', '{"count": 0}'::jsonb),
  ('transformation_templates_defined', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

ALTER TABLE transformation_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_dna_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transformation_templates_public" ON transformation_templates FOR SELECT USING (status = 'active');
CREATE POLICY "domain_dna_public" ON domain_dna_records FOR SELECT USING (status IN ('exemplar', 'active'));

COMMENT ON TABLE transformation_templates IS 'Hobby, Academic, Career, Leadership — factory assembles from templates';
COMMENT ON TABLE domain_dna_records IS 'Foundry DNA — machine-readable blueprint per domain';
