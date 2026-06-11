-- PASS-012: Personal Knowledge Assets + Communities
-- Core rule: Transformation accelerates in community.

CREATE TABLE IF NOT EXISTS personal_knowledge_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_slug TEXT NOT NULL,
  slug TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  domain_slug TEXT NOT NULL,
  asset_type TEXT NOT NULL DEFAULT 'knowledge_asset'
    CHECK (asset_type IN ('knowledge_asset', 'speech_library', 'garden_journal', 'project_portfolio', 'bourbon_collection')),
  identity_impact TEXT,
  evidence_linked BOOLEAN NOT NULL DEFAULT false,
  entity_count INT NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_slug, slug)
);

CREATE TABLE IF NOT EXISTS personal_knowledge_asset_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID NOT NULL REFERENCES personal_knowledge_assets(id) ON DELETE CASCADE,
  entity_slug TEXT NOT NULL,
  entity_display_name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  personal_rating NUMERIC(3,1) CHECK (personal_rating >= 0 AND personal_rating <= 10),
  personal_notes TEXT,
  evidence_submission_id UUID REFERENCES evidence_submissions(id) ON DELETE SET NULL,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (asset_id, entity_slug)
);

CREATE TABLE IF NOT EXISTS community_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  tagline TEXT,
  vertical_slug TEXT NOT NULL,
  domain_slug TEXT NOT NULL,
  community_type TEXT NOT NULL DEFAULT 'circle'
    CHECK (community_type IN ('society', 'circle', 'network', 'lab', 'collective', 'club')),
  host_user_slug TEXT NOT NULL,
  region TEXT,
  member_count INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'archived')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES community_instances(id) ON DELETE CASCADE,
  user_slug TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('host', 'member', 'mentor', 'steward')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (community_id, user_slug)
);

CREATE TABLE IF NOT EXISTS community_project_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES community_instances(id) ON DELETE CASCADE,
  project_slug TEXT NOT NULL,
  project_title TEXT NOT NULL,
  assigned_to_user_slug TEXT NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (community_id, project_slug)
);

CREATE TABLE IF NOT EXISTS community_evidence_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES community_instances(id) ON DELETE CASCADE,
  evidence_submission_id UUID NOT NULL REFERENCES evidence_submissions(id) ON DELETE CASCADE,
  shared_by_user_slug TEXT NOT NULL,
  shared_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (community_id, evidence_submission_id)
);

CREATE INDEX IF NOT EXISTS idx_pka_user ON personal_knowledge_assets (user_slug);
CREATE INDEX IF NOT EXISTS idx_pka_items_asset ON personal_knowledge_asset_items (asset_id);
CREATE INDEX IF NOT EXISTS idx_community_instances_slug ON community_instances (slug);
CREATE INDEX IF NOT EXISTS idx_community_members_community ON community_members (community_id);
CREATE INDEX IF NOT EXISTS idx_community_members_user ON community_members (user_slug);

ALTER TABLE personal_knowledge_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_knowledge_asset_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_evidence_shares ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pka_service_all" ON personal_knowledge_assets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "pka_items_service_all" ON personal_knowledge_asset_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "community_instances_public" ON community_instances FOR SELECT USING (status = 'active');
CREATE POLICY "community_instances_service" ON community_instances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "community_members_service" ON community_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "community_projects_service" ON community_project_assignments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "community_evidence_service" ON community_evidence_shares FOR ALL USING (true) WITH CHECK (true);

INSERT INTO platform_config (key, value) VALUES
  ('pass_012_exit_criteria', '{
    "collections": ["Collection Created","Entity Added","Evidence Linked","Identity Updated"],
    "community": ["Community Created","Member Joined","Project Assigned","Evidence Shared"],
    "core_rule": "Transformation accelerates in community.",
    "demo_user_slug": "demo-user"
  }'::jsonb),
  ('collection_engine', '{"principle": "Personal Knowledge Assets — not lists"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('knowledge_assets_total', '{"count": 0}'::jsonb),
  ('knowledge_assets_with_evidence', '{"count": 0}'::jsonb),
  ('communities_active', '{"count": 0}'::jsonb),
  ('community_members_total', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

COMMENT ON TABLE personal_knowledge_assets IS 'PASS-012: Personal Knowledge Assets — part of identity, not dumb lists';
COMMENT ON TABLE community_instances IS 'PASS-012: Community OS instances — clubs are one community_type';
