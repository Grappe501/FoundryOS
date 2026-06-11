import { ENTITY_WITHOUT_TRANSFORMATION, PASS_009_GUIDANCE } from '@foundry/outcome-engine';
import type { AssemblyOutput } from './types';
import { validateTransformationEcosystem } from './transformation-system-factory';

export { PASS_009_GUIDANCE, ENTITY_WITHOUT_TRANSFORMATION };

/** PASS-009 gate: entity must connect to full transformation ecosystem */
export function validateTransformationSystem(output: AssemblyOutput) {
  const result = validateTransformationEcosystem(output);
  return {
    valid: result.valid,
    system: result.system,
    ecosystem: result.ecosystem,
    errors: result.errors,
  };
}
