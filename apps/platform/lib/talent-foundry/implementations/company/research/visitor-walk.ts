/**
 * Research only. Walks a simulated visitor through the workshop as built.
 * Arrival labels are study instruments. They are never written onto a person.
 */
import {
  advanceWorkshop,
  createWorkshopSession,
  enterWorkshop,
  linger,
  markNoticeRegion,
  revealDoorLine,
  submitMess,
  submitNotice,
} from '../journey';
import { chooseMakeTrack, openMake, submitMake } from '../make/engine';
import { composeBuildBody, tracksVisibleOn, type BenchObject } from '../make/surface';
import { draftTrace } from '../traces';
import type { ArtifactTrack } from '../spine/envelope';
import type { WorkshopSession } from '../types';

export const ARRIVALS = [
  'passerby',
  'job_seeker',
  'maker',
  'skeptic',
  'student',
  'lurker',
  'operator',
] as const;

export type ArrivalId = (typeof ARRIVALS)[number];

export const BEATS = [
  'door',
  'notice',
  'mess',
  'named',
  'linger',
  'make',
  'method',
] as const;

export type BeatId = (typeof BEATS)[number];

export const POLL_KEYS = [
  'understood',
  'wantedToContinue',
  'feltLikeAPlace',
  'feltLikeATest',
  'feltLikeAWebsite',
  'feltLikeWork',
  'caredAboutResidue',
  'wantedToParticipate',
] as const;

export type PollKey = (typeof POLL_KEYS)[number];

export const FEEDBACK_TAGS = [
  'door_mystery_held_me',
  'door_expected_a_website',
  'door_wanted_the_job_ask',
  'notice_object_felt_real',
  'notice_felt_like_a_test',
  'notice_did_not_know_the_ask',
  'mess_i_cared_about_the_draft',
  'mess_felt_like_a_trick',
  'named_landing_felt_earned',
  'named_felt_like_bait',
  'linger_permission_to_leave',
  'linger_room_felt_empty',
  'linger_wanted_to_touch',
  'make_object_opened_not_ui',
  'make_notes_felt_like_exercises',
  'make_notes_felt_like_leftover_work',
  'method_wanted_to_be_shown',
  'method_no_next_step',
  'wanted_to_be_remembered',
  'would_tell_someone',
] as const;

export type FeedbackTag = (typeof FEEDBACK_TAGS)[number];

export type WalkOutcome = {
  arrival: ArrivalId;
  droppedAt: BeatId | 'completed';
  entered: boolean;
  noticeDone: boolean;
  messChoice: string | null;
  named: boolean;
  lingered: boolean;
  openedMake: boolean;
  bench: BenchObject | '';
  track: ArtifactTrack | null;
  finishedArtifact: boolean;
  polls: Record<PollKey, number>;
  tags: FeedbackTag[];
  thoughtItWas: ThoughtId;
  wantedParticipate: boolean;
};

export const THOUGHTS = [
  'place',
  'workspace',
  'machine',
  'application',
  'course',
  'hiring_funnel',
  'art_piece',
  'website',
] as const;

export type ThoughtId = (typeof THOUGHTS)[number];

type Visitor = {
  arrival: ArrivalId;
  patience: number;
  wantWork: number;
  wantJob: number;
  wantClarity: number;
  careResidue: number;
  finishBias: number;
  readBias: number;
  mysteryTolerance: number;
};

const ARRIVAL_WEIGHTS: Record<ArrivalId, number> = {
  passerby: 0.26,
  job_seeker: 0.2,
  maker: 0.16,
  skeptic: 0.12,
  student: 0.1,
  lurker: 0.09,
  operator: 0.07,
};

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function pickWeighted<T extends string>(weights: Record<T, number>, rand: () => number): T {
  let n = rand();
  for (const [key, w] of Object.entries(weights) as [T, number][]) {
    n -= w;
    if (n <= 0) return key;
  }
  return Object.keys(weights)[0] as T;
}

function clamp(n: number, lo = 1, hi = 5) {
  return Math.max(lo, Math.min(hi, n));
}

function score(base: number, rand: () => number) {
  return clamp(Math.round(base + (rand() - 0.5) * 1.4));
}

function chance(p: number, rand: () => number) {
  return rand() < p;
}

