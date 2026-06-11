import type { FoundryProject } from '../types';

export const GENEALOGY_PROJECTS: FoundryProject[] = [
  {
    slug: 'build-family-tree',
    display_name: 'Build Family Tree',
    tagline: 'Document your lineage',
    vertical_slug: 'genealogy',
    category: 'build',
    description: 'Genealogy projects create lasting family knowledge',
    estimated_days: 90,
    status: 'active',
    steps: [
      { slug: 'gather-records', title: 'Gather birth/marriage records', description: 'Start with parents and grandparents', sort_order: 1 },
      { slug: 'map-three-generations', title: 'Map 3 generations', description: 'Visual tree in Foundry', sort_order: 2 },
      { slug: 'extend-tree', title: 'Extend to 5 generations', description: 'Research and verify sources', sort_order: 3 },
    ],
  },
  {
    slug: 'document-grandparents',
    display_name: 'Document Grandparents',
    tagline: 'Preserve stories before they fade',
    vertical_slug: 'genealogy',
    category: 'document',
    description: 'Oral history becomes community knowledge',
    estimated_days: 30,
    status: 'active',
    steps: [
      { slug: 'interview', title: 'Record interviews', description: 'Audio or written Q&A', sort_order: 1 },
      { slug: 'publish-memoir', title: 'Publish family memoir', description: 'Share with family club', sort_order: 2 },
    ],
  },
  {
    slug: 'visit-ancestral-sites',
    display_name: 'Visit Ancestral Sites',
    tagline: 'Walk where your family walked',
    vertical_slug: 'genealogy',
    category: 'explore',
    description: 'Offline-ready travel project',
    estimated_days: 180,
    status: 'active',
    steps: [
      { slug: 'research-locations', title: 'Research locations', description: 'Homesteads, churches, cemeteries', sort_order: 1 },
      { slug: 'plan-visit', title: 'Plan and document visit', description: 'Photos, notes, GPS pins', sort_order: 2 },
    ],
  },
];
