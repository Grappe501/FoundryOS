-- PASS-014: Domain Proof — reusable blueprint, bourbon is first instance

CREATE TABLE IF NOT EXISTS domain_blueprints (
  slug TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  vertical_slug TEXT NOT NULL,
  care_reason TEXT NOT NULL,
  blueprint JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS domain_transformation_loops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT NOT NULL,
  domain_slug TEXT NOT NULL,
  user_display_name TEXT NOT NULL,
  goal TEXT NOT NULL,
  outcome_slug TEXT,
  outcome_display_name TEXT,
  path_slug TEXT,
  path_display_name TEXT,
  project_slug TEXT,
  project_display_name TEXT,
  action_text TEXT,
  action_slug TEXT,
  evidence JSONB NOT NULL DEFAULT '{}'::jsonb,
  reflections JSONB NOT NULL DEFAULT '{}',
  insight TEXT,
  next_action TEXT,
  next_action_why TEXT,
  loop_complete BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'complete', 'archived')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_slug, domain_slug)
);

CREATE TABLE IF NOT EXISTS identity_domain_snapshots (
  user_slug TEXT PRIMARY KEY,
  identity_titles JSONB NOT NULL DEFAULT '[]'::jsonb,
  domains JSONB NOT NULL DEFAULT '[]'::jsonb,
  cross_domain_summary TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_domain_loops_user ON domain_transformation_loops (user_slug);
CREATE INDEX IF NOT EXISTS idx_domain_loops_domain ON domain_transformation_loops (domain_slug);

ALTER TABLE domain_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_transformation_loops ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_domain_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "domain_blueprints_public" ON domain_blueprints FOR SELECT USING (status = 'active');
CREATE POLICY "domain_blueprints_service" ON domain_blueprints FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "domain_loops_service" ON domain_transformation_loops FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "identity_snapshots_service" ON identity_domain_snapshots FOR ALL USING (true) WITH CHECK (true);

INSERT INTO platform_config (key, value) VALUES
  ('pass_014_exit_criteria', '{
    "pass_name": "Domain Proof",
    "first_domain": "bourbon",
    "pass_gate": "Does the HPI stack work in a real-world domain?",
    "not_deliverable": ["articles","encyclopedia","reviews"],
    "demo_user_slug": "demo-user"
  }'::jsonb),
  ('domain_proof', '{"principle": "Domain changes. The loop does not."}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('domain_blueprints_active', '{"count": 0}'::jsonb),
  ('domain_proofs_complete', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

COMMENT ON TABLE domain_blueprints IS 'PASS-014: Reusable domain template — bourbon is first instance';
COMMENT ON TABLE domain_transformation_loops IS 'PASS-014: Per-domain transformation loops (multi-domain demo user)';
COMMENT ON TABLE identity_domain_snapshots IS 'PASS-014: Cross-domain identity — Public Speaker + Bourbon Enthusiast';
