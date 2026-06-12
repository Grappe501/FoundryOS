import type { LivingMediaFeed, LivingMediaItem, WorldLoreBundle } from './types';
import { LIVING_MEDIA_VOICE } from './voice';
import { getWorldLore } from './registry';

function dateKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(arr: T[], seed: string): T {
  if (arr.length === 0) throw new Error('empty pool');
  return arr[hash(seed) % arr.length];
}

function monthDay(d: Date): string {
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** PASS-034I — Rotating daily feed per world (destination, not curriculum) */
export function getLivingMediaFeed(worldSlug: string, d = new Date()): LivingMediaFeed | null {
  const lore = getWorldLore(worldSlug);
  if (!lore) return null;

  const key = dateKey(d);
  const seed = `${worldSlug}:${key}`;
  const items: LivingMediaItem[] = [];

  if (lore.mysteries.length > 0) {
    const m = pick(lore.mysteries, seed + ':mystery');
    items.push({
      id: `mystery-${m.id}`,
      kind: 'mystery',
      title: LIVING_MEDIA_VOICE.mystery,
      body: `${m.question} — ${m.tease}`,
      href: m.rabbitHoleHref ?? `/${worldSlug}/lore#lore-mysteries`,
      cta: 'Investigate',
    });
  }

  const debates = lore.debates ?? [];
  if (debates.length > 0) {
    const db = pick(debates, seed + ':debate');
    items.push({
      id: `debate-${db.id}`,
      kind: 'debate',
      title: LIVING_MEDIA_VOICE.debate,
      body: db.title,
      href: db.href ?? `/${worldSlug}/lore#lore-debates`,
      cta: 'Pick a side',
    });
  }

  const legends = lore.legends ?? [];
  if (legends.length > 0) {
    const leg = pick(legends, seed + ':legend');
    items.push({
      id: `story-${leg.id}`,
      kind: 'story',
      title: LIVING_MEDIA_VOICE.story,
      body: leg.title,
      href: leg.href ?? `/${worldSlug}/legends/${leg.id}`,
      cta: 'Read the legend',
    });
  }

  const md = monthDay(d);
  const historyEvents = lore.timeline.filter((e) => e.monthDay === md);
  const hist = historyEvents.length > 0 ? historyEvents[0] : pick(lore.timeline, seed + ':history');
  items.push({
    id: `history-${hist.year}`,
    kind: 'history',
    title: LIVING_MEDIA_VOICE.history,
    body: `${hist.year}: ${hist.title}`,
    href: `/${worldSlug}/lore#lore-timeline`,
    cta: 'Wander the timeline',
  });

  const allHrefs = collectRabbitHoles(lore, worldSlug);
  if (allHrefs.length > 0) {
    const rh = pick(allHrefs, seed + ':rabbit');
    items.push({
      id: 'rabbit-hole',
      kind: 'rabbit-hole',
      title: LIVING_MEDIA_VOICE.rabbitHole,
      body: rh.label,
      href: rh.href,
      cta: 'Go weird',
    });
  }

  const objects = lore.legendaryObjects ?? [];
  if (objects.length > 0) {
    const obj = pick(objects, seed + ':object');
    items.push({
      id: `object-${obj.id}`,
      kind: 'object',
      title: LIVING_MEDIA_VOICE.object,
      body: obj.name,
      href: obj.href ?? `/${worldSlug}/objects/${obj.id}`,
      cta: 'The story',
    });
  }

  const originals = lore.foundryOriginals ?? [];
  if (originals.length > 0) {
    const weekSeed = `${worldSlug}:${key.slice(0, 7)}`;
    const orig = pick(originals, weekSeed + ':original');
    items.push({
      id: `original-${orig.id}`,
      kind: 'original',
      title: `${LIVING_MEDIA_VOICE.original}: ${kindLabel(orig.kind)}`,
      body: orig.title,
      href: orig.href ?? `/${worldSlug}/today`,
      cta: 'Foundry Original',
    });
  }

  return {
    world_slug: worldSlug,
    date_key: key,
    headline: LIVING_MEDIA_VOICE.headline,
    items,
  };
}

function kindLabel(k: string): string {
  const map: Record<string, string> = {
    'mystery-of-week': 'Mystery of the week',
    'forgotten-distillery': 'Forgotten distillery',
    'rivalry-of-week': 'Rivalry of the week',
    mythbuster: 'Mythbuster',
    'legendary-pour': 'Legendary pour',
  };
  return map[k] ?? k;
}

function collectRabbitHoles(lore: WorldLoreBundle, worldSlug: string): { label: string; href: string }[] {
  const holes: { label: string; href: string }[] = [];
  for (const m of lore.mysteries) {
    if (m.rabbitHoleHref) holes.push({ label: m.question, href: m.rabbitHoleHref });
  }
  for (const l of lore.legends ?? []) {
    if (l.href) holes.push({ label: l.title, href: l.href });
  }
  for (const n of lore.universeMap ?? []) {
    if (n.href) holes.push({ label: n.label, href: n.href });
  }
  holes.push({ label: 'Random detective case', href: `/${worldSlug}/detective` });
  holes.push({ label: 'The bourbon universe map', href: `/${worldSlug}/universe` });
  return holes;
}

export function hasLivingMedia(worldSlug: string): boolean {
  return getWorldLore(worldSlug) != null;
}
