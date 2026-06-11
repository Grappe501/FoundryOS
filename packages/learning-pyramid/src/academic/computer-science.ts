import type { AcademicDomain } from '../types';

/** Road to AI Builder — coding as capability development */
export const COMPUTER_SCIENCE_DOMAIN: AcademicDomain = {
  slug: 'computer-science',
  display_name: 'Computer Science',
  discipline: 'STEM',
  care_reason: 'Not "learn JavaScript" — become a builder who understands systems, creates products, and mentors others.',
  road_slug: 'road-to-ai-builder',
  status: 'exemplar',
  layers: {
    definitions: ['API', 'Database', 'Function', 'Prompt', 'Variable', 'Loop'],
    concepts: ['Abstraction matters', 'Architecture matters', 'Systems thinking', 'Separation of concerns'],
    execution: ['Build calculator', 'Build todo app', 'API integration', 'Debug systematically'],
    projects: ['Build CRM', 'Build Campaign OS', 'Build Foundry module'],
    mastery: ['Create tutorials', 'Mentor builders', 'Contribute templates'],
  },
};

export const ROAD_TO_AI_BUILDER = {
  slug: 'road-to-ai-builder',
  display_name: 'Road to AI Builder',
  tagline: 'From definitions to mentoring builders',
  pyramid_layers: ['definitions', 'concepts', 'execution', 'projects', 'mastery'] as const,
};
