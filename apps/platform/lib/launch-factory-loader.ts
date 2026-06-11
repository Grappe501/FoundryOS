import launchRegistry from '../../../marketing/launches/registry.json';
import {
  computeLaunchVelocity,
  DOMAIN_LAUNCH_VELOCITY_TARGET_MATURE_DAYS,
  DOMAIN_LAUNCH_VELOCITY_TARGET_Q4_DAYS,
  PASS_015B_COMMAND,
  PASS_015B_PASS_GATE,
  PASS_015B_TITLE,
  VALIDATION_MILESTONES,
  type LaunchRegistryEntry,
} from '@foundry/launch-factory';

export function getLaunchRegistryEntries(): LaunchRegistryEntry[] {
  return (launchRegistry as { launches: LaunchRegistryEntry[] }).launches ?? [];
}

export function getLaunchVelocitySnapshot() {
  const entries = getLaunchRegistryEntries();
  const velocity = computeLaunchVelocity(entries);
  return {
    ...velocity,
    target_q4_days: DOMAIN_LAUNCH_VELOCITY_TARGET_Q4_DAYS,
    target_mature_days: DOMAIN_LAUNCH_VELOCITY_TARGET_MATURE_DAYS,
    entries,
  };
}

export {
  PASS_015B_TITLE,
  PASS_015B_PASS_GATE,
  PASS_015B_COMMAND,
  VALIDATION_MILESTONES,
};
