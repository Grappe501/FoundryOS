import type { AppManifest, GenerateResult } from '../types';
import { validateManifest } from '../validators/manifest';

/**
 * Core self-build engine.
 * Reads a manifest, selects template, generates app scaffold.
 *
 * Phase 3 will add OpenAI enrichment.
 * Phase 0 establishes the replicable structure.
 */
export async function generateApp(manifest: AppManifest): Promise<GenerateResult> {
  const validation = validateManifest(manifest);
  if (!validation.valid) {
    return {
      success: false,
      slug: manifest.slug,
      filesCreated: [],
      errors: validation.errors,
    };
  }

  const filesCreated: string[] = [
    `apps/${manifest.slug}/package.json`,
    `apps/${manifest.slug}/app/page.tsx`,
    `apps/${manifest.slug}/app/layout.tsx`,
    `apps/${manifest.slug}/config/manifest.json`,
    `supabase/seed/${manifest.slug}.sql`,
  ];

  // TODO Pass 4: Implement file generation from templates/
  // TODO Pass 4: OpenAI catalog enrichment
  // TODO Pass 4: Auto-register in categories table

  return {
    success: true,
    slug: manifest.slug,
    filesCreated,
    errors: [],
  };
}
