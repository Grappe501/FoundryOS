import type { AppManifest } from '../types';

const SLUG_PATTERN = /^[a-z][a-z0-9-]*[a-z0-9]$/;
const VALID_TEMPLATES = ['catalog-app', 'social-app', 'collector-app'];

export function validateManifest(manifest: AppManifest): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!manifest.slug || !SLUG_PATTERN.test(manifest.slug)) {
    errors.push('slug must be kebab-case (e.g., bourbon-connoisseur)');
  }

  if (!manifest.displayName?.trim()) {
    errors.push('displayName is required');
  }

  if (!VALID_TEMPLATES.includes(manifest.template)) {
    errors.push(`template must be one of: ${VALID_TEMPLATES.join(', ')}`);
  }

  if (!manifest.tiers?.tier1?.length) {
    errors.push('tiers.tier1 must have at least one feature');
  }

  if (!manifest.category?.trim()) {
    errors.push('category is required');
  }

  return { valid: errors.length === 0, errors };
}
