-- PASS-006: Foundry Factory — Self-Assembly Engine v1
-- OpenAI generates. Supabase owns. Generated ≠ Published.

CREATE TABLE IF NOT EXISTS factory_runs (
  id TEXT PRIMARY KEY,
  run_type TEXT NOT NULL CHECK (run_type IN ('entity', 'topic')),
  input JSONB NOT NULL,
  output JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('generated', 'validated', 'scored', 'stored', 'queued', 'failed')),
  overall_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  publish_decision TEXT NOT NULL DEFAULT 'hold'
    CHECK (publish_decision IN ('hold', 'eligible', 'rejected')),
  entity_slug TEXT,
  vertical_domain TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS factory_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_run_id TEXT NOT NULL REFERENCES factory_runs(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('entity', 'topic')),
  target_slug TEXT NOT NULL,
  priority INT NOT NULL DEFAULT 100,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'complete', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_factory_runs_slug ON factory_runs(entity_slug);
CREATE INDEX idx_factory_runs_decision ON factory_runs(publish_decision);
CREATE INDEX idx_factory_queue_status ON factory_queue(status);
CREATE INDEX idx_factory_queue_priority ON factory_queue(priority DESC);

ALTER TABLE factory_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE factory_queue ENABLE ROW LEVEL SECURITY;

-- Factory data: service role write; no public read of drafts
CREATE POLICY "factory_runs_service" ON factory_runs FOR ALL USING (false);
CREATE POLICY "factory_queue_service" ON factory_queue FOR ALL USING (false);

INSERT INTO platform_config (key, value) VALUES
  ('factory_pipeline', '{"version":"v1","stages":["generate","validate","score","store","publish_decision","queued"],"publish_gate":70,"auto_publish":false}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO build_passes (pass_code, title, summary, status, deliverables) VALUES
  (
    'PASS-006',
    'SEO + Content Factory (Self-Assembly v1)',
    'Foundry Factory: generate → validate → score → store → publish decision. Not Bourbon — the machine.',
    'in_progress',
    '["factory_package","factory_runs","factory_queue","build_topic_cli","four_ai_systems"]'::jsonb
  )
ON CONFLICT (pass_code) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  deliverables = EXCLUDED.deliverables;

COMMENT ON TABLE factory_runs IS 'PASS-006: Self-Assembly Engine run log — OpenAI generates, Supabase owns';
COMMENT ON TABLE factory_queue IS 'PASS-006: Generated content queue — publish decision separate';
