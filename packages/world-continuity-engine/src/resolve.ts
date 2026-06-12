import type {

  ContinuitySignalBundle,

  JourneyContinuitySnapshot,

  OpenThread,

  WorldContinuitySnapshot,

} from './types';

import { resolveAnticipation } from './anticipation';

import { resolveMemoryObjects } from './memory-objects';



function narrativeFromAtlas(views: ContinuitySignalBundle['atlas_views'], bundle: ContinuitySignalBundle): string | undefined {

  const titles = views.slice(0, 4).map((v) => v.title.toLowerCase());

  const text = titles.join(' ');



  if (text.includes('weller') || text.includes('wheated')) {

    const openMystery = bundle.open_detective_cases.find((c) => c.slug === 'weller-ghost');

    if (openMystery) {

      return 'You were investigating whether Weller\'s reputation is deserved or manufactured — and you explored the allocation system but never finished the Stitzel-Weller mystery.';

    }

    return 'You were investigating whether Weller\'s reputation is deserved or manufactured.';

  }

  if (text.includes('obsv') || text.includes('oesk') || text.includes('four roses')) {

    return 'You were comparing Four Roses recipes and trying to understand why OBSV tastes different from OESK.';

  }

  if (text.includes('rickhouse') || text.includes('warehouse')) {

    return 'You were tracing how rickhouse position and angel\'s share shape what ends up in the bottle.';

  }

  if (text.includes('allocation') || text.includes('secondary')) {

    return 'You were trying to separate allocation hype from what is actually worth hunting.';

  }

  return undefined;

}



function buildContext(bundle: ContinuitySignalBundle): string {

  if (bundle.last_context?.text) {

    const t = bundle.last_context.text;

    if (t.startsWith('You were ')) return t;

    return `You were ${t.replace(/\.$/, '')}.`;

  }



  const atlas = narrativeFromAtlas(bundle.atlas_views, bundle);

  if (atlas) return atlas;



  if (bundle.intent?.text && !bundle.intent.text.includes('bookmark')) {

    return bundle.intent.text;

  }



  if (bundle.latest_unlock_label) {

    return `You closed ${bundle.latest_unlock_label} — and the world shifted around that evidence.`;

  }



  if (bundle.last_mission_title) {

    return `You were deep in ${bundle.last_mission_title} — not browsing, actually doing the work.`;

  }



  const openCase = bundle.open_detective_cases[0];

  if (openCase) {

    return `You left ${openCase.title} open — the evidence is still waiting for a verdict.`;

  }



  return 'You were getting your bearings — the world was starting to feel real.';

}



function buildIntent(bundle: ContinuitySignalBundle): string | undefined {

  if (bundle.intent?.text) return bundle.intent.text;



  const saved = bundle.events_saved

    .filter((id) => !bundle.events_completed.includes(id))

    .map((id) => bundle.event_titles[id]?.title)

    .filter(Boolean);



  if (saved.length >= 2) {

    return `You were deciding between ${saved.slice(0, 2).join(' and ')} — neither thread has a conclusion yet.`;

  }

  if (saved.length === 1) {

    return `You bookmarked ${saved[0]} but never finished it.`;

  }

  return undefined;

}



function buildActiveMemory(bundle: ContinuitySignalBundle): OpenThread[] {

  const threads: OpenThread[] = [...bundle.open_thread_ids];



  for (const id of bundle.events_saved) {

    if (bundle.events_completed.includes(id)) continue;

    const meta = bundle.event_titles[id];

    if (meta && !threads.some((t) => t.id === id)) {

      threads.push({ id, kind: 'bookmark', label: meta.title, href: meta.href });

    }

  }



  for (const c of bundle.open_detective_cases) {

    if (!threads.some((t) => t.id === c.slug)) {

      threads.push({ id: c.slug, kind: 'detective', label: c.title, href: c.href });

    }

  }



  for (const col of bundle.unfinished_collections) {

    threads.push({

      id: `col-${col.collection_id}`,

      kind: 'collection',

      label: `${col.title} — ${col.remaining_label}`,

      href: col.href ?? `/${bundle.world_slug}/portfolio`,

    });

  }



  for (const view of bundle.atlas_views.slice(0, 3)) {

    const id = `atlas-${view.term_slug}`;

    if (!threads.some((t) => t.id === id)) {

      threads.push({

        id,

        kind: 'atlas',

        label: `${view.title} — thread still open`,

        href: `/${bundle.world_slug}/atlas/${view.term_slug}`,

      });

    }

  }



  return threads.slice(0, 8);

}



