import type { DeepGlossaryTerm } from './types';

type GlossarySeed = [term: string, definition: string, whyItMatters: string, example: string, related?: string[]];

export function buildGlossary(seeds: GlossarySeed[]): DeepGlossaryTerm[] {
  const terms = seeds.map(([term, definition, whyItMatters, example, related = []]) => ({
    term,
    definition,
    whyItMatters,
    example,
    relatedTerms: related,
  }));

  for (const t of terms) {
    if (t.relatedTerms.length === 0) {
      const others = terms.filter((o) => o.term !== t.term).slice(0, 2).map((o) => o.term);
      t.relatedTerms = others;
    }
  }

  return terms;
}
