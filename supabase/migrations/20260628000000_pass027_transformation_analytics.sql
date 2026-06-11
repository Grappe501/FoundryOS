-- PASS-027: Transformation Analytics & Learning Engine

-- Extend validation event types for transformation funnel
ALTER TABLE validation_events DROP CONSTRAINT IF EXISTS validation_events_event_type_check;
ALTER TABLE validation_events ADD CONSTRAINT validation_events_event_type_check
  CHECK (event_type IN (
    'visitor_landed',
    'assessment_started',
    'assessment_completed',
    'path_started',
    'project_started',
    'session_visit',
    'explore_viewed',
    'path_clicked',
    'interest_submitted',
    'account_created',
    'trial_started',
    'paid',
    'beta_joined',
    'pricing_viewed',
    'pricing_clicked',
    'sign_in_started',
    'sign_up_started',
    'mission_started',
    'mission_completed',
    'mission_step_viewed',
    'return_tomorrow',
    'return_this_week',
    'portfolio_created',
    'community_joined',
    'paid_conversion'
  ));

-- Tester feedback tied to world, mission, segment
CREATE TABLE IF NOT EXISTS tester_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT,
  segment TEXT,
  world_slug TEXT,
  mission_slug TEXT,
  confused TEXT,
  liked TEXT,
  build_next TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tester_feedback_world ON tester_feedback (world_slug);
CREATE INDEX IF NOT EXISTS idx_tester_feedback_created ON tester_feedback (created_at DESC);

ALTER TABLE tester_feedback ENABLE ROW LEVEL SECURITY;

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass027_transformation_analytics', '{"status": "active", "funnel_events": true, "feedback": true}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
