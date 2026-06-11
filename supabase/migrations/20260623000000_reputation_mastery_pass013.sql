-- PASS-013: Reputation + Mastery — earned trust from demonstrated evidence

CREATE TABLE IF NOT EXISTS reputation_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT NOT NULL,
  evidence_submission_id UUID NOT NULL REFERENCES evidence_submissions(id) ON DELETE CASCADE,
  domain_slug TEXT,
  scope TEXT NOT NULL DEFAULT 'platform' CHECK (scope IN ('platform', 'domain')),
  reputation_title TEXT NOT NULL,
  trust_weight NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (trust_weight >= 0 AND trust_weight <= 100),
  identity_impact TEXT,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_slug, evidence_submission_id)
);

CREATE TABLE IF NOT EXISTS mastery_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT NOT NULL,
  evidence_submission_id UUID NOT NULL REFERENCES evidence_submissions(id) ON DELETE CASCADE,
  reputation_record_id UUID REFERENCES reputation_records(id) ON DELETE SET NULL,
  domain_slug TEXT NOT NULL,
  path_slug TEXT NOT NULL,
  path_display_name TEXT NOT NULL,
  milestone_slug TEXT NOT NULL,
  milestone_label TEXT NOT NULL,
  mastery_title TEXT NOT NULL,
  identity_impact TEXT,
  community_instance_slug TEXT,
  community_recognition_updated BOOLEAN NOT NULL DEFAULT false,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_slug, path_slug, milestone_slug)
);

ALTER TABLE community_members ADD COLUMN IF NOT EXISTS recognition TEXT;
ALTER TABLE community_members ADD COLUMN IF NOT EXISTS recognized_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_reputation_records_user ON reputation_records (user_slug);
CREATE INDEX IF NOT EXISTS idx_mastery_assignments_user ON mastery_assignments (user_slug);
CREATE INDEX IF NOT EXISTS idx_mastery_assignments_path ON mastery_assignments (path_slug);

ALTER TABLE reputation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE mastery_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reputation_records_service" ON reputation_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "mastery_assignments_service" ON mastery_assignments FOR ALL USING (true) WITH CHECK (true);

INSERT INTO platform_config (key, value) VALUES
  ('pass_013_exit_criteria', '{
    "reputation_rule": "Reputation is earned trust.",
    "mastery_rule": "Mastery is demonstrated capability.",
    "chain": ["evidence","reputation","mastery","identity","community"],
    "demo_user_slug": "demo-user"
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('reputation_records_total', '{"count": 0}'::jsonb),
  ('mastery_assignments_total', '{"count": 0}'::jsonb),
  ('community_recognitions_total', '{"count": 0}'::jsonb),
  ('identity_mastery_strength', '{"score": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

COMMENT ON TABLE reputation_records IS 'PASS-013: Earned trust from evidence — not points or gamification';
COMMENT ON TABLE mastery_assignments IS 'PASS-013: Demonstrated capability milestones linked to evidence';
