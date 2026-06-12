-- PASS-040D: Portable Identity — universal user persistence (all worlds)

CREATE TABLE IF NOT EXISTS user_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id TEXT NOT NULL,
  world_slug TEXT NOT NULL,
  artifact_type TEXT NOT NULL,
  title TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  entity_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
  relations JSONB NOT NULL DEFAULT '[]'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, client_id)
);

CREATE INDEX IF NOT EXISTS idx_user_artifacts_user_world
  ON user_artifacts (user_id, world_slug, occurred_at DESC);

CREATE TABLE IF NOT EXISTS user_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  world_slug TEXT NOT NULL,
  memory_category TEXT NOT NULL CHECK (memory_category IN ('active', 'story', 'anticipation', 'snapshot')),
  memory_key TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, world_slug, memory_category, memory_key)
);

CREATE INDEX IF NOT EXISTS idx_user_memories_user_world
  ON user_memories (user_id, world_slug, occurred_at DESC);

CREATE TABLE IF NOT EXISTS user_graph_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  world_slug TEXT NOT NULL,
  node_slug TEXT NOT NULL,
  node_title TEXT NOT NULL,
  node_type TEXT NOT NULL DEFAULT 'graph',
  source TEXT NOT NULL DEFAULT 'graph'
    CHECK (source IN ('atlas', 'graph', 'compare', 'search')),
  entered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_graph_history_user_world
  ON user_graph_history (user_id, world_slug, entered_at DESC);

ALTER TABLE user_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_graph_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_artifacts_own" ON user_artifacts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_memories_own" ON user_memories
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "user_graph_history_own" ON user_graph_history
  FOR ALL USING (auth.uid() = user_id);
