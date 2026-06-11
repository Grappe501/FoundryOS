import {
  assessTransformationSystem,
  FOUNDRY_OBJECT_HIERARCHY,
  getDomainDNA,
  getTransformationTemplate,
  PASS_009_FACTORY_MISSION,
  PASS_009_FACTORY_NAME,
  type FoundryDNARecord,
  type FoundryObjectLevel,
} from '@foundry/outcome-engine';
import type { AssemblyInput, AssemblyOutput } from './types';
import { generateExpertAssets } from './expert-factory';

export { PASS_009_FACTORY_NAME, PASS_009_FACTORY_MISSION };

export type TransformationEcosystemBlueprint = {
  dna: FoundryDNARecord;
  template_layers: string[];
  hierarchy_coverage: Array<{ level: FoundryObjectLevel; populated: boolean; items: string[] }>;
  entity_slug?: string;
  is_complete: boolean;
  gaps: string[];
};

function coverageForDNA(dna: FoundryDNARecord): TransformationEcosystemBlueprint['hierarchy_coverage'] {
  const map: Record<FoundryObjectLevel, string[]> = {
    life_journey: dna.journeys ?? [],
    outcome: dna.outcomes,
    domain: [dna.domain],
    role: dna.roles,
    path: dna.paths,
    project: dna.projects,
    entity: dna.entities ?? [],
    knowledge: dna.knowledge ?? [],
    community: dna.communities,
    mentorship: dna.mentorship ?? [],
    legacy: dna.legacy ?? [],
  };

  return FOUNDRY_OBJECT_HIERARCHY.map((h) => ({
    level: h.key,
    populated: (map[h.key]?.length ?? 0) > 0,
    items: map[h.key] ?? [],
  }));
}

/** Assemble a full transformation ecosystem from a DNA blueprint — not an entity alone */
export function assembleTransformationEcosystem(
  dna: FoundryDNARecord,
  entitySlug?: string
): TransformationEcosystemBlueprint {
  const template = getTransformationTemplate(dna.template);
  const coverage = coverageForDNA(dna);
  const gaps: string[] = [];

  if (!template) gaps.push(`unknown template: ${dna.template}`);
  for (const row of coverage) {
    if (!row.populated) gaps.push(`missing hierarchy level: ${row.level}`);
  }
  if (!dna.outcomes.length) gaps.push('missing outcomes');
  if (!dna.paths.length) gaps.push('missing paths');
  if (!dna.projects.length) gaps.push('missing projects');

  return {
    dna,
    template_layers: template?.layers ?? [],
    hierarchy_coverage: coverage,
    entity_slug: entitySlug,
    is_complete: gaps.length === 0,
    gaps,
  };
}

/** PASS-009 entry point — manufacture transformation system from domain DNA + optional entity */
export function manufactureTransformationSystem(
  domainSlug: string,
  entityInput?: AssemblyInput
): TransformationEcosystemBlueprint {
  const dna = getDomainDNA(domainSlug);
  if (!dna) {
    return assembleTransformationEcosystem(
      {
        domain: domainSlug,
        display_name: domainSlug,
        template: 'hobby',
        outcomes: [],
        roles: [],
        paths: [],
        projects: [],
        communities: [],
      },
      entityInput?.slug
    );
  }
  return assembleTransformationEcosystem(dna, entityInput?.slug);
}

/** Validate assembled entity output connects to transformation system */
export function validateTransformationEcosystem(output: AssemblyOutput): {
  valid: boolean;
  ecosystem: TransformationEcosystemBlueprint;
  system: ReturnType<typeof assessTransformationSystem>;
  errors: string[];
} {
  const domainSlug = output.input.vertical_domain.replace(/\.foundryos\.com$/, '').split('.').pop() ?? 'unknown';
  const dna = getDomainDNA(domainSlug) ?? getDomainDNA('public-speaking');
  const ecosystem = dna
    ? assembleTransformationEcosystem(dna, output.entity.slug)
    : manufactureTransformationSystem(domainSlug, output.input);

  const system = assessTransformationSystem(output.entity.slug);
  const errors: string[] = [...ecosystem.gaps];

  if (!output.expert?.care_reason) errors.push('missing care_reason (purpose)');
  if (!output.expert?.beginner_path || !output.expert?.expert_path) errors.push('missing paths');
  if (!output.expert?.community_use_cases?.length) errors.push('missing community connections');
  if (!output.expert?.beginner_journey || !output.expert?.expert_journey) errors.push('missing journeys');

  return {
    valid: ecosystem.is_complete && system.is_complete && errors.length === 0,
    ecosystem,
    system,
    errors,
  };
}

/** Generate expert assets scoped to a DNA blueprint */
export function generateEcosystemAssets(input: AssemblyInput, dna: FoundryDNARecord) {
  const expert = generateExpertAssets(input);
  return {
    expert,
    dna,
    blueprint: assembleTransformationEcosystem(dna, input.slug),
  };
}
