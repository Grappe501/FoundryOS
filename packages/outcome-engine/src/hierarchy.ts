/**
 * Foundry Object Hierarchy — locked permanently.
 * An entity is just a node. The product is the transformation ecosystem.
 */
export const FOUNDRY_OBJECT_HIERARCHY = [
  { level: 1, key: 'life_journey', label: 'Life Journey', question: 'Who am I becoming?' },
  { level: 2, key: 'outcome', label: 'Outcome', question: 'What specific goal am I pursuing?' },
  { level: 3, key: 'domain', label: 'Domain', question: 'What field do I travel through?' },
  { level: 4, key: 'role', label: 'Role', question: 'What identity am I stepping into?' },
  { level: 5, key: 'path', label: 'Path', question: 'What road am I on?' },
  { level: 6, key: 'project', label: 'Project', question: 'What will I build or do?' },
  { level: 7, key: 'entity', label: 'Entity', question: 'What knowledge node anchors this?' },
  { level: 8, key: 'knowledge', label: 'Knowledge', question: 'What do I need to understand?' },
  { level: 9, key: 'community', label: 'Community', question: 'Who journeys with me?' },
  { level: 10, key: 'mentorship', label: 'Mentorship', question: 'Who guides or do I guide?' },
  { level: 11, key: 'legacy', label: 'Legacy', question: 'What do I leave behind?' },
] as const;

export type FoundryObjectLevel = (typeof FOUNDRY_OBJECT_HIERARCHY)[number]['key'];

/** Exemplar: Become a Community Leader → Better Speaker graph */
export const COMMUNITY_SPEAKER_GRAPH_EXAMPLE = {
  life_journey: 'Become a Community Leader',
  outcome: 'Become a Better Speaker',
  domain: 'Public Speaking',
  role: 'Community Speaker',
  path: 'Road to Confident Speaker',
  project: 'Deliver First Public Speech',
  entity: 'Speech Structure',
  knowledge: 'Opening Hooks',
  community: 'Speaker Circle',
  mentorship: 'Coach New Speaker',
  legacy: 'Helped 50 People Complete Path',
} as const;

export const HIERARCHY_FLOW = FOUNDRY_OBJECT_HIERARCHY.map((h) => h.label).join(' → ');
