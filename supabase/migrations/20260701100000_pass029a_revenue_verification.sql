-- PASS-029A: Revenue & Analytics Verification — extended events + attribution

ALTER TABLE validation_events DROP CONSTRAINT IF EXISTS validation_events_event_type_check;
ALTER TABLE validation_events ADD CONSTRAINT validation_events_event_type_check
  CHECK (event_type IN (
    'visitor_landed', 'assessment_started', 'assessment_completed', 'path_started', 'project_started',
    'session_visit', 'explore_viewed', 'path_clicked', 'interest_submitted', 'account_created',
    'trial_started', 'paid', 'beta_joined', 'pricing_viewed', 'pricing_clicked', 'sign_in_started',
    'sign_up_started', 'mission_started', 'mission_completed', 'mission_step_viewed',
    'return_tomorrow', 'return_this_week', 'portfolio_created', 'community_joined', 'paid_conversion',
    'challenge_submitted', 'showcase_posted', 'peer_feedback_given', 'community_feed_viewed',
    'discussion_posted', 'upgrade_initiated', 'upgrade_completed',
    'checkout_cancelled', 'checkout_blocked_signin', 'subscription_cancelled'
  ));

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass029a_revenue_verification', '{"personas": 5, "status": "ready"}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
