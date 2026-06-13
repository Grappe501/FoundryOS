import type { FoundryArtifact } from '@foundry/artifact-engine';
import type { CollectionUpdate, MemoryUpdate, PassportUpdate, WelcomeBackThread, CuriosityWeight } from './types';

const WHEATED_SLUGS = ['weller', 'makers-mark', 'larceny', 'wheated'];
const BIB_SLUGS = ['bottled-in-bond', 'evan-williams-white', 'old-forester-1897', 'bib'];
const VALUE_SLUGS = ['wild-turkey-101', 'wild-turkey', 'buffalo-trace', 'evan-williams'];

function slugHay(slugs: string[]): string {
  return slugs.join(' ').toLowerCase();
}

function bottleSlugsFromArtifact(artifact: FoundryArtifact): string[] {
  const payload = artifact.metadata.payload ?? {};
  const fromPayload = [payload.left, payload.right, payload.bottle_slug, payload.bottle].filter(
    (s): s is string => typeof s === 'string',
  );
  const fromEntities = (artifact.metadata.entities ?? []).map((e) => e.slug);
  return [...fromPayload, ...fromEntities];
}

export function collectionUpdatesFromArtifact(artifact: FoundryArtifact): CollectionUpdate[] {
  const world = artifact.metadata.world_slug;
  const slugs = slugHay(bottleSlugsFromArtifact(artifact));
  const updates: CollectionUpdate[] = [];

  if (world !== 'bourbon') {
    if (artifact.type === 'workflow' || artifact.type === 'project') {
      updates.push({
        world_slug: world,
        action_type: 'portfolio_artifact_created',
        action_id: artifact.metadata.payload?.module_slug as string | undefined,
        label: artifact.metadata.title,
      });
    }
    return updates;
  }

  if (artifact.type === 'comparison') {
    if (BIB_SLUGS.some((s) => slugs.includes(s)) || slugs.includes('bottled-in-bond')) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_comparison',
        action_id: 'bottled-in-bond',
        collection_id: 'bottled-in-bond-collection',
        item_id: 'bib-compare',
        label: 'Compared BiB expressions from your artifact',
      });
    }
    if (WHEATED_SLUGS.some((s) => slugs.includes(s))) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_comparison',
        action_id: 'wheated',
        collection_id: 'wheated-explorer',
        item_id: 'wheated-compare',
        label: 'Compared wheated bottles',
      });
    }
    if (VALUE_SLUGS.some((s) => slugs.includes(s))) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_comparison',
        action_id: 'value-pour',
        collection_id: 'blind-tasting-detective',
        label: 'Value pour comparison logged',
      });
    }
  }

  if (artifact.type === 'review') {
    const entitySlug = (artifact.metadata.payload?.entity_slug as string) ?? slugs.split(' ')[0] ?? '';
    if (entitySlug.includes('wild-turkey-101') || artifact.metadata.title.toLowerCase().includes('wild turkey 101')) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_review',
        action_id: 'wild-turkey-101',
        collection_id: 'blind-tasting-detective',
        item_id: 'first-review',
        label: 'Structured review — Wild Turkey 101',
      });
    }
    if (VALUE_SLUGS.some((s) => entitySlug.includes(s) || slugs.includes(s))) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_review',
        action_id: 'value-pour',
        collection_id: 'blind-tasting-detective',
        label: 'Value pour review logged',
      });
    }
  }

  if (artifact.type === 'recommendation') {
    const entitySlug = (artifact.metadata.payload?.entity_slug as string) ?? '';
    if (entitySlug.includes('wild-turkey-101') || artifact.metadata.title.toLowerCase().includes('wild turkey 101')) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_recommendation',
        action_id: 'wild-turkey-101',
        collection_id: 'blind-tasting-detective',
        item_id: 'first-recommendation',
        label: 'Structured recommendation — Wild Turkey 101',
      });
    }
    if (VALUE_SLUGS.some((s) => entitySlug.includes(s))) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_recommendation',
        action_id: 'value-pour',
        collection_id: 'blind-tasting-detective',
        label: 'Value pour recommendation logged',
      });
    }
  }

  if (artifact.type === 'journal' || artifact.type === 'note' || artifact.type === 'collection_entry') {
    if (slugs.includes('wild-turkey-101') || artifact.metadata.title.toLowerCase().includes('wild turkey 101')) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_tasting',
        action_id: 'wild-turkey-101',
        collection_id: 'blind-tasting-detective',
        item_id: 'first-blind',
        label: 'First tasting logged — Wild Turkey 101',
      });
    }
    if (BIB_SLUGS.some((s) => slugs.includes(s))) {
      updates.push({
        world_slug: 'bourbon',
        action_type: 'artifact_tasting',
        action_id: 'bottled-in-bond',
        collection_id: 'bottled-in-bond-collection',
        item_id: 'bib-on-shelf',
        label: 'BiB bottle logged',
      });
    }
  }

  return updates;
}

