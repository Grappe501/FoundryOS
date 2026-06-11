/** Future-Proof Starter Assessment — Foundry Trinity funnel */

export type CustomerSegment =
  | 'student'
  | 'parent'
  | 'young-professional'
  | 'career-changer';

export type TrinityPath = 'ai-builder' | 'financial-independence' | 'public-speaking';

export type AssessmentAnswers = {
  segment: CustomerSegment;
  aiLevel: 0 | 1 | 2;
  moneyLevel: 0 | 1 | 2;
  speakingLevel: 0 | 1 | 2;
  primaryWorry: 'job-security' | 'money' | 'communication' | 'community';
};

export type PathScore = {
  path: TrinityPath;
  label: string;
  question: string;
  score: number;
  maxScore: number;
  gap: string;
};

export type AssessmentResult = {
  segment: CustomerSegment;
  segmentLabel: string;
  pathScores: PathScore[];
  recommendedPath: TrinityPath;
  recommendedLabel: string;
  whereYouAre: string;
  whatYouAreMissing: string;
  startPath: string;
  tomorrowHook: string;
};

export const CUSTOMER_SEGMENTS: { id: CustomerSegment; label: string; description: string }[] = [
  { id: 'student', label: 'Student', description: 'Grades 6–12 or college — building foundations early' },
  { id: 'parent', label: 'Parent', description: 'Preparing yourself or your child for the future' },
  { id: 'young-professional', label: 'Young Professional', description: 'Early career — need leverage now' },
  { id: 'career-changer', label: 'Career Changer', description: 'Transitioning — need new skills fast' },
];

export const TRINITY_PATHS: Record<
  TrinityPath,
  { label: string; question: string; slug: string; outcome: string }
> = {
  'ai-builder': {
    label: 'AI Builder',
    question: 'How do I create value?',
    slug: 'ai-builder',
    outcome: 'Become an AI Builder',
  },
  'financial-independence': {
    label: 'Financial Independence',
    question: 'How do I keep value?',
    slug: 'financial-independence',
    outcome: 'Achieve Financial Independence',
  },
  'public-speaking': {
    label: 'Public Speaking',
    question: 'How do I communicate value?',
    slug: 'public-speaking',
    outcome: 'Become a Confident Speaker',
  },
};

const SEGMENT_LABELS: Record<CustomerSegment, string> = {
  student: 'Student',
  parent: 'Parent',
  'young-professional': 'Young Professional',
  'career-changer': 'Career Changer',
};

const GAP_BY_PATH: Record<TrinityPath, string[]> = {
  'ai-builder': [
    'You have not shipped an AI project yet — tutorials alone will not future-proof you.',
    'You need a real project in your toolkit, not more passive learning.',
    'Your next step is small: use AI to solve one real problem this week.',
  ],
  'financial-independence': [
    'You do not have a budget or savings system — income without structure leaks away.',
    'You need evidence-backed money habits, not another finance article.',
    'Your next step: build your first budget and track spending for 30 days.',
  ],
  'public-speaking': [
    'You avoid speaking opportunities — ideas trapped inside cannot create impact.',
    'You need practice with feedback, not more reading about confidence.',
    'Your next step: deliver one 2-minute talk and record it.',
  ],
};

const WHERE_YOU_ARE: Record<TrinityPath, string[]> = {
  'ai-builder': [
    'Curious about AI but have not shipped anything real yet.',
    'Experimenting with AI tools but nothing documented or verified.',
    'Using AI regularly — ready to build systems, not one-offs.',
  ],
  'financial-independence': [
    'No structured approach to money yet — common at your stage.',
    'Basic awareness but no budget, savings goal, or investment plan.',
    'Managing money but missing a wealth-building system.',
  ],
  'public-speaking': [
    'Speaking feels risky — you default to avoiding the spotlight.',
    'You speak when required but lack confidence and structure.',
    'Comfortable presenting — ready for mastery and mentorship.',
  ],
};

const START_PATH: Record<TrinityPath, string> = {
  'ai-builder': 'Road to AI Builder — Project 1: Use AI to solve a real problem',
  'financial-independence': 'Road to Financial Independence — Project 1: Build your first budget',
  'public-speaking': 'Road to Confident Speaker — Project 1: Deliver a 2-minute talk',
};

const TOMORROW_HOOK: Record<TrinityPath, string> = {
  'ai-builder':
    'Tomorrow: document what you built, submit project evidence, and earn your AI Explorer milestone.',
  'financial-independence':
    'Tomorrow: log day 2 of spending, see your budget take shape, and build toward your first savings goal.',
  'public-speaking':
    'Tomorrow: watch your recording, note one improvement, and schedule your next talk.',
};

function pathScore(path: TrinityPath, level: 0 | 1 | 2): PathScore {
  const meta = TRINITY_PATHS[path];
  const score = 2 - level;
  return {
    path,
    label: meta.label,
    question: meta.question,
    score,
    maxScore: 2,
    gap: GAP_BY_PATH[path][level]!,
  };
}

function worryBoost(path: TrinityPath, worry: AssessmentAnswers['primaryWorry']): number {
  if (worry === 'job-security' && path === 'ai-builder') return 1;
  if (worry === 'money' && path === 'financial-independence') return 1;
  if (worry === 'communication' && path === 'public-speaking') return 1;
  if (worry === 'community' && path === 'public-speaking') return 0.5;
  return 0;
}

function segmentBoost(path: TrinityPath, segment: CustomerSegment): number {
  if (segment === 'student' && path === 'financial-independence') return 0.5;
  if (segment === 'student' && path === 'ai-builder') return 0.5;
  if (segment === 'parent' && path === 'financial-independence') return 0.75;
  if (segment === 'career-changer' && path === 'ai-builder') return 0.75;
  if (segment === 'young-professional' && path === 'public-speaking') return 0.5;
  return 0;
}

export function scoreFutureProofAssessment(answers: AssessmentAnswers): AssessmentResult {
  const paths: TrinityPath[] = ['ai-builder', 'financial-independence', 'public-speaking'];
  const pathScores = paths.map((p) => {
    const level =
      p === 'ai-builder' ? answers.aiLevel : p === 'financial-independence' ? answers.moneyLevel : answers.speakingLevel;
    const base = pathScore(p, level);
    const boost = worryBoost(p, answers.primaryWorry) + segmentBoost(p, answers.segment);
    return { ...base, score: base.score + boost };
  });

  pathScores.sort((a, b) => b.score - a.score);
  const recommended = pathScores[0]!;
  const level =
    recommended.path === 'ai-builder'
      ? answers.aiLevel
      : recommended.path === 'financial-independence'
        ? answers.moneyLevel
        : answers.speakingLevel;

  return {
    segment: answers.segment,
    segmentLabel: SEGMENT_LABELS[answers.segment],
    pathScores,
    recommendedPath: recommended.path,
    recommendedLabel: TRINITY_PATHS[recommended.path].label,
    whereYouAre: WHERE_YOU_ARE[recommended.path][level]!,
    whatYouAreMissing: recommended.gap,
    startPath: START_PATH[recommended.path],
    tomorrowHook: TOMORROW_HOOK[recommended.path],
  };
}

export const FUTURE_PROOF_HEADLINE = 'Build Future-Proof Skills';
export const FUTURE_PROOF_SUBHEAD =
  'Create value · Communicate value · Keep value — three paths. One transformation platform.';
export const FUTURE_PROOF_TRAFFIC_INTENTS = [
  'How do I learn AI?',
  'How do I make money?',
  'How do I get better at speaking?',
];
