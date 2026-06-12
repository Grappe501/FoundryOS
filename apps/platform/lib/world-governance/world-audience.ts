/**
 * PASS-033 — Global world audience registry
 * Single source of truth for age-safe classification and assignment rules.
 */

export type AudienceClassification =
  | 'student_safe'
  | 'teen_safe'
  | 'adult_18_plus'
  | 'adult_21_plus'
  | 'medical_only'
  | 'restricted';

export type UserSegment = 'student' | 'teen' | 'parent' | 'adult' | 'caregiver' | 'operator';

export type WorldAudienceRecord = {
  world_slug: string;
  world_name: string;
  audience_classification: AudienceClassification;
  reason: string;
  allowed_segments: UserSegment[];
  blocked_segments: UserSegment[];
  requires_age_gate: boolean;
  requires_disclaimer: boolean;
  requires_guardian_context: boolean;
  student_assignment_allowed: boolean;
  disclaimer_text?: string;
  /** Internal role title — not always public marketing copy */
  internal_steward_title?: string;
};

const STUDENT_SEGMENTS: UserSegment[] = ['student'];
const TEEN_SEGMENTS: UserSegment[] = ['student', 'teen'];
const ALL_SEGMENTS: UserSegment[] = ['student', 'teen', 'parent', 'adult', 'caregiver', 'operator'];

