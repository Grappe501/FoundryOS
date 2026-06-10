#!/usr/bin/env node
/**
 * FoundryOS Catalog Builder
 * Generates data/catalog/ from vertical definitions.
 * Run: node scripts/build-catalog.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'catalog');
const verticalSites = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/vertical-sites.json'), 'utf-8'));
const domainByVertical = new Map(
  verticalSites.sites.filter((s) => s.vertical_id).map((s) => [s.vertical_id, s.domain])
);

function app(slug, displayName, crossRefs = [], priority = 'P3') {
  return { slug, displayName, crossRefs, priority };
}

const VERTICALS = [
  {
    id: 'spirits-beverages',
    slug: 'spirits-beverages',
    name: 'Spirits & Beverages',
    icon: '🥃',
    apps: [
      app('bourbon-connoisseur', 'Bourbon Connoisseur', ['wine-cellar', 'craft-beer', 'meals-pairing'], 'P0'),
      app('scotch-whisky', 'Scotch Whisky Authority', ['bourbon-connoisseur', 'irish-whiskey'], 'P1'),
      app('irish-whiskey', 'Irish Whiskey Guide', ['scotch-whisky', 'bourbon-connoisseur'], 'P1'),
      app('japanese-whisky', 'Japanese Whisky Collection', ['scotch-whisky', 'bourbon-connoisseur'], 'P1'),
      app('canadian-whisky', 'Canadian Whisky Explorer', ['bourbon-connoisseur', 'scotch-whisky'], 'P1'),
      app('rye-whisky', 'Rye Whisky Specialist', ['bourbon-connoisseur', 'canadian-whisky'], 'P1'),
      app('tennessee-whiskey', 'Tennessee Whiskey Trail', ['bourbon-connoisseur', 'rye-whisky'], 'P1'),
      app('craft-spirits', 'Craft Distillery Guide', ['bourbon-connoisseur', 'gin-collection'], 'P1'),
      app('gin-collection', 'Gin Connoisseur', ['craft-spirits', 'vodka-specialist']),
      app('vodka-specialist', 'Vodka Authority', ['gin-collection', 'craft-spirits']),
      app('rum-explorer', 'Rum Explorer', ['tequila-agave', 'tiki-cocktails']),
      app('tequila-agave', 'Tequila & Agave Spirits', ['mezcal-master', 'rum-explorer']),
      app('mezcal-master', 'Mezcal Master', ['tequila-agave', 'rum-explorer']),
      app('cognac-brandy', 'Cognac & Brandy Cellar', ['wine-cellar', 'bourbon-connoisseur']),
      app('liqueurs-cordials', 'Liqueurs & Cordials', ['craft-cocktails', 'dessert-wines']),
      app('craft-cocktails', 'Craft Cocktail Creator', ['bourbon-connoisseur', 'gin-collection']),
      app('tiki-cocktails', 'Tiki Cocktail Culture', ['rum-explorer', 'craft-cocktails']),
      app('whiskey-blends', 'Blended Whisky Guide', ['scotch-whisky', 'canadian-whisky']),
      app('single-malt', 'Single Malt Authority', ['scotch-whisky', 'japanese-whisky']),
      app('cask-strength', 'Cask Strength Collectors', ['bourbon-connoisseur', 'single-malt']),
      app('allocated-bottles', 'Allocated & Rare Bottles', ['bourbon-connoisseur', 'cask-strength']),
      app('distillery-tours', 'Distillery Tour Planner', ['bourbon-connoisseur', 'craft-spirits']),
      app('home-bar', 'Home Bar Builder', ['craft-cocktails', 'bourbon-connoisseur']),
      app('tasting-notes', 'Universal Tasting Journal', ['bourbon-connoisseur', 'wine-cellar']),
      app('spirits-food-pairing', 'Spirits & Food Pairing', ['meals-pairing', 'bourbon-connoisseur']),
      app('amaro-bitters', 'Amaro & Bitters Guide', ['craft-cocktails', 'liqueurs-cordials']),
      app('absinthe-spirits', 'Absinthe & Anise Spirits', ['craft-cocktails', 'gin-collection']),
      app('aquavit-spirits', 'Aquavit & Nordic Spirits', ['vodka-specialist', 'scotch-whisky']),
      app('grappa-brandy', 'Grappa & Eau-de-Vie', ['cognac-brandy', 'italian-wines']),
      app('pisco-spirits', 'Pisco Authority', ['tequila-agave', 'rum-explorer']),
      app('baijiu-spirits', 'Baijiu Explorer', ['japanese-whisky', 'asian-spirits']),
      app('soju-shochu', 'Soju & Shochu Guide', ['sushi-sake', 'japanese-whisky']),
      app('sake-mastery', 'Sake Mastery', ['sushi-sake', 'japanese-whisky']),
      app('vermouth-guide', 'Vermouth Authority', ['craft-cocktails', 'wine-cellar']),
      app('barrel-aging', 'Barrel Aging at Home', ['home-bar', 'bourbon-connoisseur']),
      app('moonshine-heritage', 'Moonshine Heritage', ['bourbon-connoisseur', 'tennessee-whiskey']),
      app('spirits-auctions', 'Spirits Auction Tracker', ['allocated-bottles', 'whiskey-invest']),
      app('cocktail-history', 'Cocktail History Archive', ['craft-cocktails', 'tiki-cocktails']),
      app('bartender-cert', 'Bartender Certification Prep', ['craft-cocktails', 'home-bar']),
      app('spirits-regions', 'Global Spirits Regions', ['bourbon-connoisseur', 'scotch-whisky']),
      app('flavor-wheel-spirits', 'Spirits Flavor Wheel', ['tasting-notes', 'bourbon-connoisseur']),
      app('holiday-cocktails', 'Holiday Cocktail Guide', ['craft-cocktails', 'champagne-sparkling']),
      app('zero-proof-spirits', 'Zero-Proof Spirits', ['craft-cocktails', 'wellness-recovery']),
      app('spirits-gifts', 'Spirits Gift Curator', ['bourbon-connoisseur', 'gift-curator']),
      app('master-distillers', 'Master Distillers Hall', ['bourbon-connoisseur', 'craft-spirits']),
      app('mash-bill-encyclopedia', 'Mash Bill Encyclopedia', ['bourbon-connoisseur', 'rye-whisky']),
      app('cask-finish-guide', 'Cask Finish Guide', ['single-malt', 'bourbon-connoisseur']),
      app('spirits-science', 'Spirits Science Lab', ['mash-bill-encyclopedia', 'barrel-aging']),
      app('world-whisky-atlas', 'World Whisky Atlas', ['scotch-whisky', 'japanese-whisky', 'bourbon-connoisseur']),
    ],
  },
];

// Additional verticals loaded from separate module files below inline for maintainability
const MORE = require('./catalog-verticals/index');

const allVerticals = [...VERTICALS, ...MORE];

function build() {
  fs.mkdirSync(OUT, { recursive: true });

  let globalIndex = 0;
  const index = {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    total_apps: 0,
    total_verticals: allVerticals.length,
    verticals: [],
    mega_verticals: ['books-literature', 'music-audio', 'film-cinema', 'tv-streaming'],
  };

  const allApps = [];

  for (const vertical of allVerticals) {
    const apps = vertical.apps.map((a, i) => {
      const verticalDomain = domainByVertical.get(vertical.id);
      return {
        ...a,
        id: ++globalIndex,
        vertical_id: vertical.id,
        vertical_slug: vertical.slug,
        vertical_domain: verticalDomain ?? null,
        topic_url: verticalDomain ? `https://${verticalDomain}/${a.slug}` : null,
        site_url: verticalDomain ? `https://${verticalDomain}` : null,
        admin_managed: true,
        is_topic: true,
        is_standalone_site: false,
      };
    });

    const verticalMeta = {
      id: vertical.id,
      slug: vertical.slug,
      name: vertical.name,
      icon: vertical.icon || '✦',
      app_count: apps.length,
      is_mega_vertical: index.mega_verticals.includes(vertical.id),
    };

    index.verticals.push(verticalMeta);
    allApps.push(...apps);

    fs.writeFileSync(
      path.join(OUT, `${vertical.slug}.json`),
      JSON.stringify({ vertical: verticalMeta, apps }, null, 2)
    );
  }

  index.total_apps = allApps.length;

  fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 2));
  fs.writeFileSync(path.join(OUT, 'all-apps.json'), JSON.stringify(allApps, null, 2));

  console.log(`Catalog built: ${index.total_apps} apps across ${index.total_verticals} verticals`);
  console.log(`Output: ${OUT}`);
  return index;
}

build();
