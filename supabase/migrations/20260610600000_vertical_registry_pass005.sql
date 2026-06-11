-- PASS-005: Vertical Registry — configs, domains, launch status

-- ═══════════════════════════════════════════════════════════
-- VERTICAL CONFIGS (short name + theme for resolution engine)
-- ═══════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS vertical_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  short_name TEXT NOT NULL,
  theme TEXT NOT NULL,
  brand_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vertical_id)
);

-- vertical_domains: production + local dev hostnames
CREATE TABLE IF NOT EXISTS vertical_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  domain TEXT NOT NULL UNIQUE,
  local_domain TEXT UNIQUE,
  site_slug TEXT NOT NULL,
  site_display_name TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'planned'
    CHECK (status IN ('planned', 'active_build', 'staging', 'live', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Launch status tracker for Mission Control / investors
CREATE TABLE IF NOT EXISTS vertical_launch_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  theme TEXT NOT NULL,
  launch_status TEXT NOT NULL DEFAULT 'planned'
    CHECK (launch_status IN ('planned', 'active_build', 'staging', 'live', 'archived')),
  launch_pass TEXT,
  flagship_domain TEXT,
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(vertical_id)
);

-- ═══════════════════════════════════════════════════════════
-- SEED: PASS-005 registry (idempotent via vertical slug lookup)
-- ═══════════════════════════════════════════════════════════

INSERT INTO vertical_configs (vertical_id, short_name, theme, brand_config)
SELECT v.id, c.short_name, c.theme, c.brand_config
FROM (VALUES
  ('spirits-beverages', 'Spirits', 'Bourbon', '{"accent":"#8B4513"}'::jsonb),
  ('books-literature', 'Books', 'Literature', '{"accent":"#4A6741"}'::jsonb),
  ('film-cinema', 'Movies', 'Cinema', '{"accent":"#1A1A2E"}'::jsonb),
  ('music-audio', 'Music', 'Audio', '{"accent":"#6B3FA0"}'::jsonb),
  ('food-culinary', 'Food', 'Culinary', '{"accent":"#C45C26"}'::jsonb),
  ('sports', 'Sports', 'Athletics', '{"accent":"#CC0000"}'::jsonb),
  ('wine-beer', 'Wine', 'Cellar', '{"accent":"#722F37"}'::jsonb),
  ('tv-streaming', 'TV', 'Streaming', '{"accent":"#0D47A1"}'::jsonb)
) AS c(slug, short_name, theme, brand_config)
JOIN verticals v ON v.slug = c.slug
ON CONFLICT (vertical_id) DO UPDATE SET
  short_name = EXCLUDED.short_name,
  theme = EXCLUDED.theme,
  brand_config = EXCLUDED.brand_config,
  updated_at = now();

INSERT INTO vertical_domains (vertical_id, domain, local_domain, site_slug, site_display_name, status)
SELECT v.id, d.domain, d.local_domain, d.site_slug, d.site_display_name, d.status
FROM (VALUES
  ('spirits-beverages', 'bourbon.foundryos.com', 'bourbon.localhost', 'bourbon', 'Bourbon', 'active_build'),
  ('books-literature', 'books.foundryos.com', 'books.localhost', 'books', 'Books & Literature', 'planned'),
  ('film-cinema', 'movies.foundryos.com', 'movies.localhost', 'movies', 'Film & Cinema', 'planned'),
  ('music-audio', 'music.foundryos.com', 'music.localhost', 'music', 'Music & Audio', 'planned'),
  ('food-culinary', 'bbq.foundryos.com', 'bbq.localhost', 'bbq', 'BBQ & Smokehouse', 'planned'),
  ('sports', 'collegebaseball.foundryos.com', 'collegebaseball.localhost', 'collegebaseball', 'College Baseball', 'planned')
) AS d(vslug, domain, local_domain, site_slug, site_display_name, status)
JOIN verticals v ON v.slug = d.vslug
ON CONFLICT (domain) DO UPDATE SET
  local_domain = EXCLUDED.local_domain,
  status = EXCLUDED.status,
  updated_at = now();

INSERT INTO vertical_launch_status (vertical_id, display_name, theme, launch_status, launch_pass, flagship_domain)
SELECT v.id, ls.display_name, ls.theme, ls.launch_status, ls.launch_pass, ls.flagship_domain
FROM (VALUES
  ('spirits-beverages', 'Bourbon', 'Bourbon', 'active_build', 'PASS-009', 'bourbon.foundryos.com'),
  ('books-literature', 'Books', 'Literature', 'planned', 'PASS-010', 'books.foundryos.com'),
  ('film-cinema', 'Movies', 'Cinema', 'planned', NULL, 'movies.foundryos.com'),
  ('music-audio', 'Music', 'Audio', 'planned', NULL, 'music.foundryos.com'),
  ('food-culinary', 'BBQ', 'Smokehouse', 'planned', NULL, 'bbq.foundryos.com'),
  ('sports', 'College Baseball', 'Athletics', 'planned', NULL, 'collegebaseball.foundryos.com')
) AS ls(vslug, display_name, theme, launch_status, launch_pass, flagship_domain)
JOIN verticals v ON v.slug = ls.vslug
ON CONFLICT (vertical_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  theme = EXCLUDED.theme,
  launch_status = EXCLUDED.launch_status,
  launch_pass = EXCLUDED.launch_pass,
  flagship_domain = EXCLUDED.flagship_domain,
  updated_at = now();

-- RLS: public read for launch status (investor narrative)
ALTER TABLE vertical_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE vertical_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE vertical_launch_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vertical_configs_public" ON vertical_configs FOR SELECT USING (true);
CREATE POLICY "vertical_domains_public" ON vertical_domains FOR SELECT USING (true);
CREATE POLICY "vertical_launch_status_public" ON vertical_launch_status FOR SELECT USING (true);

COMMENT ON TABLE vertical_configs IS 'PASS-005: short_name + theme for resolveVertical()';
COMMENT ON TABLE vertical_domains IS 'PASS-005: production + local_domain (*.localhost) hostnames';
COMMENT ON TABLE vertical_launch_status IS 'PASS-005: investor/operator launch progress';
