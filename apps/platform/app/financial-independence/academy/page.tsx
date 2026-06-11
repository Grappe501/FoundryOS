import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldAcademyDepth } from '../../../components/world-depth/WorldAcademyDepth';

export default function AcademyPage() {
  const bundle = getWorldDepthOrThrow('financial-independence');
  return <WorldAcademyDepth bundle={bundle} basePath="/financial-independence" />;
}
