-- PASS-008: Path Engine — Road to Expert Development
-- The real product: transform curious beginners into recognized experts

CREATE TABLE IF NOT EXISTS mastery_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  vertical_id UUID REFERENCES verticals(id),
  vertical_slug TEXT NOT NULL,
  tier TEXT NOT NULL,
  assembled_from TEXT[] NOT NULL DEFAULT '{}',
  milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
  estimated_weeks INT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_path_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_slug TEXT NOT NULL REFERENCES mastery_paths(slug),
  progress_pct NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (progress_pct >= 0 AND progress_pct <= 100),
  milestones_completed TEXT[] NOT NULL DEFAULT '{}',
  milestones_total INT NOT NULL DEFAULT 0,
  mastery_label TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, path_slug)
);

CREATE TABLE IF NOT EXISTS club_path_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID NOT NULL,
  club_name TEXT NOT NULL,
  path_slug TEXT NOT NULL REFERENCES mastery_paths(slug),
  challenge_title TEXT NOT NULL,
  host_user_id UUID NOT NULL REFERENCES auth.users(id),
  member_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- North star counters (mission control)
INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('active_paths', '{"count": 0}'::jsonb),
  ('users_on_paths', '{"count": 0}'::jsonb),
  ('academy_graduates', '{"count": 0}'::jsonb),
  ('community_leaders', '{"count": 0}'::jsonb),
  ('expert_contributors', '{"count": 0}'::jsonb),
  ('club_hosts', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

ALTER TABLE mastery_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_path_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_path_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mastery_paths_public" ON mastery_paths FOR SELECT USING (status = 'active');
CREATE POLICY "user_path_progress_own" ON user_path_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "user_path_progress_public_read" ON user_path_progress FOR SELECT USING (true);
CREATE POLICY "club_challenges_public" ON club_path_challenges FOR SELECT USING (status = 'active');

COMMENT ON TABLE mastery_paths IS 'PASS-008: Road to Expert paths — assembled from academy+knowledge+collections+community';
COMMENT ON TABLE user_path_progress IS 'User progress on mastery paths — visible expertise, not gamification';
