import { makeSurface } from '../make/surface';
import type { WorkshopSession } from '../types';
import {
  SOUL_DEFAULT_RESPONSE,
  SOUL_LOOP,
  type SoulLoopPhase,
} from './contract';
import { hasFact, placeFacts, type PlaceFact } from './memory';

export type SoulPresence = 'still' | 'listening' | 'remembering' | 'opening';
export type SoulTrust = 'stranger' | 'observer' | 'guest' | 'worker' | 'capable';
export type SoulRhythm = 'mystery' | 'friction' | 'silence' | 'agency' | 'recognition';
export type SoulVoiceKind = 'silence' | 'history' | 'challenge';

export type SoulVoice = {
  kind: SoulVoiceKind;
  line: string | null;
};

export type SoulState = {
  presence: SoulPresence;
  trust: SoulTrust;
  rhythm: SoulRhythm;
  loop: SoulLoopPhase;
  facts: PlaceFact[];
  voice: SoulVoice;
  /** Marks that may wake. Never a CTA. */
  mystery: string[];
  /** What the room may now expose because work happened. Not XP. */
  reachable: string[];
  claps: false;
  infersPerson: false;
  optimizesSessionLength: false;
  punishesLeaving: false;
};

export function readSoul(session: WorkshopSession): SoulState {
  const surface = makeSurface(session);
  const facts = placeFacts(session);
  const trust = trustOf(session, surface);
  const rhythm = rhythmOf(session, surface);
  const loop = loopOf(session, surface, facts);
  const presence = presenceOf(trust, rhythm, facts);
  const voice = voiceOf(session, surface, facts, rhythm);
  const mystery = mysteryOf(facts, surface);
  const reachable = reachableOf(trust, facts);

  return {
    presence,
    trust,
    rhythm,
    loop,
    facts,
    voice,
    mystery,
    reachable,
    claps: false,
    infersPerson: false,
    optimizesSessionLength: false,
    punishesLeaving: false,
  };
}

function trustOf(session: WorkshopSession, surface: ReturnType<typeof makeSurface>): SoulTrust {
  if (!session.flags.entered) return 'stranger';
  if (surface === 'equipped' || session.envelope.progress.make === 'complete') return 'capable';
  if (surface === 'need' || surface === 'attempt') return 'worker';
  if (session.stateId === 'linger') return 'guest';
  return 'observer';
}

function rhythmOf(session: WorkshopSession, surface: ReturnType<typeof makeSurface>): SoulRhythm {
  if (surface === 'equipped') return 'recognition';
  if (surface === 'attempt' || surface === 'need') return 'agency';
  if (session.stateId === 'door') return 'mystery';
  if (session.stateId === 'notice' || session.stateId === 'notice_ack') return 'friction';
  if (session.stateId === 'mess' || session.stateId === 'mess_consequence') return 'friction';
  return 'silence';
}

function loopOf(
  session: WorkshopSession,
  surface: ReturnType<typeof makeSurface>,
  facts: PlaceFact[],
): SoulLoopPhase {
  if (surface === 'equipped') {
    return hasFact(facts, 'work-stayed') ? 'new_mystery' : 'recognition';
  }
  if (surface === 'attempt') return 'attempt';
  if (surface === 'need') return 'discovery';
  if (session.stateId === 'door') return 'curiosity';
  if (session.stateId === 'notice') return session.flags.noticeStarted ? 'attempt' : 'friction';
  if (session.stateId === 'mess' || session.stateId === 'mess_consequence') return 'consequence';
  if (session.stateId === 'named') return 'recognition';
  if (session.stateId === 'linger') return 'agency';
  return SOUL_LOOP[0];
}

function presenceOf(trust: SoulTrust, rhythm: SoulRhythm, facts: PlaceFact[]): SoulPresence {
  if (trust === 'capable') return 'opening';
  if (facts.length > 0 && (rhythm === 'silence' || rhythm === 'recognition')) return 'remembering';
  if (trust === 'worker' || trust === 'observer') return 'listening';
  return 'still';
}

function voiceOf(
  session: WorkshopSession,
  surface: ReturnType<typeof makeSurface>,
  facts: PlaceFact[],
  rhythm: SoulRhythm,
): SoulVoice {
  if (surface === 'equipped') {
    const challenge = facts.find((f) => f.id === 'fixed-symptom');
    if (challenge) return { kind: 'challenge', line: challenge.line };
    return { kind: SOUL_DEFAULT_RESPONSE, line: null };
  }
  if (surface === 'attempt' || surface === 'need') {
    return { kind: SOUL_DEFAULT_RESPONSE, line: null };
  }
  if (rhythm === 'silence') {
    const left = facts.find((f) => f.id === 'left-unfinished');
    if (left) return { kind: 'history', line: left.line };
    return { kind: SOUL_DEFAULT_RESPONSE, line: null };
  }
  if (session.stateId === 'mess_consequence') {
    const chose = facts.find((f) => f.about === 'draft' && f.kind === 'chose');
    if (chose && chose.id === 'question-stays') {
      return { kind: 'challenge', line: 'That was not the obvious solution.' };
    }
    return { kind: SOUL_DEFAULT_RESPONSE, line: null };
  }
  return { kind: SOUL_DEFAULT_RESPONSE, line: null };
}

function mysteryOf(facts: PlaceFact[], surface: ReturnType<typeof makeSurface>): string[] {
  const marks: string[] = [];
  if (hasFact(facts, 'noticed-import')) marks.push('join-to-draft');
  if (hasFact(facts, 'notes-gone')) marks.push('empty-bay');
  if (surface === 'equipped' || hasFact(facts, 'work-stayed')) marks.push('far-tool');
  return marks;
}

function reachableOf(trust: SoulTrust, facts: PlaceFact[]): string[] {
  const out: string[] = [];
  if (trust === 'observer' || trust === 'guest' || trust === 'worker' || trust === 'capable') {
    out.push('pulse');
  }
  if (trust === 'guest' || trust === 'worker' || trust === 'capable') out.push('draft');
  if (hasFact(facts, 'work-stayed') || trust === 'capable') out.push('made');
  if (trust === 'capable') out.push('deeper-machine');
  return out;
}
