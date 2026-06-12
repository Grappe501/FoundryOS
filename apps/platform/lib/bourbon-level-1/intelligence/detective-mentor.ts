/** Detective → Mentor integration — world responds to closed cases */

export type MentorRecommendation = {
  label: string;
  href: string;
  why: string;
};

export type DetectiveMentorFollowUp = {
  caseSlug: string;
  mentorLine: string;
  becauseYouSolved: string;
  recommendations: MentorRecommendation[];
};

export const DETECTIVE_MENTOR_FOLLOWUPS: Record<string, DetectiveMentorFollowUp> = {
  'weller-ghost': {
    caseSlug: 'weller-ghost',
    mentorLine: 'You understand the ghost now — allocation is the story, not the mash.',
    becauseYouSolved: 'Because you solved the Weller case, chase these next:',
    recommendations: [
      { label: 'Bourbon Economy', href: '/bourbon/economy', why: 'Allocation, MSRP, secondary — the hunt math.' },
      { label: 'Store Pick Academy', href: '/bourbon/store-picks', why: 'When hunting fails, picks teach barrel variance.' },
      { label: 'Buffalo Trace rivalries', href: '/bourbon/wars/buffalo-trace-vs-heaven-hill', why: 'BT vs HH — pick a side with evidence.' },
    ],
  },
  'eagle-rare-price': {
    caseSlug: 'eagle-rare-price',
    mentorLine: 'Price variance is psychology stacked on supply — not quality in the glass.',
    becauseYouSolved: 'Because you closed the Eagle Rare case:',
    recommendations: [
      { label: 'Watchtower signals', href: '/bourbon/watchtower', why: 'See what the market is arguing about this week.' },
      { label: 'Compare 5 bottles', href: '/bourbon/compare', why: 'Stack Eagle Rare against shelf staples blind.' },
      { label: 'Bourbon Economy', href: '/bourbon/economy', why: 'MSRP vs street — full rabbit hole.' },
    ],
  },
  'dsp-numbers': {
    caseSlug: 'dsp-numbers',
    mentorLine: 'Labels tell stories. DSP tells truth.',
    becauseYouSolved: 'Because you cracked the DSP case:',
    recommendations: [
      { label: 'Bottle X-Ray', href: '/bourbon/x-ray', why: 'Break down any bottle layer by layer.' },
      { label: 'Producer Atlas', href: '/bourbon/producers', why: 'Know the house before the hype.' },
      { label: 'Craft marketing debate', href: '/bourbon/lore#lore-debates', why: 'Is craft mostly marketing? Pick a camp.' },
    ],
  },
  'barrel-floor': {
    caseSlug: 'barrel-floor',
    mentorLine: 'Same mash, different floor — now you know why picks matter.',
    becauseYouSolved: 'Because you solved the barrel floor case:',
    recommendations: [
      { label: 'Store Pick Academy', href: '/bourbon/store-picks', why: 'Pickers taste floors — learn their language.' },
      { label: 'Bourbon Lab', href: '/bourbon/lab', why: 'Simulate char, age, proof — see variables stack.' },
      { label: 'This month\'s hunt', href: '/bourbon/hunt', why: 'Find a store pick — check it off.' },
    ],
  },
  'bib-guarantee': {
    caseSlug: 'bib-guarantee',
    mentorLine: 'BiB is transparency you can trust at $15.',
    becauseYouSolved: 'Because you closed the BiB case:',
    recommendations: [
      { label: 'Evan Williams progression', href: '/bourbon/bottles/evan-williams-black', why: 'Start the value ladder.' },
      { label: 'This month\'s hunt', href: '/bourbon/hunt', why: 'Find a bottled-in-bond — mission on.' },
      { label: 'Bottle chains', href: '/bourbon/chains', why: 'See where value hunting leads.' },
    ],
  },
  'store-pick-magic': {
    caseSlug: 'store-pick-magic',
    mentorLine: 'Great picks are curated barrels — not magic.',
    becauseYouSolved: 'Because you closed the store pick case:',
    recommendations: [
      { label: 'Store Pick Academy', href: '/bourbon/store-picks', why: 'Go deep — programs, questions, when worth it.' },
      { label: 'Compare wheated bottles', href: '/bourbon/compare', why: 'Standard vs pick side by side.' },
      { label: 'Campus maps', href: '/bourbon/campus', why: 'See where barrels age before pickers choose.' },
    ],
  },
  'allocated-worth': {
    caseSlug: 'allocated-worth',
    mentorLine: 'Allocation is a hobby layer — only at fair price.',
    becauseYouSolved: 'Because you closed the allocation case:',
    recommendations: [
      { label: 'Blind Tasting League', href: '/bourbon/league', why: 'Test if hype survives blind.' },
      { label: 'Shelf intelligence', href: '/bourbon/shelf-intelligence', why: 'Let your shelf talk back — gaps and next moves.' },
      { label: 'Legend: The Pappy Hunt', href: '/bourbon/legends/pappy-hunt', why: 'The story behind the lottery.' },
    ],
  },
};

export function getDetectiveMentorFollowUp(caseSlug: string): DetectiveMentorFollowUp | undefined {
  return DETECTIVE_MENTOR_FOLLOWUPS[caseSlug];
}

export function mentorFollowUpsForSolvedCases(solvedSlugs: string[]): DetectiveMentorFollowUp[] {
  return solvedSlugs.map((s) => DETECTIVE_MENTOR_FOLLOWUPS[s]).filter(Boolean) as DetectiveMentorFollowUp[];
}
