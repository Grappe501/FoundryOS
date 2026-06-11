import type { FoundryProject } from '../types';
import { BOURBON_PROJECTS } from './bourbon';
import { BBQ_PROJECTS } from './bbq';
import { BOOKS_PROJECTS } from './books';
import { GENEALOGY_PROJECTS } from './genealogy';
import { POLITICS_PROJECTS } from './politics';
import { IDENTITY_DOMAIN_PROJECTS } from './identity-domains';

export const PROJECT_CATALOG: FoundryProject[] = [
  ...BOURBON_PROJECTS,
  ...BBQ_PROJECTS,
  ...BOOKS_PROJECTS,
  ...GENEALOGY_PROJECTS,
  ...POLITICS_PROJECTS,
  ...IDENTITY_DOMAIN_PROJECTS,
];

export function getProject(slug: string): FoundryProject | undefined {
  return PROJECT_CATALOG.find((p) => p.slug === slug);
}

export function getProjectsForVertical(verticalSlug: string): FoundryProject[] {
  return PROJECT_CATALOG.filter((p) => p.vertical_slug === verticalSlug);
}

export function getProjectsForPath(pathSlug: string): FoundryProject[] {
  return PROJECT_CATALOG.filter((p) => p.path_slug === pathSlug);
}

export function getActiveProjects(): FoundryProject[] {
  return PROJECT_CATALOG.filter((p) => p.status === 'active');
}
