import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldAcademyDepth } from '../../../components/world-depth/WorldAcademyDepth';

export default function AcademyPage() {
  const bundle = getWorldDepthOrThrow('poker');
  return <WorldAcademyDepth bundle={bundle} basePath="/poker" />;
}
