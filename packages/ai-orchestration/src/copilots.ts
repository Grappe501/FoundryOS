export type CopilotAction =
  | 'explain_lesson'
  | 'recommend_next_mission'
  | 'review_reflection'
  | 'suggest_glossary_terms'
  | 'connect_related_worlds'
  | 'generate_practice_drills'
  | 'summarize_progress'
  | 'create_7_day_plan';

export type CopilotPersona = {
  world_slug: string;
  persona_name: string;
  tagline: string;
  tone: string;
};

export const COPILOT_PERSONAS: CopilotPersona[] = [
  { world_slug: 'ai-builder', persona_name: 'Builder Coach', tagline: 'Ship projects, not just prompts.', tone: 'practical' },
  { world_slug: 'financial-independence', persona_name: 'Money Coach', tagline: 'Build habits before hot tips.', tone: 'grounded' },
  { world_slug: 'public-speaking', persona_name: 'Speech Coach', tagline: 'Clarity beats charisma.', tone: 'supportive' },
  { world_slug: 'civic-engagement', persona_name: 'Civic Guide', tagline: 'Nonpartisan — learn how power works.', tone: 'neutral' },
  { world_slug: 'bourbon', persona_name: 'Bourbon Steward', tagline: 'Taste with intention — 21+ only.', tone: 'refined' },
  { world_slug: 'bbq', persona_name: 'Pitmaster Coach', tagline: 'Fire, patience, and feeding people.', tone: 'warm' },
  { world_slug: 'poker', persona_name: 'Strategy Coach', tagline: 'Probability over luck — no real-money play.', tone: 'analytical' },
  { world_slug: 'medical-cannabis-literacy', persona_name: 'Cannabis Literacy Guide', tagline: 'Educational only — not medical advice.', tone: 'careful' },
  { world_slug: 'entrepreneur', persona_name: 'Business Builder Coach', tagline: 'Validate before you scale.', tone: 'direct' },
];

export function getCopilotPersona(worldSlug: string): CopilotPersona | undefined {
  return COPILOT_PERSONAS.find((p) => p.world_slug === worldSlug);
}

export type CopilotRequest = {
  world_slug: string;
  action: CopilotAction;
  user_segment: 'student' | 'teen' | 'parent' | 'adult' | 'caregiver' | 'operator';
  context?: Record<string, string>;
};

export type CopilotResponse = {
  persona: string;
  action: CopilotAction;
  message: string;
  suggestions: string[];
  blocked?: boolean;
  block_reason?: string;
};

export const COPILOT_ACTION_LABELS: Record<CopilotAction, string> = {
  explain_lesson: 'Explain this lesson',
  recommend_next_mission: 'Recommend next mission',
  review_reflection: 'Review my reflection',
  suggest_glossary_terms: 'Suggest glossary terms',
  connect_related_worlds: 'Connect related worlds',
  generate_practice_drills: 'Generate practice drills',
  summarize_progress: 'Summarize my progress',
  create_7_day_plan: 'Create a 7-day plan',
};
