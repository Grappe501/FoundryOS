-- Foundry University — academic domains, learning pyramid, mentor engine

CREATE TABLE IF NOT EXISTS academic_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  discipline TEXT NOT NULL,
  care_reason TEXT NOT NULL,
  road_slug TEXT NOT NULL,
  pyramid_layers JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('exemplar', 'active', 'planned', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mastery_roads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  domain_slug TEXT NOT NULL,
  levels JSONB NOT NULL DEFAULT '[]'::jsonb,
  pyramid_layers TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'exemplar')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO platform_config (key, value) VALUES
  ('foundry_university', '{
    "tagline": "Not courses. Road to Mastery.",
    "tutoring_goal": "Pass the test",
    "foundry_goal": "Become the expert",
    "ai_era_learning": ["Understand","Use","Create","Teach"]
  }'::jsonb),
  ('learning_pyramid', '{
    "layers": [
      {"level":1,"key":"definitions","question":"What is it?"},
      {"level":2,"key":"concepts","question":"Why does it work?"},
      {"level":3,"key":"execution","question":"How do I use it?"},
      {"level":4,"key":"projects","question":"Build something"},
      {"level":5,"key":"mastery","question":"Teach it"}
    ]
  }'::jsonb),
  ('factory_ecosystem', '{
    "factories": ["entity","expert","academy","project","mentor"]
  }'::jsonb),
  ('lifelong_expert_development', '{
    "category": "Lifelong Expert Development",
    "not_owned_by": ["MasterClass","Universities","YouTube","Wikipedia","ChatGPT"]
  }'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

-- Extend identity_domains category
ALTER TABLE identity_domains DROP CONSTRAINT IF EXISTS identity_domains_category_check;
ALTER TABLE identity_domains ADD CONSTRAINT identity_domains_category_check
  CHECK (category IN ('academic', 'skills', 'hobbies', 'careers', 'lifestyles', 'communities'));

ALTER TABLE academic_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE mastery_roads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "academic_domains_public" ON academic_domains FOR SELECT USING (status IN ('exemplar', 'active'));
CREATE POLICY "mastery_roads_public" ON mastery_roads FOR SELECT USING (status IN ('exemplar', 'active'));

COMMENT ON TABLE academic_domains IS 'Foundry University — capability development, not courses';
COMMENT ON TABLE mastery_roads IS 'Learn → Apply → Build → Research → Mentor';
