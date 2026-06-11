-- PASS-004: Supabase Live & Deployment Readiness
-- Storage buckets + deployment markers (no product features)

-- ═══════════════════════════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('entity-images', 'entity-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Entity images: public read, authenticated upload to own path
DROP POLICY IF EXISTS "entity_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "entity_images_auth_upload" ON storage.objects;
DROP POLICY IF EXISTS "entity_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
DROP POLICY IF EXISTS "avatars_own_upload" ON storage.objects;
DROP POLICY IF EXISTS "avatars_own_update" ON storage.objects;
DROP POLICY IF EXISTS "avatars_own_delete" ON storage.objects;

CREATE POLICY "entity_images_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'entity-images');

CREATE POLICY "entity_images_auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'entity-images' AND auth.role() = 'authenticated'
  );

CREATE POLICY "entity_images_auth_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'entity-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Avatars: users manage files in their own folder
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "avatars_own_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_own_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_own_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ═══════════════════════════════════════════════════════════
-- DEPLOYMENT MARKER
-- ═══════════════════════════════════════════════════════════

INSERT INTO platform_config (key, value) VALUES
  ('deployment_readiness', '{"pass": "PASS-004", "storage_buckets": ["entity-images", "avatars"], "seed_required": true}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

INSERT INTO platform_metrics (metric_key, metric_value) VALUES
  ('total_topics', '{"count": 0}'::jsonb),
  ('total_verticals', '{"count": 0}'::jsonb)
ON CONFLICT (metric_key) DO NOTHING;

INSERT INTO build_passes (pass_code, title, summary, status, deliverables) VALUES
  (
    'PASS-004',
    'Supabase Live & Deployment Readiness',
    'Migrations, RLS verify, storage buckets, platform seed, DB diagnostics, Netlify env checklist.',
    'in_progress',
    '["supabase_env","migrations","rls_verify","platform_seed","db_diagnostics","netlify_checklist","mission_control_db_status"]'::jsonb
  )
ON CONFLICT (pass_code) DO UPDATE SET
  summary = EXCLUDED.summary,
  deliverables = EXCLUDED.deliverables;
