#!/usr/bin/env node
/**
 * PASS-004: Seed minimal platform records
 * - 26 verticals
 * - 1,961 topics from catalog
 * - vertical_sites from vertical-sites.json
 * - Bourbon sample entities (via SQL)
 * - Admin placeholder (optional via ADMIN_EMAIL)
 *
 * Usage: npm run db:seed
 */
const fs = require('fs');
const path = require('path');
const { loadFoundryEnv } = require('./lib/load-env');

const ROOT = loadFoundryEnv();
const BATCH_SIZE = 200;

const PLACEHOLDERS = ['your-project.supabase.co', 'your-anon-key', 'your-service-role-key'];

function isConfigured(value) {
  return value && !PLACEHOLDERS.some((p) => value.includes(p));
}

async function seedVerticals(supabase, catalogIndex) {
  const rows = catalogIndex.verticals.map((v, i) => ({
    slug: v.slug,
    display_name: v.name,
    icon: v.icon,
    is_mega_vertical: v.is_mega_vertical ?? false,
    app_count_target: v.app_count ?? 0,
    sort_order: i + 1,
    status: 'active',
  }));

  const { error } = await supabase.from('verticals').upsert(rows, { onConflict: 'slug' });
  if (error) throw new Error(`verticals: ${error.message}`);
  console.log(`  ✓ verticals: ${rows.length}`);
}

async function seedTopics(supabase, allApps) {
  const { data: verticals, error: vErr } = await supabase.from('verticals').select('id, slug');
  if (vErr) throw new Error(vErr.message);

  const verticalMap = Object.fromEntries((verticals ?? []).map((v) => [v.slug, v.id]));

  const rows = allApps.map((app) => ({
    slug: app.slug,
    display_name: app.displayName,
    vertical_id: verticalMap[app.vertical_slug || app.vertical_id],
    category_group: app.vertical_slug,
    status: 'draft',
    build_priority: app.priority ?? 'P3',
    cross_refs: app.crossRefs ?? [],
    catalog_index: app.id,
  })).filter((r) => r.vertical_id);

  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { error } = await supabase.from('topics').upsert(batch, { onConflict: 'slug' });
    if (error) throw new Error(`topics batch ${i}: ${error.message}`);
    inserted += batch.length;
    process.stdout.write(`\r  → topics: ${inserted}/${rows.length}`);
  }
  console.log(`\n  ✓ topics: ${inserted}`);
}

async function seedVerticalSites(supabase, sitesConfig) {
  const { data: verticals } = await supabase.from('verticals').select('id, slug');
  const verticalMap = Object.fromEntries((verticals ?? []).map((v) => [v.slug, v.id]));

  const rows = sitesConfig.sites.map((site) => ({
    domain: site.domain,
    slug: site.slug,
    display_name: site.display_name,
    vertical_id: site.vertical_id ? verticalMap[site.vertical_id] ?? null : null,
    site_type: site.type,
    flagship_topic_slug: site.flagship_topic ?? null,
    status: site.status ?? 'planned',
    launch_pass: site.launch_pass ?? null,
    seo_config: {},
  }));

  const { error } = await supabase.from('vertical_sites').upsert(rows, { onConflict: 'domain' });
  if (error) throw new Error(`vertical_sites: ${error.message}`);
  console.log(`  ✓ vertical_sites: ${rows.length}`);
}

async function seedAdminPlaceholder(supabase) {
  const email = process.env.FOUNDRY_ADMIN_EMAIL;
  const password = process.env.FOUNDRY_ADMIN_PASSWORD;

  if (!email) {
    console.log('  ⚠ admin: set FOUNDRY_ADMIN_EMAIL + FOUNDRY_ADMIN_PASSWORD in .env.local to auto-create');
    console.log('    Or create user in Supabase Auth → link in admin_users table');
    return;
  }

  const { data: existing } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  let userId = existing?.users?.find((u) => u.email === email)?.id;

  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: password || undefined,
      email_confirm: true,
      user_metadata: { display_name: 'Steve', role: 'founder' },
    });
    if (error) throw new Error(`admin user: ${error.message}`);
    userId = data.user.id;
    console.log(`  ✓ admin auth user created: ${email}`);
  } else {
    console.log(`  ✓ admin auth user exists: ${email}`);
  }

  const { error: profileErr } = await supabase.from('user_profiles').upsert({
    id: userId,
    display_name: 'Steve',
    username: 'steve',
    tier_level: 3,
  });
  if (profileErr) console.log(`  ⚠ user_profiles: ${profileErr.message}`);

  const { error: adminErr } = await supabase.from('admin_users').upsert({
    id: userId,
    role: 'super_admin',
    display_name: 'Steve',
  });
  if (adminErr) console.log(`  ⚠ admin_users: ${adminErr.message}`);
  else console.log('  ✓ admin_users: super_admin');
}

