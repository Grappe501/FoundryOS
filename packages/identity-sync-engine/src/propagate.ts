import type { IdentitySyncContext, IdentitySyncEvent, IdentitySyncResult } from './types';
import {
  collectionUpdatesFromArtifact,
  collectionUpdatesFromGraphView,
  curiosityFromComparison,
  curiosityFromGraph,
  identitySignalsFromUpdates,
  memoryFromEvent,
  passportFromArtifact,
  passportFromCollection,
  welcomeThreadFromMemory,
} from './rules';

/** Single entry — artifact → collection → identity → memory → welcome-back → passport */
export function propagateIdentityEvent(
  event: IdentitySyncEvent,
  _context?: IdentitySyncContext,
): IdentitySyncResult {
  const result: IdentitySyncResult = {
    event_type: event.type,
    world_slug: event.world_slug,
    collection_updates: [],
    identity_signals: [],
    memory_updates: [],
    passport_updates: [],
    welcome_back_threads: [],
    curiosity_weights: [],
  };

  switch (event.type) {
    case 'artifact_created': {
      const { artifact, at, world_slug } = event;
      result.collection_updates = collectionUpdatesFromArtifact(artifact);
      result.passport_updates.push(passportFromArtifact(artifact));

      const mem = memoryFromEvent({
        world_slug,
        at,
        category: 'story',
        key: `artifact-${artifact.id}`,
        text:
          artifact.type === 'comparison'
            ? `You compared ${artifact.metadata.title.replace(' vs ', ' and ')}.`
            : artifact.type === 'review'
              ? `You reviewed ${artifact.metadata.title} — ${String(artifact.metadata.payload?.what_surprised_me ?? 'evidence logged')}.`
              : artifact.type === 'recommendation'
                ? `You recommended ${artifact.metadata.title} — ${String(artifact.metadata.payload?.recommendation_reason ?? 'judgment logged')}.`
                : `You created ${artifact.metadata.title}.`,
        href: artifact.type === 'comparison' ? '/bourbon/compare' : `/${world_slug}/portfolio`,
      });
      result.memory_updates.push(mem);
      result.welcome_back_threads.push(welcomeThreadFromMemory(mem, 'artifact'));

      for (const u of result.collection_updates) {
        result.passport_updates.push(
          passportFromCollection(world_slug, u.collection_id ?? 'collection', u.label),
        );
        if (u.label) {
          const colMem = memoryFromEvent({
            world_slug,
            at,
            category: 'active',
            key: `col-${u.collection_id}-${u.item_id ?? 'progress'}`,
            text: u.label.endsWith('.') ? u.label : `${u.label}.`,
            href: u.collection_id ? `/${world_slug}/portfolio` : undefined,
          });
          result.memory_updates.push(colMem);
        }
      }

      result.identity_signals = identitySignalsFromUpdates(
        world_slug,
        artifact,
        result.collection_updates.map((u) => u.label).filter(Boolean) as string[],
      );
      if (artifact.type === 'comparison') {
        const payload = artifact.metadata.payload ?? {};
        const a = String(payload.left ?? '');
        const b = String(payload.right ?? '');
        if (a && b) result.curiosity_weights.push(...curiosityFromComparison(world_slug, a, b));
      }
      break;
    }

    case 'graph_viewed': {
      result.collection_updates = collectionUpdatesFromGraphView(event.world_slug, event.slug);
      const mem = memoryFromEvent({
        world_slug: event.world_slug,
        at: event.at,
        category: 'active',
        key: `graph-${event.slug}`,
        text: `You were exploring ${event.title.replace(/\s+hallway$/i, '')}.`,
        href: event.world_slug === 'bourbon' ? `/bourbon/graph/${event.slug}` : `/${event.world_slug}/graph/${event.slug}`,
      });
      result.memory_updates.push(mem);
      result.welcome_back_threads.push(welcomeThreadFromMemory(mem, 'exploration'));
      result.curiosity_weights = curiosityFromGraph(event.world_slug, event.slug);
      result.identity_signals = identitySignalsFromUpdates(
        event.world_slug,
        undefined,
        result.collection_updates.map((u) => u.label).filter(Boolean) as string[],
      );
      break;
    }

    case 'rabbit_hole_saved': {
      const mem = memoryFromEvent({
        world_slug: event.world_slug,
        at: event.at,
        category: 'anticipation',
        key: `rabbit-${event.slug}`,
        text: 'You saved a rabbit hole.',
        href: event.world_slug === 'bourbon' ? `/bourbon/graph/${event.slug}` : `/${event.world_slug}/graph/${event.slug}`,
      });
      result.memory_updates.push(mem);
      result.welcome_back_threads.push(welcomeThreadFromMemory(mem, 'rabbit_hole'));
      result.identity_signals.push({ world_slug: event.world_slug, signal: 'Saved a rabbit hole for later', topic: 'curiosity' });
      result.curiosity_weights = curiosityFromGraph(event.world_slug, event.slug);
      break;
    }

    case 'comparison_saved': {
      result.collection_updates.push({
        world_slug: event.world_slug,
        action_type: 'artifact_comparison',
        action_id: `${event.slug_a}-${event.slug_b}`,
        collection_id: event.slug_a.includes('wild-turkey') ? 'blind-tasting-detective' : 'bottled-in-bond-collection',
        label: `You compared ${event.label_a} and ${event.label_b}.`,
      });
      const mem = memoryFromEvent({
        world_slug: event.world_slug,
        at: event.at,
        category: 'active',
        key: `compare-${event.slug_a}-${event.slug_b}`,
        text: event.label_a.toLowerCase().includes('wild turkey 101')
          ? `You compared ${event.label_a}.`
          : `You compared ${event.label_a} and ${event.label_b}.`,
        href: `/bourbon/compare?a=${event.slug_a}&b=${event.slug_b}`,
      });
      result.memory_updates.push(mem);
      result.welcome_back_threads.push(welcomeThreadFromMemory(mem, 'comparison'));
      result.curiosity_weights = curiosityFromComparison(event.world_slug, event.slug_a, event.slug_b);
      result.identity_signals.push({
        world_slug: event.world_slug,
        signal: `Comparison: ${event.label_a} vs ${event.label_b}`,
        topic: 'value-bourbon',
      });
      break;
    }

    case 'collection_advanced': {
      const mem = memoryFromEvent({
        world_slug: event.world_slug,
        at: event.at,
        category: 'story',
        key: `col-adv-${event.collection_id}`,
        text: event.label ?? `Progress on ${event.collection_id.replace(/-/g, ' ')}.`,
        href: `/${event.world_slug}/portfolio`,
      });
      result.memory_updates.push(mem);
      result.passport_updates.push(passportFromCollection(event.world_slug, event.collection_id, event.label));
      result.identity_signals.push({ world_slug: event.world_slug, signal: mem.text, topic: 'collections' });
      break;
    }

    case 'mission_completed': {
      result.collection_updates.push({
        world_slug: event.world_slug,
        action_type: 'mission_completed',
        action_id: event.mission_slug,
        label: event.mission_title,
      });
      result.memory_updates.push(
        memoryFromEvent({
          world_slug: event.world_slug,
          at: event.at,
          category: 'story',
          key: `mission-${event.mission_slug}`,
          text: `You completed ${event.mission_title}.`,
          href: `/${event.world_slug}/portfolio`,
        }),
      );
      result.identity_signals.push({ world_slug: event.world_slug, signal: event.mission_title, topic: 'mastery' });
      break;
    }

    case 'event_completed': {
      result.collection_updates.push({
        world_slug: event.world_slug,
        action_type: 'event_challenge_completed',
        action_id: event.event_id,
      });
      result.memory_updates.push(
        memoryFromEvent({
          world_slug: event.world_slug,
          at: event.at,
          category: 'story',
          key: `event-${event.event_id}`,
          text: event.event_title ? `You finished ${event.event_title}.` : 'You closed a weekly challenge.',
        }),
      );
      break;
    }
  }

  return result;
}