function buildContinue(

  bundle: ContinuitySignalBundle,

  active: OpenThread[],

  anticipation?: ReturnType<typeof resolveAnticipation>,

): WorldContinuitySnapshot['continue'] {

  if (anticipation) {

    return {

      label: anticipation.label,

      href: anticipation.href,

      reason: anticipation.suggestion,

    };

  }

  if (active.length > 0) {

    const t = active[0]!;

    return {

      label: t.label,

      href: t.href,

      reason: 'Unfinished stories pull harder than new tabs.',

    };

  }

  return {

    label: 'See what is alive today',

    href: `/${bundle.world_slug}/today`,

    reason: 'The world moved while you were away.',

  };

}



function buildSinceThen(bundle: ContinuitySignalBundle): string[] {

  const lines: string[] = [];



  if (bundle.world_changed_hint) lines.push(`A new debate opened in ${bundle.world_name}.`);

  lines.push(`${bundle.mentor_name} has a question waiting for you.`);



  const near = bundle.unfinished_collections.find((c) => c.remaining_label.includes('1 '));

  if (near) {

    lines.push(`${near.title} is one discovery from completion.`);

  } else if (bundle.latest_unlock_label) {

    lines.push(`That unlocked ${bundle.latest_unlock_label}.`);

  }



  if (lines.length < 2 && bundle.world_changed_hint) {

    lines.push(bundle.world_changed_hint);

  }



  return lines.slice(0, 4);

}



function buildNarrative(context: string, intent?: string, active?: OpenThread[]): string {

  let block = `Last time you were here…\n\n${context}`;

  if (intent) block += `\n\n${intent}`;

  if (active && active.length > 0) {

    block += `\n\nYou left threads open:\n${active.slice(0, 3).map((t) => `• ${t.label}`).join('\n')}`;

  }

  return block;

}



export function resolveWorldContinuity(bundle: ContinuitySignalBundle): WorldContinuitySnapshot {

  const context = buildContext(bundle);

  const intent = buildIntent(bundle);

  const active_memory = buildActiveMemory(bundle);

  const story_memory = resolveMemoryObjects(

    bundle.world_slug,

    bundle.unlocked_memory_ids,

    bundle.memory_unlock_times,

  );

  const anticipation = resolveAnticipation(bundle);

  const narrative = buildNarrative(context, intent, active_memory);

  const since_then = buildSinceThen(bundle);



  if (anticipation) {

    since_then.unshift(anticipation.suggestion);

  }



  return {

    world_slug: bundle.world_slug,

    world_name: bundle.world_name,

    headline: 'Continue where you left off?',

    narrative,

    last_time: narrative,

    context,

    intent,

    active_memory,

    open_threads: active_memory,

    unfinished_collections: bundle.unfinished_collections,

    story_memory,

    memory_objects: story_memory,

    anticipation,

    continue: buildContinue(bundle, active_memory, anticipation),

    since_then: [...new Set(since_then)].slice(0, 4),

  };

}



export function resolveJourneyContinuity(bundles: ContinuitySignalBundle[]): JourneyContinuitySnapshot {

  const active = bundles.filter(

    (b) =>

      b.missions_completed > 0 ||

      b.atlas_views.length > 0 ||

      b.events_saved.length > 0 ||

      b.latest_unlock_label ||

      b.open_detective_cases.length > 0 ||

      b.unfinished_collections.length > 0,

  );



  const snapshots = active.map(resolveWorldContinuity);

  const allActive = snapshots.flatMap((s) => s.active_memory).slice(0, 8);

  const story_memory = snapshots.flatMap((s) => s.story_memory).slice(0, 6);

  const topAnticipation = snapshots.find((s) => s.anticipation)?.anticipation;



  const last_time_you_were = snapshots.slice(0, 3).map((s) => ({

    world_name: s.world_name,

    summary: s.context.replace(/^You were /, '').replace(/\.$/, ''),

    href: `/${s.world_slug}`,

  }));



  const since_then = [...new Set(snapshots.flatMap((s) => s.since_then))].slice(0, 5);



  return {

    headline: 'Your Story Continues',

    intro:

      active.length === 0

        ? 'Continuity starts when you leave evidence — a mission, a saved rabbit hole, or a mystery you cannot let go.'

        : 'Stories, unfinished business, and anticipation — not a resume of clicks. The worlds kept moving.',

    last_time_you_were,

    active_memory: allActive,

    open_threads: allActive,

    since_then,

    story_memory,

    memory_highlights: story_memory,

    anticipation: topAnticipation,

    continue_label: 'Continue your journey',

  };

}



export function validateContinuityWorlds(): { ok: boolean; errors: string[] } {

  return { ok: true, errors: [] };

}

