import type { AnticipationMemory, ContinuitySignalBundle } from './types';

type AnticipationRule = {
  match: (views: string[], bundle: ContinuitySignalBundle) => boolean;
  build: (bundle: ContinuitySignalBundle) => AnticipationMemory;
};

const BOURBON_RULES: AnticipationRule[] = [
  {
    match: (v) => v.some((t) => t.includes('four roses') || t.includes('obsv') || t.includes('oesk') || t.includes('recipe')),
    build: () => ({
      curiosity: 'You spent time comparing Four Roses recipes.',
      suggestion: 'Most people who go this deep eventually investigate yeast strains — that is where OBSV and OESK actually diverge.',
      label: 'Follow the yeast thread',
      href: '/bourbon/atlas/yeast-strain',
    }),
  },
  {
    match: (v, b) =>
      v.some((t) => t.includes('weller') || t.includes('wheated')) ||
      b.open_detective_cases.some((c) => c.slug === 'weller-ghost'),
    build: (b) => ({
      curiosity: 'You were circling wheated bourbon and allocation lore.',
      suggestion: b.open_detective_cases.some((c) => c.slug === 'weller-ghost')
        ? 'The Stitzel-Weller mystery is still open — that is where reputation meets evidence.'
        : 'Most curiosity at this depth leads to the Weller allocation debate.',
      label: b.open_detective_cases.some((c) => c.slug === 'weller-ghost') ? 'Open the Weller mystery' : 'Explore allocation lore',
      href: b.open_detective_cases.some((c) => c.slug === 'weller-ghost')
        ? '/bourbon/detective/weller-ghost'
        : '/bourbon/atlas/allocation',
    }),
  },
  {
    match: (v) => v.some((t) => t.includes('rickhouse') || t.includes('warehouse') || t.includes('barrel')),
    build: () => ({
      curiosity: 'You were thinking about how barrels breathe in rickhouses.',
      suggestion: 'Warehouse position, angel\'s share, and the Stitzel-Weller mystery connect here — aging is never just time.',
      label: 'Connect barrel to mystery',
      href: '/bourbon/detective/weller-ghost',
    }),
  },
  {
    match: (v) => v.some((t) => t.includes('mash') || t.includes('rye') || t.includes('wheat')),
    build: () => ({
      curiosity: 'You were tracing mash bills and grain choices.',
      suggestion: 'The Wheated Explorer collection turns grain curiosity into evidence on your shelf.',
      label: 'Start Wheated Explorer',
      href: '/bourbon/portfolio',
    }),
  },
];

const GENERIC_RULES: Record<string, AnticipationRule[]> = {
  'ai-builder': [
    {
      match: () => true,
      build: (b) => ({
        curiosity: b.last_mission_title ? `You were building toward ${b.last_mission_title}.` : 'You were sketching your first automation.',
        suggestion: 'Most builders who pause here come back to ship one boring task end-to-end.',
        label: 'Return to the builder lab',
        href: '/ai-builder',
      }),
    },
  ],
  'public-speaking': [
    {
      match: () => true,
      build: () => ({
        curiosity: 'You were working on finding your voice in the room.',
        suggestion: 'People who return usually record one rough take — perfection is not the goal.',
        label: 'Continue your talk',
        href: '/public-speaking',
      }),
    },
  ],
};

export function resolveAnticipation(bundle: ContinuitySignalBundle): AnticipationMemory | undefined {
  const viewText = bundle.atlas_views.map((v) => `${v.title} ${v.term_slug}`.toLowerCase());
  const rules = bundle.world_slug === 'bourbon' ? BOURBON_RULES : GENERIC_RULES[bundle.world_slug] ?? [];

  for (const rule of rules) {
    if (rule.match(viewText, bundle)) return rule.build(bundle);
  }

  const near = bundle.unfinished_collections.find((c) => c.remaining_label.includes('1 '));
  if (near) {
    return {
      curiosity: `You were close to finishing ${near.title}.`,
      suggestion: 'One more discovery closes the loop — collections feel better complete than almost.',
      label: `Complete ${near.title}`,
      href: near.href ?? `/${bundle.world_slug}/portfolio`,
    };
  }

  if (bundle.open_detective_cases.length > 0) {
    const c = bundle.open_detective_cases[0]!;
    return {
      curiosity: 'An investigation is still open.',
      suggestion: `${c.title} does not resolve itself — the world is waiting for your verdict.`,
      label: c.title,
      href: c.href,
    };
  }

  return undefined;
}
