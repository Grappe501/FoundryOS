/** Platform layer — wire graph resolution + portable identity into atlas-aware-ai */

import type { EntityGraphView, GraphEntityRef } from '@foundry/atlas-graph-engine';
import {
  buildAtlasContext,
  buildUserIdentityContext,
  generateMentorAnswer,
  inventoryFactsFromRecord,
  type AtlasAskPrompt,
  type AtlasContext,
  type BuildUserIdentityInput,
  type InventoryFact,
  type MentorAnswer,
  type UserIdentityContext,
} from '@foundry/atlas-aware-ai';
import { getBottleRecord, getProducerRecord, getPerson } from '@foundry/bourbon-intelligence';
import { resolveWorldIdentityNarrative } from '@foundry/identity-narrative-engine';
import type { IdentitySignalBundle } from '@foundry/identity-narrative-engine';
import { emptyPortableMemoryState } from '@foundry/personal-database';
import { inferGraphRef, resolveBourbonGraph } from '../bourbon-graph';

function sourced(field: string, sv?: { value: unknown; confidence?: string; notes?: string }): InventoryFact[] {
  if (!sv) return [];
  return inventoryFactsFromRecord([
    {
      field,
      value: sv.value,
      confidence: sv.confidence,
      source_label: sv.notes,
    },
  ]);
}

export function inventoryFactsForGraph(graph: EntityGraphView): InventoryFact[] {
  const facts: InventoryFact[] = [];

  if (graph.entity_type === 'bottle') {
    const b = getBottleRecord(graph.slug);
    if (b) {
      facts.push(...sourced('proof', b.proof));
      facts.push(...sourced('mashbill_style', b.mashbill_style));
      facts.push(...sourced('price_usd_est', b.price_usd_est));
      if (b.mash_bill_slug) {
        facts.push({
          field: 'mash bill percentages',
          value: 'Not fully disclosed in inventory',
          confidence: 'unknown',
        });
      }
    }
  }

  if (graph.entity_type === 'producer' || graph.entity_type === 'organization') {
    const p = getProducerRecord(graph.slug);
    if (p) {
      facts.push(...sourced('dsp_code', p.dsp_code));
      facts.push(...sourced('headquarters', p.headquarters));
      facts.push(...sourced('parent_company', p.parent_company));
    }
  }

  if (graph.entity_type === 'person') {
    const person = getPerson(graph.slug);
    if (person) {
      for (const f of person.facts.slice(0, 6)) {
        facts.push({
          field: f.claim.slice(0, 60),
          value: f.claim,
          confidence: f.confidence,
        });
      }
      if (!person.profile_publishable) {
        facts.push({
          field: 'master distiller history',
          value: 'Partial profile — not fully verified for publish',
          confidence: 'unknown',
        });
      }
    }
  }

  return facts;
}

export function resolveAtlasContextForSlug(slug: string): AtlasContext | null {
  const ref = inferGraphRef(slug);
  if (!ref) return null;
  const graph = resolveBourbonGraph(ref);
  if (!graph) return null;
  return buildAtlasContext({ graph, inventory_facts: inventoryFactsForGraph(graph) });
}

export function resolveAtlasContextForRef(ref: GraphEntityRef): AtlasContext | null {
  const graph = resolveBourbonGraph(ref);
  if (!graph) return null;
  return buildAtlasContext({ graph, inventory_facts: inventoryFactsForGraph(graph) });
}

export function buildUserContextFromSignals(
  signals: IdentitySignalBundle,
  memory = emptyPortableMemoryState(),
): UserIdentityContext {
  const narrative = resolveWorldIdentityNarrative(signals);
  const input: BuildUserIdentityInput = {
    world_slug: signals.world_slug,
    memory_state: memory,
    collections: signals.active_collections,
    narrative: narrative
      ? {
          recent_pattern: narrative.recent_pattern,
          mentor_notice: narrative.mentor_notice,
          suggested_next: narrative.suggested_next,
        }
      : undefined,
  };
  return buildUserIdentityContext(input);
}

export function askAtlas(
  prompt: AtlasAskPrompt,
  slug: string,
  user: UserIdentityContext,
): MentorAnswer | null {
  const atlas = resolveAtlasContextForSlug(slug);
  if (!atlas) return null;
  return generateMentorAnswer(prompt, atlas, user);
}

export type AtlasDebugBundle = {
  atlas: AtlasContext;
  user: UserIdentityContext;
  sample_answers: Record<AtlasAskPrompt, MentorAnswer>;
};

export function buildAtlasDebugBundle(slug: string, user: UserIdentityContext): AtlasDebugBundle | null {
  const atlas = resolveAtlasContextForSlug(slug);
  if (!atlas) return null;
  const prompts: AtlasAskPrompt[] = ['why_care', 'explore_next', 'connect_shelf', 'what_unknown'];
  const sample_answers = Object.fromEntries(
    prompts.map((p) => [p, generateMentorAnswer(p, atlas, user)]),
  ) as Record<AtlasAskPrompt, MentorAnswer>;
  return { atlas, user, sample_answers };
}
