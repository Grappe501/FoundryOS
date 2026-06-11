import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldGlossaryDepth } from '../../../components/world-depth/WorldGlossaryDepth';

export default function GlossaryPage() {
  const bundle = getWorldDepthOrThrow('civic-engagement');
  return <WorldGlossaryDepth bundle={bundle} basePath="/civic-engagement" />;
}
