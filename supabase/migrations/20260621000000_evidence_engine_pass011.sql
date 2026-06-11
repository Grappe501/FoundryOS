-- PASS-011: Evidence Engine — identity requires evidence

CREATE TABLE IF NOT EXISTS evidence_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT NOT NULL,
  transformation_loop_id UUID REFERENCES transformation_loops(id) ON DELETE SET NULL,
  action_slug TEXT NOT NULL,
  action_text TEXT NOT NULL,
  project_slug TEXT,
  path_slug TEXT,
  domain_slug TEXT,
  tier TEXT NOT NULL DEFAULT 'claimed'
    CHECK (tier IN ('claimed', 'verified', 'community_confirmed', 'demonstrated', 'mentored')),
  verification_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN (
      'pending', 'verified', 'community_confirmed', 'demonstrated', 'mentored', 'rejected'
    )),
  title TEXT NOT NULL,
  description TEXT,
  evidence_type TEXT NOT NULL DEFAULT 'event'
    CHECK (evidence_type IN (
      'project', 'event', 'rating', 'mentorship', 'certification', 'contribution'
    )),
  metadata JSONB NOT NULL DEFAULT '{}',
  trust_weight INTEGER NOT NULL DEFAULT 20 CHECK (trust_weight >= 0 AND trust_weight <= 100),
  identity_impact TEXT,
  next_step_guidance TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_slug, action_slug)
);

CREATE INDEX IF NOT EXISTS idx_evidence_submissions_user ON evidence_submissions (user_slug);
CREATE INDEX IF NOT EXISTS idx_evidence_submissions_loop ON evidence_submissions (transformation_loop_id);
CREATE INDEX IF NOT EXISTS idx_evidence_submissions_tier ON evidence_submissions (tier);
CREATE INDEX IF NOT EXISTS idx_evidence_submissions_status ON evidence_submissions (verification_status);

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('evidence_submissions_total', '{"count": 0}'::jsonb),
  ('evidence_verified_count', '{"count": 0}'::jsonb),
  ('evidence_trust_weight_avg', '{"avg": 0}'::jsonb),
  ('identity_evidence_strength', '{"score": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

INSERT INTO platform_config (key, value) VALUES
  ('pass_011_exit_criteria', '{
    "criterion": "User completes action, attaches evidence, Foundry uses it for identity and next-step guidance",
    "demo_user_slug": "demo-user",
    "demo_action_slug": "deliver-first-speech"
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE evidence_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "evidence_submissions_public_read" ON evidence_submissions
  FOR SELECT USING (verification_status != 'rejected');

CREATE POLICY "evidence_submissions_service_write" ON evidence_submissions
  FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE evidence_submissions IS 'PASS-011 — evidence linked to transformation loops; tiers strengthen trust';
