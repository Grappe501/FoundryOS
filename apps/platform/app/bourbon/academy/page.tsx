import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldAcademyDepth } from '../../../components/world-depth/WorldAcademyDepth';

export default function AcademyPage() {
  const bundle = getWorldDepthOrThrow('bourbon');
  return <WorldAcademyDepth bundle={bundle} basePath="/bourbon" />;
}
