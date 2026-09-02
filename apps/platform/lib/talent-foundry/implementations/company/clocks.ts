import type { BeatClock, CoverageFact, NoticeSeed, RegionDwell, WorkshopSession } from './types';

function msBetween(from: string | null, to: string | null): number | null {
  if (!from || !to) return null;
  return new Date(to).getTime() - new Date(from).getTime();
}

export function emptyClock(beatId: string, openedAt: string): BeatClock {
  return {
    beatId,
    openedAt,
    firstInputAt: null,
    submittedAt: null,
    hesitationMs: null,
    lingerMs: null,
    afterSubmitLingerMs: null,
  };
}

function closeClock(clock: BeatClock | undefined, beatId: string, openedFallback: string, submittedAt: string): BeatClock {
  const openedAt = clock?.openedAt ?? openedFallback;
  const firstInputAt = clock?.firstInputAt ?? submittedAt;
  return {
    beatId,
    openedAt,
    firstInputAt,
    submittedAt,
    hesitationMs: msBetween(openedAt, firstInputAt),
    lingerMs: msBetween(openedAt, submittedAt),
    afterSubmitLingerMs: clock?.afterSubmitLingerMs ?? null,
  };
}

export function openBeat(session: WorkshopSession, beatId: string, now: Date): WorkshopSession {
  if (session.clocks[beatId]) return session;
  return {
    ...session,
    clocks: {
      ...session.clocks,
      [beatId]: emptyClock(beatId, now.toISOString()),
    },
  };
}

export function markFirstInput(session: WorkshopSession, beatId: string, now: Date): WorkshopSession {
  const clock = session.clocks[beatId];
  if (!clock || clock.firstInputAt) return session;
  const at = now.toISOString();
  return {
    ...session,
    clocks: {
      ...session.clocks,
      [beatId]: {
        ...clock,
        firstInputAt: at,
        hesitationMs: msBetween(clock.openedAt, at),
      },
    },
  };
}

export function submitBeat(session: WorkshopSession, beatId: string, now: Date): WorkshopSession {
  const at = now.toISOString();
  const clock = closeClock(session.clocks[beatId], beatId, session.startedAt, at);
  return {
    ...session,
    clocks: {
      ...session.clocks,
      [beatId]: clock,
    },
  };
}

export function markAfterSubmitLinger(session: WorkshopSession, beatId: string, now: Date): WorkshopSession {
  const clock = session.clocks[beatId];
  if (!clock?.submittedAt) return session;
  const at = now.toISOString();
  return {
    ...session,
    clocks: {
      ...session.clocks,
      [beatId]: {
        ...clock,
        afterSubmitLingerMs: msBetween(clock.submittedAt, at),
      },
    },
  };
}

export function touchRegion(
  session: WorkshopSession,
  regionId: string,
  now: Date,
  dwellMs = 0,
): WorkshopSession {
  const at = now.toISOString();
  const prior = session.regionDwells[regionId];
  const next: RegionDwell = prior
    ? {
        regionId,
        firstAt: prior.firstAt,
        lastAt: at,
        visits: prior.visits + 1,
        dwellMs: prior.dwellMs + dwellMs,
      }
    : {
        regionId,
        firstAt: at,
        lastAt: at,
        visits: 1,
        dwellMs,
      };

  return {
    ...session,
    regionDwells: { ...session.regionDwells, [regionId]: next },
  };
}

export function textMetrics(text: string): { chars: number; words: number } {
  const trimmed = text.trim();
  return {
    chars: trimmed.length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
  };
}

export function mentionedRegions(text: string, seed: NoticeSeed): string[] {
  const hay = text.toLowerCase();
  return seed.regions.filter((r) => r.cues.some((cue) => hay.includes(cue.toLowerCase()))).map((r) => r.id);
}

export function coverageFact(session: WorkshopSession, seed: NoticeSeed, noticeText: string): CoverageFact {
  const offered = seed.regions.map((r) => r.id);
  const visited = offered.filter((id) => session.regionDwells[id] || session.addressedRegionIds.includes(id));
  const ignored = offered.filter((id) => !visited.includes(id));
  const buried = seed.regions.filter((r) => r.kind === 'buried').map((r) => r.id);
  const conflict = seed.regions.filter((r) => r.kind === 'conflict').map((r) => r.id);
  const mentioned = mentionedRegions(noticeText, seed);

  return {
    offered,
    visited,
    ignored,
    visitedRatio: offered.length === 0 ? 0 : visited.length / offered.length,
    buriedVisited: buried.filter((id) => visited.includes(id)),
    conflictVisited: conflict.filter((id) => visited.includes(id)),
    mentioned,
    mentionedUnvisited: mentioned.filter((id) => !visited.includes(id)),
  };
}
