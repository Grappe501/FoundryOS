import type { GraphConfidence } from '@foundry/atlas-graph-engine';
import type { BottleRecord, ProducerRecord } from '@foundry/bourbon-intelligence';
import type { BourbonBottle } from '../bourbon-level-1/bottles';

/** Why this hallway connection matters — not a label, a paragraph */

export function producerParagraph(
  bottle: BourbonBottle,
  producer?: ProducerRecord,
): { teaser: string; confidence: GraphConfidence; source_label: string } {
  const hq = producer?.headquarters?.value;
  const parent = producer?.parent_company?.value;
  return {
    teaser: hq
      ? `${bottle.producerName} distills from ${hq}. Following the producer hallway teaches house style — mash philosophy, warehouse culture, and which bottles share the same DNA. ${parent ? `Parent: ${parent}.` : ''} Start here when you want to understand why this pour tastes like it does, not just what it costs.`
      : `${bottle.producerName} is the distilling house behind this bottle. Producer pages connect mash bills, leader slots, and sibling bottles so you learn the house before chasing single labels.`,
    confidence: producer?.name.confidence === 'verified' ? 'verified' : 'commonly_reported',
    source_label: producer?.dsp_code?.value ? `DSP ${producer.dsp_code.value}` : 'producer registry',
  };
}

export function mashParagraph(
  bottle: BourbonBottle,
  record?: BottleRecord,
): { teaser: string; confidence: GraphConfidence; source_label: string } {
  const style = bottle.mashbill.replace(/-/g, ' ');
  const conf = record?.mashbill_style.confidence ?? 'commonly_reported';
  return {
    teaser:
      conf === 'unknown'
        ? `Mash bill percentages for ${bottle.name} are not publicly disclosed. You can still learn style (${style}) through side-by-side tastings and Atlas terms — but Foundry will not invent grain splits. Unknown is honest data.`
        : `This bottle reads as ${style} on the shelf. Mash bill literacy is how beginners stop saying "smooth" and start naming rye spice, wheat softness, or corn sweetness. Grain percentages are ${conf === 'producer_disclosed' ? 'partially disclosed by the producer' : 'commonly reported, not officially published'} — explore the Atlas mash-bill hallway next.`,
    confidence: conf === 'producer_disclosed' ? 'producer_disclosed' : conf === 'verified' ? 'verified' : 'commonly_reported',
    source_label: 'intelligence registry · atlas',
  };
}

export function terroirParagraph(): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser:
      'Bourbon terroir is rarely disclosed at the field level the way wine appellations are. Most major houses source grain regionally without publishing farm maps. Foundry marks grain source and soil influence as not publicly disclosed until a producer publishes primary-source detail — honest uncertainty is part of the authority model.',
    confidence: 'unknown',
    source_label: 'not producer-disclosed',
  };
}

export function legalCategoryParagraph(): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser:
      'This bottle sits under the U.S. bourbon standard of identity: at least 51% corn, new charred oak, federal proof limits at distillation and barreling, bottled at no less than 80 proof. Compare to rye whiskey, Tennessee whiskey, and Canadian whisky in the American whiskey hallway when you want category context, not brand hype.',
    confidence: 'verified',
    source_label: '27 CFR Part 5 Subpart I',
  };
}

export function proofParagraph(bottle: BourbonBottle, record?: BottleRecord): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser: `${bottle.proof} proof on the label means ${bottle.proof / 2}% ABV. Proof shapes heat, viscosity, and how aggressively oak reads on the palate. Tasting the same house at 86, 90, and 100 proof is one of the fastest ways to calibrate your palate — this bottle is your anchor point in that ladder.`,
    confidence: record?.proof.confidence === 'commonly_reported' ? 'commonly_reported' : 'editorial',
    source_label: 'label proof · TTB identity rules',
  };
}