async function loadMasteryCatalog() {
  const { register } = require('tsx/cjs/api');
  register();
  const mod = await import('@foundry/path-engine');
  return mod.MASTERY_PATH_CATALOG;
}

async function loadProjectCatalog() {
  const { register } = require('tsx/cjs/api');
  register();
  const mod = await import('@foundry/project-engine');
  return mod.PROJECT_CATALOG;
}

async function loadOutcomeCatalog() {
  const { register } = require('tsx/cjs/api');
  register();
  const mod = await import('@foundry/outcome-engine');
  return {
    outcomes: mod.HUMAN_OUTCOMES_REGISTRY,
    journeys: mod.LIFE_JOURNEYS_REGISTRY,
    insights: mod.EXAMPLE_TRANSFORMATION_INSIGHTS,
    templates: mod.TRANSFORMATION_TEMPLATES,
    dna: mod.DNA_REGISTRY,
  };
}

async function loadTransformationGraphCatalog() {
  const { register } = require('tsx/cjs/api');
  register();
  const [graph, evidence] = await Promise.all([
    import('@foundry/transformation-graph-engine'),
    import('@foundry/evidence-engine'),
  ]);
  return {
    weights: graph.EXAMPLE_WEIGHTED_RELATIONSHIPS,
    evidence: evidence.EVIDENCE_REGISTRY,
  };
}

async function seedFoundryProjects(supabase) {
  const catalog = await loadProjectCatalog();
  const rows = catalog.map((p) => ({
    slug: p.slug,
    display_name: p.display_name,
    tagline: p.tagline ?? null,
    vertical_slug: p.vertical_slug,
    category: p.category,
    description: p.description ?? null,
    path_slug: p.path_slug ?? null,
    steps: p.steps,
    estimated_days: p.estimated_days ?? null,
    status: p.status,
  }));

  const { error } = await supabase.from('foundry_projects').upsert(rows, { onConflict: 'slug' });
  if (error) throw new Error(`foundry_projects: ${error.message}`);

  const active = rows.filter((r) => r.status === 'active').length;
  await supabase
    .from('platform_metrics')
    .upsert({ metric_key: 'active_projects', metric_value: { count: active } }, { onConflict: 'metric_key' });

  console.log(`  ✓ foundry_projects: ${rows.length} (${active} active)`);
}

async function seedMasteryPaths(supabase) {
  const catalog = await loadMasteryCatalog();
  const { data: verticals } = await supabase.from('verticals').select('id, slug');
  const verticalMap = Object.fromEntries((verticals ?? []).map((v) => [v.slug, v.id]));

  const rows = catalog.map((p) => ({
    slug: p.slug,
    display_name: p.display_name,
    tagline: p.tagline ?? null,
    vertical_id: verticalMap[p.vertical_id] ?? null,
    vertical_slug: p.vertical_slug,
    tier: p.tier,
    assembled_from: p.assembled_from,
    milestones: p.milestones,
    estimated_weeks: p.estimated_weeks ?? null,
    status: p.status,
  }));

  const { error } = await supabase.from('mastery_paths').upsert(rows, { onConflict: 'slug' });
  if (error) throw new Error(`mastery_paths: ${error.message}`);

  const active = rows.filter((r) => r.status === 'active').length;
  await supabase
    .from('platform_metrics')
    .upsert({ metric_key: 'active_paths', metric_value: { count: active } }, { onConflict: 'metric_key' });

  console.log(`  ✓ mastery_paths: ${rows.length} (${active} active)`);
}

async function seedHumanOutcomes(supabase) {
  const { outcomes } = await loadOutcomeCatalog();
  const rows = outcomes.map((o) => ({
    slug: o.slug,
    display_name: o.display_name,
    goal_statement: o.goal_statement,
    linked_domains: o.linked_domains,
    linked_paths: o.linked_paths ?? [],
    linked_projects: o.linked_projects ?? [],
    category: o.category,
    status: o.status,
  }));

  const { error } = await supabase.from('human_outcomes').upsert(rows, { onConflict: 'slug' });
  if (error) throw new Error(`human_outcomes: ${error.message}`);

  await supabase
    .from('platform_metrics')
    .upsert({ metric_key: 'human_outcomes_defined', metric_value: { count: rows.length } }, { onConflict: 'metric_key' });

  console.log(`  ✓ human_outcomes: ${rows.length}`);
}

