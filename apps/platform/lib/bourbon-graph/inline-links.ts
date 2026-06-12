import type { GraphConfidence } from '@foundry/atlas-graph-engine';
import { atlasMatchTerms } from '../bourbon-atlas/registry';
import { atlasTermHref } from '../bourbon-atlas/slug';
import { BOURBON_BOTTLES } from '../bourbon-level-1/bottles';
import { BOURBON_PRODUCERS } from '../world-depth/bourbon-producers';
import { inferGraphRef } from './resolve-graph';

export type InlineLinkKind =
  | 'atlas_term'
  | 'bottle'
  | 'producer'
  | 'person'
  | 'debate'
  | 'collection'
  | 'detective';

export type InlineLinkTarget = {
  kind: InlineLinkKind;
  slug: string;
  label: string;
  href: string;
  confidence?: GraphConfidence;
};

export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; value: string; target: InlineLinkTarget };

type PatternRow = {
  pattern: string;
  target: InlineLinkTarget;
};

const DEBATE_LINKS: InlineLinkTarget[] = [
  { kind: 'debate', slug: 'best-value-bourbon', label: 'Best value bourbon', href: '/bourbon/graph/best-value-bourbon', confidence: 'editorial' },
  { kind: 'debate', slug: 'bib-still-matters', label: 'Does BiB still matter?', href: '/bourbon/graph/bib-still-matters', confidence: 'editorial' },
  { kind: 'debate', slug: 'bib-vs-single-barrel', label: 'BiB vs single barrel', href: '/bourbon/graph/bib-vs-single-barrel', confidence: 'editorial' },
  { kind: 'debate', slug: 'high-proof-entry', label: 'High proof entry', href: '/bourbon/graph/high-proof-entry', confidence: 'editorial' },
];

const COLLECTION_LINKS: InlineLinkTarget[] = [
  { kind: 'collection', slug: 'starter-shelf', label: 'Starter shelf path', href: '/bourbon/portfolio', confidence: 'editorial' },
  { kind: 'collection', slug: 'bottled-in-bond-collection', label: 'BiB collector path', href: '/bourbon/portfolio', confidence: 'editorial' },
];

/** Atlas terms that prefer graph route when a graph node exists */
const GRAPH_FIRST_TERMS = new Set([
  'bottled-in-bond',
  'mash-bill',
  'proof',
  'dsp',
  'rickhouse',
  'single-barrel',
  'barrel-proof',
  'age-statement',
  'straight-bourbon',
  'char-level',
]);

