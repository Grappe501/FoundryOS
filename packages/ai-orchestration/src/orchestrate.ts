import type { CopilotRequest, CopilotResponse } from './copilots';
import { getCopilotPersona } from './copilots';
import { validateCopilotSafety } from './safety';

export function orchestrateCopilot(request: CopilotRequest): CopilotResponse {
  const safety = validateCopilotSafety(request);
  if (!safety.allowed) {
    return {
      persona: getCopilotPersona(request.world_slug)?.persona_name ?? 'Foundry Guide',
      action: request.action,
      message: safety.reason ?? 'This request cannot be completed for your account type.',
      suggestions: [],
      blocked: true,
      block_reason: safety.reason,
    };
  }

  const persona = getCopilotPersona(request.world_slug);
  const name = persona?.persona_name ?? 'Foundry Guide';

  const actionMessages: Record<CopilotRequest['action'], string> = {
    explain_lesson: `${name} will break down the lesson in plain language and connect it to your next mission.`,
    recommend_next_mission: `${name} picks the highest-leverage mission based on your progress and segment.`,
    review_reflection: `${name} reads your reflection for clarity, specificity, and one upgrade suggestion.`,
    suggest_glossary_terms: `${name} surfaces 3–5 terms worth adding to your personal glossary.`,
    connect_related_worlds: `${name} maps skills from this world to complementary paths you can explore next.`,
    generate_practice_drills: `${name} creates a short drill set you can finish in one sitting.`,
    summarize_progress: `${name} summarizes missions completed, portfolio artifacts, and momentum.`,
    create_7_day_plan: `${name} builds a realistic 7-day plan with one mission per day.`,
  };

  return {
    persona: name,
    action: request.action,
    message: actionMessages[request.action],
    suggestions: buildDefaultSuggestions(request),
  };
}

function buildDefaultSuggestions(request: CopilotRequest): string[] {
  switch (request.action) {
    case 'connect_related_worlds':
      if (request.world_slug === 'ai-builder') {
        return ['Entrepreneur — productize your assistant', 'Public Speaking — demo day prep', 'Financial Independence — price your offer'];
      }
      if (request.world_slug === 'bourbon') {
        return ['BBQ — pairing night', 'Public Speaking — host a tasting', 'Civic Engagement — local distillery policy'];
      }
      if (request.world_slug === 'civic-engagement') {
        return ['Public Speaking — comment at a meeting', 'Government Systems — how agencies work', 'Grassroots & Nonprofits — organize'];
      }
      return ['Explore catalog for complementary paths'];
    default:
      return ['Open your current mission', 'Review glossary for this world', 'Check community showcase'];
  }
}
