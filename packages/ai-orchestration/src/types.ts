import type { AtlasAskPrompt, AtlasContext, ComparisonExplanationInput, MentorAnswer, UserIdentityContext } from '@foundry/atlas-aware-ai';
import type { CopilotAction, CopilotRequest, CopilotResponse } from './copilots';

/** Extended actions — copilot + atlas + social + mentor channels */
export type FoundryOrchestrationAction =
  | CopilotAction
  | 'ask_atlas'
  | 'next_rabbit_hole'
  | 'social_signals'
  | 'compare_explain'
  | 'mentor_primary';

export type OrchestrationRequest = Omit<CopilotRequest, 'action'> & {
  action: FoundryOrchestrationAction;
  entity_slug?: string;
  atlas_prompt?: AtlasAskPrompt;
  comparison?: ComparisonExplanationInput;
};

export type OrchestrationBundle = {
  atlas?: AtlasContext | null;
  user?: UserIdentityContext | null;
  mentor_notice?: string;
};

export type OrchestrationCitation = {
  label: string;
  href: string;
  confidence?: string;
};

export type OrchestrationResponse = Omit<CopilotResponse, 'action'> & {
  action: FoundryOrchestrationAction;
  channel: 'copilot' | 'atlas' | 'mentor' | 'social' | 'comparison' | 'blocked';
  citations?: OrchestrationCitation[];
  confidence_notice?: string | null;
  grounded_in_foundry: boolean;
  engines_used: string[];
  atlas_answer?: MentorAnswer;
  social_summary?: {
    review_count: number;
    recommendation_count: number;
    headline: string;
  };
};

export const ORCHESTRATION_ACTION_LABELS: Record<FoundryOrchestrationAction, string> = {
  explain_lesson: 'Explain this lesson',
  recommend_next_mission: 'Recommend next mission',
  review_reflection: 'Review my reflection',
  suggest_glossary_terms: 'Suggest glossary terms',
  connect_related_worlds: 'Connect related worlds',
  generate_practice_drills: 'Generate practice drills',
  summarize_progress: 'Summarize my progress',
  create_7_day_plan: 'Create a 7-day plan',
  ask_atlas: 'Ask the Atlas (graph-grounded)',
  next_rabbit_hole: 'Next rabbit-hole path',
  social_signals: 'Reviews + recommendations summary',
  compare_explain: 'Compare two entities (graph)',
  mentor_primary: 'Primary mentor insight',
};

export const ORCHESTRATION_VERSION = '1.0.0-ai-orchestration-stack';
