import fs from 'node:fs';
import path from 'node:path';
import { getFullBlueprint } from './blueprints/index.js';
import { componentFolder, slugToPascal, worldLibBasename } from './naming.js';
import { marketingRoot, platformRoot } from './paths.js';
import type { LayerStatus, WorldLayer } from './types.js';

export type WorldFsAudit = {
  slug: string;
  displayName: string;
  layers: Record<WorldLayer, LayerStatus>;
  automationPct: number;
  missing: string[];
};

const LAYER_WEIGHT: Record<LayerStatus, number> = {
  done: 1,
  partial: 0.6,
  registry_only: 0.25,
  missing: 0,
};

function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function layerFromPaths(paths: string[]): LayerStatus {
  const found = paths.filter(exists).length;
  if (found === 0) return 'missing';
  if (found === paths.length) return 'done';
  return 'partial';
}

export function auditWorldFs(slug: string): WorldFsAudit | null {
  const bp = getFullBlueprint(slug);
  if (!bp) return null;

  const root = platformRoot();
  const pascal = slugToPascal(slug);
  const lib = path.join(root, `lib/${worldLibBasename(slug)}.ts`);
  const meta = path.join(root, `lib/${worldLibBasename(slug)}-meta.ts`);
  const app = path.join(root, `app/${slug}`);
  const comp = path.join(root, `components/${componentFolder(slug)}`);
  const marketing = path.join(marketingRoot(), 'domains', slug);
  const explore = path.join(root, 'lib/generated/world-factory-explore.ts');

  const pathsByLayer: Record<WorldLayer, string[]> = {
    world_hub: [path.join(app, 'page.tsx'), path.join(app, 'layout.tsx'), lib],
    academy: [path.join(app, 'academy/page.tsx')],
    missions: [path.join(app, 'missions/page.tsx'), path.join(app, 'missions/[slug]/page.tsx')],
    portfolio: [
      path.join(app, 'portfolio/page.tsx'),
      path.join(comp, `${pascal}PortfolioView.tsx`),
    ],
    parents: [path.join(app, 'parents/page.tsx'), meta],
    careers: [path.join(app, 'careers/page.tsx')],
    glossary: [path.join(app, 'glossary/page.tsx')],
    community: [path.join(app, 'community/page.tsx')],
    playground: [path.join(app, 'playground/page.tsx')],
    operator_proof: [path.join(root, `app/verticals/${slug}/page.tsx`)],
    marketing_launch: [path.join(marketing, 'LAUNCH_CHECKLIST.md'), path.join(marketing, 'README.md')],
    seo_assets: [path.join(marketing, 'seo-map.md'), path.join(marketing, 'content-calendar-30d.md')],
    explore_registration: [explore, path.join(root, 'lib/generated/world-factory-routes.ts')],
  };

  const layers = Object.fromEntries(
    Object.entries(pathsByLayer).map(([layer, paths]) => [layer, layerFromPaths(paths)]),
  ) as Record<WorldLayer, LayerStatus>;

  const missing: string[] = [];
  for (const [layer, paths] of Object.entries(pathsByLayer)) {
    for (const p of paths) {
      if (!exists(p)) missing.push(`${layer}: ${path.relative(root, p)}`);
    }
  }

  const automationPct = Math.round(
    (Object.values(layers).reduce((sum, s) => sum + LAYER_WEIGHT[s], 0) /
      Object.keys(layers).length) *
      100,
  );

  return {
    slug,
    displayName: bp.displayName,
    layers,
    automationPct,
    missing,
  };
}

export function auditAllWorldsFs(slugs: string[]): WorldFsAudit[] {
  return slugs.map((s) => auditWorldFs(s)!).filter(Boolean);
}
