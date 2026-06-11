-- PASS-026: Invite + Tester Operations

-- Extend segment to include hobbyist (first-25 tester plan)
ALTER TABLE beta_waitlist DROP CONSTRAINT IF EXISTS beta_waitlist_segment_check;
ALTER TABLE beta_waitlist ADD CONSTRAINT beta_waitlist_segment_check
  CHECK (segment IN ('student', 'parent', 'adult_learner', 'educator', 'hobbyist'));

ALTER TABLE beta_waitlist DROP CONSTRAINT IF EXISTS beta_waitlist_status_check;
ALTER TABLE beta_waitlist ADD CONSTRAINT beta_waitlist_status_check
  CHECK (status IN ('pending', 'approved', 'invited', 'joined', 'active', 'declined'));

ALTER TABLE beta_waitlist
  ADD COLUMN IF NOT EXISTS assigned_segment TEXT,
  ADD COLUMN IF NOT EXISTS starting_world_slug TEXT,
  ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS invited_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS joined_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS active_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS operator_notes TEXT;

CREATE INDEX IF NOT EXISTS idx_beta_waitlist_status ON beta_waitlist (status);
CREATE INDEX IF NOT EXISTS idx_beta_waitlist_invite_code ON beta_waitlist (invite_code);

-- Mark waitlist joined when auth user signs up with matching email
CREATE OR REPLACE FUNCTION public.link_beta_waitlist_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.beta_waitlist
  SET
    status = CASE WHEN status IN ('invited', 'approved') THEN 'joined' ELSE status END,
    joined_at = COALESCE(joined_at, now())
  WHERE lower(email) = lower(NEW.email)
    AND status IN ('pending', 'approved', 'invited', 'joined');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_link_beta_waitlist ON auth.users;
CREATE TRIGGER on_auth_user_link_beta_waitlist
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.link_beta_waitlist_on_signup();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('pass026_tester_ops', '{"target_testers": 25, "cohorts": ["student","parent","adult_learner","educator","hobbyist"]}')
ON CONFLICT (metric_key) DO UPDATE SET metric_value = EXCLUDED.metric_value, updated_at = now();
