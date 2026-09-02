import { markFirstInput, submitBeat, textMetrics } from '../clocks';
import { syncEnvelope, tryEnterStage } from '../spine/kernel';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';
import { leadConstraintFor } from './constraints';
import { LEAD_COPY } from './copy';

export function openLead(session: WorkshopSession, now = new Date()) {
  const result = tryEnterStage(session, 'lead', now);
  if (!result.ok) return result;
  const at = now.toISOString();
  const constraint = leadConstraintFor(result.session.envelope.artifactTrack);
  let next = recordThinking(result.session, {
    beatId: 'lead',
    move: 'constraint_seek',
    fact: { constraintId: constraint.id, limit: constraint.limit, copy: LEAD_COPY.arrived },
    now,
  });
  next = {
    ...next,
    envelope: {
      ...next.envelope,
      lead: {
        constraintId: constraint.id,
        keep: '',
        assign: '',
        cut: '',
        finished: false,
        openedAt: at,
        submittedAt: null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `lead-open-${at}`,
        at,
        stateId: next.stateId,
        type: 'access_event',
        label: 'lead',
        value: {
          constraint,
          fictional: true,
          cohort: false,
          appointment: false,
          ask: LEAD_COPY.ask,
        },
      },
    ],
  };
  return { ok: true as const, session: next };
}

export function submitLead(
  session: WorkshopSession,
  input: { keep: string; assign: string; cut: string; finished: boolean },
  now = new Date(),
): WorkshopSession {
  if (session.envelope.spineStage !== 'lead' || session.envelope.progress.lead !== 'open') {
    throw new Error('lead_not_open');
  }
  const constraint = leadConstraintFor(session.envelope.artifactTrack);
  const at = now.toISOString();
  let next = markFirstInput(session, 'lead', now);
  next = recordThinking(next, {
    beatId: 'lead',
    move: 'decide',
    fact: { keep: input.keep, constraintId: constraint.id },
    now,
  });
  next = recordThinking(next, {
    beatId: 'lead',
    move: 'handoff',
    fact: { assign: input.assign },
    now: new Date(now.getTime() + 1),
  });
  next = recordThinking(next, {
    beatId: 'lead',
    move: 'scope_cut',
    fact: { cut: input.cut },
    now: new Date(now.getTime() + 2),
  });
  next = recordThinking(next, {
    beatId: 'lead',
    move: input.finished ? 'finish' : 'abandon',
    fact: { finished: input.finished },
    now: new Date(now.getTime() + 3),
  });
  if (input.finished) next = submitBeat(next, 'lead', now);
  const progress = { ...next.envelope.progress };
  if (input.finished) progress.lead = 'complete';
  const prior = next.envelope.lead;
  return syncEnvelope({
    ...next,
    envelope: {
      ...next.envelope,
      progress,
      lead: {
        constraintId: constraint.id,
        keep: input.keep,
        assign: input.assign,
        cut: input.cut,
        finished: input.finished,
        openedAt: prior?.openedAt ?? at,
        submittedAt: input.finished ? at : null,
      },
    },
    evidence: [
      ...next.evidence,
      {
        id: `lead-work-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'lead-turn',
        value: {
          constraintId: constraint.id,
          keep: input.keep,
          assign: input.assign,
          cut: input.cut,
          finished: input.finished,
          metrics: {
            keep: textMetrics(input.keep),
            assign: textMetrics(input.assign),
            cut: textMetrics(input.cut),
          },
          fictional: true,
          cohort: false,
          appointment: false,
          clock: next.clocks.lead,
        },
      },
    ],
  });
}
