-- PASS-028A: Community Seeding — atmosphere before billing

ALTER TABLE community_posts DROP CONSTRAINT IF EXISTS community_posts_post_type_check;
ALTER TABLE community_posts ADD CONSTRAINT community_posts_post_type_check
  CHECK (post_type IN ('challenge', 'showcase', 'reflection', 'discussion'));

ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS is_seeded BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE community_members ADD COLUMN IF NOT EXISTS is_seeded BOOLEAN NOT NULL DEFAULT false;

CREATE TABLE IF NOT EXISTS community_weekly_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  world_slug TEXT NOT NULL,
  week_key TEXT NOT NULL,
  theme TEXT NOT NULL,
  prompt TEXT NOT NULL,
  is_seeded BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (world_slug, week_key)
);

CREATE INDEX IF NOT EXISTS idx_community_weekly_challenges_world ON community_weekly_challenges (world_slug, week_key DESC);

ALTER TABLE community_weekly_challenges ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "community_weekly_challenges_public_read" ON community_weekly_challenges FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "community_weekly_challenges_service" ON community_weekly_challenges FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass028a_community_seeding', '{"status": "ready", "worlds": 7, "discussions_per_world": 25, "showcases_per_world": 10, "weeks": 12}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
