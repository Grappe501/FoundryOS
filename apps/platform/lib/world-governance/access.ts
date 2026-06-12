/**
 * PASS-033 — Audience access guards
 */

import type { AudienceClassification, UserSegment, WorldAudienceRecord } from './world-audience';
import { getWorldAudience, WORLD_AUDIENCE_REGISTRY } from './world-audience';

export type AccessDecision = {
  allowed: boolean;
  reason?: string;
  requires_age_gate?: boolean;
  requires_disclaimer?: boolean;
  disclaimer_text?: string;
};

const CLASSIFICATION_MIN_AGE: Partial<Record<AudienceClassification, number>> = {
  teen_safe: 13,
  adult_18_plus: 18,
  adult_21_plus: 21,
  medical_only: 18,
  restricted: 18,
};

export function segmentCanAccessWorld(segment: UserSegment, worldSlug: string): AccessDecision {
  const record = getWorldAudience(worldSlug);
  if (!record) {
    return { allowed: true };
  }

  if (record.blocked_segments.includes(segment)) {
    return {
      allowed: false,
      reason: `${record.world_name} is not available for ${segment} accounts (${record.audience_classification}).`,
    };
  }

  if (!record.allowed_segments.includes(segment)) {
    return {
      allowed: false,
      reason: `${record.world_name} requires a different account type.`,
    };
  }

  return {
    allowed: true,
    requires_age_gate: record.requires_age_gate,
    requires_disclaimer: record.requires_disclaimer,
    disclaimer_text: record.disclaimer_text,
  };
}

export function canAssignWorldToStudent(worldSlug: string): boolean {
  const record = getWorldAudience(worldSlug);
  if (!record) return true;
  return record.student_assignment_allowed;
}

export function filterWorldSlugsForSegment(slugs: string[], segment: UserSegment): string[] {
  return slugs.filter((slug) => segmentCanAccessWorld(segment, slug).allowed);
}

export function filterRecordsForSegment(
  records: WorldAudienceRecord[],
  segment: UserSegment,
  studentSafeOnly = false,
): WorldAudienceRecord[] {
  return records.filter((r) => {
    if (studentSafeOnly && r.audience_classification !== 'student_safe') return false;
    return segmentCanAccessWorld(segment, r.world_slug).allowed;
  });
}

export function isStudentSafeClassification(c: AudienceClassification): boolean {
  return c === 'student_safe';
}

export function getMinAgeForClassification(c: AudienceClassification): number | null {
  return CLASSIFICATION_MIN_AGE[c] ?? null;
}

export function listWorldsForExplore(segment: UserSegment, studentSafeOnly: boolean): WorldAudienceRecord[] {
  if (studentSafeOnly) {
    return WORLD_AUDIENCE_REGISTRY.filter((w) => w.audience_classification === 'student_safe');
  }
  return filterRecordsForSegment(WORLD_AUDIENCE_REGISTRY, segment);
}

export function operatorAssignmentWarning(worldSlug: string, targetSegment: UserSegment): string | null {
  if (targetSegment === 'student' || targetSegment === 'teen') {
    if (!canAssignWorldToStudent(worldSlug)) {
      const record = getWorldAudience(worldSlug);
      return `Cannot assign ${record?.world_name ?? worldSlug} to ${targetSegment}: ${record?.reason ?? 'restricted'}`;
    }
  }
  return null;
}
