import type { DomainBlueprint } from './types';

export const AI_BUILDER_DOMAIN_SLUG = 'ai-builder';

export const AI_BUILDER_DOMAIN_BLUEPRINT: DomainBlueprint = {
  "slug": "ai-builder",
  "display_name": "AI Builder",
  "vertical_slug": "ai-builder",
  "care_reason": "AI is reshaping every career. Builders who ship projects compound faster than those who only consume tutorials.",
  "outcome": {
    "slug": "become-ai-builder",
    "display_name": "Become an AI Builder"
  },
  "mastery_levels": [
    {
      "slug": "curious-beginner",
      "display_name": "Curious Beginner",
      "order": 1
    },
    {
      "slug": "prompt-engineer",
      "display_name": "Prompt Engineer",
      "order": 2
    },
    {
      "slug": "workflow-builder",
      "display_name": "Workflow Builder",
      "order": 3
    },
    {
      "slug": "product-builder",
      "display_name": "Product Builder",
      "order": 4
    },
    {
      "slug": "ai-architect",
      "display_name": "AI Architect",
      "order": 5
    },
    {
      "slug": "ai-mentor",
      "display_name": "AI Mentor",
      "order": 6
    }
  ],
  "paths": [
    {
      "slug": "road-to-ai-builder",
      "display_name": "Road to AI Builder",
      "tier": "prompt-engineer"
    },
    {
      "slug": "road-to-ai-product-owner",
      "display_name": "Road to AI Product Owner",
      "tier": "product-builder"
    }
  ],
  "projects": [
    {
      "slug": "ship-first-ai-project",
      "display_name": "Ship First AI Project"
    },
    {
      "slug": "build-personal-ai-workflow",
      "display_name": "Build Personal AI Workflow"
    },
    {
      "slug": "automate-repetitive-task",
      "display_name": "Automate a Repetitive Task"
    },
    {
      "slug": "launch-ai-side-project",
      "display_name": "Launch AI Side Project"
    },
    {
      "slug": "teach-someone-ai-basics",
      "display_name": "Teach Someone AI Basics"
    }
  ],
  "collection": {
    "slug": "my-ai-toolkit",
    "display_name": "My AI Toolkit",
    "asset_type": "project_portfolio"
  },
  "community": {
    "slug": "ai-builders-circle",
    "display_name": "AI Builders Circle",
    "community_type": "circle"
  },
  "roles": [
    "Builder",
    "Prompt Engineer",
    "Product Owner",
    "Mentor"
  ]
};
