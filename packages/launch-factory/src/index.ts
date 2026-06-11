export type {
  LaunchDefinition,
  LaunchManifest,
  LaunchRegistryEntry,
  LaunchSeoPage,
  LaunchGrowthPlan,
} from './types';

export {
  PASS_015B_TITLE,
  PASS_015B_PASS_GATE,
  PASS_015B_COMMAND,
  DOMAIN_LAUNCH_VELOCITY_TARGET_Q4_DAYS,
  DOMAIN_LAUNCH_VELOCITY_TARGET_MATURE_DAYS,
  VALIDATION_MILESTONES,
} from './types';

export { AI_BUILDER_LAUNCH, getLaunchDefinition, listLaunchDefinitions } from './definitions/ai-builder';

export {
  manufactureLaunch,
  getLaunchRegistry,
  computeLaunchVelocity,
  type ManufactureLaunchResult,
} from './manufacture';