export function validateIdentitySyncEngine(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const now = new Date().toISOString();

  const graph = propagateIdentityEvent({
    type: 'graph_viewed',
    world_slug: 'bourbon',
    at: now,
    slug: 'bottled-in-bond',
    title: 'Bottled-in-Bond',
  });
  if (graph.collection_updates.length === 0) errors.push('graph_viewed must advance collection');
  if (graph.welcome_back_threads.length === 0) errors.push('graph_viewed must produce welcome thread');

  const compare = propagateIdentityEvent({
    type: 'comparison_saved',
    world_slug: 'bourbon',
    at: now,
    slug_a: 'wild-turkey-101',
    slug_b: 'buffalo-trace',
    label_a: 'Wild Turkey 101',
    label_b: 'Buffalo Trace',
  });
  if (!compare.welcome_back_threads.some((t) => t.text.includes('Wild Turkey 101'))) {
    errors.push('comparison must reference WT101 in welcome thread');
  }

  const artifact = propagateIdentityEvent({
    type: 'artifact_created',
    world_slug: 'bourbon',
    at: now,
    artifact: {
      id: 'art_test',
      type: 'journal',
      user_id: 'u',
      metadata: {
        world_slug: 'bourbon',
        title: 'Wild Turkey 101 tasting notes',
        occurred_at: now,
        privacy: 'private',
        evidence: 'self_reported',
        payload: { bottle_slug: 'wild-turkey-101' },
        entities: [{ world_slug: 'bourbon', entity_type: 'bottle', slug: 'wild-turkey-101', title: 'Wild Turkey 101' }],
      },
      relations: [],
      created_at: now,
      updated_at: now,
    },
  });
  if (artifact.collection_updates.length === 0) errors.push('WT101 tasting artifact must advance collection');
  if (artifact.passport_updates.length === 0) errors.push('artifact must update passport');

  return { ok: errors.length === 0, errors };
}
