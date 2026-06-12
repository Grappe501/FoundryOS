import type { EntityGraphView, GraphConnection } from '@foundry/atlas-graph-engine';
import { BOTTLE_COMPARISON_SETS, getBottleRecord } from '@foundry/bourbon-intelligence';
import { getBottle } from '../bourbon-level-1/bottles';

export type WanderItem = {
  title: string;
  href: string;
  teaser: string;
  confidence?: string;
};

export type WanderBlock = {
  id: string;
  title: string;
  intro: string;
  items: WanderItem[];
};

function itemFromConnection(c: GraphConnection): WanderItem {
  return {
    title: c.title,
    href: c.href.startsWith('/bourbon/graph') ? c.href : c.entity_type === 'bottle' ? `/bourbon/graph/${c.slug}` : c.href,
    teaser: c.teaser,
    confidence: c.confidence,
  };
}

function uniqueItems(items: WanderItem[]): WanderItem[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.href)) return false;
    seen.add(i.href);
    return true;
  });
}

export function buildWanderFooter(graph: EntityGraphView): {
  continueWandering: WanderBlock;
  relatedRabbitHoles: WanderBlock;
  peopleAlsoCompare: WanderBlock;
  whatThisUnlocks: WanderBlock;
} {
  const conns = graph.connections;

  const continueCandidates = conns.filter((c) =>
    ['Suggested next stop', 'Producer', 'Brand family', 'Atlas terms'].includes(c.group) ||
    c.relation === 'recommended_after',
  );
  const continueItems = uniqueItems([
    ...(graph.suggested_next ? [itemFromConnection(graph.suggested_next)] : []),
    ...continueCandidates.slice(0, 4).map(itemFromConnection),
  ]).slice(0, 3);

  const rabbitCandidates = conns.filter((c) =>
    ['Mysteries', 'Investigations', 'Debates', 'Eras & events', 'Compare'].includes(c.group) ||
    c.entity_type === 'mystery' ||
    c.entity_type === 'detective' ||
    c.entity_type === 'debate',
  );
  const rabbitItems = uniqueItems(rabbitCandidates.map(itemFromConnection)).slice(0, 4);

  const compareSlugs = graph.entity_type === 'bottle' ? BOTTLE_COMPARISON_SETS[graph.slug] ?? [] : [];
  const compareFromGraph = conns.filter((c) => c.group === 'Comparable bottles' || c.relation === 'competes_with');
  const compareItems = uniqueItems([
    ...compareFromGraph.map(itemFromConnection),
    ...compareSlugs.map((slug) => {
      const b = getBottle(slug);
      return {
        title: b?.name ?? slug,
        href: `/bourbon/compare?mode=bottles&a=${graph.slug}&b=${slug}`,
        teaser: `Side-by-side with ${graph.title} — isolate mash, proof, and house character without crowning a winner.`,
        confidence: 'editorial',
      };
    }),
  ]).slice(0, 4);

  const unlockCandidates = conns.filter((c) =>
    ['Artifacts', 'Collections', 'Missions', 'Artifacts (040A)'].includes(c.group) ||
    c.relation === 'unlocks' ||
    c.entity_type === 'collection' ||
    c.entity_type === 'artifact' ||
    c.entity_type === 'experience',
  );
  const unlockItems = uniqueItems(unlockCandidates.map(itemFromConnection));
  if (unlockItems.length < 2) {
    unlockItems.push(
      {
        title: 'Log a tasting note',
        href: '/bourbon/experiences/tasting-journal',
        teaser: 'Your pour becomes passport evidence — timestamped, immune to hype amnesia.',
        confidence: 'editorial',
      },
      {
        title: 'Starter shelf path',
        href: '/bourbon/portfolio',
        teaser: 'Collect owned, tasted, and wish-list bottles — the graph remembers what spreadsheets forget.',
        confidence: 'editorial',
      },
    );
  }

  const record = graph.entity_type === 'bottle' ? getBottleRecord(graph.slug) : null;
  const entityLabel = graph.title;

  return {
    continueWandering: {
      id: 'continue-wandering',
      title: 'Continue wandering',
      intro: `You entered ${entityLabel} — these doorways keep the hallway moving without dead-ending on one fact.`,
      items: continueItems.length >= 2 ? continueItems : uniqueItems(conns.slice(0, 3).map(itemFromConnection)),
    },
    relatedRabbitHoles: {
      id: 'related-rabbit-holes',
      title: 'Related rabbit holes',
      intro: 'Mysteries, debates, and detective cases connected to this node — the obsessive layer beneath the label.',
      items: rabbitItems.length >= 2 ? rabbitItems : uniqueItems(conns.filter((c) => c.entity_type === 'atlas_term').slice(0, 3).map(itemFromConnection)),
    },
    peopleAlsoCompare: {
      id: 'people-also-compare',
      title: 'People also compare',
      intro: record
        ? 'Comparison flights teach faster than solo ratings — chart proof and mash style side-by-side.'
        : 'Editorial pairings from the intelligence registry — not a scoreboard, a teaching flight.',
      items: compareItems.length >= 1 ? compareItems : [
        {
          title: 'Compare any two',
          href: `/bourbon/compare?mode=bottles&a=wild-turkey-101&b=buffalo-trace`,
          teaser: 'Wild Turkey 101 vs Buffalo Trace — the classic value rivalry flight.',
          confidence: 'editorial',
        },
      ],
    },
    whatThisUnlocks: {
      id: 'what-this-unlocks',
      title: 'What this unlocks',
      intro: 'Artifacts, collection paths, and missions — practice layer entries tied to this graph node.',
      items: uniqueItems(unlockItems).slice(0, 4),
    },
  };
}

export function validateWanderFooter(graph: EntityGraphView): { ok: boolean; errors: string[] } {
  const footer = buildWanderFooter(graph);
  const errors: string[] = [];
  for (const block of Object.values(footer)) {
    if (block.items.length === 0) errors.push(`${graph.slug}: ${block.title} has no items`);
  }
  return { ok: errors.length === 0, errors };
}
