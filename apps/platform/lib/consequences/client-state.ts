/** Client-side consequence state (localStorage v1 — Supabase sync in PASS-035) */

import type { ConsequenceBundle, ConsequenceNode, ConsequenceTrigger } from '@foundry/consequence-engine';
import { resolveConsequences } from '@foundry/consequence-engine';
import { collectorEventsFromAction, collectorEventsFromConsequences } from '@foundry/collector-engine';
import { applyCollectorFromConsequences } from '../collector/client-state';

const KEY = 'foundry-consequence-state';

type ConsequenceState = {
  appliedNodes: Record<string, string>;
  triggers: string[];
};

function triggerKey(t: ConsequenceTrigger): string {
  return `${t.world_slug}:${t.action_type}:${t.action_id}`;
}

function read(): ConsequenceState {
  if (typeof window === 'undefined') return { appliedNodes: {}, triggers: [] };
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? { appliedNodes: {}, triggers: [] };
  } catch {
    return { appliedNodes: {}, triggers: [] };
  }
}

function write(state: ConsequenceState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function applyConsequences(trigger: ConsequenceTrigger): ConsequenceBundle | null {
  const bundle = resolveConsequences(trigger);
  if (!bundle) return null;

  const state = read();
  const tk = triggerKey(trigger);
  if (state.triggers.includes(tk)) return bundle;

  const now = new Date().toISOString();
  for (const node of bundle.effects) {
    state.appliedNodes[node.id] = now;
  }
  state.triggers.push(tk);
  write(state);

  const collectorEvents = [
    ...collectorEventsFromConsequences(bundle.effects),
    ...collectorEventsFromAction(trigger.world_slug, trigger.action_type, trigger.action_id),
  ];
  if (collectorEvents.length > 0) {
    applyCollectorFromConsequences(collectorEvents);
  }

  return bundle;
}

export function isConsequenceNodeUnlocked(nodeId: string): boolean {
  return nodeId in read().appliedNodes;
}

export function getUnlockedNodes(): ConsequenceNode['id'][] {
  return Object.keys(read().appliedNodes);
}

export function wasTriggerApplied(trigger: ConsequenceTrigger): boolean {
  return read().triggers.includes(triggerKey(trigger));
}

export function closeDetectiveCase(caseSlug: string): ConsequenceBundle | null {
  return applyConsequences({
    world_slug: 'bourbon',
    action_type: 'detective_case_closed',
    action_id: caseSlug,
  });
}