export function resolveInlineHref(kind: InlineLinkKind, slug: string, preferGraph = true): string {
  switch (kind) {
    case 'bottle':
      return preferGraph ? `/bourbon/graph/${slug}` : `/bourbon/bottles/${slug}`;
    case 'producer':
      return preferGraph ? `/bourbon/graph/${slug}` : `/bourbon/producers/${slug}`;
    case 'person':
      return `/bourbon/graph/${slug}`;
    case 'atlas_term':
      if (preferGraph && (GRAPH_FIRST_TERMS.has(slug) || inferGraphRef(slug)?.entity_type === 'atlas_term')) {
        return `/bourbon/graph/${slug}`;
      }
      return atlasTermHref(slug);
    case 'debate':
      return `/bourbon/graph/${slug}`;
    case 'collection':
      return '/bourbon/portfolio';
    case 'detective':
      return `/bourbon/detective/${slug}`;
    default:
      return `/bourbon/graph/${slug}`;
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** All linkable phrases — longest match wins */
export function buildInlineLinkPatterns(preferGraph = true): PatternRow[] {
  const rows: PatternRow[] = [];

  for (const { slug, title, patterns } of atlasMatchTerms()) {
    const target: InlineLinkTarget = {
      kind: 'atlas_term',
      slug,
      label: title,
      href: resolveInlineHref('atlas_term', slug, preferGraph),
      confidence: 'verified',
    };
    for (const p of patterns) {
      if (p.length >= 3) rows.push({ pattern: p, target });
    }
  }

  for (const b of BOURBON_BOTTLES) {
    const target: InlineLinkTarget = {
      kind: 'bottle',
      slug: b.slug,
      label: b.name,
      href: resolveInlineHref('bottle', b.slug, preferGraph),
      confidence: 'commonly_reported',
    };
    rows.push({ pattern: b.name, target });
    if (b.name.includes("'")) {
      rows.push({ pattern: b.name.replace(/'/g, "'"), target });
    }
  }

  for (const p of BOURBON_PRODUCERS) {
    const target: InlineLinkTarget = {
      kind: 'producer',
      slug: p.slug,
      label: p.name,
      href: resolveInlineHref('producer', p.slug, preferGraph),
      confidence: 'commonly_reported',
    };
    rows.push({ pattern: p.name, target });
  }

  for (const d of DEBATE_LINKS) {
    rows.push({ pattern: d.label, target: d });
  }

  for (const c of COLLECTION_LINKS) {
    rows.push({ pattern: c.label, target: c });
  }

  // Priority phrases (aliases)
  const aliases: [string, InlineLinkTarget][] = [
    ['Bottled-in-Bond', { kind: 'atlas_term', slug: 'bottled-in-bond', label: 'Bottled in Bond', href: resolveInlineHref('atlas_term', 'bottled-in-bond', preferGraph), confidence: 'verified' }],
    ['BiB', { kind: 'atlas_term', slug: 'bottled-in-bond', label: 'BiB', href: resolveInlineHref('atlas_term', 'bottled-in-bond', preferGraph), confidence: 'verified' }],
    ['mash bill', { kind: 'atlas_term', slug: 'mash-bill', label: 'Mash bill', href: resolveInlineHref('atlas_term', 'mash-bill', preferGraph), confidence: 'verified' }],
    ['100 proof', { kind: 'atlas_term', slug: 'proof', label: 'Proof', href: resolveInlineHref('atlas_term', 'proof', preferGraph), confidence: 'verified' }],
    ['DSP', { kind: 'atlas_term', slug: 'dsp', label: 'DSP', href: resolveInlineHref('atlas_term', 'dsp', preferGraph), confidence: 'verified' }],
    ['rickhouse', { kind: 'atlas_term', slug: 'rickhouse', label: 'Rickhouse', href: resolveInlineHref('atlas_term', 'rickhouse', preferGraph), confidence: 'commonly_reported' }],
    ['Wild Turkey 101', { kind: 'bottle', slug: 'wild-turkey-101', label: 'Wild Turkey 101', href: resolveInlineHref('bottle', 'wild-turkey-101', preferGraph), confidence: 'commonly_reported' }],
  ];
  for (const [pattern, target] of aliases) {
    rows.push({ pattern, target });
  }

  return rows.sort((a, b) => b.pattern.length - a.pattern.length);
}

export type LinkifyOptions = {
  preferGraph?: boolean;
  /** Only first occurrence of each slug per paragraph */
  firstOnlyPerSlug?: boolean;
};

/**
 * Turn prose into text + inline link segments.
 * First mention of each entity in a paragraph gets linked.
 */
export function linkifyParagraph(text: string, options: LinkifyOptions = {}): TextSegment[] {
  const preferGraph = options.preferGraph ?? true;
  const firstOnly = options.firstOnlyPerSlug ?? true;
  const patterns = buildInlineLinkPatterns(preferGraph);
  const linkedSlugs = new Set<string>();
  const segments: TextSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let best: { index: number; length: number; target: InlineLinkTarget; raw: string } | null = null;

    for (const row of patterns) {
      if (firstOnly && linkedSlugs.has(`${row.target.kind}:${row.target.slug}`)) continue;
      const re = new RegExp(`\\b${escapeRegex(row.pattern)}\\b`, 'i');
      const slice = text.slice(cursor);
      const m = re.exec(slice);
      if (!m || m.index === undefined) continue;
      const absIndex = cursor + m.index;
      if (!best || absIndex < best.index || (absIndex === best.index && m[0].length > best.length)) {
        best = { index: absIndex, length: m[0].length, target: row.target, raw: m[0] };
      }
    }

    if (!best) {
      segments.push({ type: 'text', value: text.slice(cursor) });
      break;
    }

    if (best.index > cursor) {
      segments.push({ type: 'text', value: text.slice(cursor, best.index) });
    }

    segments.push({ type: 'link', value: best.raw, target: best.target });
    linkedSlugs.add(`${best.target.kind}:${best.target.slug}`);
    cursor = best.index + best.length;
  }

  if (segments.length === 0 && text) {
    segments.push({ type: 'text', value: text });
  }

  return segments;
}

export function countInlineLinksInText(text: string, options?: LinkifyOptions): number {
  return linkifyParagraph(text, options).filter((s) => s.type === 'link').length;
}

export function bottlesForAtlasTerm(termSlug: string): InlineLinkTarget[] {
  const out: InlineLinkTarget[] = [];
  for (const b of BOURBON_BOTTLES) {
    if (b.slug.includes(termSlug.replace(/-/g, ''))) {
      out.push({
        kind: 'bottle',
        slug: b.slug,
        label: b.name,
        href: `/bourbon/graph/${b.slug}`,
        confidence: 'commonly_reported',
      });
    }
  }
  if (termSlug === 'bottled-in-bond') {
    for (const slug of ['evan-williams-black', 'old-forester-1920', 'wild-turkey-101']) {
      const b = BOURBON_BOTTLES.find((x) => x.slug === slug);
      if (b && !out.some((o) => o.slug === slug)) {
        out.push({ kind: 'bottle', slug, label: b.name, href: `/bourbon/graph/${slug}`, confidence: 'commonly_reported' });
      }
    }
  }
  if (termSlug === 'proof' || termSlug === 'mash-bill') {
    for (const slug of ['wild-turkey-101', 'buffalo-trace', 'makers-mark']) {
      const b = BOURBON_BOTTLES.find((x) => x.slug === slug);
      if (b && !out.some((o) => o.slug === slug)) {
        out.push({ kind: 'bottle', slug, label: b.name, href: `/bourbon/graph/${slug}`, confidence: 'commonly_reported' });
      }
    }
  }
  return out.slice(0, 6);
}
