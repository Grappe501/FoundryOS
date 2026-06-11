import type { AcademicDomain } from '../types';

export const PHYSICS_DOMAIN: AcademicDomain = {
  slug: 'physics',
  display_name: 'Physics',
  discipline: 'Science',
  care_reason: 'Physics builds intuition about how reality works — from classroom to research to mentorship.',
  road_slug: 'road-to-physics-expert',
  status: 'exemplar',
  layers: {
    definitions: ['Force', 'Energy', 'Momentum', 'Entropy'],
    concepts: ['Conservation of energy', 'Newton\'s laws', 'Thermodynamics', 'Wave-particle duality'],
    execution: ['Solve mechanics problems', 'Lab measurements', 'Error analysis', 'Derivation practice'],
    projects: ['Build pendulum experiment', 'Energy audit project', 'Science fair research'],
    mastery: ['Mentor physics learners', 'Publish explainer guides', 'Lead lab study group'],
  },
};
