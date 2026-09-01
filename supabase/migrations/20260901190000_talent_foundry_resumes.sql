-- Talent Foundry V1.2 — opaque resume tokens (journey state only)
-- Service-role access only. Not a second person database. RedDirt remains canonical.

CREATE TABLE IF NOT EXISTS talent_foundry_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT NOT NULL UNIQUE,
  campaign_id TEXT NOT NULL,
  reddirt_submission_id TEXT,
  snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_tf_resumes_hash ON talent_foundry_resumes (token_hash);
CREATE INDEX IF NOT EXISTS idx_tf_resumes_campaign ON talent_foundry_resumes (campaign_id, created_at DESC);

ALTER TABLE talent_foundry_resumes ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE talent_foundry_resumes FROM anon, authenticated;
GRANT ALL ON TABLE talent_foundry_resumes TO service_role;

COMMENT ON TABLE talent_foundry_resumes IS
  'Hashed Talent Foundry resume tokens + journey snapshots. Possession of the raw token is the credential. No public read.';