async function seedLifeJourneys(supabase) {
  const { journeys, insights } = await loadOutcomeCatalog();

  const journeyRows = journeys.map((j) => ({
    slug: j.slug,
    display_name: j.display_name,
    journey_statement: j.journey_statement,
    linked_outcome_slugs: j.linked_outcome_slugs,
    equation_phase: j.equation_phase,
    market: j.market,
    status: j.status,
  }));

  const { error: jErr } = await supabase.from('life_journeys').upsert(journeyRows, { onConflict: 'slug' });
  if (jErr) throw new Error(`life_journeys: ${jErr.message}`);

  const insightRows = insights.map((i) => ({
    path_slug: i.path_slug,
    display_name: i.display_name,
    sample_size: i.sample_size,
    top_predictors: i.top_predictors,
    average_time_to_mastery_years: i.average_time_to_mastery_years ?? null,
    completion_multiplier: i.completion_multiplier ?? null,
    status: 'illustrative',
  }));

  const { error: iErr } = await supabase.from('transformation_insights').upsert(insightRows, { onConflict: 'path_slug' });
  if (iErr) throw new Error(`transformation_insights: ${iErr.message}`);

  await supabase
    .from('platform_metrics')
    .upsert({ metric_key: 'life_journeys_defined', metric_value: { count: journeyRows.length } }, { onConflict: 'metric_key' });

  console.log(`  ✓ life_journeys: ${journeyRows.length}`);
  console.log(`  ✓ transformation_insights: ${insightRows.length} (illustrative)`);
}

async function seedTransformationFactory(supabase) {
  const { templates, dna } = await loadOutcomeCatalog();

  const templateRows = templates.map((t) => ({
    slug: t.slug,
    display_name: t.display_name,
    description: t.description,
    layers: t.layers,
    hierarchy_levels: t.hierarchy_levels,
    status: 'active',
  }));

  const { error: tErr } = await supabase.from('transformation_templates').upsert(templateRows, { onConflict: 'slug' });
  if (tErr) throw new Error(`transformation_templates: ${tErr.message}`);

  const dnaRows = dna.map((d) => ({
    domain: d.domain,
    display_name: d.display_name,
    template_slug: d.template,
    blueprint: d,
    status: 'exemplar',
  }));

  const { error: dErr } = await supabase.from('domain_dna_records').upsert(dnaRows, { onConflict: 'domain' });
  if (dErr) throw new Error(`domain_dna_records: ${dErr.message}`);

  await supabase.from('platform_metrics').upsert([
    { metric_key: 'transformation_templates_defined', metric_value: { count: templateRows.length } },
    { metric_key: 'domain_dna_records_defined', metric_value: { count: dnaRows.length } },
  ], { onConflict: 'metric_key' });

  console.log(`  ✓ transformation_templates: ${templateRows.length}`);
  console.log(`  ✓ domain_dna_records: ${dnaRows.length}`);
}

async function seedTransformationGraph(supabase) {
  const { weights, evidence } = await loadTransformationGraphCatalog();

  const weightRows = weights.map((w) => ({
    source_slug: w.source,
    target_slug: w.target,
    relationship_type: w.relationship_type,
    weight: w.weight,
    rationale: w.rationale,
    status: 'illustrative',
  }));

  const { error: wErr } = await supabase.from('graph_relationship_weights').upsert(weightRows, {
    onConflict: 'source_slug,target_slug,relationship_type',
  });
  if (wErr) throw new Error(`graph_relationship_weights: ${wErr.message}`);

  const evidenceRows = evidence.map((p) => ({
    slug: p.slug,
    display_name: p.display_name,
    domain_slug: p.domain_slug,
    role_slug: p.role_slug ?? null,
    evidence_items: p.evidence_items,
    status: p.status,
  }));

  const { error: eErr } = await supabase.from('evidence_profiles').upsert(evidenceRows, { onConflict: 'slug' });
  if (eErr) throw new Error(`evidence_profiles: ${eErr.message}`);

  await supabase.from('platform_metrics').upsert([
    { metric_key: 'evidence_profiles_defined', metric_value: { count: evidenceRows.length } },
  ], { onConflict: 'metric_key' });

  console.log(`  ✓ graph_relationship_weights: ${weightRows.length} (illustrative)`);
  console.log(`  ✓ evidence_profiles: ${evidenceRows.length}`);
}

