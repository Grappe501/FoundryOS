import type { EntityGraphView } from '@foundry/atlas-graph-engine';
import { getBottle } from '../bourbon-level-1/bottles';
import { getBottleProgression } from '../bourbon-level-1/agency/bottle-progression';
import { linkifyParagraph, type TextSegment } from './inline-links';

export function narrativeInlineLinkCount(segments: TextSegment[]): number {  return segments.filter((s) => s.type === 'link').length;
}

export function enrichGraphNarrative(graph: EntityGraphView): TextSegment[] {
  const base =
    graph.why_should_i_care ??
    graph.why_it_matters ??
    `${graph.title} — explore connections in the bourbon graph hallway.`;

  let segments = linkifyParagraph(base, { preferGraph: true });
  if (narrativeInlineLinkCount(segments) < 2) {
    const boost = ` Follow mash bill, proof, rickhouse, and Bottled-in-Bond doorways from ${graph.title} — every link is a hallway, not a footnote.`;
    segments = linkifyParagraph(base + boost, { preferGraph: true });
  }
  return segments;
}

export function enrichBottleIntro(slug: string): TextSegment[] {
  const bottle = getBottle(slug);
  const progression = getBottleProgression(slug);
  if (!bottle) return [{ type: 'text', value: '' }];

  const prose = [
    bottle.oneLiner,
    bottle.whyBuy,
    progression?.whatItTeaches[0],
    `${bottle.name} is distilled by ${bottle.producerName} at ${bottle.proof} proof — follow the graph for mash bill, proof, and comparable bottles.`,
  ]
    .filter(Boolean)
    .join(' ');

  return linkifyParagraph(prose, { preferGraph: true });
}

export function enrichAtlasParagraph(body: string, termSlug: string): TextSegment[] {
  const graphHint =
    termSlug === 'bottled-in-bond'
      ? ' Start at the Bottled-in-Bond graph hub for a full weekend — Act, proof, warehouses, value bottles, and detective cases.'
      : ` Open the ${termSlug.replace(/-/g, ' ')} graph map for connected bottles and producers.`;
  return linkifyParagraph(body + graphHint, { preferGraph: true });
}