export function ageParagraph(bottle: BourbonBottle, record?: BottleRecord): { teaser: string; confidence: GraphConfidence; source_label: string } | null {
  if (!bottle.ageYears && !record?.age_years) return null;
  const years = bottle.ageYears ?? record?.age_years?.value;
  return {
    teaser: `${years}-year age statement (where labeled) ties this pour to time in oak — not just distillery marketing. Age teaches extraction: when vanilla and tannin outweigh grain sweetness. Compare against non-age-stated siblings from the same producer to feel what years buy you.`,
    confidence: record?.age_years?.confidence ?? 'commonly_reported',
    source_label: 'label age statement when present',
  };
}

export function comparableParagraph(bottle: BourbonBottle, otherSlug: string, otherName: string): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser: `Compare ${bottle.name} against ${otherName} side-by-side — not to crown a winner, but to isolate mash style, proof, and house character. Comparison artifacts (040A) turn a flight into evidence on your passport. This pairing is editorially suggested, not a quality ranking.`,
    confidence: 'editorial',
    source_label: 'comparison set · intelligence registry',
  };
}

export function storePickParagraph(): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser:
      'Store picks and single barrels introduce barrel-lottery economics: same label, different warehouse slot, different dump date. The detective hallway on DSP numbers and pick labels helps you decide when a $70 pick teaches more than a $30 shelf staple — without assuming every pick is worth the markup.',
    confidence: 'commonly_reported',
    source_label: 'market · detective cases',
  };
}

export function americanWhiskeyParagraph(): { teaser: string; confidence: GraphConfidence; source_label: string } {
  return {
    teaser:
      'Bourbon is one lane in American whiskey. Rye, Tennessee whiskey, wheat whiskey, and corn whiskey each have distinct federal identities. Stepping into the comparison layer prevents the common mistake of calling every brown spirit "bourbon" — and opens rabbit holes into Canadian whisky contrast for blind flights.',
    confidence: 'verified',
    source_label: '27 CFR Part 5 · intelligence categories',
  };
}

export const SECTION_INTROS: Record<string, string> = {
  Producer:
    'The producer hallway explains house DNA — who distilled this, where, and which sibling bottles share the same campus and mash family.',
  'Known people':
    'Verified distiller roles only. Leader slots stay empty until primary-source facts exist — no fabricated master distiller bios.',
  'Leader slots':
    'Slots are spaces for sourced profiles. Graph references a name; publishing a bio requires producer_disclosed or verified citations.',
  'Mash style':
    'Mash bill style is how flavor architecture works — high rye, wheated, or traditional corn-forward. Percentages stay unknown unless disclosed.',
  'Terroir disclosure':
    'Grain farm and soil transparency is rare in bourbon. We show not disclosed rather than invent terroir romance.',
  'Brand family':
    'Brand family explains portfolio context — parent companies, sibling labels, and shared campus DNA.',
  'Legal category':
    'Federal standards of identity separate bourbon from rye, Tennessee whiskey, and other American categories.',
  'Comparable bottles':
    'Side-by-side comparisons teach faster than solo ratings. Each pairing is a doorway, not a scoreboard.',
  'Atlas terms':
    'Atlas terms are the vocabulary layer — proof, char, rickhouse, BiB — that turns tasting notes into precise language.',
  Mysteries:
    'Mysteries are open questions worth investigating: allocation hype, recipe drift, label trust.',
  Debates:
    'Debates surface honest disagreement in the community — value, proof, BiB vs single barrel.',
  Collections:
    'Collection paths turn browsing into evidence — shelf, BiB flight, starter ladder — on your passport.',
  Artifacts:
    'Your tastings, comparisons, and notes become artifacts. The graph remembers what textbooks forget.',
  Investigations:
    'Detective cases walk one question at a time — DSP tracing, BiB guarantees, allocation worth.',
  Missions:
    'Missions turn graph knowledge into a weekend — tasting flights, collection goals, one deliberate session.',
  'Suggested next stop':
    'One recommended doorway so you never dead-end on a bottle page.',
};
