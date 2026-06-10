/**
 * @foundry/self-build
 *
 * AI module that generates new FoundryOS apps from templates.
 * Every pattern in the platform must be replicable by this module.
 */

export { generateApp } from './engine/generate';
export { validateManifest } from './validators/manifest';
export type { AppManifest, TemplateType } from './types';
