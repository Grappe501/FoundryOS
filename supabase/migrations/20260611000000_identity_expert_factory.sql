-- PASS-009 prep: Foundry Identity + Expert Factory + Device/Offline architecture

-- Foundry Identity — portable across web, mobile, offline
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS mastery_titles JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS paths_completed INT NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS communities_led INT NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS reviews_count INT NOT NULL DEFAULT 0;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS identity_public BOOLEAN NOT NULL DEFAULT true;

-- Expert Factory outputs per entity (drafts — scored, queued, not auto-published)
CREATE TABLE IF NOT EXISTS expert_factory_outputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_slug TEXT NOT NULL,
  output_type TEXT NOT NULL CHECK (output_type IN (
    'academy', 'comparison', 'trivia', 'collection', 'ranking',
    'community_challenge', 'search_context'
  )),
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'queued', 'published', 'rejected')),
  factory_run_id TEXT REFERENCES factory_runs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_expert_factory_entity ON expert_factory_outputs(entity_slug);
CREATE INDEX idx_expert_factory_type ON expert_factory_outputs(output_type);
CREATE INDEX idx_expert_factory_status ON expert_factory_outputs(status);

-- Link entity-scoped mastery paths to factory
ALTER TABLE mastery_paths ADD COLUMN IF NOT EXISTS entity_slug TEXT;
ALTER TABLE mastery_paths ADD COLUMN IF NOT EXISTS factory_run_id TEXT REFERENCES factory_runs(id) ON DELETE SET NULL;

-- Offline sync manifests (future mobile advantage)
CREATE TABLE IF NOT EXISTS offline_sync_manifests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL CHECK (sync_type IN (
    'collection', 'academy', 'encyclopedia', 'notes', 'path_progress'
  )),
  resource_slug TEXT NOT NULL,
  vertical_slug TEXT,
  manifest JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, sync_type, resource_slug)
);

-- Device strategy config
INSERT INTO platform_config (key, value) VALUES
  ('device_strategy', '{
    "web": "vertical_domains",
    "mobile": "single_foundry_app",
    "auth": ["google", "apple", "email", "magic_link"],
    "no_per_vertical_apps": true
  }'::jsonb),
  ('expert_factory', '{
    "version": "v1",
    "outputs": [
      "encyclopedia", "academy", "recipes", "comparisons", "trivia",
      "collections", "rankings", "beginner_path", "expert_path",
      "community_challenges", "related_entities", "search_context"
    ],
    "pipeline": ["generate", "validate", "score", "store", "queued"]
  }'::jsonb),
  ('foundry_vision', '{
    "headline": "Foundry helps people become experts.",
    "contrast": {"teaches": "Watch this.", "transforms": "Become this."}
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

ALTER TABLE expert_factory_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_sync_manifests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "expert_factory_service" ON expert_factory_outputs FOR ALL USING (false);
CREATE POLICY "offline_sync_own" ON offline_sync_manifests FOR ALL USING (auth.uid() = user_id);

COMMENT ON TABLE expert_factory_outputs IS 'PASS-009: Entity Factory + Expert Factory — drafts per entity';
COMMENT ON TABLE offline_sync_manifests IS 'Future: download collections, academy, encyclopedia, notes for offline use';
COMMENT ON COLUMN user_profiles.mastery_titles IS 'Foundry Identity — portable mastery titles across verticals';
