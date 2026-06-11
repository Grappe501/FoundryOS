-- PASS-016A: Market Validation — stranger funnel events

CREATE TABLE IF NOT EXISTS validation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'visitor_landed',
    'assessment_started',
    'assessment_completed',
    'path_started',
    'project_started',
    'session_visit',
    'account_created',
    'trial_started',
    'paid'
  )),
  category TEXT NOT NULL CHECK (category IN ('acquisition', 'activation', 'retention', 'conversion')),
  landing_page TEXT,
  source TEXT,
  path_slug TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_validation_events_visitor ON validation_events (visitor_id);
CREATE INDEX IF NOT EXISTS idx_validation_events_type ON validation_events (event_type);
CREATE INDEX IF NOT EXISTS idx_validation_events_created ON validation_events (created_at DESC);

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('validation_stranger_goal', '{"target": 10, "note": "PASS-016A — learn from 10 strangers before PASS-017"}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