function drawVisitor(rand: () => number): Visitor {
  const arrival = pickWeighted(ARRIVAL_WEIGHTS, rand);
  const jitter = () => 0.08 * (rand() - 0.5);
  const base: Record<ArrivalId, Omit<Visitor, 'arrival'>> = {
    passerby: {
      patience: 0.32,
      wantWork: 0.28,
      wantJob: 0.22,
      wantClarity: 0.72,
      careResidue: 0.3,
      finishBias: 0.22,
      readBias: 0.28,
      mysteryTolerance: 0.34,
    },
    job_seeker: {
      patience: 0.48,
      wantWork: 0.36,
      wantJob: 0.86,
      wantClarity: 0.78,
      careResidue: 0.34,
      finishBias: 0.4,
      readBias: 0.42,
      mysteryTolerance: 0.28,
    },
    maker: {
      patience: 0.78,
      wantWork: 0.92,
      wantJob: 0.18,
      wantClarity: 0.28,
      careResidue: 0.62,
      finishBias: 0.8,
      readBias: 0.7,
      mysteryTolerance: 0.82,
    },
    skeptic: {
      patience: 0.55,
      wantWork: 0.44,
      wantJob: 0.3,
      wantClarity: 0.64,
      careResidue: 0.58,
      finishBias: 0.38,
      readBias: 0.74,
      mysteryTolerance: 0.48,
    },
    student: {
      patience: 0.7,
      wantWork: 0.58,
      wantJob: 0.24,
      wantClarity: 0.52,
      careResidue: 0.4,
      finishBias: 0.84,
      readBias: 0.66,
      mysteryTolerance: 0.5,
    },
    lurker: {
      patience: 0.24,
      wantWork: 0.18,
      wantJob: 0.16,
      wantClarity: 0.4,
      careResidue: 0.22,
      finishBias: 0.1,
      readBias: 0.36,
      mysteryTolerance: 0.46,
    },
    operator: {
      patience: 0.68,
      wantWork: 0.7,
      wantJob: 0.2,
      wantClarity: 0.42,
      careResidue: 0.9,
      finishBias: 0.72,
      readBias: 0.64,
      mysteryTolerance: 0.6,
    },
  };
  const b = base[arrival];
  return {
    arrival,
    patience: clamp01(b.patience + jitter()),
    wantWork: clamp01(b.wantWork + jitter()),
    wantJob: clamp01(b.wantJob + jitter()),
    wantClarity: clamp01(b.wantClarity + jitter()),
    careResidue: clamp01(b.careResidue + jitter()),
    finishBias: clamp01(b.finishBias + jitter()),
    readBias: clamp01(b.readBias + jitter()),
    mysteryTolerance: clamp01(b.mysteryTolerance + jitter()),
  };
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function addTag(tags: FeedbackTag[], tag: FeedbackTag, p: number, rand: () => number) {
  if (chance(p, rand) && !tags.includes(tag)) tags.push(tag);
}

function walkOne(seed: number): WalkOutcome {
  const rand = rng(seed);
  const v = drawVisitor(rand);
  const tags: FeedbackTag[] = [];
  const polls: Record<PollKey, number> = {
    understood: 3,
    wantedToContinue: 3,
    feltLikeAPlace: 3,
    feltLikeATest: 3,
    feltLikeAWebsite: 3,
    feltLikeWork: 3,
    caredAboutResidue: 3,
    wantedToParticipate: 3,
  };

  let now = new Date('2026-09-02T12:00:00.000Z');
  const tick = (ms: number) => {
    now = new Date(now.getTime() + ms);
    return now;
  };

  const drop = (beat: BeatId, extra?: Partial<WalkOutcome>): WalkOutcome =>
    finish(beat, extra);

  const finish = (droppedAt: BeatId | 'completed', extra?: Partial<WalkOutcome>): WalkOutcome => {
    const lingered = extra?.lingered ?? false;
    const openedMake = extra?.openedMake ?? false;
    const finishedArtifact = extra?.finishedArtifact ?? false;
    const participate =
      extra?.wantedParticipate ??
      (polls.wantedToParticipate >= 4 && (openedMake || finishedArtifact || (lingered && polls.wantedToContinue >= 4)));
    return {
      arrival: v.arrival,
      droppedAt,
      entered: extra?.entered ?? false,
      noticeDone: extra?.noticeDone ?? false,
      messChoice: extra?.messChoice ?? null,
      named: extra?.named ?? false,
      lingered,
      openedMake,
      bench: extra?.bench ?? '',
      track: extra?.track ?? null,
      finishedArtifact,
      polls,
      tags,
      thoughtItWas: extra?.thoughtItWas ?? guessThought(v, droppedAt, tags, polls),
      wantedParticipate: participate,
    };
  };

  // Door. Lines take time. ENTER is delayed. Mystery is the product.
  addTag(tags, 'door_mystery_held_me', v.mysteryTolerance * 0.82, rand);
  addTag(tags, 'door_expected_a_website', v.wantClarity * 0.7 + (v.arrival === 'passerby' ? 0.2 : 0), rand);
  addTag(tags, 'door_wanted_the_job_ask', v.wantJob * 0.75, rand);

  const doorBounce = 0.08 + v.wantClarity * 0.22 + (1 - v.mysteryTolerance) * 0.18 - v.wantWork * 0.12;
  if (chance(doorBounce, rand)) {
    polls.understood = score(2 + v.mysteryTolerance, rand);
    polls.wantedToContinue = score(1.6 + v.wantWork * 2, rand);
    polls.feltLikeAWebsite = score(4.2, rand);
    polls.feltLikeAPlace = score(2.2 + v.mysteryTolerance, rand);
    polls.feltLikeATest = score(2.4, rand);
    polls.wantedToParticipate = score(1.8 + v.wantWork, rand);
    return drop('door');
  }

  let s: WorkshopSession = createWorkshopSession(now);
  s = revealDoorLine(s, 'line1', now);
  s = revealDoorLine(s, 'line2', tick(3200));
  s = revealDoorLine(s, 'line3', tick(2800));
  s = enterWorkshop(s, tick(2400));

  polls.understood = score(2.4 + v.mysteryTolerance * 1.4 - v.wantJob * 0.8, rand);
  polls.wantedToContinue = score(2.8 + v.wantWork * 2 - v.wantClarity * 0.6, rand);
  polls.feltLikeAPlace = score(3.1 + v.mysteryTolerance * 1.2, rand);
  polls.feltLikeAWebsite = score(3.6 - v.mysteryTolerance, rand);

  // Notice. Writing is the first real cost.
  const regions = ['heading', 'primary', 'helper', 'import', 'badge'] as const;
  const attended: string[] = [];
  for (const id of regions) {
    if (chance(v.readBias * (id === 'primary' ? 1.15 : 0.85), rand)) {
      s = markNoticeRegion(s, id, tick(400 + Math.floor(rand() * 900)), 200 + Math.floor(rand() * 1400));
      attended.push(id);
    }
  }
  const writeCost = 0.16 + (1 - v.finishBias) * 0.28 + (1 - v.wantWork) * 0.22;
  if (attended.length === 0) {
    addTag(tags, 'notice_did_not_know_the_ask', 0.72, rand);
  }
  addTag(tags, 'notice_object_felt_real', 0.35 + v.wantWork * 0.4 + (attended.includes('primary') ? 0.2 : 0), rand);
  addTag(tags, 'notice_felt_like_a_test', 0.22 + v.wantJob * 0.28 + (v.arrival === 'student' ? 0.25 : 0), rand);
  addTag(tags, 'notice_did_not_know_the_ask', 0.12 + (1 - v.readBias) * 0.35 + v.wantClarity * 0.15, rand);

  if (chance(writeCost, rand)) {
    polls.feltLikeATest = score(3.4 + v.wantJob * 0.8, rand);
    polls.feltLikeWork = score(2.6 + attended.length * 0.2, rand);
    polls.wantedToContinue = score(2.2 + v.wantWork, rand);
    polls.wantedToParticipate = score(2 + v.wantWork * 1.2, rand);
    return drop('notice', { entered: true });
  }

  const noticedPrimary = attended.includes('primary') || chance(0.55, rand);
  const notice = noticedPrimary ? 'Delete is the thing you would press.' : 'The first screen is already deciding for them.';
  const change = noticedPrimary ? 'Make start the primary.' : 'Show the import before the delete.';
  s = submitNotice(s, { notice, change }, tick(1800));
  s = advanceWorkshop(s, tick(900));

  polls.feltLikeWork = score(3.2 + v.wantWork * 1.4 + attended.length * 0.15, rand);
  polls.feltLikeATest = score(2.8 + v.wantJob * 0.9 + (v.arrival === 'student' ? 0.6 : 0), rand);
  polls.understood = score(3.1 + (noticedPrimary ? 0.7 : 0) - v.wantClarity * 0.3, rand);

  // Mess.
  const messWeights: Record<string, number> = {
    continue: 0.1 + (1 - v.careResidue) * 0.28 + v.patience * 0.05,
    restore: 0.18 + v.careResidue * 0.35,
    ask: 0.14 + (v.arrival === 'skeptic' ? 0.22 : 0) + v.wantClarity * 0.1,
    split: 0.22 + v.finishBias * 0.18 + (v.arrival === 'operator' ? 0.16 : 0),
  };
  const messChoice = pickWeighted(messWeights, rand);
  s = submitMess(s, messChoice, tick(1400));
  addTag(tags, 'mess_i_cared_about_the_draft', 0.2 + v.careResidue * 0.7 + (messChoice !== 'continue' ? 0.15 : 0), rand);
  addTag(tags, 'mess_felt_like_a_trick', 0.12 + v.wantJob * 0.2 + (v.arrival === 'skeptic' ? 0.28 : 0), rand);
  polls.caredAboutResidue = score(2.2 + v.careResidue * 2.6 + (messChoice === 'continue' ? -0.8 : 0.4), rand);

  if (chance(0.04 + (1 - v.patience) * 0.08, rand)) {
    polls.wantedToContinue = score(2.4, rand);
    polls.wantedToParticipate = score(2.2 + v.wantWork, rand);
    return drop('mess', { entered: true, noticeDone: true, messChoice });
  }

  s = advanceWorkshop(s, tick(800));

  // Named. Brand lands after work. Some feel baited.
  addTag(tags, 'named_landing_felt_earned', 0.28 + v.wantWork * 0.4 + v.mysteryTolerance * 0.2, rand);
  addTag(tags, 'named_felt_like_bait', 0.1 + v.wantJob * 0.38 + (1 - v.mysteryTolerance) * 0.15, rand);
  polls.feltLikeAPlace = score(3.4 + v.mysteryTolerance * 0.8 - v.wantJob * 0.4, rand);
  polls.understood = score(3.3 + 0.4 - v.wantJob * 0.5, rand);

  const namedDrop = 0.05 + v.wantJob * 0.16 + (v.arrival === 'skeptic' ? 0.08 : 0) - v.wantWork * 0.08;
  if (chance(namedDrop, rand)) {
    polls.wantedToContinue = score(2.1, rand);
    polls.wantedToParticipate = score(2.0 + v.wantWork * 0.8, rand);
    return drop('named', { entered: true, noticeDone: true, messChoice, named: true });
  }

  s = linger(s, tick(900));

  // Linger. Explicit permission to leave is the participation filter.
  addTag(tags, 'linger_permission_to_leave', 0.72 + (1 - v.wantJob) * 0.1, rand);
  addTag(tags, 'linger_room_felt_empty', 0.18 + (1 - v.wantWork) * 0.35 + (v.arrival === 'passerby' ? 0.15 : 0), rand);
  addTag(tags, 'linger_wanted_to_touch', 0.18 + v.wantWork * 0.62 + v.careResidue * 0.15, rand);

  polls.feltLikeAPlace = score(3.6 + v.mysteryTolerance * 0.7, rand);
  polls.wantedToContinue = score(2.6 + v.wantWork * 2.1 - (1 - v.patience) * 0.8, rand);

  const leaveLinger = 0.14 + (1 - v.wantWork) * 0.32 + (1 - v.patience) * 0.16 - v.careResidue * 0.08;
  if (chance(leaveLinger, rand)) {
    polls.wantedToParticipate = score(2.3 + v.wantWork * 1.4, rand);
    addTag(tags, 'would_tell_someone', 0.18 + v.mysteryTolerance * 0.2, rand);
    return drop('linger', {
      entered: true,
      noticeDone: true,
      messChoice,
      named: true,
      lingered: true,
      wantedParticipate: polls.wantedToParticipate >= 4 && polls.wantedToContinue >= 4,
    });
  }

  // MAKE. Touch Pulse or the leftover draft.
  const preferDraft = v.careResidue > 0.58 || messChoice === 'ask' || messChoice === 'restore';
  const bench: BenchObject = preferDraft && chance(0.72, rand) ? 'draft' : 'pulse';
  const opened = openMake(s, tick(700));
  if (!opened.ok) {
    polls.wantedToParticipate = score(2.6 + v.wantWork, rand);
    return drop('make', { entered: true, noticeDone: true, messChoice, named: true, lingered: true });
  }
  s = opened.session;

  const visible = tracksVisibleOn(bench, draftTrace(s));
  const track = visible[Math.floor(rand() * visible.length)] ?? visible[0]!;
  s = chooseMakeTrack(s, track, tick(500));

  addTag(tags, 'make_object_opened_not_ui', 0.42 + v.wantWork * 0.35, rand);
  addTag(tags, 'make_notes_felt_like_exercises', 0.16 + (v.arrival === 'student' ? 0.28 : 0) + (visible.length > 1 ? 0.12 : 0), rand);
  addTag(tags, 'make_notes_felt_like_leftover_work', 0.3 + v.careResidue * 0.4 + (bench === 'draft' ? 0.15 : 0), rand);

  polls.feltLikeWork = score(3.8 + v.wantWork * 1.1, rand);
  polls.feltLikeATest = score(2.4 + (v.arrival === 'student' ? 0.8 : 0), rand);

  const abandonMake = 0.1 + (1 - v.finishBias) * 0.28 + (1 - v.wantWork) * 0.12;
  if (chance(abandonMake, rand)) {
    polls.wantedToContinue = score(3.1 + v.wantWork, rand);
    polls.wantedToParticipate = score(3.0 + v.wantWork * 1.3, rand);
    return drop('make', {
      entered: true,
      noticeDone: true,
      messChoice,
      named: true,
      lingered: true,
      openedMake: true,
      bench,
      track,
      wantedParticipate: polls.wantedToParticipate >= 4,
    });
  }

  const body =
    track === 'build'
      ? composeBuildBody('Start', 'It opens an empty bench.')
      : track === 'design'
        ? 'Account above danger. The first change is weight, not copy.'
        : track === 'operate'
          ? 'Owner: restore. Owner: copy. Owner: ask. Owner: continue. Owner: check.'
          : track === 'investigate'
            ? 'Continue had no copy. The draft was the only store.'
            : 'A named path. The person who needed the notes gets them.';
  s = submitMake(s, { body, finished: true }, tick(2400));

  // Method turn. Two lines. No next action. Remember Me is held.
  addTag(tags, 'method_wanted_to_be_shown', 0.48 + v.wantWork * 0.38, rand);
  addTag(tags, 'method_no_next_step', 0.34 + v.finishBias * 0.22 + v.wantClarity * 0.15, rand);
  addTag(tags, 'wanted_to_be_remembered', 0.22 + v.wantWork * 0.28 + v.wantJob * 0.12, rand);
  addTag(tags, 'would_tell_someone', 0.38 + v.wantWork * 0.25 + v.mysteryTolerance * 0.15, rand);

  polls.wantedToContinue = score(3.7 + v.wantWork * 1.2 - 0.4, rand);
  polls.wantedToParticipate = score(3.5 + v.wantWork * 1.4 - v.wantJob * 0.2, rand);
  polls.feltLikeAPlace = score(4.0 + v.mysteryTolerance * 0.5, rand);
  polls.feltLikeAWebsite = score(2.0, rand);
  polls.understood = score(3.6 + v.wantWork * 0.5, rand);
  polls.feltLikeWork = score(4.1, rand);
  polls.caredAboutResidue = score(3.2 + v.careResidue * 1.6, rand);

  const wantedParticipate = polls.wantedToParticipate >= 4;
  return finish('completed', {
    entered: true,
    noticeDone: true,
    messChoice,
    named: true,
    lingered: true,
    openedMake: true,
    bench,
    track,
    finishedArtifact: true,
    wantedParticipate,
  });
}

function guessThought(
  v: Visitor,
  droppedAt: BeatId | 'completed',
  tags: FeedbackTag[],
  polls: Record<PollKey, number>,
): ThoughtId {
  if (tags.includes('named_felt_like_bait') || (v.wantJob > 0.7 && droppedAt !== 'completed')) return 'hiring_funnel';
  if (tags.includes('notice_felt_like_a_test') || v.arrival === 'student') return 'course';
  if (droppedAt === 'door' && v.wantClarity > 0.6) return 'website';
  if (polls.feltLikeAPlace >= 4 && polls.feltLikeWork >= 4) return 'place';
  if (tags.includes('make_object_opened_not_ui') && polls.feltLikeAPlace >= 4) return 'machine';
  if (droppedAt === 'completed' || droppedAt === 'make') return 'workspace';
  if (polls.feltLikeAPlace >= 4) return 'place';
  if (v.mysteryTolerance > 0.7) return 'art_piece';
  return 'application';
}

export type WalkSummary = {
  runs: number;
  seed: number;
  funnel: Record<string, number>;
  funnelPct: Record<string, number>;
  dropAt: Record<string, number>;
  dropAtPct: Record<string, number>;
  arrivals: Record<ArrivalId, number>;
  participateOfArrivals: number;
  participateOfEntered: number;
  participateOfLinger: number;
  participateOfFinished: number;
  participateByArrival: Record<ArrivalId, { n: number; wanted: number; pct: number }>;
  polls: Record<PollKey, { mean: number; byBeatReach: Partial<Record<BeatId | 'completed', number>> }>;
  pollMeansReached: Partial<Record<BeatId | 'completed', Partial<Record<PollKey, number>>>>;
  tags: Record<FeedbackTag, { n: number; pctOfRuns: number; pctOfReached: number; reach: string }>;
  universal: { tag: FeedbackTag; pct: number; among: string }[];
  messChoices: Record<string, number>;
  messChoicePct: Record<string, number>;
  benches: Record<string, number>;
  tracks: Record<string, number>;
  thoughtItWas: Record<ThoughtId, number>;
  thoughtPct: Record<ThoughtId, number>;
  improvements: { id: string; title: string; why: string; evidence: string }[];
  learnings: string[];
};

function pct(n: number, d: number) {
  return d === 0 ? 0 : Math.round((n / d) * 10000) / 100;
}

export function runVisitorWalks(runs = 100_000, seed = 20260902): WalkSummary {
  const arrivals = Object.fromEntries(ARRIVALS.map((a) => [a, 0])) as Record<ArrivalId, number>;
  const dropAt: Record<string, number> = {};
  const funnel = {
    arrivals: 0,
    entered: 0,
    noticeDone: 0,
    messDone: 0,
    named: 0,
    lingered: 0,
    openedMake: 0,
    finishedArtifact: 0,
    wantedParticipate: 0,
  };
  const participateByArrival = Object.fromEntries(
    ARRIVALS.map((a) => [a, { n: 0, wanted: 0, pct: 0 }]),
  ) as WalkSummary['participateByArrival'];
  const pollSum = Object.fromEntries(POLL_KEYS.map((k) => [k, 0])) as Record<PollKey, number>;
  const pollCount = { ...pollSum };
  const tagN = Object.fromEntries(FEEDBACK_TAGS.map((t) => [t, 0])) as Record<FeedbackTag, number>;
  const tagReach = Object.fromEntries(FEEDBACK_TAGS.map((t) => [t, 0])) as Record<FeedbackTag, number>;
  const tagReachBeat: Record<FeedbackTag, string> = {
    door_mystery_held_me: 'door',
    door_expected_a_website: 'door',
    door_wanted_the_job_ask: 'door',
    notice_object_felt_real: 'notice',
    notice_felt_like_a_test: 'notice',
    notice_did_not_know_the_ask: 'notice',
    mess_i_cared_about_the_draft: 'mess',
    mess_felt_like_a_trick: 'mess',
    named_landing_felt_earned: 'named',
    named_felt_like_bait: 'named',
    linger_permission_to_leave: 'linger',
    linger_room_felt_empty: 'linger',
    linger_wanted_to_touch: 'linger',
    make_object_opened_not_ui: 'make',
    make_notes_felt_like_exercises: 'make',
    make_notes_felt_like_leftover_work: 'make',
    method_wanted_to_be_shown: 'method',
    method_no_next_step: 'method',
    wanted_to_be_remembered: 'method',
    would_tell_someone: 'linger',
  };
  const reached = {
    door: 0,
    notice: 0,
    mess: 0,
    named: 0,
    linger: 0,
    make: 0,
    method: 0,
    completed: 0,
  };
  const messChoices: Record<string, number> = {};
  const benches: Record<string, number> = {};
  const tracks: Record<string, number> = {};
  const thoughtItWas = Object.fromEntries(THOUGHTS.map((t) => [t, 0])) as Record<ThoughtId, number>;
  let participateEntered = 0;
  let participateLinger = 0;
  let participateFinished = 0;
  let enteredN = 0;
  let lingerN = 0;
  let finishedN = 0;

  const beatOrder = ['door', 'notice', 'mess', 'named', 'linger', 'make', 'method', 'completed'] as const;
  function reachedBeat(droppedAt: WalkOutcome['droppedAt'], beat: (typeof beatOrder)[number]) {
    const i = beatOrder.indexOf(droppedAt);
    const j = beatOrder.indexOf(beat);
    if (droppedAt === 'completed') return true;
    return i >= j;
  }

  for (let i = 0; i < runs; i++) {
    const walk = walkOne(seed + i * 9973);
    funnel.arrivals += 1;
    arrivals[walk.arrival] += 1;
    dropAt[walk.droppedAt] = (dropAt[walk.droppedAt] ?? 0) + 1;
    thoughtItWas[walk.thoughtItWas] += 1;
    participateByArrival[walk.arrival].n += 1;
    if (walk.wantedParticipate) {
      funnel.wantedParticipate += 1;
      participateByArrival[walk.arrival].wanted += 1;
    }
    if (walk.entered) {
      funnel.entered += 1;
      enteredN += 1;
      if (walk.wantedParticipate) participateEntered += 1;
    }
    if (walk.noticeDone) funnel.noticeDone += 1;
    if (walk.messChoice) {
      funnel.messDone += 1;
      messChoices[walk.messChoice] = (messChoices[walk.messChoice] ?? 0) + 1;
    }
    if (walk.named) funnel.named += 1;
    if (walk.lingered) {
      funnel.lingered += 1;
      lingerN += 1;
      if (walk.wantedParticipate) participateLinger += 1;
    }
    if (walk.openedMake) {
      funnel.openedMake += 1;
      benches[walk.bench || 'none'] = (benches[walk.bench || 'none'] ?? 0) + 1;
      if (walk.track) tracks[walk.track] = (tracks[walk.track] ?? 0) + 1;
    }
    if (walk.finishedArtifact) {
      funnel.finishedArtifact += 1;
      finishedN += 1;
      if (walk.wantedParticipate) participateFinished += 1;
    }
    for (const k of POLL_KEYS) {
      pollSum[k] += walk.polls[k];
      pollCount[k] += 1;
    }
    for (const beat of beatOrder) {
      if (reachedBeat(walk.droppedAt, beat)) reached[beat] += 1;
    }
    for (const tag of FEEDBACK_TAGS) {
      const among = tagReachBeat[tag];
      if (among === 'method') {
        if (walk.finishedArtifact) tagReach[tag] += 1;
      } else if (reachedBeat(walk.droppedAt, among as BeatId)) {
        tagReach[tag] += 1;
      }
    }
    for (const tag of walk.tags) tagN[tag] += 1;
  }

  for (const a of ARRIVALS) {
    participateByArrival[a].pct = pct(participateByArrival[a].wanted, participateByArrival[a].n);
  }

  const tags: WalkSummary['tags'] = {} as WalkSummary['tags'];
  for (const tag of FEEDBACK_TAGS) {
    tags[tag] = {
      n: tagN[tag],
      pctOfRuns: pct(tagN[tag], runs),
      pctOfReached: pct(tagN[tag], tagReach[tag]),
      reach: tagReachBeat[tag],
    };
  }

  const universal = FEEDBACK_TAGS.map((tag) => ({
    tag,
    pct: tags[tag].pctOfReached,
    among: tags[tag].reach,
  }))
    .filter((x) => x.pct >= 70)
    .sort((a, b) => b.pct - a.pct);

  const improvements = buildImprovements({
    funnel,
    tags,
    dropAt,
    runs,
    participateOfFinished: pct(participateFinished, finishedN),
    participateOfArrivals: pct(funnel.wantedParticipate, runs),
  });

  const learnings = buildLearnings({
    funnel,
    tags,
    dropAt,
    runs,
    participateOfArrivals: pct(funnel.wantedParticipate, runs),
    participateOfEntered: pct(participateEntered, enteredN),
    participateOfLinger: pct(participateLinger, lingerN),
    participateOfFinished: pct(participateFinished, finishedN),
    thoughtItWas,
  });

  return {
    runs,
    seed,
    funnel,
    funnelPct: {
      entered: pct(funnel.entered, runs),
      noticeDone: pct(funnel.noticeDone, runs),
      messDone: pct(funnel.messDone, runs),
      named: pct(funnel.named, runs),
      lingered: pct(funnel.lingered, runs),
      openedMake: pct(funnel.openedMake, runs),
      finishedArtifact: pct(funnel.finishedArtifact, runs),
      wantedParticipate: pct(funnel.wantedParticipate, runs),
    },
    dropAt,
    dropAtPct: Object.fromEntries(Object.entries(dropAt).map(([k, n]) => [k, pct(n, runs)])),
    arrivals,
    participateOfArrivals: pct(funnel.wantedParticipate, runs),
    participateOfEntered: pct(participateEntered, enteredN),
    participateOfLinger: pct(participateLinger, lingerN),
    participateOfFinished: pct(participateFinished, finishedN),
    participateByArrival,
    polls: Object.fromEntries(
      POLL_KEYS.map((k) => [k, { mean: Math.round((pollSum[k] / pollCount[k]) * 100) / 100 }]),
    ) as WalkSummary['polls'],
    pollMeansReached: {},
    tags,
    universal,
    messChoices,
    messChoicePct: Object.fromEntries(Object.entries(messChoices).map(([k, n]) => [k, pct(n, funnel.messDone)])),
    benches,
    tracks,
    thoughtItWas,
    thoughtPct: Object.fromEntries(THOUGHTS.map((t) => [t, pct(thoughtItWas[t], runs)])) as WalkSummary['thoughtPct'],
    improvements,
    learnings,
  };
}

function buildImprovements(input: {
  funnel: WalkSummary['funnel'];
  tags: WalkSummary['tags'];
  dropAt: Record<string, number>;
  runs: number;
  participateOfFinished: number;
  participateOfArrivals: number;
}): WalkSummary['improvements'] {
  const t = input.tags;
  return [
    {
      id: 'door-wait',
      title: 'Door mystery filters the impatient before they ever see work',
      why: 'A large share of arrivals bounce before ENTER. That is partly the point. It also means the first object is never seen by the people who needed one concrete thing on the bench sooner.',
      evidence: `${pct(input.dropAt.door ?? 0, input.runs)}% drop at the door. ${t.door_expected_a_website.pctOfReached}% of door-reachers expected a website.`,
    },
    {
      id: 'notice-write',
      title: 'The first write is the steepest wall after the door',
      why: 'Notice asks for two sentences on a conflicting object with no explanation. Makers stay. Lurkers and job-seekers leave. The object is doing its job. The ask still needs to be more obvious from the object itself.',
      evidence: `${pct(input.dropAt.notice ?? 0, input.runs)}% drop at notice. ${t.notice_did_not_know_the_ask.pctOfReached}% of notice-reachers did not know the ask.`,
    },
    {
      id: 'linger-empty',
      title: 'Linger permission is right. The empty-room reading is the cost.',
      why: '“You can go” is working. A slice of people who would have touched Pulse read the room as finished and leave.',
      evidence: `${t.linger_permission_to_leave.pctOfReached}% felt they could leave. ${t.linger_room_felt_empty.pctOfReached}% of linger-reachers said the room felt empty.`,
    },
    {
      id: 'method-dead-end',
      title: 'The method turn creates want and then has nowhere to put it',
      why: 'Remember Me is held. After “now we are going to show you how we make things here,” the built system has no next handle. Finishers want to continue and then stall.',
      evidence: `${t.method_wanted_to_be_shown.pctOfReached}% of finishers wanted to be shown. ${t.method_no_next_step.pctOfReached}% said there was no next step. ${t.wanted_to_be_remembered.pctOfReached}% wanted to be remembered.`,
    },
    {
      id: 'notes-taxonomy',
      title: 'Some still read the notes as exercises',
      why: 'Contextual notes helped. Two notes on Pulse still look like a pair of assignments to students and some skeptics.',
      evidence: `${t.make_notes_felt_like_exercises.pctOfReached}% of people who opened MAKE read notes as exercises. ${t.make_notes_felt_like_leftover_work.pctOfReached}% read them as leftover work.`,
    },
  ];
}

function buildLearnings(input: {
  funnel: WalkSummary['funnel'];
  tags: WalkSummary['tags'];
  dropAt: Record<string, number>;
  runs: number;
  participateOfArrivals: number;
  participateOfEntered: number;
  participateOfLinger: number;
  participateOfFinished: number;
  thoughtItWas: Record<ThoughtId, number>;
}): string[] {
  const t = input.tags;
  return [
    `Of ${input.runs.toLocaleString()} arrivals, ${input.participateOfArrivals}% wanted to participate in what is being laid down — stay, make, and be shown the method.`,
    `Of people who entered, ${input.participateOfEntered}% wanted that. Of people who reached linger, ${input.participateOfLinger}%. Of people who finished an artifact, ${input.participateOfFinished}%.`,
    `The door is doing its job as a filter, not a landing page. ${pct(input.dropAt.door ?? 0, input.runs)}% never enter. Most of those wanted a website or a job ask.`,
    `Permission to leave at linger is the most universal positive. ${t.linger_permission_to_leave.pctOfReached}% of people who got there felt they could go.`,
    `The method turn is the most universal want among finishers, and the missing next step is the most universal complaint among them.`,
    `People do not agree what they found. That disagreement is the current product, not a failure of copy.`,
  ];
}
