-- Seed: Bourbon Connoisseur (App #1)
-- Run after initial migration

INSERT INTO categories (slug, display_name, description, status, tier_config, theme_config, ai_config)
VALUES (
  'bourbon-connoisseur',
  'Bourbon Connoisseur',
  'Everything about bourbon — the definitive catalog, personal cellar, and bourbon clubs.',
  'active',
  '{
    "tier1": {"features": ["catalog", "search", "browse", "distillery-profiles"], "limits": {}},
    "tier2": {"features": ["collections", "rankings", "notes", "wishlist", "export"], "price_monthly": 4},
    "tier3": {"features": ["clubs", "sharing", "ai-pairing", "cross-app", "expert-badges"], "price_monthly": 18}
  }'::jsonb,
  '{
    "primary_color": "#8B4513",
    "accent_color": "#D4A574"
  }'::jsonb,
  '{
    "catalog_enrichment": "You are a world-class bourbon expert with encyclopedic knowledge of distilleries, mash bills, aging processes, and tasting profiles.",
    "pairing_suggestion": "Given this bourbon flavor profile, suggest ideal food pairings, cigar pairings, and occasion recommendations.",
    "expert_review": "Write a concise expert review covering nose, palate, finish, and value assessment."
  }'::jsonb
);

-- Cross-references to related apps
INSERT INTO cross_references (source_category_id, target_category_id, reference_type, metadata)
SELECT
  (SELECT id FROM categories WHERE slug = 'bourbon-connoisseur'),
  c.id,
  'pairing',
  '{"strength": "strong"}'::jsonb
FROM categories c
WHERE c.slug IN ('wine-cellar', 'craft-beer', 'meals-pairing', 'cigar-aficionado');
