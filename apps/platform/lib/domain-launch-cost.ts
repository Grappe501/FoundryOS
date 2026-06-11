/** Cost to launch a domain — most important operational KPI (PASS-024+) */

import factoryManifest from './generated/world-factory-manifest.json';

export type LaunchCostEntry = {
  slug: string;
  displayName: string;
  trinity: 'life-leverage' | 'passion';
  buildMethod: 'hand_built' | 'mostly_generated' | 'heavily_generated' | 'almost_entirely_generated' | 'planned';
  hoursActual: number | null;
  hoursTarget: number | null;
  automationPct: number;
  consumerLive: boolean;
  completedPass?: string;
};

/** Tracked every pass. Update hours when a domain closes. */
export const DOMAIN_LAUNCH_COST_REGISTRY: LaunchCostEntry[] = [
  {
    slug: 'ai-builder',
    displayName: 'AI Builder',
    trinity: 'life-leverage',
    buildMethod: 'hand_built',
    hoursActual: 40,
    hoursTarget: null,
    automationPct: 83,
    consumerLive: true,
    completedPass: 'PASS-017',
  },
  {
    slug: 'financial-independence',
    displayName: 'Financial Independence',
    trinity: 'life-leverage',
    buildMethod: 'hand_built',
    hoursActual: 30,
    hoursTarget: null,
    automationPct: 83,
    consumerLive: true,
    completedPass: 'PASS-018',
  },
  {
    slug: 'public-speaking',
    displayName: 'Public Speaking',
    trinity: 'life-leverage',
    buildMethod: 'hand_built',
    hoursActual: 28,
    hoursTarget: null,
    automationPct: 78,
    consumerLive: true,
    completedPass: 'PASS-019',
  },
  {
    slug: 'civic-engagement',
    displayName: 'Civic Engagement',
    trinity: 'life-leverage',
    buildMethod: 'heavily_generated',
    hoursActual: 1,
    hoursTarget: 1,
    automationPct: 100,
    consumerLive: true,
    completedPass: 'PASS-024',
  },
  {
    slug: 'bourbon',
    displayName: 'Bourbon',
    trinity: 'passion',
    buildMethod: 'almost_entirely_generated',
    hoursActual: 1,
    hoursTarget: 1,
    automationPct: 100,
    consumerLive: true,
    completedPass: 'PASS-024',
  },
  {
    slug: 'bbq',
    displayName: 'BBQ',
    trinity: 'passion',
    buildMethod: 'almost_entirely_generated',
    hoursActual: 1,
    hoursTarget: 1,
    automationPct: 100,
    consumerLive: true,
    completedPass: 'PASS-024',
  },
  {
    slug: 'poker',
    displayName: 'Poker',
    trinity: 'passion',
    buildMethod: 'almost_entirely_generated',
    hoursActual: 1,
    hoursTarget: 1,
    automationPct: 100,
    consumerLive: true,
    completedPass: 'PASS-024',
  },
];

export const FACTORY_LAUNCH_COST_TARGET_HOURS = 1;

export const BUILD_METHOD_CURVE = [
  { domain: 1, method: 'hand_built', label: 'Domain #1 = hand built' },
  { domain: 2, method: 'mostly_generated', label: 'Domain #2 = mostly generated' },
  { domain: 3, method: 'heavily_generated', label: 'Domain #3 = heavily generated' },
  { domain: 10, method: 'almost_entirely_generated', label: 'Domain #10 = almost entirely generated' },
] as const;

export function getDomainLaunchCost(slug: string): LaunchCostEntry | undefined {
  return DOMAIN_LAUNCH_COST_REGISTRY.find((e) => e.slug === slug);
}

export function getLaunchCostSnapshot() {
  const completed = DOMAIN_LAUNCH_COST_REGISTRY.filter((e) => e.hoursActual != null);
  const factoryGenerated = DOMAIN_LAUNCH_COST_REGISTRY.filter((e) =>
    ['heavily_generated', 'almost_entirely_generated'].includes(e.buildMethod),
  );
  const avgHoursCompleted =
    completed.length > 0
      ? Math.round(completed.reduce((s, e) => s + (e.hoursActual ?? 0), 0) / completed.length)
      : null;
  const avgFactoryHours =
    factoryGenerated.length > 0
      ? Math.round(
          (factoryGenerated.reduce((s, e) => s + (e.hoursActual ?? 0), 0) / factoryGenerated.length) * 10,
        ) / 10
      : null;
  const avgAutomation = Math.round(
    DOMAIN_LAUNCH_COST_REGISTRY.reduce((s, e) => s + e.automationPct, 0) /
      DOMAIN_LAUNCH_COST_REGISTRY.length,
  );
  const nextTarget = DOMAIN_LAUNCH_COST_REGISTRY.find((e) => !e.consumerLive)?.hoursTarget ?? FACTORY_LAUNCH_COST_TARGET_HOURS;
  const domainsGenerated = factoryManifest.domains?.length ?? 0;
  const domainsActivated = DOMAIN_LAUNCH_COST_REGISTRY.filter((e) => e.consumerLive).length;

  return {
    avg_hours_completed: avgHoursCompleted,
    avg_factory_hours: avgFactoryHours,
    factory_target_hours: FACTORY_LAUNCH_COST_TARGET_HOURS,
    next_domain_target_hours: nextTarget,
    avg_automation_pct: avgAutomation,
    factory_automation_target_pct: 80,
    domains_generated: domainsGenerated,
    domains_activated: domainsActivated,
    entries: DOMAIN_LAUNCH_COST_REGISTRY,
  };
}
