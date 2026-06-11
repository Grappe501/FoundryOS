-- PASS-022: Private Beta Readiness — waitlist, mission progress, profile trigger

CREATE TABLE IF NOT EXISTS beta_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  segment TEXT NOT NULL CHECK (segment IN ('student', 'parent', 'adult_learner', 'educator')),
  interested_worlds TEXT[] NOT NULL DEFAULT '{}',
  visitor_id TEXT,
  source TEXT DEFAULT 'beta_page',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'invited', 'accepted')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_beta_waitlist_segment ON beta_waitlist (segment);
CREATE INDEX IF NOT EXISTS idx_beta_waitlist_created ON beta_waitlist (created_at DESC);

CREATE TABLE IF NOT EXISTS user_mission_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  world_slug TEXT NOT NULL,
  mission_slug TEXT NOT NULL,
  mission_title TEXT NOT NULL,
  portfolio_key TEXT NOT NULL,
  reflection TEXT,
  evidence_note TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, world_slug, mission_slug)
);

CREATE INDEX IF NOT EXISTS idx_user_mission_completions_user ON user_mission_completions (user_id);
CREATE INDEX IF NOT EXISTS idx_user_mission_completions_world ON user_mission_completions (world_slug);

CREATE TABLE IF NOT EXISTS user_assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_slug TEXT NOT NULL DEFAULT 'future-proof',
  result_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, assessment_slug)
);

ALTER TABLE beta_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mission_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assessment_results ENABLE ROW LEVEL SECURITY;

-- Waitlist: anyone can insert (anon), only service role reads all
CREATE POLICY "beta_waitlist_insert" ON beta_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "beta_waitlist_own_read" ON beta_waitlist
  FOR SELECT USING (false);

CREATE POLICY "mission_completions_own" ON user_mission_completions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "assessment_results_own" ON user_assessment_results
  FOR ALL USING (auth.uid() = user_id);

-- Auto-create user_profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name, tier_level)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    1
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Extend validation event types for beta funnel
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
    'sign_up_started'
  ));

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass022_beta_ready', '{"status": "active", "note": "PASS-022 private beta readiness"}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