async function seedBourbonViaApi(supabase) {
  const { data: vertical } = await supabase.from('verticals').select('id').eq('slug', 'spirits-beverages').single();
  const { data: topic } = await supabase.from('topics').select('id').eq('slug', 'bourbon-connoisseur').single();
  const { data: spiritType } = await supabase.from('entity_types').select('id').eq('slug', 'spirit').single();
  const { data: placeType } = await supabase.from('entity_types').select('id').eq('slug', 'place').single();

  if (!vertical || !topic || !spiritType || !placeType) {
    console.log('  ⚠ bourbon seed skipped — missing vertical/topic/entity_types');
    return;
  }

  const spirits = [
    {
      entity_type_id: spiritType.id,
      slug: 'buffalo-trace',
      display_name: 'Buffalo Trace Kentucky Straight Bourbon',
      vertical_id: vertical.id,
      topic_id: topic.id,
      status: 'published',
      metadata: { distillery: 'Buffalo Trace', proof: 90 },
    },
    {
      entity_type_id: spiritType.id,
      slug: 'makers-mark',
      display_name: "Maker's Mark Kentucky Straight Bourbon",
      vertical_id: vertical.id,
      topic_id: topic.id,
      status: 'published',
      metadata: { distillery: "Maker's Mark", proof: 90 },
    },
    {
      entity_type_id: placeType.id,
      slug: 'buffalo-trace-distillery',
      display_name: 'Buffalo Trace Distillery',
      vertical_id: vertical.id,
      topic_id: topic.id,
      status: 'published',
      metadata: { location: 'Frankfort, KY', country: 'USA' },
    },
  ];

  const { data: inserted, error } = await supabase
    .from('entities')
    .upsert(spirits, { onConflict: 'entity_type_id,slug' })
    .select('id, slug');

  if (error) throw new Error(`bourbon entities: ${error.message}`);

  const buffalo = inserted?.find((e) => e.slug === 'buffalo-trace');
  const distillery = inserted?.find((e) => e.slug === 'buffalo-trace-distillery');
  if (buffalo && distillery) {
    await supabase.from('entity_relationships').upsert(
      {
        source_entity_id: buffalo.id,
        target_entity_id: distillery.id,
        relationship_type: 'part_of',
        strength: 1,
      },
      { onConflict: 'source_entity_id,target_entity_id,relationship_type' }
    );
  }

  console.log(`  ✓ bourbon sample entities: ${inserted?.length ?? 0}`);
}

async function updatePlatformMetrics(supabase) {
  const counts = await Promise.all([
    supabase.from('entities').select('*', { count: 'exact', head: true }),
    supabase.from('collections').select('*', { count: 'exact', head: true }),
    supabase.from('entity_relationships').select('*', { count: 'exact', head: true }),
    supabase.from('user_entity_relationships').select('*', { count: 'exact', head: true }),
  ]);

  const { count: topicCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: verticalCount } = await supabase.from('verticals').select('*', { count: 'exact', head: true });

  const updates = [
    ['total_entities', counts[0].count ?? 0],
    ['total_collections', counts[1].count ?? 0],
    ['total_relationships', counts[2].count ?? 0],
    ['total_user_entity_relationships', counts[3].count ?? 0],
    ['total_topics', topicCount ?? 0],
    ['total_verticals', verticalCount ?? 0],
  ];

  for (const [key, count] of updates) {
    await supabase
      .from('platform_metrics')
      .upsert({ metric_key: key, metric_value: { count } }, { onConflict: 'metric_key' });
  }
  console.log('  ✓ platform_metrics updated');
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log('FoundryOS — Platform Seed (PASS-004)\n');

  if (!isConfigured(url) || !isConfigured(serviceKey)) {
    console.error('✗ Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const catalogIndex = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/catalog/index.json'), 'utf8'));
  const allApps = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/catalog/all-apps.json'), 'utf8'));
  const verticalSites = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/vertical-sites.json'), 'utf8'));

  console.log('Seeding...');
  await seedVerticals(supabase, catalogIndex);
  await seedTopics(supabase, allApps);
  await seedVerticalSites(supabase, verticalSites);
  await seedBourbonViaApi(supabase);
  await seedMasteryPaths(supabase);
  await seedFoundryProjects(supabase);
  await seedHumanOutcomes(supabase);
  await seedLifeJourneys(supabase);
  await seedTransformationFactory(supabase);
  await seedTransformationGraph(supabase);
  await seedAdminPlaceholder(supabase);
  await updatePlatformMetrics(supabase);

  console.log('\nSeed complete. Run: npm run db:diagnose\n');
}

main().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
