import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldGlossaryDepth } from '../../../components/world-depth/WorldGlossaryDepth';

export default function GlossaryPage() {
  const bundle = getWorldDepthOrThrow('public-speaking');
  return <WorldGlossaryDepth bundle={bundle} basePath="/public-speaking" />;
}
