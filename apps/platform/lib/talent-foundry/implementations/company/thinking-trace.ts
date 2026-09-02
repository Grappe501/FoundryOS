import { FORBIDDEN_INFERENCE_KEYS } from './constants';
import type { ThinkingEvent, ThinkingMove, WorkshopSession } from './types';

const FORBIDDEN_KEYS = FORBIDDEN_INFERENCE_KEYS;

function eventId(prefix: string, at: string): string {
  return `${prefix}-${at}`;
}

export function assertPlainThinkingEvent(event: ThinkingEvent): void {
  const record = event as unknown as Record<string, unknown>;
  for (const key of FORBIDDEN_KEYS) {
    if (key in record && record[key] != null) {
      throw new Error(`thinking event must not include ${key}`);
    }
  }
}

export function recordThinking(
  session: WorkshopSession,
  input: {
    beatId: string;
    move: ThinkingMove;
    fact: unknown;
    regionId?: string;
    durationMs?: number;
    now?: Date;
  },
): WorkshopSession {
  const at = (input.now ?? new Date()).toISOString();
  const isFirst =
    !session.thinking.some((e) => e.beatId === input.beatId) &&
    input.move !== 'return' &&
    input.move !== 'pause' &&
    input.move !== 'first_mark' &&
    input.move !== 'ignore';

  const events: ThinkingEvent[] = [];
  if (isFirst) {
    const first: ThinkingEvent = {
      id: eventId('first_mark', at),
      at,
      beatId: input.beatId,
      move: 'first_mark',
      fact: input.fact,
      ...(input.regionId ? { regionId: input.regionId } : {}),
    };
    assertPlainThinkingEvent(first);
    events.push(first);
  }

  const event: ThinkingEvent = {
    id: eventId(input.move, at),
    at,
    beatId: input.beatId,
    move: input.move,
    fact: input.fact,
    ...(input.regionId ? { regionId: input.regionId } : {}),
    ...(typeof input.durationMs === 'number' ? { durationMs: input.durationMs } : {}),
  };
  assertPlainThinkingEvent(event);
  events.push(event);

  const addressedRegionIds =
    input.regionId && !session.addressedRegionIds.includes(input.regionId)
      ? [...session.addressedRegionIds, input.regionId]
      : session.addressedRegionIds;

  return {
    ...session,
    thinking: [...session.thinking, ...events],
    addressedRegionIds,
  };
}

export function closeBeatIgnores(
  session: WorkshopSession,
  beatId: string,
  offeredRegionIds: string[],
  now = new Date(),
): WorkshopSession {
  const addressed = new Set(session.addressedRegionIds);
  const ignored = offeredRegionIds.filter((id) => !addressed.has(id));
  if (ignored.length === 0) return session;
  return recordThinking(session, {
    beatId,
    move: 'ignore',
    fact: { offered: offeredRegionIds, ignored },
    now,
  });
}

export function thinkingMoves(session: WorkshopSession, beatId?: string): ThinkingMove[] {
  return session.thinking
    .filter((e) => (beatId ? e.beatId === beatId : true))
    .map((e) => e.move);
}
