-- PASS-010: Transformation loop proof — one user, one domain, one complete cycle

CREATE TABLE IF NOT EXISTS transformation_loops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT UNIQUE NOT NULL,
  user_display_name TEXT NOT NULL,
  goal TEXT NOT NULL,
  outcome_slug TEXT,
  outcome_display_name TEXT,
  path_slug TEXT,
  path_display_name TEXT,
  project_slug TEXT,
  project_display_name TEXT,
  action_text TEXT,
  evidence JSONB NOT NULL DEFAULT '{}',
  reflections JSONB NOT NULL DEFAULT '{}',
  insight TEXT,
  next_action TEXT,
  next_action_why TEXT,
  loop_complete BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'complete', 'archived')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_transformation_loops_status ON transformation_loops (status);
CREATE INDEX IF NOT EXISTS idx_transformation_loops_user_slug ON transformation_loops (user_slug);

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('transformation_loop_completion_rate', '{"rate": 0, "loops_started": 0, "loops_completed": 0}'::jsonb),
  ('meaningful_progress_events', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

INSERT INTO platform_config (key, value) VALUES
  ('pass_010_exit_criteria', '{"criterion": "A real transformation loop works", "demo_user_slug": "demo-user"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE transformation_loops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transformation_loops_public_read" ON transformation_loops
  FOR SELECT USING (status IN ('in_progress', 'complete'));

CREATE POLICY "transformation_loops_service_write" ON transformation_loops
  FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE transformation_loops IS 'PASS-010 proof — goal through next action with evidence and reflection';
