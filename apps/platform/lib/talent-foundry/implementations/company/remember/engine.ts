import { markFirstInput, submitBeat } from '../clocks';
import type { RememberFields } from '../spine/envelope';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { REMEMBER_COPY } from './copy';

const FORBIDDEN_REMEMBER_KEYS = ['phone', 'resume', 'résumé', 'availability', 'salary', 'resumeUrl'] as const;

function assertRememberOpen(session: WorkshopSession): void {
  if (session.envelope.spineStage !== 'remember' || session.envelope.progress.remember !== 'open') {
    throw new Error('remember_not_open');
  }
}

function cleanFields(input: RememberFields): RememberFields {
  const extra = Object.keys(input).filter(
    (k) => !['firstName', 'lastName', 'email', 'location', 'schoolOrWork'].includes(k),
  );
  if (extra.length) throw new Error(`remember_forbidden_field:${extra[0]}`);
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim();
  if (!firstName || !lastName || !email) throw new Error('remember_required');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('remember_email');
  return {
    firstName,
    lastName,
    email,
    ...(input.location?.trim() ? { location: input.location.trim() } : {}),
    ...(input.schoolOrWork?.trim() ? { schoolOrWork: input.schoolOrWork.trim() } : {}),
  };
}

export function openRemember(session: WorkshopSession, now = new Date()) {
  return tryEnterStage(session, 'remember', now);
}

export function keepExploring(session: WorkshopSession, now = new Date()): WorkshopSession {
  assertRememberOpen(session);
  const at = now.toISOString();
  let next = markFirstInput(session, 'remember', now);
  next = recordThinking(next, {
    beatId: 'remember',
    move: 'decide',
    fact: { choice: 'keep_exploring', copy: REMEMBER_COPY.keepExploring },
    now,
  });
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      rememberChoice: 'keep_exploring',
      remember: null,
      placeEligible: false,
    },
    evidence: [
      ...next.evidence,
      {
        id: `remember-keep-${at}`,
        at,
        stateId: session.stateId,
        type: 'access_event',
        label: 'keep-exploring',
        value: { artifactKept: Boolean(next.envelope.artifact) },
      },
    ],
  });
}

export function rememberMe(
  session: WorkshopSession,
  input: RememberFields,
  now = new Date(),
): WorkshopSession {
  assertRememberOpen(session);
  for (const key of FORBIDDEN_REMEMBER_KEYS) {
    if (key in (input as Record<string, unknown>) && (input as Record<string, unknown>)[key] != null) {
      throw new Error(`remember_forbidden_field:${key}`);
    }
  }
  const fields = cleanFields(input);
  const at = now.toISOString();
  let next = markFirstInput(session, 'remember', now);
  next = recordThinking(next, {
    beatId: 'remember',
    move: 'decide',
    fact: { choice: 'remember_me', email: fields.email },
    now,
  });
  next = recordThinking(next, {
    beatId: 'remember',
    move: 'finish',
    fact: { leftBehind: true },
    now: new Date(now.getTime() + 1),
  });
  next = submitBeat(next, 'remember', now);
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      rememberChoice: 'remember_me',
      remember: fields,
      placeEligible: true,
      progress: { ...next.envelope.progress, remember: 'complete' },
    },
    evidence: [
      ...next.evidence,
      {
        id: `remember-me-${at}`,
        at,
        stateId: session.stateId,
        type: 'identity',
        label: 'remember-me',
        value: { ...fields, placeEligible: true },
      },
    ],
  });
}
