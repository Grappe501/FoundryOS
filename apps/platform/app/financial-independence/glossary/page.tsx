import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldGlossaryDepth } from '../../../components/world-depth/WorldGlossaryDepth';

export default function GlossaryPage() {
  const bundle = getWorldDepthOrThrow('financial-independence');
  return <WorldGlossaryDepth bundle={bundle} basePath="/financial-independence" />;
}
