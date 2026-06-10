-- FoundryOS Admin & Multi-Site Schema
-- Supports: central admin, standalone sites per app, mega verticals

-- ─── Verticals (Mega-Categories) ──────────────────────────
CREATE TABLE verticals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '✦',
  is_mega_vertical BOOLEAN NOT NULL DEFAULT false,
  app_count_target INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Link categories to verticals
ALTER TABLE categories ADD COLUMN IF NOT EXISTS vertical_id UUID REFERENCES verticals(id);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS catalog_index INT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS build_priority TEXT DEFAULT 'P3';

-- ─── App Sites (Standalone Websites) ──────────────────────
CREATE TABLE app_sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL UNIQUE REFERENCES categories(id) ON DELETE CASCADE,
  subdomain TEXT UNIQUE NOT NULL,
  custom_domain TEXT UNIQUE,
  site_url TEXT NOT NULL,
  standalone BOOLEAN NOT NULL DEFAULT true,
  netlify_site_id TEXT,
  netlify_deploy_hook TEXT,
  deploy_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (deploy_status IN ('pending', 'building', 'live', 'error', 'archived')),
  ssl_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (ssl_status IN ('pending', 'active', 'error')),
  last_deployed_at TIMESTAMPTZ,
  seo_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Admin Users ──────────────────────────────────────────
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor'
    CHECK (role IN ('super_admin', 'admin', 'editor', 'analyst', 'ai_operator')),
  display_name TEXT,
  assigned_vertical_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Deploy Logs ──────────────────────────────────────────
CREATE TABLE deploy_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_site_id UUID NOT NULL REFERENCES app_sites(id) ON DELETE CASCADE,
  triggered_by UUID REFERENCES auth.users(id),
  action TEXT NOT NULL CHECK (action IN ('provision', 'deploy', 'rollback', 'domain_add', 'archive')),
  status TEXT NOT NULL CHECK (status IN ('started', 'success', 'failed')),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Site Analytics (snapshots) ───────────────────────────
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_site_id UUID NOT NULL REFERENCES app_sites(id) ON DELETE CASCADE,
  period_date DATE NOT NULL,
  page_views INT NOT NULL DEFAULT 0,
  unique_visitors INT NOT NULL DEFAULT 0,
  tier2_conversions INT NOT NULL DEFAULT 0,
  tier3_conversions INT NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(app_site_id, period_date)
);

-- ─── Indexes ──────────────────────────────────────────────
CREATE INDEX idx_categories_vertical ON categories(vertical_id);
CREATE INDEX idx_app_sites_subdomain ON app_sites(subdomain);
CREATE INDEX idx_app_sites_custom_domain ON app_sites(custom_domain);
CREATE INDEX idx_app_sites_deploy_status ON app_sites(deploy_status);
CREATE INDEX idx_deploy_logs_site ON deploy_logs(app_site_id);
CREATE INDEX idx_site_analytics_site ON site_analytics(app_site_id);

-- ─── RLS ──────────────────────────────────────────────────
ALTER TABLE verticals ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deploy_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Public read for active verticals and live sites
CREATE POLICY "verticals_public_read" ON verticals
  FOR SELECT USING (status = 'active');

CREATE POLICY "app_sites_public_read" ON app_sites
  FOR SELECT USING (deploy_status = 'live');

-- Admin-only tables: no public policies (service role + admin auth)
CREATE POLICY "admin_users_self" ON admin_users
  FOR SELECT USING (auth.uid() = id);
