-- Identity Domains — lifelong domains, not apps

CREATE TABLE IF NOT EXISTS identity_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL CHECK (category IN ('skills', 'hobbies', 'careers', 'lifestyles', 'communities')),
  care_reason TEXT NOT NULL,
  paths JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  community_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  legacy_signals JSONB NOT NULL DEFAULT '[]'::jsonb,
  collection_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_identity_domains_category ON identity_domains(category);
CREATE INDEX idx_identity_domains_status ON identity_domains(status);

INSERT INTO platform_config (key, value) VALUES
  ('four_engines', '{
    "engines": [
      {"key":"knowledge","question":"What is it?"},
      {"key":"mastery","question":"How do I become good at it?"},
      {"key":"project","question":"What do I actually do?"},
      {"key":"community","question":"Who do I do it with?"}
    ]
  }'::jsonb),
  ('identity_domain_registry', '{
    "categories": ["skills","hobbies","careers","lifestyles","communities"],
    "exemplars": ["bourbon","poker","public-speaking","campaign-management","master-gardener","magic-the-gathering"],
    "scale_target_domains": 10000
  }'::jsonb),
  ('self_assembly_principle', '{
    "statement": "A machine that creates Knowledge + Mastery + Projects + Community + Identity + Legacy for any subject a human cares about."
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE identity_domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "identity_domains_public" ON identity_domains FOR SELECT USING (status IN ('exemplar', 'active'));

COMMENT ON TABLE identity_domains IS 'Lifelong identity domains — Poker, Bourbon, Public Speaking, not standalone apps';