export const WORLD_AUDIENCE_REGISTRY: WorldAudienceRecord[] = [
  {
    world_slug: 'ai-builder',
    world_name: 'AI Builder',
    audience_classification: 'student_safe',
    reason: 'Project-based AI literacy — no restricted substances or gambling.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: false,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    internal_steward_title: 'Builder Coach',
  },
  {
    world_slug: 'financial-independence',
    world_name: 'Financial Independence',
    audience_classification: 'student_safe',
    reason: 'Budgeting and literacy framing — no investment guarantees; age-appropriate money skills.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: true,
    student_assignment_allowed: true,
    disclaimer_text: 'Educational only — not financial advice. Consult qualified professionals.',
    internal_steward_title: 'Money Coach',
  },
  {
    world_slug: 'public-speaking',
    world_name: 'Public Speaking',
    audience_classification: 'student_safe',
    reason: 'Communication craft — appropriate for schools and families.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: false,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    internal_steward_title: 'Speech Coach',
  },
  {
    world_slug: 'civic-engagement',
    world_name: 'Civic Engagement',
    audience_classification: 'student_safe',
    reason: 'Nonpartisan civic education — no candidate ratings or election persuasion.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    disclaimer_text: 'Nonpartisan civic education — not legal or electioneering advice.',
    internal_steward_title: 'Civic Guide',
  },
  {
    world_slug: 'chess',
    world_name: 'Chess',
    audience_classification: 'student_safe',
    reason: 'Strategy game — no gambling framing in student pathways.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: false,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    internal_steward_title: 'Chess Coach',
  },
  {
    world_slug: 'bbq',
    world_name: 'BBQ',
    audience_classification: 'teen_safe',
    reason: 'Open flame, food safety, optional alcohol-pairing mentions in advanced content.',
    allowed_segments: ['teen', 'parent', 'adult', 'caregiver', 'operator'],
    blocked_segments: STUDENT_SEGMENTS,
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: true,
    student_assignment_allowed: false,
    disclaimer_text: 'Grilling involves fire and food safety — adult supervision recommended for minors.',
    internal_steward_title: 'Pitmaster Coach',
  },
  {
    world_slug: 'bourbon',
    world_name: 'Bourbon',
    audience_classification: 'adult_21_plus',
    reason: 'Alcohol consumption and tasting missions require legal drinking age.',
    allowed_segments: ['adult', 'operator'],
    blocked_segments: [...STUDENT_SEGMENTS, 'teen', 'parent'],
    requires_age_gate: true,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: false,
    disclaimer_text: '21+ only. Educational appreciation — drink responsibly and follow local law.',
    internal_steward_title: 'Bourbon Steward',
  },
  {
    world_slug: 'poker',
    world_name: 'Poker',
    audience_classification: 'adult_18_plus',
    reason: 'Probability and strategy framing — no real-money gambling; adult themes in casino context.',
    allowed_segments: ['adult', 'operator'],
    blocked_segments: [...STUDENT_SEGMENTS, 'teen', 'parent'],
    requires_age_gate: true,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: false,
    disclaimer_text: 'Strategy education only — not gambling advice. No real-money play on Foundry.',
    internal_steward_title: 'Strategy Coach',
  },
  {
    world_slug: 'cigars',
    world_name: 'Cigars',
    audience_classification: 'adult_21_plus',
    reason: 'Tobacco product — adult only.',
    allowed_segments: ['adult', 'operator'],
    blocked_segments: [...STUDENT_SEGMENTS, 'teen', 'parent', 'caregiver'],
    requires_age_gate: true,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: false,
    disclaimer_text: '21+ only. Tobacco health risks apply.',
  },
  {
    world_slug: 'medical-cannabis-literacy',
    world_name: 'Medical Cannabis Literacy',
    audience_classification: 'medical_only',
    reason: 'Cannabis education for adults, patients, and caregivers — never minors.',
    allowed_segments: ['adult', 'caregiver', 'operator'],
    blocked_segments: [...STUDENT_SEGMENTS, 'teen', 'parent'],
    requires_age_gate: true,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: false,
    disclaimer_text:
      'Educational only — not medical advice. Follow local law. Consult qualified healthcare professionals.',
    internal_steward_title: 'Cannabis Literacy Guide',
  },
  {
    world_slug: 'entrepreneur',
    world_name: 'Entrepreneur / Business Builder',
    audience_classification: 'student_safe',
    reason: 'Age-appropriate business education — validation, budgeting, operations.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: true,
    student_assignment_allowed: true,
    disclaimer_text: 'Educational business literacy — not legal or tax advice.',
    internal_steward_title: 'Business Builder Coach',
  },
  {
    world_slug: 'world-religion-history',
    world_name: 'World Religion History',
    audience_classification: 'student_safe',
    reason: 'Neutral academic comparative religion — no proselytizing.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    disclaimer_text: 'Academic study of religion — neutral tone; does not promote or attack any faith.',
  },
  {
    world_slug: 'government-systems',
    world_name: 'Government Systems',
    audience_classification: 'student_safe',
    reason: 'Nonpartisan civics — how power and rules work.',
    allowed_segments: ALL_SEGMENTS,
    blocked_segments: [],
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: true,
    disclaimer_text: 'Nonpartisan civic education — not legal advice.',
  },
  {
    world_slug: 'astrology',
    world_name: 'Astrology',
    audience_classification: 'teen_safe',
    reason: 'Cultural and symbolic framing — no deterministic life predictions.',
    allowed_segments: ['teen', 'parent', 'adult', 'caregiver', 'operator'],
    blocked_segments: STUDENT_SEGMENTS,
    requires_age_gate: false,
    requires_disclaimer: true,
    requires_guardian_context: false,
    student_assignment_allowed: false,
    disclaimer_text: 'Cultural and symbolic study — not science or deterministic prediction.',
  },
];

export function getWorldAudience(slug: string): WorldAudienceRecord | undefined {
  return WORLD_AUDIENCE_REGISTRY.find((w) => w.world_slug === slug);
}

export function listStudentSafeWorlds(): WorldAudienceRecord[] {
  return WORLD_AUDIENCE_REGISTRY.filter((w) => w.audience_classification === 'student_safe');
}

export function listAdultRestrictedWorlds(): WorldAudienceRecord[] {
  return WORLD_AUDIENCE_REGISTRY.filter(
    (w) =>
      w.audience_classification === 'adult_18_plus' ||
      w.audience_classification === 'adult_21_plus' ||
      w.audience_classification === 'medical_only' ||
      w.audience_classification === 'restricted',
  );
}
