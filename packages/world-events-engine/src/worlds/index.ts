import type { LiveEventWorld, WorldEventDefinition, WorldEventPool, WorldEventType } from '../types';
import { WORLD_EVENT_TYPES } from '../types';
import { BOURBON_EVENTS } from './bourbon';
import {
  AI_BUILDER_EVENTS,
  BBQ_EVENTS,
  CIVIC_ENGAGEMENT_EVENTS,
  FINANCIAL_INDEPENDENCE_EVENTS,
  POKER_EVENTS,
  PUBLIC_SPEAKING_EVENTS,
} from './other-worlds';

function poolFromList(events: WorldEventDefinition[]): WorldEventPool {
  const pool = {} as WorldEventPool;
  for (const t of WORLD_EVENT_TYPES) {
    pool[t] = [];
  }
  for (const e of events) {
    pool[e.event_type].push(e);
  }
  return pool;
}

export const WORLD_EVENT_POOLS: Record<LiveEventWorld, WorldEventPool> = {
  bourbon: poolFromList(BOURBON_EVENTS),
  'ai-builder': poolFromList(AI_BUILDER_EVENTS),
  'public-speaking': poolFromList(PUBLIC_SPEAKING_EVENTS),
  'civic-engagement': poolFromList(CIVIC_ENGAGEMENT_EVENTS),
  bbq: poolFromList(BBQ_EVENTS),
  poker: poolFromList(POKER_EVENTS),
  'financial-independence': poolFromList(FINANCIAL_INDEPENDENCE_EVENTS),
};

export function allEventDefinitions(): WorldEventDefinition[] {
  return Object.values(WORLD_EVENT_POOLS).flatMap((p) =>
    WORLD_EVENT_TYPES.flatMap((t) => p[t]),
  );
}

export function getEventPool(worldSlug: string): WorldEventPool | undefined {
  return WORLD_EVENT_POOLS[worldSlug as LiveEventWorld];
}

export function validateEventPools(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const world of Object.keys(WORLD_EVENT_POOLS) as LiveEventWorld[]) {
    const pool = WORLD_EVENT_POOLS[world];
    for (const type of WORLD_EVENT_TYPES) {
      if (pool[type].length === 0) {
        errors.push(`${world} missing ${type}`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export {
  BOURBON_EVENTS,
  AI_BUILDER_EVENTS,
  PUBLIC_SPEAKING_EVENTS,
  CIVIC_ENGAGEMENT_EVENTS,
  BBQ_EVENTS,
  POKER_EVENTS,
  FINANCIAL_INDEPENDENCE_EVENTS,
};
