-- PASS-028: Community Activation — feed, challenges, showcase, mentor recognition

ALTER TABLE community_members
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS help_count INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS display_name TEXT;

CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  world_slug TEXT NOT NULL,
  community_id UUID REFERENCES community_instances(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_slug TEXT NOT NULL,
  author_label TEXT,
  post_type TEXT NOT NULL CHECK (post_type IN ('challenge', 'showcase', 'reflection')),
  title TEXT,
  body TEXT NOT NULL,
  week_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_peer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  from_user_slug TEXT NOT NULL,
  from_author_label TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_posts_world ON community_posts (world_slug, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_week ON community_posts (world_slug, week_key);
CREATE INDEX IF NOT EXISTS idx_community_feedback_post ON community_peer_feedback (post_id);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_peer_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "community_posts_public_read" ON community_posts FOR SELECT USING (true);
CREATE POLICY "community_posts_service" ON community_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "community_feedback_public_read" ON community_peer_feedback FOR SELECT USING (true);
CREATE POLICY "community_feedback_service" ON community_peer_feedback FOR ALL USING (true) WITH CHECK (true);

-- Extend validation events for community activation
ALTER TABLE validation_events DROP CONSTRAINT IF EXISTS validation_events_event_type_check;
ALTER TABLE validation_events ADD CONSTRAINT validation_events_event_type_check
  CHECK (event_type IN (
    'visitor_landed', 'assessment_started', 'assessment_completed', 'path_started', 'project_started',
    'session_visit', 'explore_viewed', 'path_clicked', 'interest_submitted', 'account_created',
    'trial_started', 'paid', 'beta_joined', 'pricing_viewed', 'pricing_clicked', 'sign_in_started',
    'sign_up_started', 'mission_started', 'mission_completed', 'mission_step_viewed',
    'return_tomorrow', 'return_this_week', 'portfolio_created', 'community_joined', 'paid_conversion',
    'challenge_submitted', 'showcase_posted', 'peer_feedback_given', 'community_feed_viewed'
  ));

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass028_community_activation', '{"worlds": 7, "features": ["feed","challenge","showcase","mentor"]}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
