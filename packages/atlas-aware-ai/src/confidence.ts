import type { GraphConfidence } from '@foundry/atlas-graph-engine';
import type { AtlasContext, InventoryFact } from './types';
import { isLowConfidence, unknownFieldNotice } from './safety';

export function buildConfidenceNotice(
  edges: { title: string; confidence?: GraphConfidence; source_label?: string }[],
  inventoryFacts: InventoryFact[] = [],
): string[] {
  const warnings: string[] = [];

  for (const edge of edges) {
    if (edge.confidence === 'unknown') {
      warnings.push(`"${edge.title}" connection is marked unknown in the graph.`);
    } else if (edge.confidence === 'commonly_reported' && !edge.source_label) {
      warnings.push(`"${edge.title}" is commonly reported — not producer-verified.`);
    } else if (edge.confidence === 'editorial') {
      warnings.push(`"${edge.title}" is editorial context only.`);
    }
  }

  for (const fact of inventoryFacts) {
    if (isLowConfidence(fact.confidence)) {
      warnings.push(unknownFieldNotice(fact.field));
    }
  }

  return [...new Set(warnings)];
}

export function collectUnknownFields(
  edges: { title: string; confidence?: GraphConfidence; group?: string }[],
  inventoryFacts: InventoryFact[] = [],
): string[] {
  const unknowns: string[] = [];

  for (const edge of edges) {
    if (edge.confidence === 'unknown') {
      unknowns.push(`${edge.title}${edge.group ? ` (${edge.group})` : ''}`);
    }
  }

  for (const fact of inventoryFacts) {
    if (fact.confidence === 'unknown' || fact.value.toLowerCase().includes('unknown')) {
      unknowns.push(fact.field);
    }
  }

  return [...new Set(unknowns)];
}

export function summarizeConfidenceForAnswer(ctx: AtlasContext): string | null {
  if (ctx.confidence_warnings.length === 0) return null;
  const top = ctx.confidence_warnings.slice(0, 2).join(' ');
  return ctx.confidence_warnings.length > 2 ? `${top} (+${ctx.confidence_warnings.length - 2} more)` : top;
}
