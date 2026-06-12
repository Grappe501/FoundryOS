/** Client-side world event interactions (localStorage v1 — Supabase journey_events in PASS-035) */

import type { WorldEvent } from '@foundry/world-events-engine';
import { applyCollectorFromAction } from '../collector/client-state';
import { applyConsequences } from '../consequences/client-state';

const KEY = 'foundry-world-events-state';

export type WorldEventsClientState = {
  viewed: string[];
  votes: Record<string, string>;
  saved: string[];
  completed: string[];
  debate_choices: Record<string, string>;
  completed_at: Record<string, string>;
};

function empty(): WorldEventsClientState {
  return { viewed: [], votes: {}, saved: [], completed: [], debate_choices: {}, completed_at: {} };
}

function read(): WorldEventsClientState {
  if (typeof window === 'undefined') return empty();
  try {
    return { ...empty(), ...JSON.parse(localStorage.getItem(KEY) ?? 'null') };
  } catch {
    return empty();
  }
}

function write(state: WorldEventsClientState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function getWorldEventsState(): WorldEventsClientState {
  return read();
}

export function getEventInteraction(eventId: string) {
  const s = read();
  return {
    viewed: s.viewed.includes(eventId),
    vote: s.votes[eventId],
    saved: s.saved.includes(eventId),
    completed: s.completed.includes(eventId),
    debate_choice: s.debate_choices[eventId],
    completed_at: s.completed_at[eventId],
  };
}

export function recordEventView(eventId: string) {
  const s = read();
  if (!s.viewed.includes(eventId)) {
    s.viewed.push(eventId);
    write(s);
  }
}

export function recordEventVote(eventId: string, optionId: string, worldSlug?: string) {
  const s = read();
  s.votes[eventId] = optionId;
  if (!s.viewed.includes(eventId)) s.viewed.push(eventId);
  write(s);
  if (worldSlug) {
    applyConsequences({
      world_slug: worldSlug,
      action_type: 'event_voted',
      action_id: eventId,
    });
  }
}

export function recordEventSave(eventId: string) {
  const s = read();
  if (!s.saved.includes(eventId)) s.saved.push(eventId);
  if (!s.viewed.includes(eventId)) s.viewed.push(eventId);
  write(s);
}

export function recordDebateChoice(eventId: string, choiceId: string) {
  const s = read();
  s.debate_choices[eventId] = choiceId;
  if (!s.viewed.includes(eventId)) s.viewed.push(eventId);
  write(s);
}

export function recordEventComplete(event: WorldEvent): {
  collectorUpdated: boolean;
  consequenceApplied: boolean;
} {
  const s = read();
  if (s.completed.includes(event.event_id)) {
    return { collectorUpdated: false, consequenceApplied: false };
  }
  s.completed.push(event.event_id);
  s.completed_at[event.event_id] = new Date().toISOString();
  if (!s.viewed.includes(event.event_id)) s.viewed.push(event.event_id);
  write(s);

  let collectorUpdated = false;
  if (event.collector_action) {
    applyCollectorFromAction(
      event.world_slug,
      event.collector_action.action_type,
      event.collector_action.action_id,
    );
    collectorUpdated = true;
  }

  const consequenceApplied =
    applyConsequences({
      world_slug: event.world_slug,
      action_type: 'event_challenge_completed',
      action_id: event.event_id,
    }) !== null;

  return { collectorUpdated, consequenceApplied };
}

export function getUserEventsSummary() {
  const s = read();
  return {
    viewed_count: s.viewed.length,
    votes_count: Object.keys(s.votes).length,
    saved_count: s.saved.length,
    completed_count: s.completed.length,
    debate_count: Object.keys(s.debate_choices).length,
  };
}

export function getCompletedChallengeIds(): string[] {
  return read().completed;
}
