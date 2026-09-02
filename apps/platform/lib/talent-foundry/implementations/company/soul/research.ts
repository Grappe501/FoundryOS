/**
 * Research Return + Tool Receipts.
 * Permission to leave, find out, and bring something back.
 * No score. No bibliography form. No privileged tool.
 */

import { emptyInquiry, type InquiryState, type InquiryTurn, type ToolReceipt } from '../spine/envelope';
import { pulseSided } from '../make/surface';
import { recordThinking } from '../thinking-trace';
import type { WorkshopSession } from '../types';

export type InquirySurface = 'rest' | 'away' | 'back';

export function inquiryOf(session: WorkshopSession): InquiryState {
  return session.envelope.inquiry ?? emptyInquiry();
}

export function inquirySurface(session: WorkshopSession): InquirySurface {
  const current = inquiryOf(session).current;
  if (!current) return 'rest';
  if (!current.returnedAt) return 'away';
  if (!current.broughtAt) return 'back';
  return 'rest';
}

export function canLeaveToLook(session: WorkshopSession): boolean {
  if (session.stateId !== 'linger') return false;
  if (session.envelope.progress.make === 'complete') return false;
  if (session.envelope.spineStage !== 'make') return false;
  return inquirySurface(session) === 'rest';
}

function aboutOf(session: WorkshopSession): ToolReceipt['about'] {
  if (session.envelope.progress.make === 'complete') return 'made';
  const track = session.envelope.artifactTrack;
  if (!track) return 'room';
  return pulseSided(track) ? 'pulse' : 'draft';
}

function parseTools(value: string | string[] | undefined): string[] {
  const raw = Array.isArray(value) ? value.join(',') : (value ?? '');
  return raw
    .split(/[,/\n]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function writeInquiry(session: WorkshopSession, inquiry: InquiryState): WorkshopSession {
  return {
    ...session,
    envelope: {
      ...session.envelope,
      inquiry,
    },
  };
}

/** They leave the bench to find something out. The work stays. */
export function leaveToLook(
  session: WorkshopSession,
  input: { question?: string } = {},
  now = new Date(),
): WorkshopSession {
  if (!canLeaveToLook(session)) return session;
  const at = now.toISOString();
  const turn: InquiryTurn = {
    id: `look-${at}`,
    question: input.question?.trim() ?? '',
    finding: '',
    changed: '',
    rejected: '',
    tools: [],
    leftAt: at,
    returnedAt: null,
    broughtAt: null,
  };
  let next = recordThinking(session, {
    beatId: 'research',
    move: 'question',
    fact: { left: true, question: turn.question },
    now,
  });
  next = writeInquiry(next, { ...inquiryOf(next), current: turn });
  return {
    ...next,
    evidence: [
      ...next.evidence,
      {
        id: `look-away-${at}`,
        at,
        stateId: session.stateId,
        type: 'access_event',
        label: 'look-away',
        value: { question: turn.question },
      },
    ],
  };
}

/** They came back. The bench did not punish the leaving. */
export function comeBack(session: WorkshopSession, now = new Date()): WorkshopSession {
  const inquiry = inquiryOf(session);
  const current = inquiry.current;
  if (!current || current.returnedAt) return session;
  const at = now.toISOString();
  let next = recordThinking(session, {
    beatId: 'research',
    move: 'return',
    fact: { returned: true, awayMs: Date.parse(at) - Date.parse(current.leftAt) },
    now,
  });
  next = writeInquiry(next, {
    ...inquiryOf(next),
    current: { ...current, returnedAt: at },
  });
  return {
    ...next,
    evidence: [
      ...next.evidence,
      {
        id: `look-return-${at}`,
        at,
        stateId: session.stateId,
        type: 'access_event',
        label: 'look-return',
        value: { question: current.question },
      },
    ],
  };
}

/** What they found. Finding is enough. The rest is optional. */
export function bringBack(
  session: WorkshopSession,
  input: {
    finding: string;
    changed?: string;
    rejected?: string;
    tools?: string | string[];
  },
  now = new Date(),
): WorkshopSession {
  const inquiry = inquiryOf(session);
  const current = inquiry.current;
  if (!current || !current.returnedAt || current.broughtAt) return session;
  const finding = input.finding.trim();
  if (!finding) return session;
  const at = now.toISOString();
  const changed = input.changed?.trim() ?? '';
  const rejected = input.rejected?.trim() ?? '';
  const tools = parseTools(input.tools);
  const brought: InquiryTurn = {
    ...current,
    finding,
    changed,
    rejected,
    tools,
    broughtAt: at,
  };

  let next = recordThinking(session, {
    beatId: 'research',
    move: 'explain',
    fact: { finding, tools },
    now,
  });
  if (changed || rejected) {
    next = recordThinking(next, {
      beatId: 'research',
      move: 'revise',
      fact: { changed, rejected },
      now: new Date(now.getTime() + 1),
    });
  }

  const receipts = tools.map((tool, index) => ({
    id: `receipt-${at}-${index}`,
    at,
    tool,
    usedFor: finding,
    about: aboutOf(session),
  }));

  next = writeInquiry(next, {
    current: null,
    history: [...inquiry.history, brought],
    receipts: [...inquiry.receipts, ...receipts],
  });

  return {
    ...next,
    evidence: [
      ...next.evidence,
      {
        id: `research-return-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'research-return',
        value: { finding, changed, rejected, tools },
      },
    ],
  };
}

/** Voluntary. How they used a tool. Not surveillance. */
export function addReceipt(
  session: WorkshopSession,
  input: { tool: string; usedFor: string },
  now = new Date(),
): WorkshopSession {
  const tool = input.tool.trim();
  const usedFor = input.usedFor.trim();
  if (!tool || !usedFor) return session;
  if (!session.flags.entered) return session;
  const at = now.toISOString();
  const receipt: ToolReceipt = {
    id: `receipt-${at}`,
    at,
    tool,
    usedFor,
    about: aboutOf(session),
  };
  let next = recordThinking(session, {
    beatId: 'research',
    move: 'explain',
    fact: { tool, usedFor },
    now,
  });
  const inquiry = inquiryOf(next);
  next = writeInquiry(next, {
    ...inquiry,
    receipts: [...inquiry.receipts, receipt],
  });
  return {
    ...next,
    evidence: [
      ...next.evidence,
      {
        id: `tool-receipt-${at}`,
        at,
        stateId: session.stateId,
        type: 'response',
        label: 'tool-receipt',
        value: { tool, usedFor, about: receipt.about },
      },
    ],
  };
}
