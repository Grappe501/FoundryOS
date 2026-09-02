/**
 * Environmental memory. Research becomes residue on the bench.
 * Not badges. A thinking trail: found, tried, failed, survived, made.
 */

import type { WorkshopSession } from '../types';
import { inquiryOf } from './research';

export type FragmentKind = 'source' | 'ai' | 'tested' | 'rejected' | 'changed' | 'works' | 'found' | 'looked';

export type BenchFragment = {
  id: string;
  kind: FragmentKind;
  label: string;
  about: 'pulse' | 'draft' | 'made' | 'room';
};

const AI_TOOL = /chatgpt|claude|gemini|perplexity|copilot|\bai\b/i;
const TEST_FAIL = /fail|wrong|didn't work|did not work|broke|rejected/i;

function clip(text: string, max = 28): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trim()}…`;
}

function sourceLabel(tool: string): { kind: FragmentKind; label: string } {
  if (AI_TOOL.test(tool)) return { kind: 'ai', label: 'AI suggested this' };
  return { kind: 'source', label: `source / ${clip(tool, 22).toLowerCase()}` };
}

/** What the room can show. Chronological. Never a score. */
export function fragmentsFromSession(session: WorkshopSession): BenchFragment[] {
  const inquiry = inquiryOf(session);
  const bits: BenchFragment[] = [];

  if (inquiry.current && !inquiry.current.returnedAt) {
    bits.push({
      id: `${inquiry.current.id}-away`,
      kind: 'looked',
      label: 'went to look',
      about: 'room',
    });
  }

  for (const turn of inquiry.history) {
    const about = receiptAbout(session, turn.broughtAt);
    if (turn.finding) {
      bits.push({
        id: `${turn.id}-found`,
        kind: 'found',
        label: clip(turn.finding),
        about,
      });
    }
    for (const tool of turn.tools) {
      const source = sourceLabel(tool);
      bits.push({
        id: `${turn.id}-${tool}`,
        kind: source.kind,
        label: source.label,
        about,
      });
    }
    if (turn.rejected) {
      bits.push({
        id: `${turn.id}-rejected`,
        kind: TEST_FAIL.test(turn.rejected) ? 'tested' : 'rejected',
        label: TEST_FAIL.test(turn.rejected) ? 'tested — failed' : 'rejected',
        about,
      });
    }
    if (turn.changed) {
      bits.push({
        id: `${turn.id}-changed`,
        kind: 'changed',
        label: 'changed approach',
        about,
      });
    }
  }

  const seen = new Set(bits.map((b) => `${b.kind}:${b.label}`));
  for (const receipt of inquiry.receipts) {
    const source = sourceLabel(receipt.tool);
    const key = `${source.kind}:${source.label}`;
    if (seen.has(key)) continue;
    seen.add(key);
    bits.push({
      id: receipt.id,
      kind: source.kind,
      label: source.label,
      about: receipt.about,
    });
  }

  if (session.envelope.artifact?.finished && inquiry.history.length > 0) {
    bits.push({
      id: 'works',
      kind: 'works',
      label: 'works',
      about: 'made',
    });
  }

  return bits.slice(0, 12);
}

function receiptAbout(session: WorkshopSession, at: string | null): BenchFragment['about'] {
  if (session.envelope.progress.make === 'complete') return 'made';
  const track = session.envelope.artifactTrack;
  if (!track) return 'room';
  void at;
  return track === 'build' || track === 'design' ? 'pulse' : 'draft';
}

/** A restrained fact from how they used tools. Never praise. Never a type. */
export function researchReflection(session: WorkshopSession): string | null {
  const inquiry = inquiryOf(session);
  const tools = [
    ...inquiry.history.flatMap((turn) => turn.tools),
    ...inquiry.receipts.map((receipt) => receipt.tool),
  ]
    .join(' ')
    .toLowerCase();
  if (!tools) return null;
  const usedAi = AI_TOOL.test(tools);
  const usedDocs = /doc|postgres|github|stack|mdn|spec|manual|book/.test(tools);
  const tested =
    inquiry.history.some((turn) => /test|fail|local/.test(`${turn.rejected} ${turn.changed}`.toLowerCase())) ||
    inquiry.receipts.some((receipt) => /test/.test(`${receipt.tool} ${receipt.usedFor}`.toLowerCase()));
  if (usedAi && usedDocs) {
    return 'You used AI for the first hypothesis and documentation for verification.';
  }
  if (tested) return 'You tested before committing.';
  return null;
}
