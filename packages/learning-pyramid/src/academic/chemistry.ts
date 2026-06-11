import type { AcademicDomain } from '../types';

export const CHEMISTRY_DOMAIN: AcademicDomain = {
  slug: 'chemistry',
  display_name: 'Chemistry',
  discipline: 'Science',
  care_reason: 'Chemistry connects molecular understanding to real-world projects — water, soil, fermentation, materials.',
  road_slug: 'road-to-chemistry-mastery',
  status: 'exemplar',
  layers: {
    definitions: ['Atom', 'Molecule', 'Reaction', 'pH'],
    concepts: ['Stoichiometry', 'Equilibrium', 'Oxidation-reduction', 'Periodic trends'],
    execution: ['Balance equations', 'Titration lab', 'Spectroscopy basics', 'Safety protocols'],
    projects: ['Water quality analysis', 'Soil testing', 'Fermentation project'],
    mastery: ['Teach lab safety', 'Create project guides', 'Mentor young chemists'],
  },
};
