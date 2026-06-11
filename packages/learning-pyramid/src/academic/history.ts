import type { AcademicDomain } from '../types';

export const HISTORY_DOMAIN: AcademicDomain = {
  slug: 'history',
  display_name: 'History',
  discipline: 'Humanities',
  care_reason: 'History is judgment about evidence — research, narrative, and teaching compound over a lifetime.',
  road_slug: 'road-to-historian',
  status: 'exemplar',
  layers: {
    definitions: ['Primary source', 'Secondary source', 'Chronology', 'Historiography'],
    concepts: ['Causation', 'Context', 'Bias', 'Periodization'],
    execution: ['Source analysis', 'Citation practice', 'Argument essays', 'Timeline construction'],
    projects: ['Research project', 'Historical documentary', 'Oral history archive'],
    mastery: ['Mentor researchers', 'Publish curricula', 'Lead history circle'],
  },
};
