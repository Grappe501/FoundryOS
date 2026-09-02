import { createHash, randomBytes } from 'node:crypto';

const TOKEN_BYTES = 32;
const TOKEN_RE = /^[A-Za-z0-9_-]{32,128}$/;

export function generateResumeToken(): string {
  return randomBytes(TOKEN_BYTES).toString('base64url');
}

export function hashResumeToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export function isResumeTokenShape(token: string): boolean {
  return TOKEN_RE.test(token);
}

/** 180 days — campaign window, not a same-day session. */
export const RESUME_TTL_MS = 180 * 24 * 60 * 60 * 1000;

export function resumeExpiresAt(now = new Date()): Date {
  return new Date(now.getTime() + RESUME_TTL_MS);
}
