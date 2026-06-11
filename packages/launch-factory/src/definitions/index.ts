import type { LaunchDefinition } from '../types';
import { AI_BUILDER_LAUNCH } from './ai-builder';
import { FINANCIAL_INDEPENDENCE_LAUNCH } from './financial-independence';

const LAUNCH_DEFINITIONS: Record<string, LaunchDefinition> = {
  [AI_BUILDER_LAUNCH.slug]: AI_BUILDER_LAUNCH,
  [FINANCIAL_INDEPENDENCE_LAUNCH.slug]: FINANCIAL_INDEPENDENCE_LAUNCH,
};

export function getLaunchDefinition(slug: string): LaunchDefinition | null {
  return LAUNCH_DEFINITIONS[slug] ?? null;
}

export function listLaunchDefinitions(): LaunchDefinition[] {
  return Object.values(LAUNCH_DEFINITIONS).sort((a, b) => a.launch_priority - b.launch_priority);
}

export { AI_BUILDER_LAUNCH } from './ai-builder';
export { FINANCIAL_INDEPENDENCE_LAUNCH } from './financial-independence';
