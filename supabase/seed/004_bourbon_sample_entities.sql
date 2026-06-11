-- PASS-004: Bourbon sample entities (data only — no UI)
-- Run after platform seed (verticals + topics)

DO $$
DECLARE
  v_spirits UUID;
  v_topic UUID;
  v_spirit_type UUID;
  v_place_type UUID;
  v_buffalo_trace UUID;
  v_makers_mark UUID;
  v_distillery UUID;
BEGIN
  SELECT id INTO v_spirits FROM verticals WHERE slug = 'spirits-beverages';
  SELECT id INTO v_topic FROM topics WHERE slug = 'bourbon-connoisseur';
  SELECT id INTO v_spirit_type FROM entity_types WHERE slug = 'spirit';
  SELECT id INTO v_place_type FROM entity_types WHERE slug = 'place';

  IF v_spirits IS NULL OR v_topic IS NULL OR v_spirit_type IS NULL THEN
    RAISE NOTICE 'Skipping bourbon seed — run platform seed first';
    RETURN;
  END IF;

  INSERT INTO entities (entity_type_id, slug, display_name, description, vertical_id, topic_id, status, metadata)
  VALUES (
    v_spirit_type,
    'buffalo-trace',
    'Buffalo Trace Kentucky Straight Bourbon',
    'Flagship bourbon from Buffalo Trace Distillery in Frankfort, Kentucky.',
    v_spirits,
    v_topic,
    'published',
    '{"distillery": "Buffalo Trace", "proof": 90, "mash_bill": "low rye"}'::jsonb
  )
  ON CONFLICT (entity_type_id, slug) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    status = 'published',
    updated_at = now()
  RETURNING id INTO v_buffalo_trace;

  INSERT INTO entities (entity_type_id, slug, display_name, description, vertical_id, topic_id, status, metadata)
  VALUES (
    v_spirit_type,
    'makers-mark',
    'Maker''s Mark Kentucky Straight Bourbon',
    'Wheated bourbon known for its red wax seal and soft profile.',
    v_spirits,
    v_topic,
    'published',
    '{"distillery": "Maker''s Mark", "proof": 90, "mash_bill": "wheated"}'::jsonb
  )
  ON CONFLICT (entity_type_id, slug) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    status = 'published',
    updated_at = now()
  RETURNING id INTO v_makers_mark;

  INSERT INTO entities (entity_type_id, slug, display_name, description, vertical_id, topic_id, status, metadata)
  VALUES (
    v_place_type,
    'buffalo-trace-distillery',
    'Buffalo Trace Distillery',
    'Historic distillery in Frankfort, Kentucky — home of Buffalo Trace bourbon.',
    v_spirits,
    v_topic,
    'published',
    '{"location": "Frankfort, KY", "country": "USA", "founded": 1775}'::jsonb
  )
  ON CONFLICT (entity_type_id, slug) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    status = 'published',
    updated_at = now()
  RETURNING id INTO v_distillery;

  IF v_buffalo_trace IS NOT NULL AND v_distillery IS NOT NULL THEN
    INSERT INTO entity_relationships (source_entity_id, target_entity_id, relationship_type, strength)
    VALUES (v_buffalo_trace, v_distillery, 'part_of', 1.0)
    ON CONFLICT (source_entity_id, target_entity_id, relationship_type) DO NOTHING;
  END IF;

  IF v_makers_mark IS NOT NULL THEN
    PERFORM refresh_entity_metrics(v_makers_mark);
  END IF;
  IF v_buffalo_trace IS NOT NULL THEN
    PERFORM refresh_entity_metrics(v_buffalo_trace);
  END IF;

  UPDATE platform_metrics SET metric_value = jsonb_build_object('count', (SELECT COUNT(*) FROM entities)), updated_at = now()
  WHERE metric_key = 'total_entities';

  UPDATE platform_metrics SET metric_value = jsonb_build_object('count', (SELECT COUNT(*) FROM entity_relationships)), updated_at = now()
  WHERE metric_key = 'total_relationships';

  RAISE NOTICE 'Bourbon sample entities seeded';
END $$;