export function collectionUpdatesFromGraphView(world_slug: string, slug: string): CollectionUpdate[] {
  if (world_slug !== 'bourbon') return [];
  if (slug.includes('bottled-in-bond') || slug === 'bib') {
    return [{
      world_slug: 'bourbon',
      action_type: 'graph_viewed',
      action_id: 'bottled-in-bond',
      collection_id: 'bottled-in-bond-collection',
      item_id: 'bib-label-read',
      label: 'Explored Bottled-in-Bond hallway',
    }];
  }
  if (slug.includes('buffalo-trace') || slug.includes('distillery')) {
    return [{
      world_slug: 'bourbon',
      action_type: 'graph_viewed',
      action_id: 'buffalo-trace',
      collection_id: 'distillery-pilgrim',
      item_id: 'campus-buffalo',
      label: 'Explored distillery graph',
    }];
  }
  return [];
}

export function memoryFromEvent(input: {
  world_slug: string;
  at: string;
  category: MemoryUpdate['category'];
  key: string;
  text: string;
  href?: string;
}): MemoryUpdate {
  return {
    world_slug: input.world_slug,
    category: input.category,
    memory_key: input.key,
    text: input.text,
    href: input.href,
    at: input.at,
  };
}

export function welcomeThreadFromMemory(m: MemoryUpdate, kind: WelcomeBackThread['kind']): WelcomeBackThread {
  return { id: `sync-${m.memory_key}`, text: m.text, href: m.href, kind };
}

export function passportFromArtifact(artifact: FoundryArtifact): PassportUpdate {
  return {
    kind: 'artifact_highlight',
    world_slug: artifact.metadata.world_slug,
    title: artifact.metadata.title,
    story: artifact.metadata.summary ?? 'Evidence you left in this world.',
    href: `/${artifact.metadata.world_slug}/portfolio`,
  };
}

export function passportFromCollection(
  world_slug: string,
  collectionTitle: string,
  itemLabel?: string,
): PassportUpdate {
  return {
    kind: 'collection_milestone',
    world_slug,
    title: itemLabel ? `${collectionTitle}: ${itemLabel}` : collectionTitle,
    story: 'Collection progress — identity compounding.',
    href: `/${world_slug}/portfolio`,
  };
}

export function curiosityFromGraph(world_slug: string, slug: string): CuriosityWeight[] {
  const weights: CuriosityWeight[] = [];
  if (slug.includes('bottled-in-bond')) {
    weights.push({ world_slug, topic_slug: 'bottled-in-bond', delta: 2, source: 'graph_viewed' });
    weights.push({ world_slug, topic_slug: 'value-bourbon', delta: 1, source: 'graph_viewed' });
  }
  if (slug.includes('wild-turkey') || slug.includes('101')) {
    weights.push({ world_slug, topic_slug: 'value-bourbon', delta: 2, source: 'graph_viewed' });
  }
  if (slug.includes('wheated') || slug.includes('weller')) {
    weights.push({ world_slug, topic_slug: 'wheated', delta: 2, source: 'graph_viewed' });
  }
  return weights;
}

export function curiosityFromComparison(world_slug: string, slug_a: string, slug_b: string): CuriosityWeight[] {
  return curiosityFromGraph(world_slug, `${slug_a}-${slug_b}`);
}

export function identitySignalsFromUpdates(
  world_slug: string,
  artifact?: FoundryArtifact,
  collectionLabels?: string[],
): import('./types').IdentitySignal[] {
  const signals: import('./types').IdentitySignal[] = [];
  if (artifact) {
    signals.push({
      world_slug,
      signal: `Created ${artifact.type.replace('_', ' ')}: ${artifact.metadata.title}`,
      topic: artifact.metadata.topics?.[0],
    });
  }
  for (const label of collectionLabels ?? []) {
    signals.push({ world_slug, signal: `Collection advanced: ${label}`, topic: 'collections' });
  }
  return signals;
}
