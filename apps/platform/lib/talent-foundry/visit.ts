import type {
  ChapterId,
  JourneyStateId,
  PaidInterest,
  TalentFoundrySession,
  VisitIntent,
} from './types';

export const VISIT_INTENTS: { id: VisitIntent; label: string }[] = [
  { id: 'volunteer', label: 'I want to volunteer' },
  { id: 'paid', label: "I'm interested in the paid internship" },
  { id: 'both', label: 'Both' },
  { id: 'exploring', label: "I'm just looking" },
];

export const INTENT_TO_PAID: Record<VisitIntent, PaidInterest> = {
  volunteer: 'volunteer',
  paid: 'yes',
  both: 'both',
  exploring: 'unsure',
};

export const FIRST_VISIT_DOOR = 'room' as const;

export const CHAPTER_LABEL: Record<ChapterId, string> = {
  discover: 'Discover',
  show_us: 'Show us',
  step_in: 'Step in',
  your_path: 'Your path',
  operator: 'Operator',
  leader: 'Leader',
};

export function chapterFor(stateId: JourneyStateId | string): ChapterId | null {
  if (
    stateId === 'entry' ||
    stateId === 'mystery' ||
    stateId === 'change_prompt' ||
    stateId === 'acknowledgment' ||
    stateId === 'people_rule' ||
    stateId === 'willingness' ||
    stateId === 'kelly_video' ||
    stateId === 'intent' ||
    stateId === 'paid_brief'
  ) {
    return 'discover';
  }
  if (
    stateId === 'lead_challenge' ||
    stateId === 'scenario_brief' ||
    stateId === 'scenario_volunteers' ||
    stateId === 'scenario_consequences' ||
    stateId === 'optional_doors' ||
    stateId === 'door_room' ||
    stateId === 'door_call' ||
    stateId === 'door_breakdown' ||
    stateId === 'door_ask' ||
    stateId === 'key_one'
  ) {
    return 'show_us';
  }
  if (stateId === 'identify' || stateId === 'youre_in') return 'step_in';
  if (
    stateId === 'opportunity' ||
    stateId === 'availability' ||
    stateId === 'pathway' ||
    stateId === 'mission_one' ||
    stateId === 'handoff' ||
    stateId === 'still_in' ||
    stateId === 'layer2_offer'
  ) {
    return 'your_path';
  }
  if (stateId === 'layer2_operator' || stateId === 'key_two' || stateId === 'layer3_offer') return 'operator';
  if (stateId === 'layer3_leader' || stateId === 'people_rule_close') return 'leader';
  return null;
}

export function wantsPaid(intent: VisitIntent | null): boolean {
  return intent === 'paid' || intent === 'both';
}

export function nextVisitState(session: TalentFoundrySession): JourneyStateId {
  switch (session.stateId) {
    case 'entry':
    case 'mystery':
      return 'change_prompt';
    case 'change_prompt':
    case 'acknowledgment':
      return 'people_rule';
    case 'people_rule':
    case 'willingness':
      return 'kelly_video';
    case 'kelly_video':
    case 'volunteer_commitment':
      return 'intent';
    case 'intent':
      return wantsPaid(session.flags.visitIntent) ? 'paid_brief' : 'lead_challenge';
    case 'paid_brief':
      return 'lead_challenge';
    case 'lead_challenge':
    case 'scenario_brief':
      return 'scenario_volunteers';
    case 'scenario_volunteers':
      return 'scenario_consequences';
    case 'scenario_consequences':
    case 'scenario_revision':
      return 'optional_doors';
    case 'optional_doors':
      return session.flags.keyOne ? 'key_one' : 'identify';
    case 'key_one':
      return 'identify';
    case 'identify':
      return 'youre_in';
    case 'youre_in':
      return 'opportunity';
    case 'opportunity':
      return wantsPaid(session.flags.visitIntent) ? 'availability' : 'mission_one';
    case 'availability':
    case 'pathway':
      return 'mission_one';
    case 'mission_one':
      return 'handoff';
    case 'handoff':
      return session.flags.keyOne && !session.flags.keyTwo ? 'layer2_offer' : 'still_in';
    case 'layer2_offer':
      return 'still_in';
    case 'key_two':
      return session.flags.layer3Enabled && !session.flags.layer3Deferred ? 'layer3_offer' : 'still_in';
    case 'layer3_offer':
      return 'still_in';
    default:
      return session.stateId;
  }
}

export function youreInCopy(intent: VisitIntent | null, firstName: string): { title: string; body: string } {
  const name = firstName.trim() || 'You';
  if (intent === 'volunteer') {
    return { title: `${name}, you’re in.`, body: 'We’ll help you find a place to contribute.' };
  }
  if (intent === 'paid') {
    return {
      title: `${name}, you’re in.`,
      body: 'We’ll consider your interest in the paid lead-intern role. You’re also welcome to participate in the campaign while that process happens.',
    };
  }
  if (intent === 'both') {
    return {
      title: `${name}, you’re in.`,
      body: 'You want to help now and be considered for the paid role. Good. Let’s figure out where you fit.',
    };
  }
  return {
    title: `${name}, you’re in.`,
    body: "You don’t have to decide everything tonight. You can still find a place here.",
  };
}

export function resumeCopy(session: TalentFoundrySession): { kicker: string; title: string; body: string } | null {
  if (!session.flags.identified) return null;
  if (session.stateId === 'layer2_operator') {
    return { kicker: 'Welcome back', title: 'You left the shift in motion.', body: 'Pick up where you stopped.' };
  }
  if (session.stateId === 'layer3_leader') {
    return { kicker: 'Welcome back', title: 'The people are still yours to develop.', body: 'Pick up where you stopped.' };
  }
  if ((session.stateId === 'handoff' || session.stateId === 'layer2_offer' || session.stateId === 'still_in') && session.flags.keyOne && !session.flags.keyTwo) {
    return { kicker: 'Welcome back', title: 'You still have Key One.', body: 'Ready to use it?' };
  }
  if ((session.stateId === 'key_two' || session.stateId === 'layer3_offer' || session.stateId === 'still_in') && session.flags.keyTwo) {
    return { kicker: 'Welcome back', title: 'You still have Key Two.', body: 'The next door is about the people you lead.' };
  }
  if (session.flags.identified && session.stateId !== 'entry') {
    const name = session.identity?.firstName?.trim();
    return {
      kicker: 'Welcome back',
      title: name ? `${name}.` : 'You’re still in.',
      body: 'Your progress is here.',
    };
  }
  return null;
}

export function intentSummary(intent: VisitIntent | null): string {
  if (intent === 'volunteer') return 'You came to volunteer.';
  if (intent === 'paid') return 'You asked to be considered for the paid lead-intern role.';
  if (intent === 'both') return 'You want to help now and be considered for the paid role.';
  if (intent === 'exploring') return 'You were looking. You can still find a place here.';
  return 'You showed up.';
}
